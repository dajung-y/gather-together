"use client"

import { Member } from '@/types/study';
import { Todo } from '@/types/todo';
import React, { useState } from 'react'
import TodoCheck from './TodoCheck';
import { X } from 'lucide-react';

type TodoProps = {
  todo: Todo;
  members: Member[];
  userId: string | undefined;
}

export default function TodoItem({ todo, members, userId }: TodoProps) {
  if (userId == undefined)
    return null;

  const [show, setShow] = useState<boolean>(true);

  const isLeader = members.some((m) => m.userId === userId && m.role === "leader");

  const handleDelete = async (todoId: string) => {
    setShow(false);
    try {
      const res = await fetch(`/api/todo/task/${todoId}`, { method: "DELETE" });

      if (!res.ok) {
        const error = await res.json();
        console.error("삭제 실패:", error);
        setShow(true);
        return;
      }

      const data = await res.json();
      console.log("삭제 성공:", data);
    } catch (err) {
      console.error("삭제 중 오류:", err);
      setShow(true);
    }
  };

  if (!show) return null;

  return (
    <div className="flex h-max">
      {/* 왼쪽 sticky 영역 */}
      <div className="flex sticky left-0 bg-white z-10  pr-4  border-t border-primary-100 ">
        <span className="w-16">{todo.date.slice(2).replace(/-/g, ".")}</span>
        <span className="w-100 mx-4 ">{todo.task}</span>
        {isLeader ? <X size={20} className="w-8 text-gray-300 cursor-pointer"
          onClick={() => handleDelete(todo._id)}></X> :
          <span className='w-8' />}
        {/* <span className="w-8 text-gray-300 cursor-pointer">삭제</span> */}
      </div>

      {/* 오른쪽 체크박스 영역 */}
      <div className="flex">
        {members.map((member, checkIndex) => {
          const isChecked = todo.memberChecks.includes(member.userId);
          return (
            <div key={checkIndex} className="flex w-30 justify-center ">
              <TodoCheck task={todo.task} todoId={todo._id}
                isChecked={isChecked} isMine={member.userId == userId} isLeader={isLeader}
                canClick={member.userId == userId || isLeader} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
