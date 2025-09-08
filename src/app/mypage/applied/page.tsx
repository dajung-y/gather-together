"use client";
import { useEffect, useState } from "react";
import StudyCard from "@/components/common/StudyCard";
import Sidebar from "@/components/common/Sidebar";
import Modal from "@/components/common/Modal";

type CardDTO = {
    id: string;
    name: string;
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
    const [isNickOpen, setIsNickOpen] = useState(false);

    const menuItems = [
        { label: "내가 지원한 스터디", path: "/mypage/applied" },
        { label: "내가 만든 스터디", path: "/mypage/created" },
        { label: "닉네임 변경", path: "/mypage/setting" },
    ];

    const [data, setData] = useState<ApiResp>({ approved: [], pending: [], rejected: [] });

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/mypage/studycards", { cache: "no-store" });
            const json: ApiResp = await res.json();
            setData(json);
        })();
    }, []);

    const toCardProps = (c: CardDTO) => ({
        variant: c.variant,
        name: c.name,
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
                <Sidebar
                    title="마이페이지"
                    menuItems={menuItems}
                />

                <section className="flex-1 flex flex-col text-[#666]">
                    {/* 승인완료 */}
                    <h1 className="text-xl mb-2">승인완료</h1>
                    <hr className="mt-2 mb-6 w-full border-t-2 border-gray-300"/>
                    <div className="flex gap-8 flex-wrap">
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
            <Modal isOpen={isNickOpen} onClose={() => setIsNickOpen(false)}>
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">닉네임 변경</h3>
                    <NicknameForm onClose={() => setIsNickOpen(false)} />
                </div>
            </Modal>
        </main>
    );
}

function NicknameForm({ onClose }: { onClose: () => void }) {
    const [nickname, setNickname] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: 닉네임 변경 API 연동
        alert(`닉네임이 "${nickname}"(으)로 변경되었습니다!`);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                className="w-full border rounded-md px-3 py-2"
                placeholder="새 닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    className="px-3 py-2 rounded-md border"
                    onClick={onClose}
                >
                    취소
                </button>
                <button
                    type="submit"
                    className="px-3 py-2 rounded-md bg-[#264B1D] text-white"
                >
                    저장
                </button>
            </div>
        </form>
    );
}
