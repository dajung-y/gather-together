
import TodoForm from "@/components/study/todo/TodoForm";
import TodoList from "@/components/study/todo/TodoList";
import { StudyData } from "@/types/study";
import { Todo } from "@/types/todo";

export default async function page({ params }: { params: { id: string } }) {
  const param = await params;
  const studyId = await param.id;

  const studyRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/study/${studyId}`);
  if (!studyRes.ok) {
    throw new Error("스터디 정보를 불러오는 데 실패했습니다.");
  }
  const studyData: StudyData = await studyRes.json();

  const todoRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo/${studyId}`);
  if (!todoRes.ok) {
    throw new Error("todo 정보를 불러오는 데 실패했습니다.");
  }

  const resJson: { success: boolean; data: Todo[] } = await todoRes.json();
  const todos: Todo[] = resJson.data || [];

  return (
    <>
      <div className="
        w-full mx-auto 
        px-4 py-3            
        sm:px-4 sm:py-3        
        md:px-6 md:py-3        
        lg:px-8 lg:py-4 
      ">
        <TodoForm studyId={studyId} studyData={studyData} />
        {/* 일정 */}
        <TodoList todos={todos} />
      </div >
    </>
  )
}
