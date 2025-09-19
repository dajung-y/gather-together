export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type StudyDoc = any;

function toCardDTO(s: StudyDoc) {
    const startDate = s?.period?.startDate ?? s?.startDate ?? "";
    const endDate   = s?.period?.endDate   ?? s?.endDate   ?? "";
    const startTime = s?.schedule?.startTime ?? s?.startTime ?? "";
    const endTime   = s?.schedule?.endTime   ?? s?.endTime   ?? "";

    const applicants = (s?.applicants ?? []).map((a: any) => ({
        userId: String(a?.userId ?? ""),
        name:   String(a?.nickname ?? a?.name ?? ""),
        msg:    String(a?.introduction ?? a?.msg ?? ""),
    }));

    return {
        id: String(s?._id ?? s?.id ?? ""),
        name: String(s?.studyName ?? s?.name ?? ""),
        title: String(s?.title ?? ""),
        startDate,
        endDate,
        time: [startTime, endTime].filter(Boolean).join(" ~ "),
        currentMembers:
            typeof s?.currentMembers === "number"
                ? s.currentMembers
                : (s?.members?.length ?? 0),
        maxMembers: Number(s?.capacity ?? 0),
        tag: String(s?.category ?? ""),
        isRecruiting: Boolean(
            s?.status ? s.status === "RECRUITING" : s?.isRecruiting ?? false
        ),
        applicants,
    };
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const isRecruiting = searchParams.get("isRecruiting");
        const creatorId = searchParams.get("creatorId")?.trim();

        if (!creatorId) {
            return NextResponse.json({ items: [] }, { status: 200 });
        }
        const recFlag =
            isRecruiting === "true" ? true : isRecruiting === "false" ? false : undefined;

        const client = await clientPromise;
        const db = client.db();
        const col = db.collection("studies");

        const query: any = { "creator.userId": creatorId };
        if (typeof recFlag === "boolean") query.isRecruiting = recFlag;

        const list = await col
            .find(query)
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({
            items: list.map(toCardDTO),
        });
    } catch (e: any) {
        console.error("[GET /api/mypage/groups] error:", e);
        return NextResponse.json({ error: "failed" }, { status: 500 });
    }
}
