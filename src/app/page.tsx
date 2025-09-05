import Carousel from "@/components/main/Carousel";

export default function Home() {

  return (
    <main className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-[1280px] px-4">
        {/* 캐러셀 */}
        <section className="py-4">
          <Carousel />
        </section>
        {/* 중앙 컨트롤 영역 */}
        <section>
          {/* 모집중 버튼, 검색창 */}
          <div>

          </div>
          {/* 필터 */}
          <div>

          </div>
        </section>
        {/* 카드 리스트 */}
        <section>

        </section>
        {/* 페이지네이션 */}
        <section>
          
        </section>
      </div>
    </main>
  );
}
