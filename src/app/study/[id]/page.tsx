

import Button from "@/components/common/Button";
import StudyCard from "@/components/common/StudyCard";
import { Circle, X, Triangle, Pen, Trash } from 'lucide-react';

type StudyPageProps = {
  params: { id: string };
}

export default function page({ params }: StudyPageProps) {


  return (
    <>
      <div className="
        max-w-[1280px] mx-auto 
        px-4 py-3            
        sm:px-4 sm:py-3        
        md:px-6 md:py-3        
        lg:px-8 lg:py-4 
      ">
        {/* 상단 */}
        <h1 className="headline1">{params.id}의 About 페이지</h1>
        <div className="flex items-center gap-8">
          {/* 타이머 */}
          <div className="flex flex-col items-center justify-center w-44 h-44 border border-gray-300
          rounded-full m-4">
            <p className="text-primary-300">2025.08.09</p>
            <p className="headline3 pb-4">19:00 - 21:30</p>
            <div>
              <Button>출석하기</Button>
            </div>
          </div>
          {/* 출석 현황 */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="text-gray-400">기간</span>
                <span className="body-sb">2025.08.01 - 2025.09.28</span>
              </div>
              <div className="flex flex-col">
                <span className=" text-gray-400">요일</span>
                <span className="body-sb">월, 화, 목</span>
              </div>
              <div className="flex flex-col">
                <span className=" text-gray-400">참여일수</span>
                <span className="body-sb text-status-info">13/24</span>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col flex-1 items-center">
                <div className="flex w-full h-full rounded-tl-lg bg-primary-50 items-center justify-center gap-1 p-2">
                  <Circle size={20} className="text-status-info" />
                  <span>출석</span>
                </div>
                <span className="w-full h-full p-2 border-l border-b rounded-bl-lg border-gray-300 
                  text-center body-sb text-primary-900">
                  10
                </span>
              </div>
              <div className="flex flex-col flex-1 items-center">
                <div className="flex w-full h-full bg-primary-50 items-center justify-center gap-1 p-2">
                  <Triangle size={18} className="text-status-success" />
                  <span>지각</span>
                </div>
                <span className="w-full h-full p-2 border-b border-gray-300 
                  text-center body-sb text-primary-900">
                  10
                </span>
              </div>
              <div className="flex flex-col flex-1 items-center">
                <div className="flex w-full h-full rounded-tr-lg bg-primary-50 items-center justify-center gap-1 p-2">
                  <X size={20} className="text-status-error" />
                  <span>결석</span>
                </div>
                <span className="w-full h-full p-2 border-r border-b rounded-br-lg border-gray-300 
                  text-center body-sb text-primary-900">
                  10
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="text-gray-400" />
        {/* 메인공지 */}
        <p className="headline4 text-primary-500 my-4">메인 공지</p>
        <div className="flex flex-col bg-primary-500 text-white p-4 rounded-lg">
          <p>영어 스터디에 오신 것을 환영합니다!!</p>
          <p>교재: Grammar in use</p>
          <p>스터디 링크: ---------- </p>
          <Pen size={20} className="ml-auto" />
        </div>
        <div className="h-12"></div>
        {/* 공지 */}
        <div className="flex justify-between items-center">
          <p className="headline4 text-primary-500 my-4">공지</p>
          <Button size="md">공지 추가</Button>
        </div>
        {/* 일반 공지 추가 */}
        <div className="flex flex-col p-4 border gap-2 border-primary-500 rounded-lg">
          <div className="flex gap-4">
            <input type="text" placeholder="제목" className="flex-1 border px-4 border-primary-300 rounded-lg" />
            <Button variant="outline">취소</Button>
            <Button>공지 추가</Button>
          </div>
          <textarea placeholder="내용" className="w-full border p-4 border-primary-300 rounded-lg"></textarea>
        </div>
        <div className="h-12" />
        {/* 일반 공지 */}
        <div className="flex gap-2 p-4 border rounded-lg items-center">
          <span className="flex-1 headline4">9월 모임 공지</span>
          <span>2025.08.04</span>
          <span className="body-sb text-primary-500">NEW</span>
          <Pen size={20} className="ml-4" />
          <span>|</span>
          <Trash size={20} />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="whitespace-pre-line">
            {`안녕하세요, 영어 스터디 회원 여러분!

            이번 수요일 스터디에서는 말하기 연습에 집중할 예정입니다.

            참여자 모두 각자 2분 정도의 자기소개를 준비해 오시고, 스터디 중 그룹원들과 공유하며 피드백을 주고받을 계획입니다.
            자기소개뿐만 아니라, 이전 수업에서 배운 표현들을 활용해 짧은 대화를 만들어 보는 시간을 가질 예정이니 적극 참여 부탁드립니다. 
            스터디 참여 전, 마이크와 카메라 상태를 점검하시고,집중할 수 있는 환경에서 접속해 주세요. 
            
            즐겁고 유익한 시간이 되길 바랍니다.`}</div>
        </div>
      </div>

    </>
  )
}
