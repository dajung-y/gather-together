"use client"
import Button from "@/components/common/Button";
import { useForm } from 'react-hook-form';
import { StudyData } from "@/types/study";

type TodoFormProps = {
  studyId: string;
  studyData: StudyData;
}

export default function TodoForm({
  studyId,
  studyData }: TodoFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      console.log(studyData);

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
        <div className='flex flex-col justify-center'>
          <div className='flex gap-2 my-2 items-center'>
            <input
              type='date'
              {...register('todoDate', { required: '날짜를 선택해주세요' })}
              placeholder='날짜 선택'
              className='border rounded px-2 py-1 border-gray-400'
            />
            <input
              type='text'
              {...register('task', { required: '할 일을 입력해주세요' })}
              placeholder='할 일 입력'
              className='border rounded px-2 py-1 border-gray-400'
            />
            <Button type='submit' className='text-center'>추가</Button>
          </div>
          <div className="flex gap-13">
            {errors.todoDate && (
              <span className='text-red-500 text-sm'>{errors.todoDate.message as string}</span>
            )}
            {errors.task && (
              <span className='text-red-500 text-sm'>{errors.task.message as string}</span>
            )}
          </div>
        </div>
      </form>
    </div>

  )
}
