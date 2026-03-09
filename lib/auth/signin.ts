"use server";

import { comparePassword, createToken } from "./auth";
import { prisma } from "../prisma";

export async function signin(formData: { email: string; password: string }) {
  const { email, password } = formData;

  try {
    // try and find user
    const user = await prisma.users.findUnique({
      where: { email },
      include: { password: true },
    });
    if (!user) throw "User not found";

    // verify password
    const valid = await comparePassword(password, user.password.hash);
    if (!valid) throw "Invalid password";

    const { tokenStr, tokenHash } = await createToken();
    await prisma.token.create({
      data: {
        hash: tokenHash,
        user_id: user.id,
      },
    });

    return { result: true, tokenStr };
  } catch (error) {
    if (typeof error === "string") return { result: false, err: error };
    console.error(error);
    return { result: false, error: "Something went wrong" };
  }
}
