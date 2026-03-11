"use server";

import { prisma } from "../prisma";
import { createToken, hashPassword } from "./auth";

export async function signup(formData: { fullName: string; email: string; password: string }) {
    const passwordHash = await hashPassword(formData.password);
    const { tokenStr, tokenHash } = await createToken();

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
        return { result: true, tokenStr };
    } catch (error) {
        if (typeof error === "string") return { result: false, error };
        console.error(error);
        return { result: false, error: "Something went wrong" };
    }
}
