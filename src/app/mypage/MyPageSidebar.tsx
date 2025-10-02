"use client";

import Sidebar from "@/components/common/Sidebar";
import { usePathname, useRouter } from "next/navigation";

export default function MyPageSidebar({ title = "마이페이지" }: { title?: string }) {
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { label: "내가 지원한 스터디", path: "/mypage/applied" },
        { label: "내가 만든 스터디", path: "/mypage/created" },
        { label: "닉네임 변경", onClick: () => router.replace(`${pathname}?modal=nickname`, { scroll: false }) },
    ];

    return <Sidebar title={title} menuItems={menuItems} />;
}
