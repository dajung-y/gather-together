import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Check, Todo } from "@/types/todo";
import { ObjectId } from "mongodb";


export async function GET(
  req: Request,
  { params }: { params: { studyId: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const { studyId } = await params;
    const todos = await db.collection("todos").find({ studyId }).toArray();

    console.log("가져온 투두", todos);

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
    const { studyId, date, task } = body;

    const client = await clientPromise;
    const db = client.db();

    const study = await db.collection("studies").findOne({ _id: new ObjectId(studyId) });
    if (!study) return NextResponse.json({ error: "스터디 없음" }, { status: 404 });

    const checks = study.members.map((m: any) => ({
      userId: m.userId,
      userNickname: m.nickname,
      checked: false
    }));

    const todoData = {
      studyId,
      date,
      task,
      checks,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("todos").insertOne(todoData);

    const newTodo: Todo = {
      ...todoData,
      _id: result.insertedId.toString(),
    };

    return NextResponse.json(
      { success: true, task: newTodo },
      { status: 201, }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "추가 실패: ", error: error.message },
      { status: 500 }
    );
  }
}