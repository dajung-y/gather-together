
import TodoForm from "@/components/study/todo/TodoForm";
import TodoList from "@/components/study/todo/TodoList";

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
        <TodoForm />
        {/* 일정 */}

        <TodoList />

      </div >
    </>
  )
}
