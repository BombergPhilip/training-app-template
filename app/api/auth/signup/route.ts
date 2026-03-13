"use server";

import { signup } from "../auth";

export async function POST(request: Request) {
    const { fullname, email, password } = await request.json();
    return Response.json(await signup(fullname, email, password));
}
