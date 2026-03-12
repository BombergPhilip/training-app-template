"use server";

import { create_token } from "./auth";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import { cookies } from "next/headers";

export async function signin(formData: { email: string; password: string }) {
    const { email, password } = formData;

    try {
        // try and find user
        const user = await prisma.users.findUnique({
            where: { email },
            include: { password: true },
        });
        if (!user) throw "User not found";
        if (!user.password) throw "User not found"; // Burde ikke kunne ske, og det får typescript til at holde kæft

        // verify password
        const valid = await bcrypt.compare(password, user.password.hash);
        if (!valid) throw "Invalid password";

        const { tokenStr, tokenHash } = await create_token();
        await prisma.token.create({
            data: {
                hash: tokenHash,
                user_id: user.id,
            },
        });

        const cookieStore = await cookies();
        cookieStore.set("token", tokenStr);
        cookieStore.set("user", email);

        return { result: true, tokenStr, email };
    } catch (error) {
        if (typeof error === "string") return { result: false, err: error };
        console.error(error);
        return { result: false, error: "Something went wrong" };
    }
}
