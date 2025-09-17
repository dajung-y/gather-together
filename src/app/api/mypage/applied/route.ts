export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

type Me = { id?: string | null; email?: string | null };

async function resolveMyId(reqUrl: string): Promise<{ myId: string; isDev: boolean }> {
    const url = new URL(reqUrl);
    const isDev = process.env.NODE_ENV !== "production" && process.env.DEV_BYPASS_AUTH === "1";

    let sessId = "";
    try {
        const s = await getServerSession(authOptions);
        sessId = ((s?.user as any)?.id || (s?.user as any)?.email || "").trim();
    } catch {}

    if (!sessId && isDev) {
        const override = (url.searchParams.get("userId") ?? "").trim();
        const fixed = (process.env.DEV_USER_ID ?? "").trim();
        const myId = override || fixed;
        return { myId, isDev };
    }

    return { myId: sessId, isDev };
}

export async function GET(req: NextRequest) {
    try {
        const { myId, isDev } = await resolveMyId(req.url);
        if (!myId) {
            return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
        }

        const url = new URL(req.url);
        const status = url.searchParams.get("status"); // approved | pending | rejected | null
        const includeMine = url.searchParams.get("includeMine") === "true";
        const page = parseInt(url.searchParams.get("page") ?? "1", 10);
        const limit = parseInt(url.searchParams.get("limit") ?? "16", 10);

        const client = await clientPromise;
        const db = client.db();
        const col = db.collection("studies");

        const notMine = includeMine ? {} : { "creator.userId": { $ne: myId } };

        let filter: any;
        switch (status) {
            case "approved": {
                filter = { $and: [notMine, { members: { $elemMatch: { userId: myId } } }] };
                break;
            }
            case "pending": {
                filter = {
                    $and: [
                        notMine,
                        {
                            applicants: {
                                $elemMatch: {
                                    userId: myId,
                                    $or: [{ status: { $exists: false } }, { status: /^pending$/i }],
                                },
                            },
                        },
                    ],
                };
                break;
            }
            case "rejected": {
                filter = {
                    $and: [
                        notMine,
                        {
                            applicants: {
                                $elemMatch: {
                                    userId: myId,
                                    status: /^rejected$/i,
                                },
                            },
                        },
                    ],
                };
                break;
            }
            default: {
                filter = {
                    $and: [
                        notMine,
                        {
                            $or: [
                                { members: { $elemMatch: { userId: myId } } },
                                { applicants: { $elemMatch: { userId: myId } } },
                            ],
                        },
                    ],
                };
            }
        }

        const total = await col.countDocuments(filter);
        const docs = await col
            .find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        const items = docs.map((s: any) => {
            const isMember = (s?.members ?? []).some((m: any) => m?.userId === myId);
            const app = (s?.applicants ?? []).find((a: any) => a?.userId === myId);
            const appStatus = String(app?.status ?? "PENDING").toUpperCase();

            const derived = isMember ? "APPROVED" : appStatus === "REJECTED" ? "REJECTED" : "PENDING";

            return {
                studyId: String(s._id),
                title: s.title,
                studyName: s.studyName,
                status: derived as "APPROVED" | "PENDING" | "REJECTED",
                isRecruiting: !!s.isRecruiting,
                capacity: s.capacity,
                currentMembers:
                    typeof s.currentMembers === "number" ? s.currentMembers : (s.members?.length ?? 0),
                createdAt: s.createdAt,
                period: { startDate: s.startDate, endDate: s.endDate },
                schedule: { weekdays: s.weekdays ?? [], startTime: s.startTime, endTime: s.endTime },
                category: s.category,
            };
        });

        return NextResponse.json({
            items,
            page,
            limit,
            total,
            totalPage: Math.ceil(total / Math.max(limit, 1)),
            debug: isDev ? { myId } : undefined,
        });
    } catch (e: any) {
        console.error("[/api/mypage/applied] fatal:", e);
        return NextResponse.json(
            { error: "internal error", detail: String(e?.message ?? e) },
            { status: 500 }
        );
    }
}
