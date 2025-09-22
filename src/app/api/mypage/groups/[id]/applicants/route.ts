export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json().catch(() => ({}));
        const applicantId = body?.applicantId as string;
        const action = body?.action as "approve" | "reject";

        if (!id || !applicantId || !["approve", "reject"].includes(action)) {
            return NextResponse.json({ error: "invalid params" }, { status: 400 });
        }

        const _id = new ObjectId(id);
        const client = await clientPromise;
        const db = client.db();
        const col = db.collection("studies");

        const study = await col.findOne({ _id });
        if (!study) return NextResponse.json({ error: "not found" }, { status: 404 });

        if (action === "approve") {
            const capacity = Number(study.capacity ?? 0);
            const currentMembers = Number(study.currentMembers ?? (study.members?.length ?? 0));
            if (currentMembers >= capacity) {
                return NextResponse.json({ error: "capacity reached" }, { status: 400 });
            }

            const applicant =
                (study.applicants ?? []).find((a: any) => a?.userId === applicantId) ?? null;
            if (!applicant) {
                return NextResponse.json({ error: "applicant not found" }, { status: 404 });
            }

            const willBeClosed = currentMembers + 1 >= capacity;

            await col.updateOne(
                { _id, "applicants.userId": applicantId },
                { $set: { "applicants.$.status": "approved", "applicants.$.decidedAt": new Date() } }
            );

            await col.updateOne(
                { _id },
                {
                    $pull: { applicants: { userId: applicantId } },
                    $push: {
                        members: {
                            userId: applicantId,
                            nickname: applicant?.nickname ?? applicant?.name ?? "",
                            joinedAt: new Date(),
                        },
                    },
                    $inc: { currentMembers: 1 },
                    ...(willBeClosed ? { $set: { isRecruiting: false } } : {}),
                }
            );

            return NextResponse.json({ ok: true, action: "approve", closed: willBeClosed });
        }

        const res = await col.updateOne(
            { _id, "applicants.userId": applicantId },
            {
                $set: {
                    "applicants.$.status": "rejected",
                    "applicants.$.decidedAt": new Date(),
                },
            }
        );

        if (res.matchedCount === 0) {
            return NextResponse.json({ error: "applicant not found" }, { status: 404 });
        }

        return NextResponse.json({ ok: true, action: "reject" });
    } catch (err: any) {
        console.error("[PATCH /api/mypage/groups/[id]/applicants] error:", err);
        return NextResponse.json(
            { error: "update failed", detail: String(err?.message ?? err) },
            { status: 500 }
        );
    }
}
