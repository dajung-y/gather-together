import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function DELETE(req: Request, { params }: { params: { todoId: string } }) {
  try {
    const { todoId } = await params;
    const client = await clientPromise;
    const db = client.db();

    console.log(todoId);
    const todo = await db.collection("todos").findOne({ _id: new ObjectId(todoId) });
    if (!todo) {
      return NextResponse.json({ error: "해당 투두 없음" }, { status: 404 });
    }

    await db.collection("todos").deleteOne({ _id: new ObjectId(todoId) });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}