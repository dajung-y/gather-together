import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Check, Todo } from "@/types/todo";


export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const url = new URL(req.url);
    const groupId = url.searchParams.get("groupId");

    if (!groupId) {
      return NextResponse.json({ success: false, error: "groupId 필요" }, { status: 400 });
    }

    const todos = await db.collection("tasks").find({ groupId }).toArray();

    console.log("가져온 투두" + todos);

    return NextResponse.json(
      { success: true, data: todos },
      { status: 200, }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "불러오기 실패: ", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { groupId, date, task, userIds } = body;

    const client = await clientPromise;
    const db = client.db();

    const checks: Check[] = userIds.map((id: string) => ({ userId: id, checked: false }))

    const newTodo: Todo = {
      groupId,
      date,
      task,
      checks,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("todos").insertOne(newTodo);

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