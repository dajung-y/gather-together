// api/study/join/route.ts
// 스터디 참여신청 api

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Study, StudyData } from "@/types/study";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function POST(req: NextRequest) {
  try{
    const session = await getServerSession(authOptions);
    
    if(!session?.user.id){
      return NextResponse.json(
        { message: "로그인이 필요합니다" },
        { status: 401 }
      )
    }
    const body = await req.json();
    const { studyId, introduction } = body;

    if(!studyId || !introduction){
      return NextResponse.json(
        { message: "소개는 50자 이하로 작성해주세요" },
        { status: 400 }
      )
    }

    const client = await clientPromise;
    const db = client.db();
    const studyObjectId = new ObjectId(studyId);

    // 스터디 조회
    const study = await db.collection<StudyData>("studies").findOne({ _id: studyObjectId });
    if(!study) {
      return NextResponse.json( { message: "스터디를 찾을 수 없습니다." }, { status: 404 });
    }

    // user 확인
    const userId = session.user.id;

    // 멤버인지 확인
    const isMember = study.members?.some(m => m.userId === userId);
    if(isMember) {
      return NextResponse.json( { message: "이미 스터디 멤버입니다" }, { status: 400 });
    }

    // applicant 객체
    const applicant: NonNullable<Study["applicants"]>[number] = {
      userId: session.user.id,
      nickname: session.user.nickname || "",
      introduction,
      status: "pending",
      createdAt: new Date(),
    };

    // DB 업데이트
    await db.collection<Study>("studies").updateOne(
      { _id: studyObjectId },
      { $push: {applicants: applicant}}
    );

    return NextResponse.json(
      { message: "스터디 신청 완료" }
    )
  } catch(error) {
    console.error("스터디 신청 실패: ",error);
    return NextResponse.json(
      { message: "서버 오류" },
      { status: 500 }
    )
  }
}