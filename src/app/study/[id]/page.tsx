"use client";

import Button from "@/components/common/Button";
import StudyCard from "@/components/common/StudyCard";
import AttendanceInfo from "@/components/study/main/AttendanceInfo";
import MainNotice from "@/components/study/main/MainNotice";
import NoticeForm from "@/components/study/main/NoticeForm";
import NoticeItem from "@/components/study/main/NoticeItem";
import { StudyData } from "@/types/study";
import React, { useEffect, useState } from "react";

const WEEKDAY_MAP: Record<string, number> = {
  sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
};

const WEEKDAY_LABELS: Record<number, string> = {
  0: "일",
  1: "월",
  2: "화",
  3: "수",
  4: "목",
  5: "금",
  6: "토",
};

type StudyPageProps = {
  params: Promise<{ id: string }>;
};

export default function page(props: StudyPageProps) {
  const params = React.use(props.params);
  const studyId = params.id;
  const [study, setStudy] = useState<StudyData | null>(null);
  const [nextDate, setNextDate] = useState<Date | null>(null);

  function getNextStudyDate(startDate: string, endDate: string, weekdays: string[]): Date | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today > end) return null; // 이미 종료된 스터디

    const targetDays = weekdays.map(d => WEEKDAY_MAP[d.toLowerCase()]);

    let current = today > start ? today : start;

    while (current <= end) {
      if (targetDays.includes(current.getDay())) {
        return current; // 오늘 이후 첫 스터디 날짜
      }
      current.setDate(current.getDate() + 1);
    }

    return null; // 기간 내 스터디 없음
  }

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekday = WEEKDAY_LABELS[date.getDay()];

    return `${year}.${month}.${day}.${weekday}`;
  }

  useEffect(() => {
    if (!studyId) return;

    const fetchStudy = async () => {
      try {
        const res = await fetch(`/api/study/${studyId}`);
        const result = await res.json();
        if (res.ok) {
          setStudy(result);
          const date = getNextStudyDate(result.startDate, result.endDate, result.weekdays)
          setNextDate(date);
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error("스터디 조회 실패:", error);
      }
    };


    fetchStudy();
  }, [studyId]);

  if (!study) return <p>Loading...</p>;

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
              <p className="text-primary-300">{nextDate ? formatDate(nextDate) : "-"}</p>
              <p className="headline2 pb-4">{study.startTime} - {study.endTime}</p>
              <div>
                <Button size="lg">출석하기</Button>
              </div>
            </div>
            <div className="">
              <AttendanceInfo startDate={study.startDate} endDate={study.endDate} weekdays={study.weekdays} />
            </div>

          </div>
          {/* <hr className="text-gray-400" /> */}
          {/* 메인공지 */}
          <MainNotice studyId={studyId} mainNotice={study.mainNotice} />
        </div>



        {/* 공지 추가*/}
        <NoticeForm />

        <NoticeItem />
        {/* 일반 공지 */}

      </div>

    </>
  )
}
