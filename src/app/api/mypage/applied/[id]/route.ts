export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const studyId = (params?.id ?? "").trim();

        const s = await getServerSession(authOptions);
        if (!s) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

        const sessionId = ((s.user as any)?.id || (s.user as any)?.userId || "").trim();

        const url = new URL(req.url);
        const urlUserId = (url.searchParams.get("userId") ?? "").trim();

        if (sessionId && urlUserId && sessionId !== urlUserId) {
            return NextResponse.json({ error: "forbidden" }, { status: 403 });
        }

        const myId = sessionId || urlUserId;

        if (!studyId || !myId) {
            return NextResponse.json({ error: "invalid params" }, { status: 400 });
        }

        const _id = new ObjectId(studyId);
        const client = await clientPromise;
        const db = client.db();
        const col = db.collection("studies");

        const res = await col.updateOne(
            { _id },
            { $pull: { applicants: { userId: myId } } }
        );

        if (res.matchedCount === 0) {
            return NextResponse.json({ error: "study not found" }, { status: 404 });
        }

        return NextResponse.json({ ok: true });
    } catch (e: any) {
        console.error("[DELETE /api/mypage/applied/[id]] fatal:", e);
        return NextResponse.json(
            { error: "internal error", detail: String(e?.message ?? e) },
            { status: 500 }
        );
    }
}
