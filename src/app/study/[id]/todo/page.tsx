
import TodoForm from "@/components/study/todo/TodoForm";
import TodoList from "@/components/study/todo/TodoList";
import clientPromise from "@/lib/mongodb";
import { getUserIdFromSession } from "@/lib/session";
import { StudyData } from "@/types/study";
import { Todo } from "@/types/todo";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const param = await params;
  const studyId = await param.id;

  const userId = await getUserIdFromSession();
  if (!userId) {
    redirect('/');
  }

  const client = await clientPromise;
  const db = client.db();

  const study = await db.collection("studies").findOne({ _id: new ObjectId(studyId) });
  const studyData: StudyData = JSON.parse(JSON.stringify(study));

  const todos = await db.collection("todos").find({ studyId }).toArray();
  const todoData: Todo[] = JSON.parse(JSON.stringify(todos));

  const isLeader = studyData.members.some(
    (m) => m.userId === userId && m.role === "leader");

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
        {/* 일정 추가 */}
        {isLeader && <TodoForm studyId={studyId} studyData={studyData} />}
        {/* 일정 */}
        <TodoList todos={todoData} />
      </div >
    </>
  )
}
