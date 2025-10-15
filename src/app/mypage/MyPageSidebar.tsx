"use client";

import React from "react";
import Sidebar from "@/components/common/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function MyPageSidebar() {
    const { data } = useSession();
    const nickname =
        (data?.user as any)?.nickname ??
        (data?.user as any)?.name ??
        "게스트";

    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { label: "내가 지원한 스터디", path: "/mypage/applied" },
        { label: "내가 만든 스터디", path: "/mypage/created" },
        { label: "닉네임 변경", onClick: () => router.replace(`${pathname}?modal=nickname`, { scroll: false }) },
    ];

    return (
        <Sidebar
            title={`${nickname}\n마이페이지`}
            menuItems={menuItems}
        />
    );
}
