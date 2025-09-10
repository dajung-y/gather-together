"use client"

import { Pen, Check, X } from 'lucide-react';
import { useState } from 'react';

export default function MainNotice() {
  const [mainNotice, setMainNotice] = useState("");
  const [tempNotice, setTempNotice] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setMainNotice(tempNotice);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempNotice(mainNotice); // 원래대로 복원
    setIsEditing(false);
  };

  const testNotice = "안녕하세요, 스터디 그룹 여러분.\n이번 주 모임에 대해 안내드립니다.\n이번 모임은 토요일 오후 2시에 강남역 인근 카페에서 진행될 예정입니다."

  return (
    <div className="flex-1 flex gap-8">
      <div className="flex-1 flex flex-col py-4 border rounded-lg p-4 border-primary-300">
        {isEditing ? (
          <div>
            <div className="flex">
              <p className="headline2 text-primary-500 mb-4 ">수정 중...</p>
              <div className='flex ml-auto gap-8'>
                <Check size={20} onClick={handleSave} />
                <X size={20} onClick={handleSave} />
              </div>


            </div>
            <textarea
              value={tempNotice}
              onChange={(e) => setTempNotice(e.target.value)}
              className="w-full h-60 resize-none p-4" />
          </div>
        ) : (
          <div>
            <div className="flex">
              <p className="headline2 text-primary-500 mb-4 ">메인 공지</p>
              <Pen size={20} className="ml-auto" onClick={() => setIsEditing(true)} />
            </div>
            <p className="whitespace-pre-line">{mainNotice}</p>
          </div>
        )}
      </div>
    </div>
  )
}
