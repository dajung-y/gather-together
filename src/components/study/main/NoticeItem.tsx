"use client"
import { useState } from "react";
import { Pen, Trash } from 'lucide-react';
import { Notice } from "@/types/notice";

export default function NoticeItem({ title, content, createdAt }: Notice) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className=" mb-2">
      <div className="flex gap-2 p-4 border rounded-lg items-center"
        onClick={() => setShowDetail(!showDetail)}>
        <span className="flex-1 headline4">{title}</span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
        <span className="body-sb text-primary-500">NEW</span>
        <Pen size={20} className="ml-4" />
        <span>|</span>
        <Trash size={20} />
      </div>
      {showDetail &&
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="whitespace-pre-line"> {content} </div>
        </div>
      }
    </div>
  )
}
