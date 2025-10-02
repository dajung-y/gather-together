"use client";

import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Modal from "@/components/common/Modal";

export default function NicknameModal() {
    const search = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const isOpen = search.get("modal") === "nickname";

    const [nickname, setNickname] = useState("");
    const [working, setWorking] = useState(false);

    const close = () => router.replace(pathname, { scroll: false });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nickname.trim()) return;
        setWorking(true);
        try {
            const res = await fetch("/api/users/me/nickname", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ nickname }),
            });
            if (!res.ok) throw new Error(await res.text().catch(() => "닉네임 변경 실패"));
            close();
        } catch (err: any) {
            alert(err?.message ?? "닉네임 변경 실패");
        } finally {
            setWorking(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={() => !working && close()}>
            <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">닉네임 변경</h3>
                <form onSubmit={onSubmit} className="space-y-4">
                    <input
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="새 닉네임"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        disabled={working}
                    />
                    <div className="flex justify-end gap-2">
                        <button type="button" className="px-3 py-2 rounded-md border" onClick={close} disabled={working}>
                            취소
                        </button>
                        <button type="submit" className="px-3 py-2 rounded-md bg-[#264B1D] text-white" disabled={working}>
                            {working ? "저장 중..." : "저장"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
