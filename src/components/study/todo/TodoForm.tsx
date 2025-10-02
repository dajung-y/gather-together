"use client"
import Button from "@/components/common/Button";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { Todo } from '@/types/todo'

type TodoFormProps = {
  studyId: string;
  startDate: string;
  endDate: string;
  onAddTodo: (todo: Todo) => void;
}

type FormData = {
  todoDate: string;
  task: string;
};


export default function TodoForm({ studyId, startDate, endDate, onAddTodo }: TodoFormProps) {
  const { reset, register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`/api/todo/${studyId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studyId,
          date: data.todoDate,
          task: data.task,
        })
      });

      const result = await res.json();

      if (!res.ok) {
        alert(`추가 실패: ${result.error || result.message}`);
      }
      else {
        onAddTodo({ ...result.task });
        reset();
      }


    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "알 수 없는 오류";
      alert(message);
    }
  };

  console.log("startDate" + startDate);
  return (
    <div className='my-4'>
      {/* 모바일 화면 */}
      <div className="mt-4 mb-8 w-full md:hidden">
        <Button
          size="md"
          variant={open ? "secondary" : "primary"}
          className="w-full"
          onClick={() => setOpen(!open)}>
          {open ? "입력 닫기" : "할 일 추가"}
        </Button>

        {open && (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full mt-4 space-y-4">
            <div className="w-full">
              <input
                type='date'
                min={startDate}
                max={endDate}
                {...register('todoDate', { required: '날짜를 선택해주세요' })}
                placeholder='날짜 선택'
                className='border rounded px-2 py-1 border-gray-400'
              />
              {errors.todoDate && (
                <p className='text-red-500 text-sm'>{errors.todoDate.message as string}</p>
              )}
            </div>
            <div>
              <input
                type='text'
                {...register('task', { required: '할 일을 입력해주세요' })}
                placeholder='할 일 입력'
                className='border rounded px-2 py-1 border-gray-400'
                maxLength={100}
              />
              {errors.task && (
                <p className='text-red-500 text-sm'>{errors.task.message as string}</p>
              )}
            </div>

            <Button type='submit' className='text-center'>추가</Button>
          </form>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="hidden md:flex gap-2 my-2 items-start">
        <div>
          <input
            type='date'
            min={startDate}
            max={endDate}
            {...register('todoDate', { required: '날짜를 선택해주세요' })}
            placeholder='날짜 선택'
            className='border rounded px-2 py-1 border-gray-400'
          />
          {errors.todoDate && (
            <p className='text-red-500 text-sm'>{errors.todoDate.message as string}</p>
          )}
        </div>
        <div>
          <input
            type='text'
            {...register('task', { required: '할 일을 입력해주세요' })}
            placeholder='할 일 입력'
            className='border rounded px-2 py-1 border-gray-400'
            maxLength={100}
          />
          {errors.task && (
            <p className='text-red-500 text-sm'>{errors.task.message as string}</p>
          )}
        </div>
        <Button type='submit' className='text-center'>추가</Button>
      </form>
    </div>

  )
}
