import MemberList from "@/components/study/main/MemberList";
import UserDelete from "@/components/study/main/UserDelete";
import clientPromise from "@/lib/mongodb";
import { getUserIdFromSession } from "@/lib/session";
import { StudyData } from "@/types/study";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

// page

export default async function page({ params }: { params: { id: string } }) {
  const param = await params;
  const studyId = await param.id;

  //SSR에서 api fetch 쓰면 getSession 정보 읽기 불가능
  //SSR에서는 바로 호출이 나음
  const userId = await getUserIdFromSession();
  if (!userId) {
    redirect('/');
  }

  const client = await clientPromise;
  const db = client.db();

  const study = await db.collection("studies").findOne({ _id: new ObjectId(studyId) });
  const studyData: StudyData = JSON.parse(JSON.stringify(study));

  return (
    <>
      <div className="
        max-w-[1280px] mx-auto 
        px-4 py-3            
        sm:px-4 sm:py-3        
        md:px-6 md:py-3        
        lg:px-8 lg:py-4 
      ">
        {/* 유저 */}
        <p className="headline4 text-primary-500 my-4">유저</p>
        <div className="flex gap-2">
          <MemberList studyId={studyId} memberData={studyData.members} />
          {/* {studyData.members?.map((member, index) => (
            <UserDelete name={member.nickname} key={index} />
          ))}
          <UserDelete name="김훈정" />
          <UserDelete name="문지현" />
          <UserDelete name="윤다정" /> */}
        </div>
        <div className="h-12"></div>
        {/* 스터디 시간 */}
        <p className="headline4 text-primary-500 my-4">스터디 시간</p>
        <div className="flex gap-2 items-center">
          <span>요일</span>
          <div className="flex gap-2 mt-2">


          </div>
        </div>
      </div>
    </>
  )
}
