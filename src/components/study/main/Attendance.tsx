"use client"

import Button from '@/components/common/Button';
import { formatDate, getNextStudyDate } from '@/utils/date';
import React from 'react'

type AttendanceProps = {
  studyId: string;
  startDate: string;
  endDate: string;
  weekdays: string[];
  startTime: string;
  endTime: string;
}


export default function Attendance({
  studyId,
  startDate,
  endDate,
  weekdays,
  startTime,
  endTime
}: AttendanceProps) {
  const nextDate = getNextStudyDate(startDate, endDate, weekdays);


  const handleAttendance = async () => {
    const now = new Date();

    // 스터디 날 확인
    if (!nextDate) return alert("종료된 스터디입니다.");
    if (nextDate.getDate() !== now.getDate()) return alert("스터디 날이 아닙니다.");

    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);

    const startDate = new Date(now);
    startDate.setHours(startHour, startMin, 0, 0);
    const endDate = new Date(now);
    endDate.setHours(endHour, endMin, 0, 0);

    const diffMinutes = (date1: Date, date2: Date) =>
      (date1.getTime() - date2.getTime()) / 1000 / 60;

    // 출석 상태 계산
    let type: "present" | "late" | "absent" = "absent";

    if (diffMinutes(now, startDate) >= -10 && diffMinutes(now, startDate) <= 0) {
      type = "present"; // 출석
    } else if (diffMinutes(now, startDate) > 0 && now <= endDate) {
      type = "late"; // 지각
    }

    try {
      const res = await fetch(`/api/attendance/${studyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      const result = await res.json();

      if (!res.ok) return alert(result.error || "출석 처리 실패");

      alert(type === "present" ? "출석" : type === "late" ? "지각" : "결석");
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="flex flex-col w-full items-center justify-center h-44 border 
    border-primary-300 rounded-lg">
      <p className="text-primary-300">{nextDate ? formatDate(nextDate) : "-"}</p>
      <p className="headline2 pb-4">{startTime} - {endTime}</p>
      <div>
        <Button size="lg" onClick={handleAttendance}>출석하기</Button>
      </div>
    </div>
  )
}
