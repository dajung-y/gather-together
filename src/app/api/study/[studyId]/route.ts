import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Member } from "@/types/study";
import { revalidateTag } from "next/cache";

export async function GET(
  req: Request,
  { params }: { params: { studyId: string } }
) {
  // 콘솔로 캐싱처리 되는지 확인

  try {
    const client = await clientPromise;
    const db = client.db();

    const { studyId } = await params;
    const study = await db.collection("studies").findOne({
      _id: new ObjectId(studyId),
    });

    if (!study) {
      return NextResponse.json({ error: "스터디 없음" }, { status: 404 });
    }

    return NextResponse.json({
      ...study,
      _id: study._id.toString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { studyId: string } }
) {
  try {

    const { studyId } = await params;
    const { action, payload } = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const userId = payload.userId;
    if (action === "removeMember") {
      await db.collection<{ members: Member[] }>("studies").updateOne(
        { _id: new ObjectId(studyId) },
        { $pull: { members: { userId } } }

      );

      //지원상황 삭제
      await db.collection("applications").deleteOne({
        studyId: new ObjectId(studyId),
        userId,
      });

      const study = await db
        .collection<{ members: Member[] }>("studies")
        .findOne({ _id: new ObjectId(studyId) });

      //스터디 멤버수 갱신
      if (study) {
        await db.collection("studies").updateOne(
          { _id: new ObjectId(studyId) },
          { $set: { currentMembers: study.members.length } }
        );
      }

      // 멤버가 0이면 스터디 삭제 아니면 방장 넘기기
      if (study && study.members.length === 0) {
        await db.collection("studies").deleteOne({ _id: new ObjectId(studyId) });
      } else if (study) {
        const hasLeader = study.members.some((m) => m.role === "leader");
        if (!hasLeader) {
          await db.collection("studies").updateOne(
            { _id: new ObjectId(studyId), "members.userId": study.members[0].userId },
            { $set: { "members.$.role": "leader" } }
          );
        }
      }
    }

    revalidateTag('study-tag');

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { studyId: string } }
) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("studies").updateOne(
      { _id: new ObjectId(params.studyId) },
      { $set: { ...data, updatedAt: new Date(), } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "해당 스터디 없음 " }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      studyId: params.studyId
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

