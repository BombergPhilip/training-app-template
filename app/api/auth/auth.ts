"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { cookies } from "next/headers";

// cached tokens bruges til at holde styr på tokens vi allerede har set før,
// så vi kan speede logind processen en anelse op!
// en token overlever kun 30 minutter
const cached_tokens = new Map<string, Date>([]);

/**
 * Logs in a user by verifying their token or password.
 * If a token is provided, it is checked against the cached tokens.
 * If a password is provided, it is hashed and compared against the user's stored password.
 * @param email The user's email.
 * @param token_or_psw The user's token or password.
 * @returns True if the login is successful, false otherwise.
 */
export async function signin(email?: string, token_or_psw?: string): Promise<{ success: boolean; error?: string }> {
    if (token_or_psw == undefined || email == undefined) {
        // Token findes ikke, der skal logges ind!
        return { success: false, error: "faulty input" };
    }

    const token_key = email + token_or_psw;
    const cached_token = cached_tokens.get(token_key);

    // allow request
    if (cached_token && is_token_valid(token_key, cached_token)) return { success: true };
    // token is not previously known

    // check if login info is valid
    const user = await prisma.users.findFirst({
        where: { email },
        include: { token: true, password: true },
    });
    if (!user) return { success: false, error: "no user" };

    // go through each of the users tokens and check if it is valid
    const valid_token = user.token.find((t) => bcrypt.compareSync(token_or_psw, t.hash));
    const valid_password = user.password ? bcrypt.compareSync(token_or_psw, user.password.hash) : false;

    // der kunne ikke findes en gyldig token!
    if (!valid_token && !valid_password) return { success: false, error: "invalid credentials" };

    if (valid_token)
        // token er gyldig!
        cached_tokens.set(token_key, new Date());

    return { success: true };
}


export async function signup(fullname?: string, email?: string, password?: string): Promise<{ success: boolean, token?: string, error?: string }> {
    if (!password) return { success: false, error: "missing password" };
    if (!email) return { success: false, error: "missing email" };
    if (!fullname) return { success: false, error: "missing fullname" };

    const passwordHash = await bcrypt.hash(password, 10);
    const { tokenStr, tokenHash } = await create_token();

    try {
        await prisma.$transaction(async (tx) => {
            const user = await tx.users.create({
                data: {
                    name: fullname,
                    email: email,
                },
            });

            await tx.password.create({
                data: {
                    hash: passwordHash,
                    user_id: user.id,
                },
            });

            await tx.token.create({
                data: {
                    hash: tokenHash,
                    user_id: user.id,
                },
            });
        });

        const cookieStore = await cookies();

        cookieStore.set('user', email);
        cookieStore.set('token', tokenStr);

        return { success: true, token: tokenStr };
    } catch (error) {
        if (typeof error == "string") return { success: false, error };
        console.error(error);
        return { success: false, error: "Something went wrong" };
    }
}

function is_token_valid(token_key: string, date: Date) {
    const THIRTY_MINUTES = 30 * 60 * 1000;
    if (Date.now() - new Date(date).getTime() < THIRTY_MINUTES) {
        return true;
    }

    cached_tokens.delete(token_key);
    return false;
}

export async function create_token() {
    const tokenStr = crypto.randomBytes(32).toString("hex");
    const tokenHash = await bcrypt.hash(tokenStr, 5);

    return { tokenStr, tokenHash };
}
