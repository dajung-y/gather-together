"use client"

import React, { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce';
import toast from 'react-hot-toast';

const weekdayLabel = [
  { key: 'mon', label: '월' },
  { key: 'tue', label: '화' },
  { key: 'wed', label: '수' },
  { key: 'thu', label: '목' },
  { key: 'fri', label: '금' },
  { key: 'sat', label: '토' },
  { key: 'sun', label: '일' },
]

type StudyScheduleProps = {
  studyId: string;
  st: string; //startTime
  et: string; //endTime
  wd: string[]; //weekDays
}

export default function StudySchedule({ studyId, st, et, wd }: StudyScheduleProps) {
  const [startTime, setStartTime] = useState(st);
  const [endTime, setEndTime] = useState(et);
  const [weekdays, setWeekdays] = useState(wd);

  const changeSchedule = useMemo(() => {
    return debounce(async (
      curStartTime: string,
      curEndTime: string,
      curWeekdays: string[]
    ) => {
      try {
        const res = await fetch(`/api/study/${studyId}/setting`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startTime: curStartTime,
            endTime: curEndTime,
            weekdays: curWeekdays,
          }),
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || "서버 오류");
        }
        else {
          toast.success("스터디 시간이 수정되었습니다");
        }

        return result;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "알 수 없는 오류";
        alert(`스케줄 변경 중 오류: ${message}`);
      }
    }, 1000);
  }, [studyId]);

  useEffect(() => {
    return () => {
      changeSchedule.flush();
    };
  }, [changeSchedule]);


  const handleWeekdays = (day: string) => {
    setWeekdays(prev => {
      const newWeekdays = prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day];
      changeSchedule(startTime, endTime, newWeekdays);
      return newWeekdays;
    });
  };

  const handleStartTime = (time: string) => {
    setStartTime(time);
    changeSchedule(time, endTime, weekdays);
  }

  const handleEndTime = (time: string) => {
    setEndTime(time);
    changeSchedule(startTime, time, weekdays);
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex gap-2">
        {weekdayLabel.map((day) => (
          <button key={day.key} className={`border w-8 h-8 rounded-md
          ${weekdays.includes(day.key) ? 'bg-primary-500 text-white' : 'bg-white'}`}
            onClick={() => handleWeekdays(day.key)}>
            {day.label}
          </button>
        ))}
      </div>
      <div className='flex gap-2'>
        <input
          id="startTime"
          type="time"
          value={startTime}
          onChange={(e) => handleStartTime(e.target.value)}
          className="border rounded-lg px-3 py-2 w-40"
        />
        <input
          id="endTime"
          type="time"
          value={endTime}
          onChange={(e) => handleEndTime(e.target.value)}
          className="border rounded-lg px-3 py-2 w-40"
        />
      </div>

    </div>
  )
}
