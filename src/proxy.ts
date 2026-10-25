import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./lib/prisma";

export async function proxy(request: NextRequest) {

    const { pathname } = request.nextUrl

    const token = request.cookies.get("__Secure-next-auth.session-token")?.value || request.cookies.get("next-auth.session-token")?.value
    const session = token ? await prisma.session.findUnique({
        where: {
            sessionToken: token
        }
    }) : null

    const isLoggedIn = !!session && session.expires > new Date()
    const publicRoutes = ["/sign-in"]
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

    if (isLoggedIn && isPublicRoute) {
        return NextResponse.redirect(new URL("/home", request.url))
    }

    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url))
    }
}


// add more routes as we add more pages in the frontend!
export const config = {
    matcher: [
        "/sign-in",
        "/home"
    ]
}