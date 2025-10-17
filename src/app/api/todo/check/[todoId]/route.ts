import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getUserIdFromSession } from "@/lib/session";
import { revalidateTag } from "next/cache";

export async function PATCH(req: Request, { params }: { params: { todoId: string } }) {
  try {

    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "로그인 필요" }, { status: 401 });
    }
    const { todoId } = await params;
    const { checked } = await req.json();
    // console.log("유저 아이디: " + session.user.id);

    console.log("투두 체크: " + checked);
    if (typeof checked !== "boolean") {
      return NextResponse.json({ error: "checked 필요" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const todo = await db.collection("todos").findOne({ _id: new ObjectId(todoId) });
    if (!todo) {
      return NextResponse.json({ error: "투두 없음" }, { status: 404 });
    }

    let newMemberChecks: string[];
    if (checked) {
      // 체크 추가 (중복 방지)
      newMemberChecks = todo.memberChecks.includes(userId)
        ? todo.memberChecks
        : [...todo.memberChecks, userId];
    } else {
      // 체크 제거
      newMemberChecks = todo.memberChecks.filter((id: string) => id !== userId);
    }

    await db.collection("todos").updateOne(
      { _id: new ObjectId(todoId) },
      { $set: { memberChecks: newMemberChecks } }
    );

    revalidateTag('todo-tag');

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}