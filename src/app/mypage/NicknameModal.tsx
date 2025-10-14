"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import Modal from "@/components/common/Modal";

export default function NicknameModal() {
    const search = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const isOpen = search.get("modal") === "nickname";

    const [nickname, setNickname] = useState("");
    const [working, setWorking] = useState(false);
    const [errMsg, setErrMsg] = useState<string | null>(null);

    const buildNextUrl = () => {
        const p = new URLSearchParams(search.toString());
        p.delete("modal");
        return p.toString() ? `${pathname}?${p.toString()}` : pathname;
    };

    const close = () => {
        router.replace(buildNextUrl(), { scroll: false });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = nickname.trim();
        if (!trimmed || trimmed.length > 10) {
            setErrMsg("닉네임은 1~10자여야 합니다.");
            return;
        }
        setWorking(true);
        setErrMsg(null);

        try {
            const res = await fetch("/api/mypage/nickname", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ nickname: trimmed }),
            });
            if (!res.ok) {
                const t = await res.text().catch(() => "");
                throw new Error(t || "닉네임 변경 실패");
            }
            window.dispatchEvent(new Event("nickname-updated"));
            toast.success("닉네임 변경이 완료되었습니다!");
            close();
            router.refresh();
        } catch (err: any) {
            const msg = err?.message ?? "닉네임 변경 실패";
            setErrMsg(msg);
            toast.error(msg);
        } finally {
            setWorking(false);
        }
    };

    useEffect(() => {
        if (isOpen) setErrMsg(null);
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={() => !working && close()}>
            <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">닉네임 변경</h3>
                <form onSubmit={onSubmit} className="space-y-3">
                    <input
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="새 닉네임 (최대 10자)"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value.slice(0, 10))}
                        maxLength={10}
                        disabled={working}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>최대 10자</span>
                        <span>{nickname.length}/10</span>
                    </div>

                    {errMsg && <p className="text-sm text-red-600">{errMsg}</p>}

                    <div className="flex justify-end gap-2 pt-1">
                        <button
                            type="button"
                            className="px-3 py-2 rounded-md border"
                            onClick={close}
                            disabled={working}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-2 rounded-md bg-[#264B1D] text-white disabled:opacity-60"
                            disabled={working || !nickname.trim()}
                        >
                            {working ? "저장 중..." : "저장"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
