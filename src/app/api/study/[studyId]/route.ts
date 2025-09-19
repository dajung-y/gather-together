import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Notice } from "@/types/notice";
import { Member } from "@/types/study";

export async function GET(
  req: Request,
  { params }: { params: { studyId: string } }
) {
  // 콘솔로 캐싱처리 되는지 확인

  try {
    const client = await clientPromise;
    const db = client.db();

    const { studyId } = await params;
    const study = await db.collection("studies").findOne({
      _id: new ObjectId(studyId),
    });

    if (!study) {
      return NextResponse.json({ error: "스터디 없음" }, { status: 404 });
    }

    return NextResponse.json({
      ...study,
      _id: study._id.toString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { studyId: string } }
) {
  try {
    // const notice: Partial<Notice> = await req.json();

    const { action, payload } = await req.json();
    const client = await clientPromise;
    const db = client.db();

    // await db.collection("studies").updateOne(
    //   { _id: new ObjectId(params.studyId) },
    //   { $set: { mainNotice: { ...notice, updatedAt: new Date() } } }
    // );

    if (action === "updateNotice") {
      await db.collection("studies").updateOne(
        { _id: new ObjectId(params.studyId) },
        { $set: { mainNotice: { ...payload.content, updatedAt: new Date() } } }
      );
    }

    if (action === "removeMember") {
      await db.collection<{ members: Member[] }>("studies").updateOne(
        { _id: new ObjectId(params.studyId) },
        { $pull: { members: { userId: payload.userId } } }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { studyId: string } }
) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("studies").updateOne(
      { _id: new ObjectId(params.studyId) },
      { $set: { ...data, updatedAt: new Date(), } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "해당 스터디 없음 " }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      studyId: params.studyId
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

