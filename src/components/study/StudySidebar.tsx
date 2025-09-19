"use client"

import { MenuItem } from '@/types/sidebar';
import React from 'react'
import Sidebar from '../common/Sidebar';
import { usePathname } from 'next/navigation';

type StudySidebarProps = {
  studyId: string;
  studyTitle: string;
  isLeader: boolean;
}

export default function StudySidebar({ studyId, studyTitle, isLeader }: StudySidebarProps) {

  const pathname = usePathname();
  const hideSidebar = pathname.includes('/about') || pathname.includes('/edit');

  if (hideSidebar) return null;

  const menuItems: MenuItem[] = [
    { label: "메인", path: `/study/${studyId}` },
    { label: "일정", path: `/study/${studyId}/todo` },
    ...(isLeader ? [{ label: "설정", path: `/study/${studyId}/setting` }] : []),
    { label: "탈퇴하기", onClick: () => console.log("Leave room") },
  ];

  return (
    <div className="w-full lg:w-64">
      <Sidebar menuItems={menuItems} title={studyTitle} />
    </div>
  )
}
