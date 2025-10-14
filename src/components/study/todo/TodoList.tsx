"use client"
import { Todo } from '@/types/todo';
import { Member } from '@/types/study';
import { useSession } from 'next-auth/react';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: Todo[]
  members: Member[];
}

export default function TodoList({ todos, members }: TodoListProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueTodos = todos.filter(todo => new Date(todo.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const activeTodos = todos.filter(todo => new Date(todo.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


  return (
    <div className="relative overflow-x-auto pb-4">
      <div className="flex">
        <div className="flex sticky left-0 bg-white z-10  pr-12 ">
          <span className="w-16 font-bold">날짜</span>
          <span className="w-100 mx-4 font-bold pr-4">할 일</span>
        </div>

        <div className="flex">
          {members.map((member, userIndex) => (
            <div key={userIndex} className="flex w-30 justify-center">
              <span className={`${member.userId == userId ? "font-bold" : "text-gray-600"}`}>{member.nickname}</span>
            </div>
          ))}
        </div>
      </div>

      {/* {todos?.map((todo, todoIndex) => (
        <div key={todoIndex}>
          <TodoItem todo={todo} members={members} userId={userId} />
        </div>
      ))} */}
      {activeTodos?.map((todo, todoIndex) => (
        <div key={todoIndex}>
          <TodoItem todo={todo} members={members} userId={userId} />
        </div>
      ))}

      <p className="pt-4 pb-2 font-bold text-gray-500"></p>
      {overdueTodos?.map((todo, todoIndex) => (
        <div key={todoIndex} className='opacity-40'>
          <TodoItem todo={todo} members={members} userId={userId} />
        </div>
      ))}
    </div>
  )
}
