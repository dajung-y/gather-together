import Carousel from "@/components/main/Carousel";
import StudyListClient from "@/components/main/StudyListClient";
import { Suspense } from "react";

export default function Home() {

  return (
    <main className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-[1280px] px-4">
        {/* 캐러셀 */}
        <section className="py-4">
          <Carousel />
        </section>
        <Suspense fallback={<div className="text-center py-10">로딩중</div>}>
          <StudyListClient />
        </Suspense>
      </div>
    </main>
  );
}

