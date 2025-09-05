import Button from "@/components/common/Button";

type TodoPageProps = {
  params: { id: string };
}

export default function page({ params }: TodoPageProps) {

  return (
    <>
      <div className="
        max-w-[1280px] mx-auto 
        px-4 py-3            
        sm:px-4 sm:py-3        
        md:px-6 md:py-3        
        lg:px-8 lg:py-4 
      ">
        {/* 할 일 추가 */}
        <div className="my-4">
          <p className="headline3 text-primary-500">할 일 추가</p>
          <div className="flex gap-2 my-2">
            <input type="date" name="" id="" className="border border-gray-300" />
            <input type="text" className="border border-gray-300 w-96" placeholder="TODO" />
            <div className="w-16">
              <Button >추가</Button>
            </div>
          </div>
        </div>
        {/* 일정 */}
        <div className="flex">
          <div className="flex-3">
            <div className="flex items-center border-b h-6">
              <span className="px-4 w-32 text-center">마감</span>
              <span className="border-l border-r px-4 flex-1 text-center">일정</span>
            </div>
            <div className="flex items-center h-max">
              <div className="flex w-32 justify-center">
                <span className="px-1">N</span>
                <span className="px-2">25.08.03</span>
              </div>
              <span className="border-l border-r px-4 flex-1 ">다음주까지 문제집 12p-14p 풀어오기! 채점포함</span>
            </div>
            <div className="flex items-center h-max">
              <div className="flex w-32 justify-center">
                <span className="px-1">N</span>
                <span className="px-2">25.08.04</span>
              </div>
              <span className="border-l border-r px-4 flex-1 ">단어 13day</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col min-w-0 ">
            <div className="overflow-x-auto h-full">
              <div className="flex min-w-max">
                <div className="flex flex-col items-center">
                  <span className="px-4 border-b h-6">김훈정</span>
                  <input type="checkbox" className="mt-2" />
                  <input type="checkbox" className="mt-2" />

                </div>
                <div className="flex flex-col items-center">
                  <span className="px-4 border-b h-6">문지현</span>
                  <input type="checkbox" className="mt-2" />
                  <input type="checkbox" className="mt-2" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="px-4 border-b h-6">윤다정</span>
                  <input type="checkbox" className="mt-2" />
                  <input type="checkbox" className="mt-2" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div >
    </>
  )
}
