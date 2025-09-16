import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Notice } from "@/types/notice";

export async function GET(
  req: Request,
  { params }: { params: { studyId: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const study = await db.collection("studies").findOne({
      _id: new ObjectId(params.studyId),
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
    const notice: Partial<Notice> = await req.json();
    const client = await clientPromise;
    const db = client.db();

    await db.collection("studies").updateOne(
      { _id: new ObjectId(params.studyId) },
      { $set: { mainNotice: { ...notice, updatedAt: new Date() } } }
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}