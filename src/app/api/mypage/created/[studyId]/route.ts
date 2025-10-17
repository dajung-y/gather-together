import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { revalidateTag } from "next/cache";

export async function PATCH(
  req: Request,
  { params }: { params: { studyId: string } }
) {
  try {
    const { studyId } = params;
    const body = await req.json();
    const { isRecruiting } = body;

    const client = await clientPromise;
    const db = client.db();

    await db.collection("studies").updateOne(
      { _id: new ObjectId(studyId) },
      { $set: { isRecruiting } }
    );

    revalidateTag("study-tag");

    return NextResponse.json({ success: true, isRecruiting });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
