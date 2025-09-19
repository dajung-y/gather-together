// app/study/[id]/layout.tsx
import Sidebar from "@/components/common/Sidebar";
import StudySidebar from "@/components/study/StudySidebar";
import clientPromise from "@/lib/mongodb";
import { getUserIdFromSession } from "@/lib/session";
import { getStudyData } from "@/lib/study";
import { MenuItem } from "@/types/sidebar";
import { StudyData } from "@/types/study";
import { ObjectId } from "mongodb";
import { redirect, usePathname } from "next/navigation";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default async function Layout({ children, params }: LayoutProps) {
  const param = await params;
  const studyId = await param.id;

  const userId = await getUserIdFromSession();
  if (!userId) {
    redirect('/');
  }

  const studyData: StudyData = await getStudyData(studyId);

  const studyTitle = studyData.studyName;
  const isLeader = studyData.members.some((m) => m.userId === userId && m.role === "leader");

  // 메뉴 생성
  return (
    <div className="min-h-screen flex flex-col lg:flex-row max-w-[1280px] mx-auto">
      <StudySidebar studyId={studyId} studyTitle={studyTitle} isLeader={isLeader} />
      <div className="flex-1 flex justify-center">
        <div className="w-full p-4 flex flex-col">
          {children}
        </div>
      </div>
    </div>

  );
}
