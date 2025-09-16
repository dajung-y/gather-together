"use client"
import Sidebar, { handleLeaveRoom } from "@/components/common/Sidebar";
import { MenuItem } from "@/types/sidebar";
import { usePathname, useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const studyId = params?.id;

  const hideSidebar = pathname.includes('/about') || pathname.includes('/edit');

  const menuItems: MenuItem[] = [
    // 링크 이동
    { label: '메인', path: `/study/${studyId}` },
    { label: '일정', path: `/study/${studyId}/todo` },
    { label: '설정', path: `/study/${studyId}/setting` },

    // 함수 실행
    { label: '탈퇴하기', onClick: handleLeaveRoom },
  ];

  return (
    <div>
      {!hideSidebar && (
        <div className="fixed top-2 left-0 z-[100]">
          <Sidebar title={`Study Room`} menuItems={menuItems} />
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
