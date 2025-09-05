"use client";
import { useState } from "react";
import StudyCard from "@/components/common/StudyCard";

export default function Page() {
    const [active, setActive] = useState<"open" | "closed">("open");

    return (
        <main className="flex justify-center mt-[100px]">
            <div className="w-full max-w-[1280px] px-4 flex gap-8">
                <aside className="w-80 shrink-0 bg-red-50 h-80">사이드바임</aside>

                <section className="flex-1 flex flex-col text-[#666]">
                    {/* 토글 */}
                    <div className="inline-flex w-full rounded-xl bg-gray-100 p-1">
                        <button
                            onClick={() => setActive("open")}
                            className={`flex-1 rounded-xl px-4 py-2 text-sm transition
                ${active === "open" ? "bg-white shadow text-gray-900" : "text-gray-600"}`}
                        >
                            모집중
                        </button>
                        <button
                            onClick={() => setActive("closed")}
                            className={`flex-1 rounded-xl px-4 py-2 text-sm transition
                ${active === "closed" ? "bg-white shadow text-gray-900" : "text-gray-600"}`}
                        >
                            모집마감
                        </button>
                    </div>

                    {active === "open" ? (
                        <div className="mt-6 border border-gray-300 rounded-lg p-4 flex gap-8 bg-white mb-[50px]">
                            <div className="flex-shrink-0">
                                <StudyCard
                                    variant="leaderOpen"
                                    title="토익 스터디"
                                    startDate={new Date("2025-09-01")}
                                    endDate={new Date("2025-11-30")}
                                    time="월, 수 오후 7시"
                                    currentMembers={3}
                                    maxMembers={8}
                                    tag="외국어"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-center gap-4">
                                {["지원자 1", "지원자 2", "지원자 3"].map((name, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between border-t pt-2 first:border-t-0 first:pt-0"
                                    >
                                        <p className="text-gray-700">
                                            {name} <span className="ml-2">함께 하고 싶어요!</span>
                                        </p>
                                        <div className="flex gap-2">
                                            <button className="bg-green-900 text-white px-3 py-1 rounded">
                                                승인
                                            </button>
                                            <button className="border border-green-900 text-green-900 px-3 py-1 rounded">
                                                거절
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6 mb-[50px]">
                            <StudyCard
                                variant="leaderClosed"
                                title="토익 스터디 (마감)"
                                startDate={new Date("2025-09-01")}
                                endDate={new Date("2025-10-15")}
                                time="월, 수 오후 7시"
                                currentMembers={8}
                                maxMembers={8}
                                tag="외국어"
                            />
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
