"use client"

import { useState } from 'react'
import UserDelete from './UserDelete'
import { Member } from '@/types/study';

type MemberListProps = {
  studyId: string;
  memberData: Member[];
};

export default function MemberList({ studyId, memberData }: MemberListProps) {
  const [members, setMembers] = useState(memberData);

  const handleKick = async (userId: string) => {
    setMembers(prev => prev.filter(m => m.userId !== userId));
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

    } catch (error) {
      console.error("저장 중 오류 발생:", error);
    }
  }

  return (
    <div className="flex gap-2">
      {members.map((member, index) => (
        <div key={index} onClick={() => handleKick(member.userId)}>
          <UserDelete name={member.nickname} />
        </div>
      ))}
    </div>
  )
}
