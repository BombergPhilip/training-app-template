import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

async function getUserId(): Promise<number | null> {
    const cookieStore = await cookies();
    const email = cookieStore.get("user")?.value;

    if (email) {
        const user = await prisma.users.findUnique({
            where: { email },
            select: { id: true },
        });

        if (user?.id) return user.id;
    }

    // Dev fallback: use first user if no auth cookie exists yet.
    const firstUser = await prisma.users.findFirst({
        orderBy: { id: "asc" },
        select: { id: true },
    });
    return firstUser?.id ?? null;
}

export async function POST(request: Request) {
    try {
        const userId = await getUserId();

        if (!userId) {
            return NextResponse.json({ error: "Not authorized" }, { status: 401 });
        }

        const body = await request.json();
        const weight = Number(body.weight);

        if (!Number.isFinite(weight) || weight <= 0) {
            return NextResponse.json({ error: "invalid weight" }, { status: 400 });
        }

        const day = new Date();
        day.setHours(0, 0, 0, 0);

        const userExists = await prisma.users.findUnique({
            where: { id: userId },
            select: { id: true },
        });

        if (!userExists) {
            return NextResponse.json(
                { error: `User ${userId} not found` },
                { status: 404 }
            );
        }

        const result = await prisma.$transaction(async (tx) => {
            await tx.users.update({
                where: { id: userId },
                data: { weight_kg: weight },
            });

            const log = await tx.weight_logs.upsert({
                where: {
                    user_id_timestamp: {
                        user_id: userId,
                        timestamp: day,
                    },
                },
                update: {
                    weight,
                },
                create: {
                    user_id: userId,
                    timestamp: day,
                    weight,
                },
            });

            return log;
        });

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error(error);
        const message =
            error instanceof Error ? error.message : "Could not save weight";
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const userId = await getUserId();

        if (!userId) {
            return NextResponse.json({ error: "Not authorized" }, { status: 401 });
        }

        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: { weight_kg: true },
        });

        const logs = await prisma.weight_logs.findMany({
            where: { user_id: userId },
            orderBy: { timestamp: "asc" },
            select: {
                timestamp: true,
                weight: true,
            },
        });

        return NextResponse.json({
            currentWeight: user?.weight_kg ?? null,
            logs,
        });
    } catch (error) {
        console.error(error);
        const message =
            error instanceof Error ? error.message : "Could not fetch weight data";
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}