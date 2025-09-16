"use client"
import Button from "@/components/common/Button";
import InputField from "@/components/common/form/InputField";
import { useForm } from 'react-hook-form';
import { useSession } from "next-auth/react";
import { useStudyStore } from "@/store/study";

export default function TodoForm({ studyId }: { studyId: string }) {
  const { register, control, handleSubmit, formState: { errors } } = useForm();

  const { data: session } = useSession();
  const { studyData } = useStudyStore();

  const onSubmit = async (data: any) => {
    try {
      console.log(studyData);
      const userIds = studyData?.members?.map(member => member.userId) || [];
      const userNickname = studyData?.members?.map(member => member.nickname) || [];

      const res = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studyId,
          date: data.todoDate,
          task: data.task,
          userIds,
          userNickname
        })
      });

      const result = await res.json();

      if (!res.ok) {
        alert(`추가 실패: ${result.error || result.message}`);
      }
      else {
        window.location.reload();
      }
    } catch (error: any) {
      alert(`추가 실패: ${error.message}`);
    }
  };

  return (
    <div className='my-4'>
      <p className='headline3 text-primary-500'>할 일 추가</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex gap-2 my-2 items-center'>
          <input
            type='date'
            {...register('todoDate', { required: '날짜를 선택해주세요' })}
            placeholder='날짜 선택'
            className='border rounded px-2 py-1 border-gray-400'
          />
          {errors.todoDate && (
            <span className='text-red-500 text-sm'>{errors.todoDate.message as string}</span>
          )}

          <input
            type='text'
            {...register('task', { required: '할 일을 입력해주세요' })}
            placeholder='할 일 입력'
            className='border rounded px-2 py-1 border-gray-400'
          />
          {errors.task && (
            <span className='text-red-500 text-sm'>{errors.task.message as string}</span>
          )}

          <Button type='submit' className='text-center'>추가</Button>
        </div>
      </form>
    </div>

  )
}
