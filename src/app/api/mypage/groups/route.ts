export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

type StudyDoc = any;

function toCardDTO(s: StudyDoc) {
    const startDate = s?.period?.startDate ?? s?.startDate ?? "";
    const endDate = s?.period?.endDate ?? s?.endDate ?? "";
    const weekdays = s?.schedule?.weekdays ?? s?.weekdays ?? [];
    const startTime = s?.schedule?.startTime ?? s?.startTime ?? "";
    const endTime = s?.schedule?.endTime ?? s?.endTime ?? "";

    const applicants = (s?.applicants ?? []).map((a: any) => ({
        userId: String(a?.userId ?? ""),
        name: String(a?.nickname ?? a?.name ?? ""),
        msg: String(a?.introduction ?? a?.msg ?? ""),
    }));

    return {
        id: String(s?._id ?? s?.id ?? ""),
        name: String(s?.studyName ?? s?.name ?? ""),
        title: String(s?.title ?? ""),
        startDate,
        endDate,
        weekdays,
        startTime,
        endTime,
        currentMembers:
            typeof s?.currentMembers === "number" ? s.currentMembers : (s?.members?.length ?? 0),
        maxMembers: Number(s?.capacity ?? 0),
        tag: String(s?.category ?? ""),
        isRecruiting: Boolean(s?.status ? s.status === "RECRUITING" : s?.isRecruiting ?? false),
        applicants,
    };
}

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const myId = ((session?.user as any)?.id || (session?.user as any)?.email || "").trim();
        if (!myId) {
            return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const isRecruiting = searchParams.get("isRecruiting");
        const recFlag =
            isRecruiting === "true" ? true : isRecruiting === "false" ? false : undefined;

        const client = await clientPromise;
        const db = client.db();
        const col = db.collection("studies");

        const ownerFilter = { $or: [{ "creator.userId": myId }, { creatorId: myId }] } as const;
        const query: any = { ...ownerFilter };
        if (typeof recFlag === "boolean") query.isRecruiting = recFlag;

        const list = await col.find(query).sort({ createdAt: -1 }).toArray();

        return NextResponse.json({ items: list.map(toCardDTO) });
    } catch (e: any) {
        console.error("[GET /api/mypage/groups] error:", e);
        return NextResponse.json({ error: "failed" }, { status: 500 });
    }
}
