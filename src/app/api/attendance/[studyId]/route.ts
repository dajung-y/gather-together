// app/api/attendance/[studyId]/[userId]/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserIdFromSession } from "@/lib/session";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";


export async function GET(
  req: Request,
  { params }: { params: { studyId: string } }
) {
  try {

    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "로그인 필요" }, { status: 401 });
    }

    const { studyId } = await params;

    const client = await clientPromise;
    const db = client.db();

    const attendance = await db.collection("attendances").findOne({
      studyId: studyId,
      userId: userId
    });

    console.log("가져온 출석", attendance);

    return NextResponse.json(
      { success: true, data: attendance },
      { status: 200, }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "불러오기 실패: ", error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { studyId: string; } }
) {
  try {
    const userId = await getUserIdFromSession();

    const { type } = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await db.collection("attendances").findOne({
      studyId: params.studyId,
      userId: userId,
    });

    // 오늘 중복 출석 방지
    if (existing?.lastAttendance) {
      const lastDate = new Date(existing.lastAttendance);
      lastDate.setHours(0, 0, 0, 0);
      if (lastDate.getTime() === today.getTime()) {
        return NextResponse.json({ error: "오늘 이미 출석 처리됨" }, { status: 400 });
      }
    }

    let present = existing?.present || 0;
    let late = existing?.late || 0;
    let absent = existing?.absent || 0;

    if (type === "present") present += 1;
    else if (type === "late") late += 1;
    else if (type === "absent") absent += 1;

    await db.collection("attendances").updateOne(
      { studyId: params.studyId, userId: userId },
      { $set: { present, late, absent, lastAttendance: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
