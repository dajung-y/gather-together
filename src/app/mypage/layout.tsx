import type { ReactNode } from "react";
import MyPageSidebar from "@/app/mypage/MyPageSidebar";
import NicknameModal from "@/app/mypage/NicknameModal";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="mx-auto max-w-[1280px] min-h-screen flex bg-white">
            <aside className="w-72 shrink-0 bg-white lg:sticky lg:top-0 lg:h-screen">
                <MyPageSidebar/>
            </aside>

            <main className="flex-1 min-w-0 p-2">
                {children}
            </main>

            <NicknameModal />
        </div>
    );
}
