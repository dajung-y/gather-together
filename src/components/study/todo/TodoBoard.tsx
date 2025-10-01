"use client"
import React, { useState } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { StudyData } from '@/types/study'
import { Todo } from '@/types/todo'
// import TodoSkeleton from './TodoSkeleton'

type TodoBoardProps = {
  userId: string;
  studyId: string;
  studyData: StudyData;
  todoData: Todo[];
}

export default function TodoBoard({ userId, studyId, studyData, todoData }: TodoBoardProps) {
  const [todos, setTodos] = useState<Todo[]>(todoData);

  const isLeader = studyData.members.some(
    (m) => m.userId === userId && m.role === "leader");

  const handleAddTodo = (newTodo: Todo) => {
    setTodos(prev => [...prev, newTodo]);
  }

  // if (isLoading) return (<TodoSkeleton />);

  return (
    <div>
      {/* 일정 추가 */}
      {isLeader && <TodoForm studyId={studyId} onAddTodo={handleAddTodo} />}
      {/* 일정 */}
      <TodoList todos={todos} members={studyData.members} />
    </div>
  )
}
