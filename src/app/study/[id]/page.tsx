

import Button from "@/components/common/Button";
import StudyCard from "@/components/common/StudyCard";
import AttendanceInfo from "@/components/study/AttendanceInfo";
import NoticeInput from "@/components/study/Notice";
import { Pen, Trash } from 'lucide-react';

type StudyPageProps = {
  params: { id: string };
}

export default function page({ params }: StudyPageProps) {


  return (
    <>
      <div className="
        max-w-[1280px] mx-auto 
        px-4 py-3            
        sm:px-4 sm:py-3        
        md:px-6 md:py-3        
        lg:px-8 lg:py-4 
      ">
        {/* 상단 */}
        {/* <h1 className="headline1">{params.id}의 About 페이지</h1> */}
        <div className="flex gap-8 mt-8">
          <div className="flex flex-col justify-center gap-4">
            {/* 타이머 */}
            <div className="flex flex-col w-full items-center justify-center h-44 border border-primary-300
          rounded-lg">
              <p className="text-primary-300">2025.08.09</p>
              <p className="headline2 pb-4">19:00 - 21:30</p>
              <div>
                <Button size="lg">출석하기</Button>
              </div>
            </div>
            <div className="">
              <AttendanceInfo />
            </div>

          </div>
          {/* <hr className="text-gray-400" /> */}
          {/* 메인공지 */}
          <div className="flex-1 flex gap-8">
            <div className="flex-1 flex flex-col py-4 border rounded-lg p-4 border-primary-300">
              <div className="flex">
                <p className="headline2 text-primary-500 mb-4 ">메인 공지</p>
                <Pen size={20} className="ml-auto" />
              </div>

              <p>영어 스터디에 오신 것을 환영합니다!!</p>
              <p>교재: Grammar in use</p>
              <p>스터디 링크: ---------- </p>

            </div>
          </div>
        </div>


        <div className="h-8">

        </div>
        {/* 공지 추가*/}
        <NoticeInput />
        {/* 일반 공지 */}

      </div>

    </>
  )
}
