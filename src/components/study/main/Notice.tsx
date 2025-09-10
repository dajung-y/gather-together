"use client"
import { useState } from "react";
import { Pen, Trash } from 'lucide-react';

export default function Notice() {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div className="flex gap-2 p-4 border rounded-lg items-center"
        onClick={() => setShowDetail(!showDetail)}>
        <span className="flex-1 headline4">9월 모임 공지</span>
        <span>2025.08.04</span>
        <span className="body-sb text-primary-500">NEW</span>
        <Pen size={20} className="ml-4" />
        <span>|</span>
        <Trash size={20} />
      </div>
      {showDetail &&
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="whitespace-pre-line">
            {`안녕하세요, 영어 스터디 회원 여러분!

          이번 수요일 스터디에서는 말하기 연습에 집중할 예정입니다.

          참여자 모두 각자 2분 정도의 자기소개를 준비해 오시고, 스터디 중 그룹원들과 공유하며 피드백을 주고받을 계획입니다.
          자기소개뿐만 아니라, 이전 수업에서 배운 표현들을 활용해 짧은 대화를 만들어 보는 시간을 가질 예정이니 적극 참여 부탁드립니다. 
          스터디 참여 전, 마이크와 카메라 상태를 점검하시고,집중할 수 있는 환경에서 접속해 주세요. 
          
          즐겁고 유익한 시간이 되길 바랍니다.`}</div>
        </div>
      }


    </>
  )
}
