'use client'

import { useEffect, useState } from "react"
import RecruitToggle from "./RecruitToggle";
import Pagination from "../common/Pagination";
import CardList from "./CardList";
import { Study, StudyData } from "@/types/study";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import { useRouter } from "next/navigation";

export default function StudyListClient() {

  const router = useRouter();
  const [studies, setStudies] = useState<StudyData[]>([]);
  const [isRecruiting, setIsRecruiting] = useState<boolean | undefined>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentpage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(""); // api 호출 시 사용할 값
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const fetchStudies = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        console.log(params);

        // 모집중
        if (isRecruiting) params.set("isRecruiting", "true");
        // 페이지
        params.set("page", String(currentPage));

        if (category) params.set("category", category);
        if (searchQuery) params.set("search", searchQuery);

        // 패치할 url
        const url = `api/study?${params.toString()}`;
        console.log("fetch url: ", url);


        const res = await fetch(url);
        const data = await res.json();

        setStudies(data.data || []);
        setTotalPage(data.totalPage || 1);
      } catch (error) {
        console.error("스터디 리스트 불러오기 실패: ", error);
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
              onToggle={() => setIsRecruiting(prev => prev === true ? undefined : true)}
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
              onSubmit={() => setSearchQuery(searchInput)} />
          </div>
        </div>
      </section>
      {/* 카드 리스트 id추가 */}
      <section id="study-list" className="my-8 scroll-mt-18 lg:scroll-mt-22">
        {isLoading ? (
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
      {!isLoading && studies.length > 0 && (
        <div className="my-8 lg:my-16">
          <Pagination
            totalPages={totalPage}
            currentPage={currentPage}
            onChangePage={setCurrentpage}
          />
        </div>
      )}
    </div>
  )
}
