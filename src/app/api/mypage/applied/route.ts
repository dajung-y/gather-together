export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";

const normalizeStatus = (s?: string) => {
    const up = (s ?? "").toUpperCase();
    return (["PENDING", "APPROVED", "REJECTED"] as const).includes(up as any)
        ? (up as "PENDING" | "APPROVED" | "REJECTED")
        : "PENDING";
};

const isHex24 = (v: string) => /^[0-9a-fA-F]{24}$/.test(v);
const toObjectIdMaybe = (v?: any) => {
    const s = String(v ?? "");
    return isHex24(s) ? new ObjectId(s) : null;
};

async function getUserId(req: NextRequest): Promise<string | null> {
    try {
        const { getServerSession } = await import("next-auth");
        let authOptions: any = undefined;
        try {
            const mod = await import("@/app/api/auth/[...nextauth]/route");
            authOptions = (mod as any).authOptions;
        } catch { }
        if (!authOptions) {
            try {
                const mod = await import("@/app/api/auth/[...nextauth]/route");
                authOptions = (mod as any).authOptions;
            } catch { }
        }
        const session = authOptions ? await getServerSession(authOptions) : await getServerSession();
        const id = (session?.user as any)?.id ?? (session?.user as any)?.userId ?? null;
        if (id) return String(id);
    } catch { }
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        const id = (token as any)?.id ?? (token as any)?.userId ?? (token as any)?.sub;
        if (id) return String(id);
    } catch { }
    const url = new URL(req.url);
    const q = url.searchParams.get("userId");
    if (q) return String(q);
    const h = req.headers.get("x-user-id");
    if (h) return String(h);
    return null;
}

function mapToStudyItem(
    source: "app" | "study",
    data: any,
    statusUpper: "APPROVED" | "PENDING" | "REJECTED",
    studyDoc?: any
) {
    const studyIdStr =
        source === "app"
            ? String(data?.studyId?._id ?? data?.studyId ?? data?.study ?? "")
            : String(data?._id ?? "");

    const sdoc = source === "app" ? studyDoc : data;
    const app = source === "app" ? data : undefined;



    const studyName =
        app?.studyName ?? app?.studyTitle ?? app?.title ?? sdoc?.studyName ?? sdoc?.name ?? "";

    const title = app?.studyTitle ?? app?.title ?? sdoc?.title ?? "";
    const category = app?.category ?? sdoc?.category ?? "";

    const startDate =
        app?.startDate ?? app?.period?.startDate ?? sdoc?.startDate ?? sdoc?.period?.startDate ?? "";
    const endDate =
        app?.endDate ?? app?.period?.endDate ?? sdoc?.endDate ?? sdoc?.period?.endDate ?? "";

    const startTime =
        app?.startTime ?? app?.schedule?.startTime ?? sdoc?.startTime ?? sdoc?.schedule?.startTime ?? "";
    const endTime =
        app?.endTime ?? app?.schedule?.endTime ?? sdoc?.endTime ?? sdoc?.schedule?.endTime ?? "";
    const weekdays =
        app?.weekdays ?? app?.schedule?.weekdays ?? sdoc?.weekdays ?? sdoc?.schedule?.weekdays ?? [];

    const capacity = Number(app?.capacity ?? sdoc?.capacity ?? 0);
    const currentMembers = Number(
        app?.currentMembers ?? sdoc?.currentMembers ?? (sdoc?.members?.length ?? 0)
    );
    const isRecruiting = Boolean(app?.isRecruiting ?? sdoc?.isRecruiting ?? false);

    const createdAtISO = new Date(
        app?.decidedAt ?? app?.appliedAt ?? app?.createdAt ?? sdoc?.createdAt ?? sdoc?.updatedAt ?? Date.now()
    ).toISOString();

    return {
        studyId: studyIdStr,
        studyName,
        title,
        status: statusUpper,
        isRecruiting,
        capacity,
        currentMembers,
        createdAt: createdAtISO,
        period: { startDate, endDate },
        schedule: { weekdays, startTime, endTime },
        category,
    };
}

function buildPendingApplicantElemMatch(meId: string) {
    const meOid = toObjectIdMaybe(meId);
    const whoOr: any[] = [
        { userId: String(meId) },
        { id: String(meId) },
    ];
    if (meOid) {
        whoOr.push({ userId: meOid });
        whoOr.push({ _id: meOid });
    }
    const statusOr = [{ status: "pending" }, { status: "PENDING" }, { status: { $exists: false } }];

    return { $and: [{ $or: whoOr }, { $or: statusOr }] };
}

