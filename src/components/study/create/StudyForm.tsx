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
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import AlertModal from "@/components/common/AlertModal";

type FormData = z.infer<typeof studyFormSchema>;

interface StudyFormProps {
  defaultValues?: Partial<FormData>;
}

// localstorage 저장
const savedDataKey = "studyFormData";

export default function StudyForm({defaultValues}: StudyFormProps) {
  const saved = typeof window !== "undefined" ? localStorage.getItem(savedDataKey) : null;
  const parsed = saved ? JSON.parse(saved) : {};
  const {
    register, 
    handleSubmit, 
    control, 
    watch,
    reset,
    formState: {errors, isDirty}
  } = useForm<FormData>({
    resolver: zodResolver(studyFormSchema),
    defaultValues:{
      weekdays: [],
      ...defaultValues,
      ...parsed,
    }
  });

  useEffect(() => {
    const subscription = watch((value) => {
      // 입력값 로컬스토리지에 저장
      localStorage.setItem(savedDataKey, JSON.stringify(value));
    });

    // cleanup
    return () => subscription.unsubscribe();
  }, [watch])

  const router = useRouter();
  const pathname = usePathname();
  const isEdit = pathname.includes('/edit');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleConfirm = () => {
    if(isEdit){
      // 취소 시 데이터 삭제
      localStorage.removeItem(savedDataKey);
      router.push(`/study/${pathname.split("/")[2]}/about`); // 상세페이지로 이동
    } else {
      router.push('/'); // 메인페이지로 이동
    }
  }

  const handleCancel = () => {
    setIsModalOpen(true);
  }

  // 메소드에 따라 POST, PUT
  const onSubmit = async (data: FormData) => {
    console.log("입력정보 저장: " ,data);
    try{
      const res = await fetch(isEdit ? `/api/study/${pathname.split("/")[2]}` : '/api/study', {
        method: isEdit ? "PUT" : "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if(res.ok && result.success) {
        // 세션 추가
        sessionStorage.setItem("prevPath", "/study/create");
        // toast 알람
        toast.success(isEdit ? "스터디가 수정되었습니다!" : "스터디가 생성되었습니다!", {duration:1500});
        setTimeout(() => {
          router.push(`/study/${result.studyId || pathname.split("/")[2]}/about`);
        }, 1500);
        // 제출 시 삭제
        localStorage.removeItem(savedDataKey);
      } else {
        alert(result.error || "오류가 발생했습니다");
      }
    } catch(err) {
      console.error(err);
      alert("오류가 발생했습니다");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StudyOperationSection 
          register={register}
          control={control}
          watch={watch}
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
                    variant={!isDirty ? "disabled" : "primary"}
                    className="w-full"
                    type="submit"
                    disabled={!isDirty}
                    >
              { isEdit ? "수정" : "등록"}
            </Button>    
          </div>
        </div>
      </form>
      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEdit? "글 수정을 취소하시겠습니까?" : "글 작성을 취소하시겠습니까?"}
        subtitle="작성중인 내용은 저장되지 않습니다"
        onConfirm={handleConfirm}
      />
    </>
  )
}
