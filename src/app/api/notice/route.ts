import clientPromise from "@/lib/mongodb";
import { Notice } from "@/types/notice";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studyId, title, content } = body;

    const client = await clientPromise;
    const db = client.db();

    const noticeData = {
      studyId,
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("notices").insertOne(noticeData);

    return NextResponse.json(
      { success: true, taskId: result.insertedId },
      { status: 201, }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "추가 실패: ", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const studyId = new URL(req.url).searchParams.get("studyId");
  if (!studyId) return NextResponse.json({ error: "studyId 필요" }, { status: 400 });

  const db = (await clientPromise).db();
  const notices = await db
    .collection("notices")
    .find({ studyId })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({ success: true, data: notices.map(n => ({ ...n, _id: n._id.toString() })) });
}

export async function DELETE(req: Request) {
  const { id } = (await req.json()) as { id: string };
  if (!id) return NextResponse.json({ error: "id 필요" }, { status: 400 });

  const db = (await clientPromise).db();
  const result = await db.collection("notices").deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ success: result.deletedCount === 1 });
}


export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { noticeId, title, content } = body;

    const client = await clientPromise;
    const db = client.db();

    await db.collection("notices").updateOne(
      { _id: new ObjectId(noticeId) },
      {
        $set: {
          title: title,
          content: content
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { message: "수정 실패", error: error.message },
      { status: 500 }
    );
  }
}