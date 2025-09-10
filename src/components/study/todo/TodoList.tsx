import { Todo } from '@/types/todo';

export default async function TodoList() {
  const res = await fetch(`http://localhost:3000/api/todo?groupId=1`, {
    cache: "no-store"
  });
  const result = await res.json();
  const todos: Todo[] = result.data;

  return (
    <div className="relative overflow-x-auto pb-4">
      <div className="flex">
        <div className="flex sticky left-0 bg-white z-10 border-r">
          <span className="w-16">날짜</span>
          <span className="w-100 mx-4">할 일</span>
        </div>

        <div className="flex">
          {todos[0].checks.map((user, index) => (
            <div key={index} className="flex w-20 justify-center">
              <span>{user.userId}</span>
            </div>
          ))}
        </div>
      </div>

      {todos.map((todo, index) => (
        <div key={index} className="flex h-max">
          {/* 왼쪽 sticky 영역 */}
          <div className="flex sticky left-0 bg-white z-10 border-r">
            <span className="w-16">{todo.date.slice(2).replace(/-/g, ".")}</span>
            <span className="w-100 mx-4">{todo.task}</span>
          </div>

          {/* 오른쪽 체크박스 영역 */}
          <div className="flex">
            {todo.checks.map((check, userIndex) => (
              <div key={userIndex} className="flex w-20 justify-center">
                <input type="checkbox" checked={check.checked} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
