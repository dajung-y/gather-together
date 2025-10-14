"use client";
import { useEffect, useState } from "react";
import StudyCard from "@/components/common/StudyCard";
import Sidebar from "@/components/common/Sidebar";

type CardDTO = {
    id: string;
    variant: "memberOpen" | "memberClosed" | "leaderOpen" | "leaderClosed" | "mainOpen" | "mainClosed";
    title: string;
    startDate: string;
    endDate: string;
    time: string;
    currentMembers: number;
    maxMembers: number;
    tag: string;
};

type ApiResp = {
    approved: CardDTO[];
    pending: CardDTO[];
    rejected: CardDTO[];
};

export default function Page() {
    const menuItems = [
        { label: "내가 지원한 스터디", path: "/mypage/applied" },
        { label: "내가 만든 스터디", path: "/mypage/created" },
        { label: "닉네임 변경", path: "/mypage/setting" },
    ];

    const [data, setData] = useState<ApiResp>({ approved: [], pending: [], rejected: [] });

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/studycards/mypage", { cache: "no-store" });
            const json: ApiResp = await res.json();
            setData(json);
        })();
    }, []);

    const toCardProps = (c: CardDTO) => ({
        variant: c.variant,
        title: c.title,
        startDate: new Date(c.startDate),
        endDate: new Date(c.endDate),
        time: c.time,
        currentMembers: c.currentMembers,
        maxMembers: c.maxMembers,
        tag: c.tag,
    });

    return (
        <main className="flex justify-center mt-[100px]">
            <div className="w-full max-w-[1280px] px-4 flex gap-40">
                <Sidebar title="마이페이지" menuItems={menuItems} />

                <section className="flex-1 flex flex-col text-[#666]">
                    {/* 승인완료 */}
                    <h1 className="text-xl mb-2">승인완료</h1>
                    <hr className="mt-2 mb-6 w-full border-t-2 border-gray-300"/>
                    <div className="flex gap-8 flex-wrap ml-[10px]">
                        {data.approved.map((c) => (
                            <StudyCard key={`approved-${c.id}`} {...toCardProps(c)} />
                        ))}
                    </div>

                    {/* 승인대기 */}
                    <h1 className="text-xl mt-12 mb-2">승인대기</h1>
                    <hr className="mt-2 mb-6 w-full border-t-2 border-gray-300"/>
                    <div className="flex gap-8 flex-wrap ml-[10px]">
                        {data.pending.map((c) => (
                            <StudyCard key={`pending-${c.id}`} {...toCardProps(c)} />
                        ))}
                    </div>

                    {/* 승인거절 */}
                    <h1 className="text-xl mt-12 mb-2">승인거절</h1>
                    <hr className="mt-2 mb-6 w-full border-t-2 border-gray-300"/>
                    <div className="flex gap-5 flex-wrap mb-[50px] ml-[10px]">
                        {data.rejected.map((c) => (
                            <StudyCard key={`rejected-${c.id}`} {...toCardProps(c)} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
