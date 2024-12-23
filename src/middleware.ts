// export { auth as middleware } from "@/auth"
// import { auth } from "@/auth"
import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import { 
    DEFAULT_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes"
import { NextResponse } from "next/server"
 
export const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    console.log("LOGGED IN: ", isLoggedIn);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);


    if (isApiAuthRoute) {
        return NextResponse.next(); // Allow API routes to be accessed
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl)); // need ABSOLUTE URL
        }
        return NextResponse.next();
    }

    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/auth/login", nextUrl)); // need ABSOLUTE URL
    }
     
    return NextResponse.next();

})

export const config = {
    matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)','/(api|trpc)(.*)',]
}
