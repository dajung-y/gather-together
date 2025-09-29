"use client"
import { Todo } from '@/types/todo';
import TodoCheck from './TodoCheck';
import { Member } from '@/types/study';
import { useSession } from 'next-auth/react';

type TodoListProps = {
  todos: Todo[]
  members: Member[];
}
export default function TodoList({ todos, members }: TodoListProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return (
    <div className="relative overflow-x-auto pb-4">
      <div className="flex">
        <div className="flex sticky left-0 bg-white z-10 border-r">
          <span className="w-16">날짜</span>
          <span className="w-100 mx-4">할 일</span>
        </div>

        <div className="flex">
          {members.map((member, userIndex) => (
            <div key={userIndex} className="flex w-30 justify-center">
              <span>{member.nickname}</span>
            </div>
          ))}
        </div>
      </div>

      {todos?.map((todo, todoIndex) => (
        <div key={todoIndex} className="flex h-max">
          {/* 왼쪽 sticky 영역 */}
          <div className="flex sticky left-0 bg-white z-10 border-r">
            <span className="w-16">{todo.date.slice(2).replace(/-/g, ".")}</span>
            <span className="w-100 mx-4">{todo.task}</span>
          </div>

          {/* 오른쪽 체크박스 영역 */}
          <div className="flex">
            {members.map((member, checkIndex) => {
              const isChecked = todo.memberChecks.includes(member.userId);
              return (
                <div key={checkIndex} className="flex w-30 justify-center">
                  <TodoCheck todoId={todo._id} isChecked={isChecked} canClick={member.userId == userId} />
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
