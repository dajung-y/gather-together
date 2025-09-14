'use client'

import { useEffect, useState } from "react"
import RecruitToggle from "./RecruitToggle";
import Pagination from "../common/Pagination";
import CardList from "./CardList";
import { Study } from "@/types/study";
import SearchBar from "./SearchBar";

export default function StudyListClient() {

  const [studies, setStudies] = useState<Study[]>([]);
  const [isRecruiting, setIsRecruiting] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentpage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const fetchStudies = async () => {
      setIsLoading(true);
      try{
        const res = await fetch(`/api/study?isRecruiting=${isRecruiting}&page=${currentPage}`);
        const data = await res.json();
        console.log("받은 데이터: ",data);
        setStudies(data.data);
        setTotalPage(data.totalPage || 1);
      } catch(error) {
        console.error("스터디 리스트 불러오기 실패: ",error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudies();
  }, [isRecruiting, currentPage]);

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
          <div className="w-full md:flex-1 md:max-w-md">
            <SearchBar />
          </div>
        </div>
      </section>
      {/* 카드 리스트 */}
      <section className="my-8">
        { isLoading ? (
          <div>
            로딩 중...
          </div>
        ) : (
          <CardList 
            studies={studies} 
          />
        )}
      </section>
      <div className="my-8 lg:mb-12">
        <Pagination
          totalPages={totalPage}
          perPage={16}
          onChangePage={setCurrentpage}
        />
      </div>
    </div>
  )
}
