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
      isRecruiting: true,
      currentMembers: 1,
      members: [{
        userId: session.user.id,
        nickname: session.user.nickname,
        role: 'leader',
        joinedAt: new Date(),
      }],
      applicants: [],
      createdAt: new Date(),
      // updatedAt: new Date()
    }

    const result = await db.collection('studies').insertOne(studyData)

    return NextResponse.json({
      success: true,
      studyId: result.insertedId.toString()
    });

  } catch(error) {
    console.error('스터디 생성 오류:', error);
    return NextResponse.json(
      {error: '스터디 생성중 오류 발생'},
      {status: 500}
    )
  }
}

export async function GET(request: NextRequest) {
  try{
    const client = await clientPromise;
    const db = client.db();

    // url
    const url = new URL(request.url);
    // 필터용 params
    const page = parseInt(url.searchParams.get("page") || "1");    // 현재 페이지
    const limit = parseInt(url.searchParams.get("limit") || "16"); // 페이지당 데이터 수
    const isRecruiting = url.searchParams.get("isRecruiting");     // 모집중
    const creatorId = url.searchParams.get("creatorId");
    const search = url.searchParams.get("search");
    const category = url.searchParams.get("category");

    // MongoDB query 객체

    const query: any = {};

    // 모집중 여부
    if(isRecruiting !== null) {
      query.isRecruiting = isRecruiting === "true"
    }

    // 작성자
    if(creatorId){
      query["creator.userId"] = creatorId;
    }

    // 카테고리
    if(category){
      query.category = category;
    }

    // 검색
    if(search){
      query.title = { $regex: search, $options: "i"};
    }
    
    // 데이터 수 계산
    const total = await db.collection("studies").countDocuments(query);
    
    // 페이지네이션 적용된 데이터 가져오기
    const studies = await db.collection('studies')
      .find(query)
      .skip((page-1)*limit)
      .limit(limit)
      .sort({createdAt: -1})
      .toArray();

    const formattedStudies = studies.map((s) => ({
      ...s,
      _id: s._id.toString()
    }));

    
    return NextResponse.json({
      data: formattedStudies,
      page,
      limit,
      total,
      totalPage: Math.ceil(total/limit)
    });
  } catch(error) {
    console.error("스터디 목록 조회 오류: ",error);
    return NextResponse.json(
      {error: "스터디 목록 조회 중 오류 발생 "},
      {status: 500}
    );
  }
}