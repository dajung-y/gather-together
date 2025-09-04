"use client"
import { useParams } from "next/navigation";
import Button from "@/components/common/Button";
import StudyCard from "@/components/common/StudyCard";

export default function page() {
  const params = useParams();
  const { id } = params;

  return (
    <>
      <h1>{id}의 About 페이지</h1>
      {/* <Button>버튼테스트</Button>
      <Button variant="outline">버튼테스트</Button>
      <Button variant="secondary">버튼테스트</Button> */}
      {/* <div className="flex gap-4 flex-wrap">
        <StudyCard
          variant="mainOpen"
          title="토익 스터디"
          startDate={new Date("2025-09-01")}
          endDate={new Date("2025-11-30")}
          time="월, 수 오후 7시"
          currentMembers={3}
          maxMembers={8}
          tag="외국어"
        />

      </div> */}

    </>
  )
}
