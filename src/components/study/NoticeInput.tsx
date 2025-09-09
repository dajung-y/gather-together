"use client"
import Button from "@/components/common/Button";
import { useState } from "react";

export default function NoticeInput() {
  const [showInput, setShowInput] = useState(false);

  return (
    <>
      {/* 공지 */}
      <div className="flex justify-between items-center">
        <p className="headline3 text-primary-500 my-4">공지</p>
        <Button size="md" onClick={() => setShowInput(!showInput)}>공지 추가</Button>
      </div>
      {/* 일반 공지 추가 */}
      {showInput &&
        <div className="flex flex-col p-4 mb-8 border gap-2 border-primary-500 rounded-lg">
          <div className="flex gap-4">
            <input type="text" placeholder="제목" className="flex-1 border px-4 border-primary-300 rounded-lg" />
            <Button variant="outline" onClick={() => setShowInput(!showInput)}>취소</Button>
            <Button onClick={() => setShowInput(!showInput)}>공지 추가</Button>
          </div>
          <textarea placeholder="내용" className="w-full border p-4 border-primary-300 rounded-lg"></textarea>
        </div>
      }

    </>
  )
}
