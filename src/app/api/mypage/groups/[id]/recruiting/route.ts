export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params?.id?.trim();
        if (!id) return NextResponse.json({ error: "invalid id" }, { status: 400 });

        const body = await req.json().catch(() => ({}));
        const isRecruiting = body?.isRecruiting;
        if (typeof isRecruiting !== "boolean") {
            return NextResponse.json({ error: "invalid params" }, { status: 400 });
        }

        const session = await getServerSession(authOptions);
        const myId = ((session?.user as any)?.id || (session?.user as any)?.email || "").trim();
        if (!myId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

        let _id: ObjectId;
        try {
            _id = new ObjectId(id);
        } catch {
            return NextResponse.json({ error: "invalid object id" }, { status: 400 });
        }

        const db = (await clientPromise).db();
        const col = db.collection("studies");

        const res = await col.updateOne(
            { _id, "creator.userId": myId },
            { $set: { isRecruiting }, $unset: { isRecuiting: "" } }
        );

        if (res.matchedCount === 0) {
            return NextResponse.json({ error: "not found" }, { status: 404 });
        }

        const after = await col.findOne(
            { _id },
            { projection: { isRecruiting: 1, isRecuiting: 1 } }
        );

        return NextResponse.json({
            ok: true,
            isRecruiting: !!after?.isRecruiting,
            modified: res.modifiedCount > 0,
            debug: after,
        });
    } catch (e) {
        console.error("[PATCH /api/mypage/groups/[id]/recruiting] error:", e);
        return NextResponse.json({ error: "failed" }, { status: 500 });
    }
}
