"use client";

import Button from "@/components/common/Button";
import StudyCard from "@/components/common/StudyCard";
import AttendanceInfo from "@/components/study/main/AttendanceInfo";
import MainNotice from "@/components/study/main/MainNotice";
import NoticeForm from "@/components/study/main/NoticeForm";
import NoticeItem from "@/components/study/main/NoticeItem";
import NoticeList from "@/components/study/main/NoticeList";
import { useStudyStore } from "@/store/study";
import { Notice } from "@/types/notice";
import { StudyData } from "@/types/study";
import { formatDate, getNextStudyDate } from "@/utils/date";
import { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const studyId = params.id;
  const { studyData, setStudyData } = useStudyStore();
  const [notices, setNotices] = useState<Notice[]>([]);

  //스터디 데이터
  useEffect(() => {
    if (!studyData || studyData._id !== studyId) {
      fetch(`/api/study/${studyId}`)
        .then((res) => res.json())
        .then((data: StudyData) => setStudyData(data))
        .catch((err) => console.error(err));
    }
  }, [studyId]);

  //공지 데이터
  useEffect(() => {
    fetch(`/api/notice?studyId=${studyId}`)
      .then((res) => res.json())
      .then((data: { data: Notice[] }) => setNotices(data.data))
      .catch((err) => console.error(err));
  }, [studyId]);

  if (!studyData) return <p>Loading...</p>;

  const nextDate = getNextStudyDate(studyData.startDate, studyData.endDate, studyData.weekdays);

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
            <div className="flex flex-col w-full items-center justify-center h-44 border border-primary-300
          rounded-lg">
              <p className="text-primary-300">{nextDate ? formatDate(nextDate) : "-"}</p>
              <p className="headline2 pb-4">{studyData.startTime} - {studyData.endTime}</p>
              <div>
                <Button size="lg">출석하기</Button>
              </div>
            </div>
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
