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

  return(
    <>
    {hideSidebar ? (
      <div className="min-h-screen flex flex-col">{children}</div>
    ) : (
      <div className="min-h-screen flex flex-col lg:flex-row max-w-[1280px] mx-auto">
        {/* Sidebar */}
        <div className="w-full lg:w-64">
          <Sidebar menuItems={menuItems} title="Study Room" />
        </div>
        {/* Main content */}
        <div className="flex-1 flex justify-center">
          <div className="w-full p-4 flex flex-col">
            {children}
          </div>
        </div>
      </div>
    )}
  </>
  )

  // return (
  //   <div>
  //     {!hideSidebar && (
  //       <div className="flex justify-center 2xl:fixed 2xl:top-20 2xl:left-0 z-[100]">
  //         <Sidebar title={`Study Room`} menuItems={menuItems} />
  //       </div>
  //     )}
  //     <div className="min-h-screen">{children}</div>
  //   </div>
  // );
}
