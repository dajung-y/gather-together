"use client"
import Button from "@/components/common/Button";
import InputField from "@/components/common/form/InputField";
import TextareaField from "@/components/common/form/TextareaField";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function NoticeForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [showInput, setShowInput] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const groupId = "1";

      const res = await fetch("/api/notice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId,
          title: data.title,
          content: data.content,
        })
      });

      const result = await res.json();

      if (!res.ok) {
        alert(`추가 실패: ${result.error || result.message}`);
      }
      else {
        reset();
        setShowInput(!showInput);
      }
    } catch (error: any) {
      alert(`추가 실패: ${error.message}`);
    }
  };

  return (
    <>
      {/* 공지 */}
      <div className="flex justify-between items-center">
        <p className="headline3 text-primary-500 my-4">일반 공지</p>
        {!showInput && <Button size="md" onClick={() => setShowInput(!showInput)}>공지 추가</Button>}
      </div>
      {/* 일반 공지 추가 */}
      {showInput &&
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col p-4 mb-8 border gap-2 border-primary-500 rounded-lg">

            <div className="flex gap-4">
              {/* 제목 */}
              <div className="flex-1 flex flex-col">
                <input
                  {...register("title", { required: "제목을 입력해주세요" })}
                  type="text"
                  placeholder="제목"
                  className="flex-1 border px-4 border-primary-300 rounded-lg"
                />
              </div>

              {/* 버튼 */}
              <Button variant="outline" onClick={() => setShowInput(!showInput)}>
                취소
              </Button>
              <Button type="submit">공지 추가</Button>

            </div>
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message as string}</span>}

            {/* 내용 */}
            <div className="flex flex-col">
              <textarea
                {...register("content", { required: "내용을 입력해주세요" })}
                placeholder="내용"
                className="w-full border p-4 border-primary-300 rounded-lg"
              />
              {errors.content && <span className="text-red-500 text-sm">{errors.content.message as string}</span>}
            </div>

          </div>
        </form>


      }
    </>
  )
}