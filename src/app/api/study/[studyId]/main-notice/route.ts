import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { revalidateTag } from "next/cache";

export async function PATCH(
  req: Request,
  { params }: { params: { studyId: string } }
) {
  try {
    const { studyId } = await params;
    const { content } = await req.json();

    console.log(content);
    if (!content) {
      return NextResponse.json(
        { error: "content가 필요합니다." },
        { status: 400 }
      );
    }
    const client = await clientPromise;
    const db = client.db();

    await db.collection("mainNotice").updateOne(
      { studyId },
      { $set: { content } },
      { upsert: true } //문서가 없으면 새로 생성. insertOne
    );

    revalidateTag('study-tag');

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
