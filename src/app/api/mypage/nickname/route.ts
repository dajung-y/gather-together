import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import {revalidateTag} from "next/cache";

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);
    const u = session?.user as any;
    if (!u?.id && !u?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    const nickname = (body?.nickname ?? "").trim();

    if (!nickname || nickname.length > 10) {
        return NextResponse.json({ error: "닉네임은 1~10자여야 합니다." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    if (u?.id) {
        const dup = await db
            .collection("users")
            .findOne({ nickname, _id: { $ne: new ObjectId(u.id) } }, { projection: { _id: 1 } });
        if (dup) return NextResponse.json({ error: "이미 사용 중인 닉네임입니다." }, { status: 409 });
    }

    const where = u?.id ? { _id: new ObjectId(u.id) } : { email: u.email };
    await db.collection("users").updateOne(where, { $set: { nickname, updatedAt: new Date() } });

    revalidateTag("study-tag");

    return NextResponse.json({ ok: true, nickname });
}
