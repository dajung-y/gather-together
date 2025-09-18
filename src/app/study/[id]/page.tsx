import Attendance from "@/components/study/main/Attendance";
import AttendanceInfo from "@/components/study/main/AttendanceInfo";
import MainNotice from "@/components/study/main/MainNotice";
import NoticeForm from "@/components/study/main/NoticeForm";
import NoticeList from "@/components/study/main/NoticeList";
import { Notice } from "@/types/notice";
import { StudyData } from "@/types/study";

export default async function page({ params }: { params: { id: string } }) {
  const studyId = await params.id;

  const studyRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/study/${studyId}`);
  if (!studyRes.ok) {
    throw new Error("스터디 정보를 불러오는 데 실패했습니다.");
  }
  const studyData: StudyData = await studyRes.json();

  const noticeRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notice?studyId=${studyId}`);
  if (!noticeRes.ok) {
    throw new Error("공지사항을 불러오는 데 실패했습니다.");
  }
  const data: { data: Notice[] } = await noticeRes.json();
  const notices = data.data;

  if (!studyData) return <p>Loading...</p>;

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
        <h1 className="headline1">{studyData.title}</h1>
        <div className="flex gap-8 mt-8">
          <div className="flex flex-col justify-center gap-4">
            {/* 타이머 */}
            <Attendance studyId={studyId} {...studyData} />
            <div>
              <AttendanceInfo startDate={studyData.startDate} endDate={studyData.endDate} weekdays={studyData.weekdays} />
            </div>
          </div>
          {/* 메인공지 */}
          <MainNotice studyId={studyId} mainNotice={studyData.mainNotice} />
        </div>

        {/* 공지 추가*/}
        <NoticeForm studyId={studyId} />
        {/* 일반 공지 */}
        <NoticeList notices={notices} />
      </div>
    </>
  )
}
