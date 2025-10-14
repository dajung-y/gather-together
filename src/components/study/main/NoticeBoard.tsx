"use client"

import React, { useState } from 'react'
import NoticeForm from './NoticeForm'
import NoticeList from './NoticeList'
import { Notice } from '@/types/notice';

type NoticeBoardProps = {
  studyId: string;
  isLeader: boolean;
  noticeData: Notice[];
}

export default function NoticeBoard({ studyId, isLeader, noticeData }: NoticeBoardProps) {
  const [notices, setNotices] = useState<Notice[]>(noticeData);

  const handleAddNotice = (newNotice: Notice) => {
    setNotices(prev => [...prev, newNotice])
  }
  return (
    <div>
      {/* 공지 추가*/}
      <NoticeForm studyId={studyId} isLeader={isLeader} onAddNotice={handleAddNotice} />
      {/* 일반 공지 */}
      <NoticeList notices={notices} isLeader={isLeader} />
    </div>
  )
}
