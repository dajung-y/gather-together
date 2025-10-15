// app/study/[id]/layout.tsx
import MemberCheck from "@/components/study/main/MemberCheck";
import StudySidebar from "@/components/study/StudySidebar";
import { getUserIdFromSession } from "@/lib/session";
import { getStudyData } from "@/lib/study";
import { StudyData } from "@/types/study";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default async function Layout({ children, params }: LayoutProps) {
  const param = await params;
  const studyId = await param.id;

  const userId = await getUserIdFromSession();
  if (!userId) {

  }

  const studyData: StudyData = await getStudyData(studyId);

  const studyTitle = studyData.studyName;
  const isMember = studyData.members.some(member => String(member.userId) == String(userId));
  const isLeader = studyData.members.some(member => member.role === "leader" && member.userId === userId);

  for (const member of studyData.members)
    console.log(member.userId + "," + String(userId));
  console.log("멤버인가?: " + isMember);
  // 메뉴 생성
  return (
    <div className="min-h-screen flex flex-col lg:flex-row max-w-[1280px] mx-auto relative">
      <StudySidebar studyId={studyId} userId={userId} studyTitle={studyTitle} isLeader={isLeader} />
      <div className="flex-1 flex justify-center">
        <div className="w-full p-4 flex flex-col">
          {children}
        </div>
      </div>
      <MemberCheck isMember={isMember} />
    </div>
  );
}
