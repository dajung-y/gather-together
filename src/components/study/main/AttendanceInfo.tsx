"use client"

import { Attendance } from '@/types/study';
import { Circle, X, Triangle, Pen, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

type AttendanceInfoProps = {
  startDate: string;
  endDate: string;
  weekdays: string[];
  attendance: Attendance;
}

const WEEKDAY_MAP: Record<string, number> = {
  sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
};

const WEEKDAY_LABELS: Record<string, string> = {
  sun: "일", mon: "월", tue: "화", wed: "수", thu: "목", fri: "금", sat: "토",
};


export default function AttendanceInfo({
  startDate,
  endDate,
  weekdays,
  attendance
}: AttendanceInfoProps) {
  const [count, setCount] = useState(0);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const targetDays = weekdays.map(d => WEEKDAY_MAP[d.toLowerCase()]);
    const targetLabels = weekdays.map(d => WEEKDAY_LABELS[d.toLowerCase()]);

    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const fullWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    let newCount = fullWeeks * targetDays.length;

    for (let i = 0; i < remainingDays; i++) {
      const day = (start.getDay() + i) % 7;
      if (targetDays.includes(day)) newCount++;
    }

    setCount(newCount);
    setLabels(targetLabels);
  }, [startDate, endDate, weekdays]);

  return (
    <>
      {/* 출석 현황 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 px-2">
          <div className="flex flex-col border-r border-gray-300 pr-4">
            <span className="text-gray-400">기간</span>
            <span className="">{startDate} - {endDate}</span>
          </div>
          <div className="flex flex-col border-r border-gray-300 pr-4">
            <span className=" text-gray-400">요일</span>
            <span className="">
              {labels.map((label, index) => (
                <span key={index}>
                  {label}
                  {index < labels.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          </div>
          <div className="flex flex-col">
            <span className=" text-gray-400">일수</span>
            <span className=" text-status-info">{
              attendance ?
                (attendance.present + attendance.late + attendance.absent) : 0} /{count}</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col flex-1 items-center">
            <div className="flex w-full h-full rounded-tl-lg bg-primary-50 items-center justify-center gap-1 p-2">
              <Circle size={20} className="text-status-info" />
              <span>출석</span>
            </div>
            <span className="w-full h-full p-2 border-l border-b rounded-bl-lg border-gray-300 
                  text-center body-sb text-primary-900">
              {attendance ? attendance.present : 0}
            </span>
          </div>
          <div className="flex flex-col flex-1 items-center">
            <div className="flex w-full h-full bg-primary-50 items-center justify-center gap-1 p-2">
              <Triangle size={18} className="text-status-success" />
              <span>지각</span>
            </div>
            <span className="w-full h-full p-2 border-b border-gray-300 
                  text-center body-sb text-primary-900">
              {attendance ? attendance.late : 0}
            </span>
          </div>
          <div className="flex flex-col flex-1 items-center">
            <div className="flex w-full h-full rounded-tr-lg bg-primary-50 items-center justify-center gap-1 p-2">
              <X size={20} className="text-status-error" />
              <span>결석</span>
            </div>
            <span className="w-full h-full p-2 border-r border-b rounded-br-lg border-gray-300 
                  text-center body-sb text-primary-900">
              {attendance ? attendance.absent : 0}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
