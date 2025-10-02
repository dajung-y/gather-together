import AttendanceTimer from "@/components/study/main/AttendanceTimer";
import AttendanceInfo from "@/components/study/main/AttendanceInfo";
import MainNotice from "@/components/study/main/MainNotice";
import NoticeForm from "@/components/study/main/NoticeForm";
import NoticeList from "@/components/study/main/NoticeList";
import { Notice } from "@/types/notice";
import { Attendance, StudyData } from "@/types/study";
import { redirect } from "next/navigation";
import { getUserIdFromSession } from "@/lib/session";
import clientPromise from "@/lib/mongodb";
import { getStudyData } from "@/lib/study";
import NoticeBoard from "@/components/study/main/NoticeBoard";
import { getNoticeData } from "@/lib/notice";

export default async function page({ params }: { params: { id: string } }) {
  const param = await params;
  const studyId = await param.id;

  //SSR에서 api fetch 쓰면 getSession 정보 읽기 불가능
  //SSR에서는 바로 호출이 나음
  const userId = await getUserIdFromSession();
  if (!userId) {
    redirect('/');
  }

  const client = await clientPromise;
  const db = client.db();

  const studyData: StudyData = await getStudyData(studyId);

  // const notices = await db.collection("notices").find({ studyId }).toArray();
  // const noticeData: Notice[] = JSON.parse(JSON.stringify(notices));

  const noticeData: Notice[] = await getNoticeData(studyId);

  const attendance = await db.collection("attendances").findOne({
    studyId: studyId,
    userId: userId
  });
  const attendanceData: Attendance = JSON.parse(JSON.stringify(attendance));

  //방장인지
  const isLeader = studyData.members.some(
    (m) => m.userId === userId && m.role === "leader");

  return (
    <>
      <div className="
        w-full mx-auto 
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
            <AttendanceTimer studyId={studyId} {...studyData} />
            <div>
              <AttendanceInfo startDate={studyData.startDate} endDate={studyData.endDate}
                weekdays={studyData.weekdays} attendance={attendanceData} />
            </div>
          </div>
          {/* 메인공지 */}
          <MainNotice studyId={studyId} mainNotice={studyData.mainNotice} isLeader={isLeader} />
        </div>

        <hr className="mt-12 mb-2 text-gray-300" />
        <NoticeBoard studyId={studyId} isLeader={isLeader} noticeData={noticeData} />

      </div>
    </>
  )
}
