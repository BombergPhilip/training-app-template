import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { signin } from "./app/api/auth/auth";

// Whitelist side
// Routes, som en besøgende browser ikke må befinde sig på medmindre at de er logget ind :)
const blacklist = ["/profile"];

function url_on_blacklist(url: string): boolean {
    return blacklist.some((route) => url.includes(route));
}

export default async function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const email = request.cookies.get("user")?.value;

    if ((await signin(email, token)).success) {
        return NextResponse.next();
    }

    if (!url_on_blacklist(request.url)) return; // ingen grund til at redirecte, hvis siden allerede findes på en whitelist side
    if (request.url.includes("/auth/sign")) return NextResponse.next();
    return NextResponse.redirect(new URL("/auth/signin", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // Exclude API routes, static files, image optimizations, and .png files
        "/((?!_next/static|api/auth/|logo.svg|_next/image|.*\\.png$).*)",
    ],
};
