import NextAuth, { type DefaultSession } from "next-auth"
import {JWT } from "next-auth/jwt"
import authConfig from "@/auth.config"

import { getUserById } from "./data/user"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
 

// FOR TYPES
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "ADMIN" | "USER"
    } & DefaultSession["user"]
  } 
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER"
  }
}


export const { handlers, auth, signIn, signOut } = NextAuth({

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  
  events: {
    async linkAccount({user}){
      await db.user.update({
        where: {id: user.id},
        data: {
          emailVerified: new Date()
        }
      })
    }
  },

  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as any);

      // prevent sign in if email is not verified
      if (!existingUser?.emailVerified) return false;

      // TODO: Add 2FA check
      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
        
        if (!twoFactorConfirmation) return false;

        // Delete the confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },

    async session({token, session}) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session
    },

    async jwt({token} ) {
      if (!token.sub) return token;
      const user = await getUserById(token.sub);

      if (!user) return token;

      token.role = user.role;
      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})