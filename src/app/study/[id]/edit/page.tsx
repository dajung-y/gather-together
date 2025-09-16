// app/study/[id]/edit/page.tsx
// 글 수정 페이지

import StudyForm from "@/components/study/create/StudyForm";
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb";

interface PageProps {
  params: {id: string}
}

export default async function Page({params} : PageProps) {

  const studyId = params.id;
  const client = await clientPromise;
  const db = client.db();

  const study = await db.collection("studies").findOne({
    _id: new ObjectId(studyId)
  });

  if(!study){
    return(
      <div className="w-full min-h-screen flex justify-center pt-20">
        <h3 className="headline3 text-primary-500">스터디를 찾을 수 없습니다.</h3>
      </div>
    )
  }

  return (
    <main className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-5xl mb-12 p-4 space-y-12">
        {/* 스터디 헤더 */}
        <div className="
          w-full flex flex-col space-y-3 items-center
          mt-4 mb-8 
          lg:my-8 
        ">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary-700 text-center">
            스터디 수정
          </h1>
          <p className="body text-gray-500 text-center">
            함께 학습할 스터디를 수정하세요
          </p>
        </div>
        {/* 수정 폼 */}
        <StudyForm defaultValues={{
          category: study.category,
          capacity: study.capacity,
          startDate: study.startDate,
          endDate: study.endDate,
          startTime: study.startTime,
          endTime: study.endTime,
          weekdays: study.weekdays,
          studyName: study.studyName,
          title: study.title,
          description: study.description
        }} />
      </div>
    </main>
  )
}
