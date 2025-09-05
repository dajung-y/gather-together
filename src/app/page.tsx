import Carousel from "@/components/main/Carousel";

export default function Home() {

  return (
    <main className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-[1280px] px-4">
        <section className="py-4">
          <Carousel />
        </section>
      </div>
    </main>
  );
}
