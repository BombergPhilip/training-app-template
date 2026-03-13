"use server";

import { signin } from "../auth";

export async function POST(request: Request) {
    const { email, password } = await request.json();
    return Response.json(await signin(email, password));
}
