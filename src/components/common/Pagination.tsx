"use client"
import { PaginationProps } from "@/types/pagination"
import { useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

export default function Pagination({
  perPage,
  totalPages,
  onChangePage
}: PaginationProps) {
  const pages = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageGroup, setCurrentPageGroup] = useState(0);
  const startPage = currentPageGroup * perPage;
  const endPage = currentPageGroup * perPage + perPage - 1;
  const totalPageGroups = Math.ceil(totalPages / perPage);

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrevButton = () => {
    setCurrentPageGroup(prev => {
      const nextGroup = prev - 1;
      const nextPage = nextGroup * perPage + 1;

      setCurrentPage(nextPage);
      if (onChangePage) {
        onChangePage(nextPage);
      }
      return nextGroup;
    });
  };

  const handlePageButton = (page: number) => {
    setCurrentPage(page);
    if (onChangePage) {
      onChangePage(page);
    }
  }

  const handleNextButton = () => {
    setCurrentPageGroup(prev => {
      const nextGroup = prev + 1;
      const nextPage = nextGroup * perPage + 1;

      setCurrentPage(nextPage);
      if (onChangePage) {
        onChangePage(nextPage);
      }
      return nextGroup;
    });
  };

  return (
    <div className="flex justify-center gap-2 items-center">
      {currentPageGroup !== 0 &&
        <ChevronsLeft className="cursor-pointer text-primary-700" size={24}
          onClick={() => handlePrevButton()} />}


      {pages.slice(startPage, endPage).map((page) => (
        <button
          key={page}
          className={`${page === currentPage ? "bg-primary-500 text-white" : ""} 
          cursor-pointer border border-primary-700 rounded-full w-8 h-8`}
          onClick={() => handlePageButton(page)} >
          {page}
        </button>
      ))}

      {currentPageGroup < totalPageGroups - 1 &&
        <ChevronsRight className="cursor-pointer text-primary-700" size={24}
          onClick={() => handleNextButton()} />}
    </div>
  );
}
