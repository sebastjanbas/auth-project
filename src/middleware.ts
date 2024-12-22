// export { auth as middleware } from "@/auth"
// import { auth } from "@/auth"
import NextAuth from "next-auth"
import authConfig from "@/auth.config"
 
export const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLogged = !!req.auth;
    console.log("ROUTE: ", req.nextUrl.pathname)
    console.log("LOGGED IN: ", isLogged);
})

export const config = {
    matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)','/(api|trpc)(.*)',]
}
