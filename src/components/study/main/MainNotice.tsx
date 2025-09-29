"use client"

import { useEffect, useState } from 'react';
import { Notice } from '@/types/notice';
import { Pen, Check, X } from 'lucide-react';

type MainNoticeProps = {
  studyId: string;
  mainNotice?: string;
  isLeader: boolean
};

export default function MainNotice({ studyId, mainNotice, isLeader }: MainNoticeProps) {
  const [currentNotice, setCurrentNotice] = useState<string>(mainNotice ?? "공지를 작성해주세요!");
  const [tempNotice, setTempNotice] = useState<string>(mainNotice ?? "공지를 작성해주세요!");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // mainNotice 바뀔 때 tempNotice 초기화
  useEffect(() => {

    //setTempNotice(mainNotice?.content || "");
  }, [mainNotice]);

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/study/${studyId}/main-notice`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: tempNotice
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("저장 실패:", data.error);
        return;
      }
      setCurrentNotice(tempNotice);
      setIsEditing(false);
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
    }
  };

  const handleCancel = () => {
    setTempNotice(currentNotice || "");
    setIsEditing(false);
  };

  return (
    <div className="flex-1 flex gap-8">
      <div className="flex-1 flex flex-col py-4 border rounded-lg p-4 border-primary-300">
        {isEditing ? (
          <div>
            <div className="flex">
              <p className="headline2 text-primary-500 mb-4">수정 중...</p>
              <div className="flex ml-auto gap-8">
                <Check size={20} onClick={handleSave} />
                <X size={20} onClick={handleCancel} />
              </div>
            </div>
            <textarea
              value={tempNotice}
              onChange={(e) => setTempNotice(e.target.value)}
              className="w-full h-60 resize-none p-4"
            />
          </div>
        ) : (
          <div>
            <div className="flex">
              <p className="headline2 text-primary-500 mb-4">메인 공지</p>
              {isLeader && <Pen size={20} className="ml-auto" onClick={() => setIsEditing(true)} />}
            </div>
            <p className="whitespace-pre-line">
              {currentNotice}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
