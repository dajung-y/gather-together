"use client"
import { useStudyStore } from '@/store/study';
import { StudyData } from '@/types/study';
import { Todo } from '@/types/todo';
import { useEffect, useState } from 'react';
import TodoCheck from './TodoCheck';

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div className="relative overflow-x-auto pb-4">
      <div className="flex">
        <div className="flex sticky left-0 bg-white z-10 border-r">
          <span className="w-16">날짜</span>
          <span className="w-100 mx-4">할 일</span>
        </div>

        <div className="flex">
          {todos && todos[todos.length - 1]?.checks?.map((user, userIndex) => (
            <div key={userIndex} className="flex w-30 justify-center">
              <span>{user.userNickname}</span>
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
            {todo.checks.map((check, checkIndex) => (
              <div key={checkIndex} className="flex w-30 justify-center">
                <TodoCheck todoId={todo._id} check={check} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
