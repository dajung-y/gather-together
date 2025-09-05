"use client";
import StudyCard from "@/components/common/StudyCard";

export default function Page() {


    return (
        <main className="flex justify-center mt-[100px]">
            <div className="w-full max-w-[1280px] px-4 flex gap-40">
                <aside className="w-80 shrink-0 bg-red-50 h-80">사이드바임</aside>

                <section className="flex-1 flex flex-col text-[#666] mb-50">
                    <h1 className="text-xl mb-2">승인완료</h1>
                    <hr className="mt-2 mb-6 w-full border-t-2 border-gray-300"/>

                    <div className="flex gap-5 flex-wrap">
                        <StudyCard
                            variant="memberOpen"
                            title="토익 스터디"
                            startDate={new Date("2025-09-01")}
                            endDate={new Date("2025-11-30")}
                            time="월, 수 오후 7시"
                            currentMembers={3}
                            maxMembers={8}
                            tag="외국어"
                        />
                        <StudyCard
                            variant="memberOpen"
                            title="토익 스터디"
                            startDate={new Date("2025-09-01")}
                            endDate={new Date("2025-11-30")}
                            time="월, 수 오후 7시"
                            currentMembers={3}
                            maxMembers={8}
                            tag="외국어"
                        />
                    </div>

                    <h1 className="text-xl mt-12 mb-2">승인대기</h1>
                    <hr className="mt-2 mb-6 w-full border-t-2 border-gray-300"/>
                    <div className="flex gap-5 flex-wrap">
                        <StudyCard
                            variant="memberClosed"
                            title="토익 스터디"
                            startDate={new Date("2025-09-01")}
                            endDate={new Date("2025-11-30")}
                            time="월, 수 오후 7시"
                            currentMembers={3}
                            maxMembers={8}
                            tag="외국어"
                        />
                        <StudyCard
                            variant="memberClosed"
                            title="토익 스터디"
                            startDate={new Date("2025-09-01")}
                            endDate={new Date("2025-11-30")}
                            time="월, 수 오후 7시"
                            currentMembers={3}
                            maxMembers={8}
                            tag="외국어"
                        />
                    </div>

                    <h1 className="text-xl mt-12 mb-2">승인거절</h1>
                    <hr className="mt-2 mb-6 w-full border-t-2 border-gray-300"/>
                    <div className="flex gap-5 flex-wrap">
                        <StudyCard
                            variant="memberClosed"
                            title="토익 스터디"
                            startDate={new Date("2025-09-01")}
                            endDate={new Date("2025-11-30")}
                            time="월, 수 오후 7시"
                            currentMembers={3}
                            maxMembers={8}
                            tag="외국어"
                        />
                        <StudyCard
                            variant="memberClosed"
                            title="토익 스터디"
                            startDate={new Date("2025-09-01")}
                            endDate={new Date("2025-11-30")}
                            time="월, 수 오후 7시"
                            currentMembers={3}
                            maxMembers={8}
                            tag="외국어"
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}