export async function GET(req: NextRequest) {
    try {
        const meId = await getUserId(req);
        if (!meId) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

        const url = new URL(req.url);
        const statusUpper = normalizeStatus(url.searchParams.get("status")); // "PENDING" | "APPROVED" | "REJECTED"

        const client = await clientPromise;
        const db = client.db();
        const appsCol = db.collection("applications");
        const studiesCol = db.collection("studies");

        if (statusUpper === "APPROVED") {
            const appDocs = await appsCol
                .find({ userId: String(meId), status: { $in: ["APPROVED", "approved"] } })
                .sort({ decidedAt: -1, appliedAt: -1, createdAt: -1 })
                .limit(300)
                .toArray();

            const appStudyIds: ObjectId[] = [];
            for (const app of appDocs) {
                const raw = String(app?.studyId?._id ?? app?.studyId ?? app?.study ?? "");
                const oid = toObjectIdMaybe(raw);
                if (oid) appStudyIds.push(oid);
            }

            const meOid = toObjectIdMaybe(meId);
            const excludeMine = {
                $nor: [
                    { "creator.userId": String(meId) },
                    { creatorId: String(meId) },
                    ...(meOid ? [{ "creator.userId": meOid }, { creatorId: meOid }] : []),
                    ...(meOid ? [{ "creator._id": meOid }, { creator: meOid }] : []),
                ].filter(Boolean),
            };
            const membershipOr: any[] = [{ "members.userId": String(meId) }, { members: String(meId) }];
            if (meOid) {
                membershipOr.push({ "members.userId": meOid }, { members: meOid }, { members: { $elemMatch: { _id: meOid } } });
            }
            const memberQuery = { $and: [{ $or: membershipOr }, excludeMine] };

            const memberStudyDocs = await studiesCol
                .find(memberQuery)
                .project({
                    studyName: 1,
                    name: 1,
                    title: 1,
                    category: 1,
                    startDate: 1,
                    endDate: 1,
                    period: 1,
                    startTime: 1,
                    endTime: 1,
                    weekdays: 1,
                    schedule: 1,
                    capacity: 1,
                    currentMembers: 1,
                    members: 1,
                    isRecruiting: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    creator: 1,
                    creatorId: 1,
                })
                .sort({ updatedAt: -1, createdAt: -1 })
                .limit(500)
                .toArray();

            const byAppStudyDocs =
                appStudyIds.length > 0
                    ? await studiesCol
                        .find({ _id: { $in: appStudyIds } })
                        .project({
                            studyName: 1,
                            name: 1,
                            title: 1,
                            category: 1,
                            startDate: 1,
                            endDate: 1,
                            period: 1,
                            startTime: 1,
                            endTime: 1,
                            weekdays: 1,
                            schedule: 1,
                            capacity: 1,
                            currentMembers: 1,
                            members: 1,
                            isRecruiting: 1,
                            createdAt: 1,
                            updatedAt: 1,
                            creator: 1,
                            creatorId: 1,
                        })
                        .toArray()
                    : [];

            const studyMap = new Map<string, any>();
            for (const s of [...memberStudyDocs, ...byAppStudyDocs]) studyMap.set(String(s._id), s);

            const combined = new Map<string, any>();
            for (const app of appDocs) {
                const sid = String(app?.studyId?._id ?? app?.studyId ?? app?.study ?? "");
                const sdoc = isHex24(sid) ? studyMap.get(String(new ObjectId(sid))) ?? studyMap.get(sid) : studyMap.get(sid);
                combined.set(sid, mapToStudyItem("app", app, "APPROVED", sdoc));
            }
            for (const s of memberStudyDocs) {
                const sid = String(s._id);
                if (!combined.has(sid)) combined.set(sid, mapToStudyItem("study", s, "APPROVED"));
            }

            const items = Array.from(combined.values()).sort(
                (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
            );
            return NextResponse.json({ items }, { status: 200 });
        }

        if (statusUpper === "PENDING") {
            const appDocs = await appsCol
                .find({ userId: String(meId), status: { $in: ["PENDING", "pending"] } })
                .sort({ appliedAt: -1, createdAt: -1, decidedAt: -1 })
                .limit(300)
                .toArray();

            const pendingElem = buildPendingApplicantElemMatch(meId);
            const pendingStudyDocs = await studiesCol
                .find({ applicants: { $elemMatch: pendingElem } })
                .project({
                    studyName: 1,
                    name: 1,
                    title: 1,
                    category: 1,
                    startDate: 1,
                    endDate: 1,
                    period: 1,
                    startTime: 1,
                    endTime: 1,
                    weekdays: 1,
                    schedule: 1,
                    capacity: 1,
                    currentMembers: 1,
                    members: 1,
                    isRecruiting: 1,
                    applicants: 1,
                    createdAt: 1,
                    updatedAt: 1,
                })
                .limit(500)
                .toArray();

            const needIds: ObjectId[] = [];
            for (const app of appDocs) {
                const raw = String(app?.studyId?._id ?? app?.studyId ?? app?.study ?? "");
                const oid = toObjectIdMaybe(raw);
                if (oid) needIds.push(oid);
            }
            const appStudyDocs =
                needIds.length > 0
                    ? await studiesCol
                        .find({ _id: { $in: needIds } })
                        .project({
                            studyName: 1,
                            name: 1,
                            title: 1,
                            category: 1,
                            startDate: 1,
                            endDate: 1,
                            period: 1,
                            startTime: 1,
                            endTime: 1,
                            weekdays: 1,
                            schedule: 1,
                            capacity: 1,
                            currentMembers: 1,
                            members: 1,
                            isRecruiting: 1,
                            createdAt: 1,
                            updatedAt: 1,
                        })
                        .toArray()
                    : [];
            const studyMap = new Map<string, any>();
            for (const s of [...pendingStudyDocs, ...appStudyDocs]) studyMap.set(String(s._id), s);

            const combined = new Map<string, any>();

            for (const app of appDocs) {
                const sid = String(app?.studyId?._id ?? app?.studyId ?? app?.study ?? "");
                const sdoc = isHex24(sid) ? studyMap.get(String(new ObjectId(sid))) ?? studyMap.get(sid) : studyMap.get(sid);
                combined.set(sid, mapToStudyItem("app", app, "PENDING", sdoc));
            }
            for (const s of pendingStudyDocs) {
                const sid = String(s._id);
                if (!combined.has(sid)) combined.set(sid, mapToStudyItem("study", s, "PENDING"));
            }

            const items = Array.from(combined.values()).sort(
                (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
            );
            return NextResponse.json({ items }, { status: 200 });
        }

        // 거절
        const appDocs = await appsCol
            .find({ userId: String(meId), status: { $in: ["REJECTED", "rejected"] } })
            .sort({ decidedAt: -1, appliedAt: -1, createdAt: -1 })
            .limit(300)
            .toArray();

        const pendingElem = buildPendingApplicantElemMatch(meId);
        const pendingStudies = await studiesCol
            .find({ applicants: { $elemMatch: pendingElem } })
            .project({ _id: 1 })
            .toArray();
        const stillPendingIds = new Set(pendingStudies.map((s) => String(s._id)));

        const needIds: ObjectId[] = [];
        for (const app of appDocs) {
            const raw = String(app?.studyId?._id ?? app?.studyId ?? app?.study ?? "");
            const oid = toObjectIdMaybe(raw);
            if (oid) needIds.push(oid);
        }
        const studyDocs =
            needIds.length > 0
                ? await studiesCol
                    .find({ _id: { $in: needIds } })
                    .project({
                        studyName: 1,
                        name: 1,
                        title: 1,
                        category: 1,
                        startDate: 1,
                        endDate: 1,
                        period: 1,
                        startTime: 1,
                        endTime: 1,
                        weekdays: 1,
                        schedule: 1,
                        capacity: 1,
                        currentMembers: 1,
                        members: 1,
                        isRecruiting: 1,
                        createdAt: 1,
                        updatedAt: 1,
                    })
                    .toArray()
                : [];
        const studyMap = new Map<string, any>(studyDocs.map((s) => [String(s._id), s]));

        const items = appDocs
            .filter((app) => {
                const sid = String(app?.studyId?._id ?? app?.studyId ?? app?.study ?? "");
                return !stillPendingIds.has(isHex24(sid) ? String(new ObjectId(sid)) : sid);
            })
            .map((app) => {
                const sid = String(app?.studyId?._id ?? app?.studyId ?? app?.study ?? "");
                const doc = isHex24(sid)
                    ? studyMap.get(String(new ObjectId(sid))) ?? studyMap.get(sid)
                    : studyMap.get(sid);
                return mapToStudyItem("app", app, "REJECTED", doc);
            });

        return NextResponse.json({ items }, { status: 200 });
    } catch (err: any) {
        console.error("[GET /api/mypage/applied] error:", err);
        return NextResponse.json(
            { error: "SERVER_ERROR", detail: String(err?.message ?? err) },
            { status: 500 }
        );
    }
}
