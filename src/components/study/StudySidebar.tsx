"use client"

import { MenuItem } from '@/types/sidebar';
import React from 'react'
import Sidebar from '../common/Sidebar';
import { usePathname, useRouter } from 'next/navigation';

type StudySidebarProps = {
  studyId: string;
  userId: string;
  studyTitle: string;
  isLeader: boolean;
}

export default function StudySidebar({ studyId, userId, studyTitle, isLeader }: StudySidebarProps) {
  const router = useRouter();

  const pathname = usePathname();
  const hideSidebar = pathname.includes('/about') || pathname.includes('/edit');

  if (hideSidebar) return null;

  const handleLeaveRoom = () => {
    if (confirm(`정말 [${studyTitle}]를 탈퇴하시겠습니까?`)) {
      leave(userId);
    } else {
    }
  }


  const leave = async (userId: string) => {
    try {
      const res = await fetch(`/api/study/${studyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "removeMember",
          payload: { userId },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("저장 실패:", data.error);
        return;
      }
      alert("탈퇴하였습니다");
      router.push("/");
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
    }
  }

  const menuItems: MenuItem[] = [
    { label: "메인", path: `/study/${studyId}` },
    { label: "일정", path: `/study/${studyId}/todo` },
    ...(isLeader ? [{ label: "설정", path: `/study/${studyId}/setting` }] : []),
    ...(!isLeader ? [{ label: "탈퇴하기", onClick: () => handleLeaveRoom() }] : []),
  ];

  return (
    <div className="w-full lg:w-64">
      <Sidebar menuItems={menuItems} title={studyTitle} />
    </div>
  )
}
