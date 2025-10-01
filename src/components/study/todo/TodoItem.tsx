import { Member } from '@/types/study';
import { Todo } from '@/types/todo';
import React from 'react'
import TodoCheck from './TodoCheck';
import { Trash, X } from 'lucide-react';

type TodoProps = {
  todo: Todo;
  members: Member[];
  userId: string | undefined;
}

export default function TodoItem({ todo, members, userId }: TodoProps) {
  if (userId == undefined)
    return null;

  return (
    <div className="flex h-max">
      {/* 왼쪽 sticky 영역 */}
      <div className="flex sticky left-0 bg-white z-10  pr-4  border-t border-primary-100 ">
        <span className="w-16">{todo.date.slice(2).replace(/-/g, ".")}</span>
        <span className="w-100 mx-4 ">{todo.task}</span>
        <X size={20} className="w-8 text-gray-300 cursor-pointer" ></X>
        {/* <span className="w-8 text-gray-300 cursor-pointer">삭제</span> */}
      </div>

      {/* 오른쪽 체크박스 영역 */}
      <div className="flex">
        {members.map((member, checkIndex) => {
          const isChecked = todo.memberChecks.includes(member.userId);
          return (
            <div key={checkIndex} className="flex w-30 justify-center ">
              <TodoCheck task={todo.task} todoId={todo._id}
                isChecked={isChecked} canClick={member.userId == userId} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
