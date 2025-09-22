"use client";
import { useEffect, useState } from "react";
import StudyCard from "@/components/common/StudyCard";
import Sidebar from "@/components/common/Sidebar";
import Modal from "@/components/common/Modal";
import { getCategoryLabel } from "@/utils/category";
import { useSession } from "next-auth/react";

type StudyItem = {
    studyId: string;
    studyName: string;
    title: string;
    status: "APPROVED" | "PENDING" | "REJECTED";
    isRecruiting: boolean;
    capacity: number;
    currentMembers: number;
    createdAt: string;
    period: { startDate: string; endDate: string };
    schedule: { weekdays: string[]; startTime: string; endTime: string };
    category: string;
};
type ApiListResp = { items: StudyItem[] };

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
};

type ApiResp = {
    approved: CardDTO[];
    pending: CardDTO[];
    rejected: CardDTO[];
};

export default function Page() {
    const [isNickOpen, setIsNickOpen] = useState(false);
    const [data, setData] = useState<ApiResp>({ approved: [], pending: [], rejected: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 삭제 모달
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmTarget, setConfirmTarget] = useState<{ id: string; section: "pending" | "rejected" } | null>(null);
    const [working, setWorking] = useState(false);

    const { data: session, status } = useSession();
    const meId =
        ((session?.user as any)?.id || (session?.user as any)?.userId || "").trim();

    const menuItems = [
        { label: "내가 지원한 스터디", path: "/mypage/applied" },
        { label: "내가 만든 스터디", path: "/mypage/created" },
        { label: "닉네임 변경", onClick: () => setIsNickOpen(true) },
    ];

    const mapToCard = (s: StudyItem, section: "approved" | "pending" | "rejected"): CardDTO => {
        const startDate = s.period?.startDate ?? (s as any).startDate ?? "";
        const endDate = s.period?.endDate ?? (s as any).endDate ?? "";
        const startTime = s.schedule?.startTime ?? (s as any).startTime ?? "";
        const endTime = s.schedule?.endTime ?? (s as any).endTime ?? "";
        const variant = section === "approved" ? ("memberOpen" as const) : ("memberClosed" as const);

        return {
            id: s.studyId,
            name: s.studyName,
            variant,
            title: s.title,
            startDate,
            endDate,
            time: [startTime, endTime].filter(Boolean).join(" ~ "),
            currentMembers: s.currentMembers,
            maxMembers: s.capacity,
            tag: s.category,
        };
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const [aRes, pRes, rRes] = await Promise.all([
                    fetch("/api/mypage/applied?status=approved", { cache: "no-store", credentials: "include" }),
                    fetch("/api/mypage/applied?status=pending", { cache: "no-store", credentials: "include" }),
                    fetch("/api/mypage/applied?status=rejected", { cache: "no-store", credentials: "include" }),
                ]);

                if (!aRes.ok || !pRes.ok || !rRes.ok) {
                    const at = await aRes.text().catch(() => "");
                    const pt = await pRes.text().catch(() => "");
                    const rt = await rRes.text().catch(() => "");
                    console.error("APPLIED fetch error:", aRes.status, at, pRes.status, pt, rRes.status, rt);
                    throw new Error("applied api error");
                }

                const [aJson, pJson, rJson]: [ApiListResp, ApiListResp, ApiListResp] = await Promise.all([
                    aRes.json(),
                    pRes.json(),
                    rRes.json(),
                ]);

                setData({
                    approved: (aJson.items ?? []).map((s) => mapToCard(s, "approved")),
                    pending: (pJson.items ?? []).map((s) => mapToCard(s, "pending")),
                    rejected: (rJson.items ?? []).map((s) => mapToCard(s, "rejected")),
                });
            } catch (e: any) {
                setError(e?.message ?? "데이터 로드 실패");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

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
        tag: getCategoryLabel(c.tag),
    });

    const openConfirm = (section: "pending" | "rejected", id: string) => {
        setConfirmTarget({ id, section });
        setConfirmOpen(true);
    };

    // 삭제
    const doRemove = async () => {
        if (!confirmTarget) return;

        if (status !== "authenticated" || !meId) {
            alert("로그인이 필요합니다.");
            return;
        }

        setWorking(true);
        try {
            const url = `/api/mypage/applied/${confirmTarget.id}?userId=${encodeURIComponent(meId)}`;
            const res = await fetch(url, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) {
                const t = await res.text().catch(() => "");
                console.error("DELETE /api/mypage/applied/[id] error:", res.status, t);
                throw new Error("삭제 실패");
            }
            setData((prev) => ({
                ...prev,
                pending:
                    confirmTarget.section === "pending"
                        ? prev.pending.filter((x) => x.id !== confirmTarget.id)
                        : prev.pending,
                rejected:
                    confirmTarget.section === "rejected"
                        ? prev.rejected.filter((x) => x.id !== confirmTarget.id)
                        : prev.rejected,
            }));
            setConfirmOpen(false);
            setConfirmTarget(null);
        } catch (e) {
            alert((e as any)?.message ?? "삭제 실패");
        } finally {
            setWorking(false);
        }
    };

    return (
        <main className="flex justify-center mt-6 md:mt-[100px]">
            <div className="w-full max-w-[1280px] px-4 flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="w-full md:w-64 md:shrink-0">
                    <Sidebar title="마이페이지" menuItems={menuItems} />
                </div>

                <section className="flex-1 flex flex-col text-[#666] space-y-6">
                    {loading && <p>불러오는 중...</p>}
                    {error && <p className="text-red-500">에러: {error}</p>}

                    {!loading && !error && (
                        <>
                            {/* 승인완료 */}
                            <div>
                                <h1 className="text-lg sm:text-xl mb-2">승인완료</h1>
                                <hr className="mt-2 mb-4 sm:mb-6 w-full border-t border-gray-300" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mx-0 sm:mx-5 mb-5">
                                    {data.approved.map((c) => (
                                        <StudyCard key={`approved-${c.id}`} {...toCardProps(c)} />
                                    ))}
                                    {data.approved.length === 0 && (
                                        <p className="text-sm text-gray-500">승인완료 스터디가 없어요.</p>
                                    )}
                                </div>
                            </div>

                            {/* 승인대기 */}
                            <div>
                                <h1 className="text-lg sm:text-xl mb-2">승인대기</h1>
                                <hr className="mt-2 mb-4 sm:mb-6 w-full border-t border-gray-300" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mx-0 sm:mx-5 mb-5">
                                    {data.pending.map((c) => (
                                        <div key={`pending-${c.id}`} className="relative">
                                            <StudyCard {...toCardProps(c)} />
                                            {/* 투명 오버레이: 상세 이동 완전 차단 */}
                                            <button
                                                type="button"
                                                className="absolute inset-0 z-10 cursor-pointer bg-transparent"
                                                aria-label="지원 취소 모달 열기"
                                                onClick={() => openConfirm("pending", c.id)}
                                            />
                                        </div>
                                    ))}
                                    {data.pending.length === 0 && (
                                        <p className="text-sm text-gray-500">대기 중인 스터디가 없어요.</p>
                                    )}
                                </div>
                            </div>

                            {/* 승인거절 */}
                            <div>
                                <h1 className="text-lg sm:text-xl mb-2">승인거절</h1>
                                <hr className="mt-2 mb-4 sm:mb-6 w-full border-t border-gray-300" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mx-0 sm:mx-5 mb-10">
                                    {data.rejected.map((c) => (
                                        <div key={`rejected-${c.id}`} className="relative">
                                            <StudyCard {...toCardProps(c)} />
                                            <button
                                                type="button"
                                                className="absolute inset-0 z-10 cursor-pointer bg-transparent"
                                                aria-label="지원 삭제 모달 열기"
                                                onClick={() => openConfirm("rejected", c.id)}
                                            />
                                        </div>
                                    ))}
                                    {data.rejected.length === 0 && (
                                        <p className="text-sm text-gray-500">거절된 스터디가 없어요.</p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </div>

            {/* 닉네임 변경 모달 */}
            <Modal isOpen={isNickOpen} onClose={() => setIsNickOpen(false)}>
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">닉네임 변경</h3>
                    <NicknameForm onClose={() => setIsNickOpen(false)} />
                </div>
            </Modal>

            {/* 지원 취소/삭제 모달 */}
            <Modal isOpen={confirmOpen} onClose={() => !working && setConfirmOpen(false)}>
                <div className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold">
                        {confirmTarget?.section === "pending" ? "지원을 취소하시겠습니까?" : "지원을 삭제하시겠습니까?"}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {confirmTarget?.section === "pending"
                            ? "취소하면 리스트에서 제거됩니다."
                            : "삭제하면 리스트에서 제거됩니다."}
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            className="px-3 py-2 rounded-md border"
                            onClick={() => !working && setConfirmOpen(false)}
                            disabled={working}
                        >
                            닫기
                        </button>
                        <button
                            className="px-3 py-2 rounded-md bg-red-600 text-white disabled:opacity-60"
                            onClick={doRemove}
                            disabled={working}
                        >
                            {working ? "처리중..." : "삭제"}
                        </button>
                    </div>
                </div>
            </Modal>
        </main>
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
