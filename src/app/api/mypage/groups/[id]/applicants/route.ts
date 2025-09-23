export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const COLL_STUDIES = "studies";
const COLL_APPS    = "applications";

const isHex24 = (v: string) => /^[0-9a-fA-F]{24}$/.test(v);
const toObjectId = (v: string) => (isHex24(v) ? new ObjectId(v) : null);

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const client = await clientPromise;
    const session = client.startSession();

    try {
        const { id: studyId } = params;
        const { applicantId, action } = await request.json();

        if (!studyId || !applicantId || !["approve", "reject"].includes(action)) {
            return NextResponse.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
        }

        const _id = new ObjectId(studyId);
        const db = client.db();
        const studies = db.collection(COLL_STUDIES);
        const apps = db.collection(COLL_APPS);

        const applicantIdStr = String(applicantId);
        const applicantOid = toObjectId(applicantIdStr);
        const pullCond: any = {
            $or: [{ userId: applicantIdStr }, { id: applicantIdStr }],
        };
        if (applicantOid) pullCond.$or.push({ _id: applicantOid });

        const study = await studies.findOne(
            { _id },
            { projection: { title: 1, category: 1, startDate: 1, endDate: 1, capacity: 1, currentMembers: 1, members: 1, isRecruiting: 1, applicants: 1 } }
        );
        if (!study) return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });

        const now = new Date();

        await session.withTransaction(async () => {
            if (action === "approve") {
                const capacity = Number(study.capacity ?? 0);
                const current = Number(study.currentMembers ?? (study.members?.length ?? 0));
                if (capacity && current >= capacity) {
                    throw new Error("CAPACITY_REACHED");
                }
                const willBe = current + 1;

                await studies.updateOne(
                    { _id },
                    {
                        $pull: { applicants: pullCond },
                        $addToSet: {
                            members: {
                                userId: applicantIdStr,
                                nickname:
                                    (study.applicants ?? []).find((a: any) => String(a?.userId ?? a?.id ?? a?._id) === applicantIdStr)?.nickname ??
                                    (study.applicants ?? []).find((a: any) => String(a?.userId ?? a?.id ?? a?._id) === applicantIdStr)?.name ??
                                    "",
                                joinedAt: now,
                            },
                        },
                        $inc: { currentMembers: 1 },
                        ...(capacity && willBe >= capacity ? { $set: { isRecruiting: false } } : {}),
                    },
                    { session }
                );

                await apps.updateOne(
                    { studyId: _id, userId: applicantIdStr },
                    {
                        $set: {
                            status: "approved",
                            decidedAt: now,
                            studyTitle: study.title ?? "",
                            category: study.category ?? "",
                            startDate: study.startDate ?? null,
                            endDate: study.endDate ?? null,
                        },
                        $setOnInsert: { createdAt: now },
                    },
                    { upsert: true, session }
                );
            } else {
                await studies.updateOne(
                    { _id },
                    { $pull: { applicants: pullCond } },
                    { session }
                );

                await apps.updateOne(
                    { studyId: _id, userId: applicantIdStr },
                    {
                        $set: {
                            status: "rejected",
                            decidedAt: now,
                            studyTitle: study.title ?? "",
                            category: study.category ?? "",
                            startDate: study.startDate ?? null,
                            endDate: study.endDate ?? null,
                        },
                        $setOnInsert: {
                            createdAt: now,
                            appliedAt: now,
                        },
                    },
                    { upsert: true, session }
                );
            }
        });

        return NextResponse.json({ ok: true, action }, { status: 200 });
    } catch (err: any) {
        const msg = String(err?.message ?? err);
        const code = msg === "CAPACITY_REACHED" ? 400 : 500;
        if (code === 400) return NextResponse.json({ ok: false, error: msg }, { status: 400 });
        console.error("[PATCH applicants] error:", err);
        return NextResponse.json({ ok: false, error: "SERVER_ERROR", detail: msg }, { status: 500 });
    } finally {
        await session.endSession();
    }
}
