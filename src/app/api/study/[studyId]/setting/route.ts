import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { revalidateTag } from "next/cache";

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

    revalidateTag("study-tag");

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
