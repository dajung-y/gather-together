

import CardList from "@/components/main/CardList";
import Carousel from "@/components/main/Carousel";
import RecruitToggle from "@/components/main/RecruitToggle";
import SearchBar from "@/components/main/SearchBar";

export default function Home() {

  return (
    <main className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-[1280px] px-4">
        {/* 캐러셀 */}
        <section className="py-4">
          <Carousel />
        </section>
        {/* 중앙 컨트롤 영역 */}
        <section className="w-full my-2">
          {/* 모집중 버튼, 검색창 */}
          <div className="w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <div className="w-1/3 md:w-auto md:flex-shrink-0">
              <RecruitToggle />
            </div>
            <div className="w-full md:flex-1 md:max-w-md">
              <SearchBar />
            </div>
          </div>
          {/* 필터 */}
          <div>

          </div>
        </section>
        {/* 카드 리스트 */}
        <section className="my-8">
          <CardList />
        </section>
        {/* 페이지네이션 */}
        <section>

        </section>
      </div>
    </main>
  );
}

