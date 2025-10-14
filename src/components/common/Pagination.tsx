"use client"
import { PaginationProps } from "@/types/pagination"
import { useEffect, useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

// controlled component로 수정
interface Props extends PaginationProps {
  currentPage: number; // 부모에서 내려줄 현재 페이지
}

export default function Pagination({
  totalPages,
  pagePerGroup=5,
  currentPage,
  onChangePage
}: Props) {
  const pages = Array.from({length: totalPages}, (_,i) => i+1);

  // 현재 페이지 그룹의 인덱스
  const currentGroup = Math.floor((currentPage-1) / pagePerGroup);

  const startPage = currentGroup * pagePerGroup + 1;
  const endPage = Math.min(startPage + pagePerGroup -1, totalPages)
  const totalGroups = Math.ceil(totalPages / pagePerGroup);

  const handlePrevButton = () => {

    if(currentGroup === 0) return;
    const prevGroupFirstPage = (currentGroup-1)* pagePerGroup +1;
    onChangePage?.(prevGroupFirstPage);
  };

  const handlePageButton = (page: number) => {
    onChangePage?.(page);
    // 스크롤 이동
    const studyList = document.getElementById("study-list");
    studyList?.scrollIntoView({ behavior: "smooth"});
  }

  const handleNextButton = () => {
    if(currentGroup >= totalGroups -1) return;
    const nextGroupFirstPage = (currentGroup +1) * pagePerGroup +1;
    onChangePage?.(nextGroupFirstPage);
  };

  return (
    <div className="flex justify-center gap-2 items-center">
      {currentGroup !== 0 &&
        <ChevronsLeft className="cursor-pointer text-primary-700" size={24}
          onClick={() => handlePrevButton()} />}


      {pages.slice(startPage-1, endPage).map((page) => (
        <button
          key={page}
          className={`${page === currentPage ? "bg-primary-500 text-white" : ""} 
          cursor-pointer border border-primary-700 rounded-full w-8 h-8`}
          onClick={() => handlePageButton(page)} >
          {page}
        </button>
      ))}

      {currentGroup < totalGroups - 1 &&
        <ChevronsRight className="cursor-pointer text-primary-700" size={24}
          onClick={() => handleNextButton()} />}
    </div>
  );
}
