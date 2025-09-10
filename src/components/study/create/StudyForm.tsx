// components/study/create/StudyForm.tsx
// 스터디 폼 제출
'use client'
import Button from "@/components/common/Button";
import StudyIntroductionSection from "./StudyIntroductionSection";
import StudyOperationSection from "./StudyOperationSection";
import z from "zod";
import { studyFormSchema } from "@/lib/validation/studyFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof studyFormSchema>;

export default function StudyForm() {
  const {register, handleSubmit, control, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(studyFormSchema),
    defaultValues:{
      weekdays: []
    }
  });

  const router = useRouter();

  const handleCancel = () => {
    alert("글 작성을 취소하시겠습니까?");
    router.push('/');
  }

  const onSubmit = async (data: FormData) => {
    console.log("입력정보 저장: " ,data);
    try{
      const res = await fetch('/api/study', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if(res.ok && result.success) {
        router.push(`/study/${result.studyId}`);
      } else {
        alert(result.error || "스터디 생성 중 오류가 발생했습니다");
      }
    } catch(err) {
      console.error(err);
      alert("스터디 생성 중 오류가 발생했습니다");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StudyOperationSection 
        register={register}
        control={control}
        errors={{
          category: errors.category?.message,
          capacity: errors.capacity?.message,
          startDate: errors.startDate?.message,
          endDate: errors.endDate?.message,
          startTime: errors.startTime?.message,
          endTime: errors.endTime?.message,
          weekdays: errors.weekdays?.message,
          studyName: errors.studyName?.message,
        }}  
      />
      <StudyIntroductionSection
        register={register}
        errors={{
          title: errors.title?.message,
          description:errors.description?.message
        }}
      />
      {/* 취소, 등록 */}
      <div className="flex justify-center mt-12 mb-8 w-full">
        <div className="flex justify-center w-1/2 md:w-1/3 gap-4">
        
          <Button size="md"
                  variant="outline"
                  className="w-full"
                  onClick={handleCancel}
                  >
            취소
          </Button>
          <Button size="md"
                  className="w-full"
                  type="submit"
                  >
            등록
          </Button>    
        </div>
      </div>
    </form>
  )
}
