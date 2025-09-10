import clientPromise from "@/lib/mongodb";
import { Notice } from "@/types/notice";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { groupId, title, content } = body;

    const client = await clientPromise;
    const db = client.db();

    const newNotice: Notice = {
      groupId,
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("notices").insertOne(newNotice);

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