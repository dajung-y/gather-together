import TodoBoard from "@/components/study/todo/TodoBoard";
import { getUserIdFromSession } from "@/lib/session";
import { getStudyData } from "@/lib/study";
import { getTodoData } from "@/lib/todo";
import { StudyData } from "@/types/study";
import { Todo } from "@/types/todo";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const param = await params;
  const studyId = await param.id;

  const userId = await getUserIdFromSession();
  if (!userId) {
    redirect('/');
  }

  const studyData: StudyData = await getStudyData(studyId);

  const todoData: Todo[] = await getTodoData(studyId);

  return (
    <>
      <div className="
        w-full mx-auto 
        px-4 py-3            
        sm:px-4 sm:py-3        
        md:px-6 md:py-3        
        lg:px-8 lg:py-4 
      ">
        <p className='headline3 text-primary-500'>할 일</p>
        <TodoBoard userId={userId} studyId={studyId} studyData={studyData} todoData={todoData} />
      </div >
    </>
  )
}
