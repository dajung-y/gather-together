import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StudyForm from "@/components/study/create/StudyForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page(){

  // 로그아웃 후 접근 불가
  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/");
  }

  return(
    <main className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-5xl mb-12 p-4 space-y-12">
        {/* 스터디 헤더 */}
        <div className="
          w-full flex flex-col space-y-3 items-center
          mt-4 mb-8 
          lg:my-8 
        ">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary-700 text-center">
            스터디 만들기
          </h1>
          <p className="body text-gray-500 text-center">
            함께 학습할 스터디를 생성하세요
          </p>
        </div>
        <StudyForm />
      </div>
    </main>
  )
}
 
