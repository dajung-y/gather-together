export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        const myId = ((session?.user as any)?.id || (session?.user as any)?.email || "").trim();

        if (!myId) {
            return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
        }

        const { id } = params;
        if (!id) {
            return NextResponse.json({ error: "invalid id" }, { status: 400 });
        }

        const body = await req.json().catch(() => ({}));
        const isRecruiting = body?.isRecruiting;
        if (typeof isRecruiting !== "boolean") {
            return NextResponse.json({ error: "invalid params" }, { status: 400 });
        }

        const _id = new ObjectId(id);
        const client = await clientPromise;
        const db = client.db();
        const col = db.collection("studies");

        const study = await col.findOne({ _id });
        if (!study) {
            return NextResponse.json({ error: "not found" }, { status: 404 });
        }
        const isOwner =
            String(study?.creator?.userId ?? "") === myId || String(study?.creatorId ?? "") === myId;
        if (!isOwner) {
            return NextResponse.json({ error: "forbidden" }, { status: 403 });
        }

        const upd = await col.updateOne({ _id }, { $set: { isRecruiting } });
        if (upd.matchedCount === 0) {
            return NextResponse.json({ error: "not found" }, { status: 404 });
        }

        return NextResponse.json({ ok: true, isRecruiting });
    } catch (e: any) {
        console.error("[PATCH /api/mypage/groups/[id]] fatal:", e);
        return NextResponse.json(
            { error: "internal error", detail: String(e?.message ?? e) },
            { status: 500 }
        );
    }
}
