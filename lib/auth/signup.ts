"use server";

import { prisma } from "../prisma";
import { cookies } from "next/headers";
import { create_token } from "./auth";
import bcrypt from "bcrypt";

export async function signup(formData: { fullName: string; email: string; password: string }) {
    const passwordHash = await bcrypt.hash(formData.password, 10);
    const { tokenStr, tokenHash } = await create_token();

    try {
        await prisma.$transaction(async (tx) => {
            const user = await tx.users.create({
                data: {
                    name: formData.fullName,
                    email: formData.email,
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

        cookieStore.set('user', formData.email);
        cookieStore.set('token', tokenStr);

        return { result: true, tokenStr };
    } catch (error) {
        if (typeof error === "string") return { result: false, error };
        console.error(error);
        return { result: false, error: "Something went wrong" };
    }
}
