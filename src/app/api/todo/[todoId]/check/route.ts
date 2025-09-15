import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PATCH(req: Request, { params }: { params: { todoId: string } }) {
  try {
    const session = await getServerSession(authOptions);
    console.log("세션" + session);
    if (!session?.user?.id) {
      console.log("유저 아이디필요");

      return NextResponse.json({ error: "로그인 필요" }, { status: 401 });
    } else {
      console.log("유저 아이디" + session.user.id);
    }

    const { checked } = await req.json();
    if (typeof checked !== "boolean") return NextResponse.json({ error: "checked 필요" }, { status: 400 });

    const db = (await clientPromise).db();
    const result = await db.collection("todos").updateOne(
      { _id: new ObjectId(params.todoId) },
      { $set: { "checks.$[c].checked": checked, updatedAt: new Date() } },
      { arrayFilters: [{ "c.userId": session.user.id }] }
    );

    return NextResponse.json({ success: result.modifiedCount > 0 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}