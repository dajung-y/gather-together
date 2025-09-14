// components/study/about/JoinButton.tsx
// 참여하기 버튼

'use client'

import Button from "@/components/common/Button"
import { useSession } from "next-auth/react"
import { useState } from "react";
import JoinModal from "./JoinModal";

interface JoinButtonProps {
  creatorId: string;
  studyId: string;
  applicants: {
    userId: string;
    nickname: string;
    introduction: string;
    status: string
  }[];
}

export default function JoinButton({
  creatorId,
  studyId,
  applicants
}: JoinButtonProps) {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if(!session?.user || session.user.id===creatorId){
    return null;
  }

  const hasApplied = applicants.some(
    (applicant) => applicant.userId === session.user.id
  );


  const handleConfirm = async (formData: {introduction: string}) => {
    setIsModalOpen(true);
    try{
      const res = await fetch("/api/study/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studyId,
          introduction: formData.introduction
        }),
      });
      
      const data = await res.json();

      if (!res.ok){
        alert(data.message);
        return;
      }

      alert("스터디 신청 완료");
      setIsModalOpen(false);
    } catch(error){
      console.error(error);
    } finally {
      setIsModalOpen(false);
    }
  }

  return (
    <>
    <Button 
      size="lg"
      className={`px-12 ${hasApplied ? "cursor-not-allowed" : "" }`}
      onClick={() => !hasApplied && setIsModalOpen(true)}>
      {hasApplied ? "참여완료" : "참여하기"}
    </Button>

    <JoinModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onConfirm={handleConfirm}
    />
    </>
  )
}
