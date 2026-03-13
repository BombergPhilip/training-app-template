import { signin } from "./auth";

export async function POST(request: Request) {
    try {
        const data = await request.json(); // parse JSON body

        // if the request is a login request



        return Response.json(await signin(data.email, data.password));
    } catch (err) {
        return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }
}

export async function is_user_logged_in() {
    "use server";

    return true;
}
