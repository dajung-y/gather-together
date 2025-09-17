"use client"
import { useStudyStore } from '@/store/study';
import { StudyData } from '@/types/study';
import { Todo } from '@/types/todo';
import { useEffect, useState } from 'react';

export default function TodoList({ studyId }: { studyId: string }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { studyData, setStudyData } = useStudyStore();

  //스터디 데이터
  useEffect(() => {
    if (!studyData || studyData._id !== studyId) {
      fetch(`/api/study/${studyId}`)
        .then((res) => res.json())
        .then((data: StudyData) => setStudyData(data))
        .catch((err) => console.error(err));
    }
  }, [studyId]);

  //todo 데이터
  useEffect(() => {
    fetch(`/api/todo?studyId=${studyId}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((result) => setTodos(result.data));
  }, []);

  const saveCheck = async (todoId: string, checked: boolean) => {
    console.log("체크");
    await fetch(`/api/todo/${todoId}/check`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked }),
    });
  }

  const handleCheck = (todoIndex: number, checkIndex: number, checked: boolean) => {
    const updatedTodos = [...todos];
    updatedTodos[todoIndex] = {
      ...updatedTodos[todoIndex],
      checks: [...updatedTodos[todoIndex].checks],
    };
    updatedTodos[todoIndex].checks[checkIndex].checked = checked;

    setTodos(updatedTodos);

    saveCheck(updatedTodos[todoIndex]._id, checked);
  };


  return (
    <div className="relative overflow-x-auto pb-4">
      <div className="flex">
        <div className="flex sticky left-0 bg-white z-10 border-r">
          <span className="w-16">날짜</span>
          <span className="w-100 mx-4">할 일</span>
        </div>

        <div className="flex">
          {todos[0]?.checks?.map((user) => (
            <div key={user.userId} className="flex w-30 justify-center">
              <span>{user.userNickname}</span>
            </div>
          ))}
        </div>
      </div>

      {todos.map((todo, todoIndex) => (
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
                <input
                  type="checkbox"
                  checked={check.checked}
                  onChange={(e) => handleCheck(todoIndex, checkIndex, e.target.checked)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
