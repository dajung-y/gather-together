"use client"
import { useState } from "react";
import { Pen, Trash } from 'lucide-react';
import { Notice } from "@/types/notice";
import { formatDate } from "@/utils/date";

type NoticeItemProps = {
  notice: Notice;
  isLeader: boolean;
}

export default function NoticeItem({ notice, isLeader }: NoticeItemProps) {
  const [showDetail, setShowDetail] = useState(false)
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch("/api/notice", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: notice._id }),
      });

      const data = await res.json();
      if (data.success) {
        setDeleted(true);
      } else {
        alert("삭제 실패");
      }
    } catch (err) {
      console.error(err);
      alert("삭제 중 오류 발생");
    }
  };

  if (deleted) return null;

  return (
    <>
      <div className="flex gap-2 p-4 border rounded-lg items-center"
        onClick={() => setShowDetail(!showDetail)}>
        <span className="flex-1 headline4">{notice.title}</span>
        <span>{formatDate(notice.createdAt)}</span>
        <span className="body-sb text-primary-500">NEW</span>
        {isLeader &&
          <div className="flex gap-2 items-center">
            <Pen size={20} className="ml-4" />
            <span>|</span>
            <Trash size={20} onClick={handleDelete} />
          </div>
        }
      </div>
      {showDetail &&
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="whitespace-pre-line">
            {notice.content}</div>
        </div>
      }
    </>
  )
}
