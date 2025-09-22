import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function PATCH(
  req: Request,
  { params }: { params: { studyId: string } }
) {
  try {
    const { studyId } = await params;
    const { startTime, endTime, weekdays } = await req.json();

    if (!startTime || !endTime || !Array.isArray(weekdays)) {
      return NextResponse.json(
        { error: "startTime, endTime, weekDays가 필요합니다." },
        { status: 400 }
      );
    }
    const client = await clientPromise;
    const db = client.db();

    await db.collection("studies").updateOne(
      { _id: new ObjectId(studyId) },
      {
        $set: {
          startTime,
          endTime,
          weekdays,
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
