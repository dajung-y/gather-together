'use client'

import { useEffect, useState } from "react"
import RecruitToggle from "./RecruitToggle";
import Pagination from "../common/Pagination";
import CardList from "./CardList";
import { Study } from "@/types/study";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

export default function StudyListClient() {

  const [studies, setStudies] = useState<Study[]>([]);
  const [isRecruiting, setIsRecruiting] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentpage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(""); // api 호출 시 사용할 값
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const fetchStudies = async () => {
      setIsLoading(true);
      try{
        // 캐시처리 추가하기
        const res = await fetch(`/api/study?isRecruiting=${isRecruiting}&page=${currentPage}&category=${category}&search=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setStudies(data.data);
        setTotalPage(data.totalPage || 1);
      } catch(error) {
        console.error("스터디 리스트 불러오기 실패: ",error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudies();
  }, [isRecruiting, currentPage, searchQuery, category]);

  return (
    <div>
      {/* 중앙 컨트롤러 (필터) */}
      <section className="w-full my-2">
        <div className="w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
          <div className="w-1/3 md:w-auto md:flex-shrink-0">
            <RecruitToggle
            isRecruiting={isRecruiting}
            onToggle = {() => setIsRecruiting(prev => !prev)}
            />
          </div>
          <div className="w-full h-full md:w-auto">
            <CategoryFilter
              value={category}
              onChange={setCategory}
              />
          </div>
          <div className="w-full md:flex-1 md:max-w-md">
            <SearchBar 
              value={searchInput} 
              onChange={setSearchInput}
              onSubmit= {() => setSearchQuery(searchInput)} />
          </div>
        </div>
      </section>
      {/* 카드 리스트 */}
      <section className="my-8">
        { isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="animate-pulse headline2 text-primary-500">로딩 중...</span>
          </div>
        ) : studies.length === 0 ? (
          <div className="flex justify-center items-center h-100">
            <p className="headline2 text-primary-500">검색결과가 없습니다</p>
          </div>
        ) : (
          <CardList 
            studies={studies} 
          />
        )}
      </section>
      { !isLoading && studies.length>0 && (
        <div className="my-8 lg:my-16">
          <Pagination
            totalPages={totalPage}
            perPage={16}
            onChangePage={setCurrentpage}
          />
        </div>
      )}
    </div>
  )
}
