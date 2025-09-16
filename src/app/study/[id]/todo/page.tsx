
import TodoForm from "@/components/study/todo/TodoForm";
import TodoList from "@/components/study/todo/TodoList";

export default async function page({ params }: { params: { id: string } }) {
  const studyId = params.id;

  return (
    <>
      <div className="
        max-w-[1280px] mx-auto 
        px-4 py-3            
        sm:px-4 sm:py-3        
        md:px-6 md:py-3        
        lg:px-8 lg:py-4 
      ">
        <TodoForm studyId={studyId} />
        {/* 일정 */}
        <TodoList studyId={studyId} />
      </div >
    </>
  )
}
