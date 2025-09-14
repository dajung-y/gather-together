import Carousel from "@/components/main/Carousel";
import StudyListClient from "@/components/main/StudyListClient";

export default function Home() {

  return (
    <main className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-[1280px] px-4">
        {/* 캐러셀 */}
        <section className="py-4">
          <Carousel />
        </section>
        <StudyListClient />
      </div>
    </main>
  );
}

