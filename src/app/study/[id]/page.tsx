

import Button from "@/components/common/Button";
import StudyCard from "@/components/common/StudyCard";
import AttendanceInfo from "@/components/study/main/AttendanceInfo";
import MainNotice from "@/components/study/main/MainNotice";
import Notice from "@/components/study/main/NoticeList";
import NoticeForm from "@/components/study/main/NoticeForm";

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
          <MainNotice />
        </div>



        {/* 공지 추가*/}
        <NoticeForm />
        <Notice />
        {/* 일반 공지 */}

      </div>

    </>
  )
}
