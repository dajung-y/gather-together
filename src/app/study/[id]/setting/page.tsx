import UserDelete from "@/components/study/UserDelete";

// page
export default function page() {
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
          <UserDelete name="김훈정" />
          <UserDelete name="문지현" />
          <UserDelete name="윤다정" />
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
