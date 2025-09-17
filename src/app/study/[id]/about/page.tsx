// app/study/[id]/about/page.tsx
// 스터디 상세페이지

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackButton from "@/components/study/about/BackButton";
import DropdownMenu from "@/components/study/about/DropdownMenu";
import JoinButton from "@/components/study/about/JoinButton";
import clientPromise from "@/lib/mongodb";
import { getCategoryLabel } from "@/utils/category";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

interface PageProps{
  params: {id: string}
}

interface Study {
  _id: ObjectId;
  studyName: string;
  category: string;
  capacity: number;
  startDate: string;
  endDate: string;
  weekdays: string[];
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  creator: {
    userId: string;
    nickname: string;
  };
  applicants?: {
    userId: string;
    nickname: string;
    introduction: string;
    status: string
  }[];
  createdAt: string;
  updatedAt: string;
}


export default async function Page({params}: PageProps) {

  const session = await getServerSession(authOptions);

  console.log("params: ",params);
  const studyId = params.id;

  // mongoDB 연결
  const client = await clientPromise;
  const db = client.db();

  // study 문서 가져오기
  const studyDoc = await db.collection<Study>('studies').findOne({
    _id: new ObjectId(studyId)  // 문자열 -> Object로 변환
  })

  const creatorId = studyDoc?.creator.userId;
  const isCreator = session?.user.id === creatorId;

  if(!studyDoc){
    return (
      <div>
        <h1 className="m-8 headline1 text-primary-500">
          스터디를 찾을 수 없습니다
        </h1>
      </div>
    )
  }

  // study data 객체
  const studyData: Study = studyDoc;

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  const getWeekdayText = (weekday: string[]) => {
    const dayMap: {[key:string]: string} = {
      'mon' : '월', 'tue': '화', 'wed' : '수', 'thu': '목',
      'fri' : '금', 'sat': '토', 'sun' : '일'
    }
    return weekday.map((day) => dayMap[day]).join(', ');
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 max-w-5xl mx-auto w-full p-4">
        <div className="flex items-center mt-2 mb-4 w-full h-auto">
          <BackButton />
        </div>
        {/* 메인 제목 섹션 */}
        <section className="pb-6 mb-8 border-b border-gray-200">
          <h1 className="headline3 mb-4">
            <span className="headline4 mr-3 px-3 py-1 bg-primary-500 text-white rounded">
              {studyData.studyName}
            </span>
            {studyData.title}
          </h1>
          
          {/* 작성자 정보 */}
          <div className="flex items-center justify-between text-gray-500">
            <div className="space-x-2">
              <span className="body-sb text-gray-700">{studyData.creator.nickname}</span>
              <span>|</span>
              { studyData.updatedAt ? (
                <span>{formatDateTime(studyData.updatedAt)} (수정됨)</span>
              ) : (
                <span>{formatDateTime(studyData.createdAt)}</span>
              )}
            </div>
            <div>
              { isCreator && <DropdownMenu params={studyData._id.toString()} />}
            </div>
          </div>
        </section>

        {/* 스터디 운영정보 섹션 */}
        <section className="mb-12">
          <h2 className="headline3 text-gray-800 mb-6">운영 정보</h2>
          <div className="bg-primary-50 rounded-2xl p-6">
            <div className="space-y-4">
              <div className="flex">
                <span className="min-w-[80px] headline5 text-gray-600">카테고리</span>
                <span className="body text-gray-900">{getCategoryLabel(studyData.category)}</span>
              </div>
              
              <div className="flex">
                <span className="min-w-[80px] headline5 text-gray-600">모집인원</span>
                <span className="body text-gray-900">{studyData.capacity}명</span>
              </div>
              
              <div className="flex">
                <span className="min-w-[80px] headline5 text-gray-600">진행기간</span>
                <span className="body text-gray-900">{studyData.startDate} ~ {studyData.endDate}</span>
              </div>
              
              <div className="flex">
                <span className="min-w-[80px] headline5 text-gray-600">진행요일</span>
                <span className="body text-gray-900">{getWeekdayText(studyData.weekdays)}</span>
              </div>
              
              <div className="flex">
                <span className="min-w-[80px] headline5 text-gray-600">진행시간</span>
                <span className="body text-gray-900">{studyData.startTime} ~ {studyData.endTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 스터디 소개 섹션 */}
        <section className="mb-12">
          <h2 className="headline3 text-primary-700 mb-6">스터디 소개</h2>
          <div className="bg-white border-t border-gray-200 p-6">
            <p className="body text-gray-800 leading-relaxed whitespace-pre-line">
              {studyData.description}
            </p>
          </div>
        </section>
      </div>

      {/* 하단 버튼 영역 */}
      <section className="mb-8 bg-white">
        <div className="max-w-5xl mx-auto p-6">
          <div className="flex justify-center">
            <JoinButton
              creatorId={studyData.creator.userId}
              studyId={studyData._id.toString()}
              applicants={studyData.applicants || []} />
          </div>
        </div>
      </section>
    </div>
  )
}