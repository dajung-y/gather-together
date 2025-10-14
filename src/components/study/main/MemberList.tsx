"use client"

import { useState } from 'react'
import UserDelete from './UserDelete'
import { Member } from '@/types/study';
import toast from 'react-hot-toast';

type MemberListProps = {
  studyId: string;
  memberData: Member[];
};

export default function MemberList({ studyId, memberData }: MemberListProps) {
  const [members, setMembers] = useState(memberData);

  const handleKick = (userId: string, nickname: string, isLeader: boolean) => {
    if (isLeader) {
      alert("방장은 강퇴할 수 없습니다");
      return;
    }

    if (confirm("정말 이 멤버를 강퇴하시겠습니까?")) {
      kickUser(userId, nickname);
    } else {
      console.log("강퇴 취소");
    }
  }

  const kickUser = async (userId: string, nickname: string) => {
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
      else {
        toast(`${nickname} 님을 강퇴하였습니다`);
      }

    } catch (error) {
      console.error("저장 중 오류 발생:", error);
    }
  }


  return (
    <div className="flex gap-2">
      {members.map((member, index) => (
        <div key={index} onClick={() => handleKick(member.userId, member.nickname, member.role == "leader")}>
          <UserDelete
            name={member.nickname}
            isLeader={member.role == "leader"}
          />
        </div>
      ))}
    </div>
  )
}
