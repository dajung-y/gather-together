'use client'

import { useEffect, useState } from "react"
import RecruitToggle from "./RecruitToggle";
import Pagination from "../common/Pagination";
import CardList from "./CardList";
import { Study, StudyData } from "@/types/study";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import { useRouter, useSearchParams } from "next/navigation";

export default function StudyListClient() {

  const router = useRouter();
  const searchParams = useSearchParams();

  // 쿼리 값

  // const [isRecruiting, setIsRecruiting] = useState<boolean | undefined>(true);
  // const [currentPage, setCurrentpage] = useState<number>(1);
  // const [searchInput, setSearchInput] = useState<string>("");
  // const [category, setCategory] = useState<string>("");

  const isRecruitingParam = searchParams.get("isRecruiting");
  const isRecruiting = isRecruitingParam === null? undefined : isRecruitingParam === "true";
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  
  const [studies, setStudies] = useState<StudyData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(1);
  
  useEffect(() => {
    if(isRecruitingParam === null){
      const params = new URLSearchParams(searchParams.toString());
      params.set("isRecruiting", "true");
      router.replace(`?${params.toString()}`, {scroll: false})
    }
  }, []);

  useEffect(() => {
    const fetchStudies = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          ...(isRecruiting ? {isRecruiting : "true"}: {}),
          ...(category ? {category} : {}),
          ...(search ? {search} : {}),
          page: String(page),
        });
        const res = await fetch(`/api/study?${params.toString()}`);
        const data = await res.json();
        setStudies(data.data || []);
        setTotalPage(data.totalPage || 1);
        setIsLoading(false);
      } catch (error) {
        console.error("스터디 리스트 불러오기 실패: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudies();
  }, [isRecruiting, category, search, page]);

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if(value) params.set(key, value);
    else params.delete(key);

    if(key !== "page") params.set("page", "1");
    router.push(`?${params.toString()}`, {scroll: false});
  }

  return (
    <div>
      {/* 중앙 컨트롤러 (필터) */}
      <section className="w-full my-2">
        <div className="w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
          <div className="w-1/3 md:w-auto md:flex-shrink-0">
            <RecruitToggle
              isRecruiting={isRecruiting}
              onToggle={() => updateQuery("isRecruiting", isRecruiting ? "" : "true")}
            />
          </div>
          <div className="w-full h-full md:w-auto">
            <CategoryFilter
              value={category}
              onChange={(v) => updateQuery("category", v)}
            />
          </div>
          <div className="w-full md:flex-1 md:max-w-md">
            <SearchBar
              initialValue={search}
              onSearch={(v) => updateQuery("search", v)} />
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
            currentPage={page}
            onChangePage={(p) => updateQuery("page", String(p))}
          />
        </div>
      )}
    </div>
  )
}
