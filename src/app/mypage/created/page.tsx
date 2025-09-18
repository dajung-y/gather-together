"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import StudyCard from "@/components/common/StudyCard";
import Sidebar from "@/components/common/Sidebar";
import Modal from "@/components/common/Modal";

type ApiListResp = { items?: any[]; data?: any[] };

type Applicant = { userId?: string; name: string; msg?: string };

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
    isRecruiting?: boolean;
    applicants?: Applicant[];
};

type SplitResp = {
    recruiting: CardDTO[];
    completed: CardDTO[];
};

const pickList = (j: ApiListResp): any[] => j.items ?? j.data ?? [];

const getStartDate = (s: any) => s?.period?.startDate ?? s?.startDate ?? "";
const getEndDate = (s: any) => s?.period?.endDate ?? s?.endDate ?? "";
const getStartTime = (s: any) => s?.schedule?.startTime ?? s?.startTime ?? "";
const getEndTime = (s: any) => s?.schedule?.endTime ?? s?.endTime ?? "";
const getStatus = (s: any): "RECRUITING" | "CLOSED" =>
    s?.status ?? (s?.isRecruiting ? "RECRUITING" : "CLOSED");
const getCurrentMembers = (s: any) =>
    typeof s?.currentMembers === "number" ? s.currentMembers : (s?.members?.length ?? 0);
const getId = (s: any) => String(s?.studyId ?? s?._id ?? s?.id ?? "");
const getName = (s: any) => String(s?.studyName ?? s?.name ?? "");
const getTitle = (s: any) => String(s?.title ?? "");
const getCapacity = (s: any) =>
    typeof s?.capacity === "number" ? s.capacity : Number(s?.capacity ?? 0);
const getCategory = (s: any) => String(s?.category ?? "");

export default function Page() {
    const { data: session, status } = useSession(); // ✅ 세션에서 user.id 사용
    const [isNickOpen, setIsNickOpen] = useState(false);
    const [active, setActive] = useState<"open" | "closed">("open");
    const [data, setData] = useState<SplitResp>({ recruiting: [], completed: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const menuItems = [
        { label: "내가 지원한 스터디", path: "/mypage/applied" },
        { label: "내가 만든 스터디", path: "/mypage/created" },
        { label: "닉네임 변경", onClick: () => setIsNickOpen(true) },
    ];

    const mapToCard = (s: any): CardDTO => {
        const status = getStatus(s);
        const variant = status === "RECRUITING" ? ("leaderOpen" as const) : ("leaderClosed" as const);

        const startDate = getStartDate(s);
        const endDate = getEndDate(s);
        const startTime = getStartTime(s);
        const endTime = getEndTime(s);

        return {
            id: getId(s),
            name: getName(s),
            variant,
            title: getTitle(s),
            startDate,
            endDate,
            time: [startTime, endTime].filter(Boolean).join(" ~ "),
            currentMembers: getCurrentMembers(s),
            maxMembers: getCapacity(s),
            tag: getCategory(s),
            isRecruiting: status === "RECRUITING",
            // applicants: s.applicants?.map()
        };
    };

    const fetchData = async (creatorId: string) => {
        setLoading(true);
        setError(null);
        try {
            const qsOpen = new URLSearchParams({
                isRecruiting: "true",
                creatorId,
            }).toString();

            const qsClosed = new URLSearchParams({
                isRecruiting: "false",
                creatorId,
            }).toString();

            const [openRes, closedRes] = await Promise.all([
                fetch(`/api/mypage/groups?${qsOpen}`, { cache: "no-store", credentials: "include" }),
                fetch(`/api/mypage/groups?${qsClosed}`, { cache: "no-store", credentials: "include" }),
            ]);

            if (!openRes.ok) {
                const t = await openRes.text().catch(() => "");
                console.error("OPEN /api/group error:", openRes.status, t);
                throw new Error(`API error(open): ${openRes.status}`);
            }
            if (!closedRes.ok) {
                const t = await closedRes.text().catch(() => "");
                console.error("CLOSED /api/group error:", closedRes.status, t);
                throw new Error(`API error(closed): ${closedRes.status}`);
            }

            const openJson: ApiListResp = await openRes.json();
            const closedJson: ApiListResp = await closedRes.json();

            setData({
                recruiting: pickList(openJson).map(mapToCard),
                completed: pickList(closedJson).map(mapToCard),
            });
        } catch (e) {
            const msg = e instanceof Error ? e.message : "데이터 로드 실패";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === "loading") return;
        const userId = (session as any)?.user?.id;
        if (!userId) {
            setLoading(false);
            setError(null);
            setData({ recruiting: [], completed: [] });
            return;
        }
        fetchData(userId);
    }, [status, session?.user?.id]);

    const toCardProps = (c: CardDTO) => ({
        studyId: c.id,
        variant: c.variant,
        name: c.name,
        title: c.title,
        startDate: new Date(c.startDate),
        endDate: new Date(c.endDate),
        time: c.time,
        currentMembers: c.currentMembers,
        maxMembers: c.maxMembers,
        tag: c.tag,
        isRecruiting: c.isRecruiting,
    });

    const list = active === "open" ? data.recruiting : data.completed;

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

                        {/* 상태 표시 */}
                        {loading && <p>불러오는 중...</p>}
                        {error && <p className="text-red-500">에러: {error}</p>}

                        {/* 모집중 / 모집마감 */}
                        {!loading && !error && (
                            active === "open" ? (
                                <div className="mt-4 md:mt-6 space-y-4 md:space-y-6 mb-10">
                                    {list.map((c) => {
                                        const applicants = c.applicants ?? [];
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
                                                    {applicants.length === 0 ? (
                                                        <p className="text-gray-500">대기 중인 지원자가 없어요.</p>
                                                    ) : (
                                                        applicants.map((a, i) => (
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
                                    {a.msg ?? "메시지 없음"}
                                  </span>
                                                                </div>
                                                                <div className="flex gap-2 shrink-0 md:self-auto w-full md:w-auto">
                                                                    <button className="bg-green-900 text-white px-4 py-2 rounded w-full md:w-auto" disabled>
                                                                        승인
                                                                    </button>
                                                                    <button className="border border-green-900 text-green-900 px-4 py-2 rounded w-full md:w-auto" disabled>
                                                                        거절
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {list.length === 0 && (
                                        <p className="text-sm text-gray-500">모집중인 스터디가 없어요.</p>
                                    )}
                                </div>
                            ) : (
                                <div
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                  gap-4 sm:gap-6 lg:gap-8 mx-0 sm:mx-5 my-5"
                                >
                                    {list.map((c) => (
                                        <StudyCard key={`completed-${c.id}`} {...toCardProps(c)} />
                                    ))}
                                </div>
                            )
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
                <button type="button" className="px-3 py-2 rounded-md border" onClick={onClose}>
                    취소
                </button>
                <button type="submit" className="px-3 py-2 rounded-md bg-[#264B1D] text-white">
                    저장
                </button>
            </div>
        </form>
    );
}
