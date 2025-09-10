import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(request: NextRequest) {

  try{
    const session = await getServerSession(authOptions);
    console.log('세션 확인: ',session?.user?.email)

    if(!session?.user?.id){
      return NextResponse.json(
        {error: '로그인이 필요합니다'},
        {status: 401}
      )
    }
    const formData = await request.json();
    const client = await clientPromise;
    const db = client.db();

    // 스터디 데이터 구성
    const studyData = {
      // 폼 데이터
      category: formData.category,
      capacity: parseInt(formData.capacity),
      startDate: formData.startDate,
      endDate: formData.endDate,
      weekdays: formData.weekdays,
      startTime: formData.startTime,
      endTime: formData.endTime,
      studyName: formData.studyName,
      title: formData.title,
      description: formData.description,
      // 사용자 정보
      creator: {
        userId: session.user.id,
        nickname: session.user.nickname,
        email: session.user.email
      },
      // 기본 정보
      recruitStatus: 'open',
      currentMembers: 1,
      members: [{
        userId: session.user.id,
        nickname: session.user.nickname,
        role: 'leader',
        joinedAt: new Date(),
        joinStatus: 'approved'
      }],
      applicants: [],
      
      creaetedAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection('studies').insertOne(studyData)

    return NextResponse.json({
      success: true,
      studyId: result.insertedId.toString()
    });
    
  } catch(error) {
    console.error('스터디 생성 오류:', error);
    return NextResponse.json(
      {err: '스터디 생성중 오류 발생: ', error},
      {status: 500}
    )
  }
}
