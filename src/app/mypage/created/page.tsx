"use client";
import { useEffect, useState } from "react";
import StudyCard from "@/components/common/StudyCard";
import Sidebar from "@/components/common/Sidebar";
import Modal from "@/components/common/Modal";

type Applicant = { name: string; msg?: string };

type CardDTO = {
    id: string;
    name: string;
    variant:
        | "memberOpen"
        | "memberClosed"
        | "leaderOpen"
        | "leaderClosed"
        | "mainOpen"
        | "mainClosed";
    title: string;
    startDate: string;
    endDate: string;
    time: string;
    currentMembers: number;
    maxMembers: number;
    tag: string;
    applicants?: Applicant[];
};

type ApiResp = {
    recruiting: CardDTO[];
    completed: CardDTO[];
};

const DEFAULT_APPLICANTS: Applicant[] = [
    { name: "지원자 1", msg: "함께 하고 싶어요!" },
    { name: "지원자 2", msg: "열심히 하겠습니다!" },
    { name: "지원자 3", msg: "참여하고 싶습니다." },
];

export default function Page() {
    const [isNickOpen, setIsNickOpen] = useState(false);
    const [active, setActive] = useState<"open" | "closed">("open");

    const menuItems = [
        { label: "내가 지원한 스터디", path: "/mypage/applied" },
        { label: "내가 만든 스터디", path: "/mypage/created" },
        { label: "닉네임 변경", onClick: () => setIsNickOpen(true) },
    ];

    const [data, setData] = useState<ApiResp>({ recruiting: [], completed: [] });

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
        <div className="min-h-screen flex flex-col">
        <main className="flex justify-center mt-6 md:mt-[100px]">
            <div className="w-full max-w-[1280px] px-4 flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="w-full md:w-64 md:shrink-0">
                    <Sidebar title="마이페이지" menuItems={menuItems} />
                </div>

                <section className="flex-1 flex flex-col text-[#666] space-y-4 sm:space-y-6">
                    {/* 탭 토글 */}
                    <div className="inline-flex w-full rounded-xl bg-gray-100 p-1">
                        <button
                            onClick={() => setActive("open")}
                            className={`flex-1 rounded-xl px-4 py-2 md:px-5 md:py-3 text-sm md:text-base transition ${
                                active === "open" ? "bg-white shadow text-gray-900" : "text-gray-600"
                            }`}
                        >
                            모집중
                        </button>
                        <button
                            onClick={() => setActive("closed")}
                            className={`flex-1 rounded-xl px-4 py-2 md:px-5 md:py-3 text-sm md:text-base transition ${
                                active === "closed" ? "bg-white shadow text-gray-900" : "text-gray-600"
                            }`}
                        >
                            모집마감
                        </button>
                    </div>

                    {/* 모집중 */}
                    {active === "open" ? (
                        <div className="mt-4 md:mt-6 space-y-4 md:space-y-6 mb-10">
                            {data.recruiting.map((c) => {
                                const applicants = c.applicants?.length ? c.applicants : DEFAULT_APPLICANTS;
                                return (
                                    <div
                                        key={`recruiting-${c.id}`}
                                        className="border border-gray-300 rounded-lg p-4 bg-white
                               flex flex-col lg:flex-row items-start lg:items-stretch
                               gap-4 lg:gap-8"
                                    >
                                        <div className="w-full lg:w-[clamp(240px,35%,320px)]">
                                            <StudyCard {...toCardProps(c)} />
                                        </div>
                                        <div className="w-full lg:flex-1 flex flex-col justify-center gap-3 lg:gap-4 min-w-0">
                                            {applicants.map((a, i) => (
                                                <div
                                                    key={`${c.id}-applicant-${i}`}
                                                    className="flex flex-col md:grid md:grid-cols-[1fr_auto] md:items-center gap-3 py-3"
                                                >
                                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                                        <span className="h-6 w-[2px] bg-green-800 rounded-full" />
                                                        <span className="text-gray-700 whitespace-nowrap shrink-0">
                              {a.name}
                            </span>
                                                        <span className="text-gray-300 shrink-0">|</span>
                                                        <span
                                                            className="text-gray-700 break-keep whitespace-pre-wrap"
                                                            style={{ wordBreak: "keep-all" }}
                                                        >
                              {a.msg ?? "메시지 입력 안 함"}
                            </span>
                                                    </div>
                                                    <div className="flex gap-2 shrink-0 md:self-auto w-full md:w-auto">
                                                        <button
                                                            className="bg-green-900 text-white px-4 py-2 rounded w-full md:w-auto"
                                                            onClick={() => {
                                                                if (confirm("이 지원자를 승인하시겠습니까?")) {
                                                                    alert("승인되었습니다.");
                                                                }
                                                            }}
                                                        >
                                                            승인
                                                        </button>
                                                        <button
                                                            className="border border-green-900 text-green-900 px-4 py-2 rounded w-full md:w-auto"
                                                            onClick={() => {
                                                                if (confirm("이 지원자를 거절하시겠습니까?")) {
                                                                    alert("거절되었습니다.");
                                                                }
                                                            }}
                                                        >
                                                            거절
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                            {data.recruiting.length === 0 && (
                                <p className="text-sm text-gray-500">모집중인 스터디가 없어요.</p>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                            gap-4 sm:gap-6 lg:gap-8 mx-0 sm:mx-5 my-5">
                            {data.completed.map((c) => (
                                <StudyCard key={`completed-${c.id}`} {...toCardProps(c)} />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* 닉네임 모달 */}
            <Modal isOpen={isNickOpen} onClose={() => setIsNickOpen(false)}>
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">닉네임 변경</h3>
                    <NicknameForm onClose={() => setIsNickOpen(false)} />
                </div>
            </Modal>
        </main>
        </div>
    );
}

function NicknameForm({ onClose }: { onClose: () => void }) {
    const [nickname, setNickname] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
