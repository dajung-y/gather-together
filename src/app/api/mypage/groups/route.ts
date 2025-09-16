// 내가 만든 스터디


export const runtime = "nodejs";

import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);

        const page = Number.parseInt(url.searchParams.get("page") ?? "1", 10);
        const limit = Number.parseInt(url.searchParams.get("limit") ?? "16", 10);
        const isRecruitingParam = url.searchParams.get("isRecruiting");
        const creatorId = url.searchParams.get("creatorId");

        const query: any = {};
        if (isRecruitingParam !== null) {
            query.isRecruiting = isRecruitingParam === "true";
        }
        if (creatorId) {
            query["creator.userId"] = creatorId;
        }

        // DB 연결
        const client = await clientPromise;
        const db = client.db();

        // 총 개수
        const total = await db.collection("studies").countDocuments(query);

        // 목록 조회
        const studies = await db
            .collection("studies")
            .find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .toArray();

        const data = studies.map((s: any) => ({ ...s, _id: String(s._id) }));

        return NextResponse.json({
            data,
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        });
    } catch (err: any) {
        console.error("[GET /api/study] error:", err);
        return NextResponse.json(
            {
                error: "스터디 목록 조회 중 오류 발생",
                detail: String(err?.message ?? err),
            },
            { status: 500 }
        );
    }
}
