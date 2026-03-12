import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "./lib/prisma";
import bcrypt from "bcrypt";

// Whitelist side
// Routes, som en besøgende browser ikke må befinde sig på medmindre at de er logget ind :)
const blacklist = ["/profile"];

// knownTokens
const knownTokens = new Map<string, Date>([]);

function url_on_blacklist(url: string): boolean {
    return blacklist.some((route) => url.includes(route));
}

export default async function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const email = request.cookies.get("user")?.value;

    if (token == undefined || email == undefined) {
        // Token findes ikke, der skal logges ind!
        return redirect(request);
    }

    const cached_token = knownTokens.get(token);

    if (cached_token && is_token_valid(cached_token)) {
        // allow request
        return NextResponse.next();
    }

    // token is not previously known
    // check if login info is valid

    const user = await prisma.users.findFirst({ where: { email }, include: { token: true } });
    if (!user) return redirect(request);

    // go through each of the users tokens and check if it is valid
    const valid_token = user.token.find((t) => bcrypt.compare(token, t.hash));

    if (!valid_token) {
        request.cookies.clear();
        return redirect(request); // der kunne ikke findes en gyldig token!
    }

    // token er gyldig!
    knownTokens.set(token, new Date());
}

function redirect(request: NextRequest) {
    if (!url_on_blacklist(request.url)) return; // ingen grund til at redirecte, hvis siden allerede findes på en whitelist side
    if (request.url.includes("/auth/sign")) return NextResponse.next();
    return NextResponse.redirect(new URL("/auth/signin", request.url));
}

function is_token_valid(date: Date) {
    const THIRTY_MINUTES = 30 * 60 * 1000;
    return Date.now() - new Date(date).getTime() < THIRTY_MINUTES;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // Exclude API routes, static files, image optimizations, and .png files
        "/((?!_next/static|logo.svg|_next/image|.*\\.png$).*)",
    ],
};
