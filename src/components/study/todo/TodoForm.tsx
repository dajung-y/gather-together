"use client"
import Button from "@/components/common/Button";
import InputField from "@/components/common/form/InputField";
import { useForm } from 'react-hook-form';

export default function TodoForm() {
  const { register, control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    console.log('폼 데이터:', data);
    try {
      const groupId = "1";
      const userIds = ["u1", "u2", "u3", "u4"];

      const res = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId,
          date: data.todoDate,
          task: data.task,
          userIds
        })
      });

      const result = await res.json();

      if (!res.ok) {
        alert(`추가 실패: ${result.error || result.message}`);
      }
    } catch (error: any) {
      alert(`추가 실패: ${error.message}`);
    }
  };

  return (
    <div className="my-4" >
      <p className="headline3 text-primary-500">할 일 추가</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 my-2">
          <InputField
            name="todoDate"
            type="date"
            placeholder="날짜 선택"
            register={register}
            error={errors?.todoDate?.message as string}
          />
          <InputField
            name="task"
            type="text"
            placeholder="할 일 입력"
            register={register}
            error={errors?.task?.message as string}
          />
          <Button type="submit">추가</Button>
        </div>
      </form>

    </div>
  )
}
