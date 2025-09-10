'use client'
import ButtonContainer from "@/components/study/create/BtnContainer";
import StudyIntroductionSection from "@/components/study/create/StudyIntroductionSection";
import StudyOperationSection from "@/components/study/create/StudyOperationSection";
import { useForm } from 'react-hook-form'; 

export default function Page(){

  const { register, control, handleSubmit, formState: { errors } } = useForm();
  console.log('Page - control:', control); 

  const onSubmit = (data: any) => {
    console.log('폼 데이터:', data);
    // API 호출 등 처리
  };

  return(
    <main className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-5xl mb-12 p-4 space-y-12">
        {/* 헤더 */}
        <section className="
          w-full flex flex-col space-y-3 items-center
          mt-4 mb-8 
          lg:my-8 
        ">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary-700 text-center">
            스터디 만들기
          </h1>
          <p className="body text-gray-500 text-center">
            함께 학습할 스터디를 생성하세요
          </p>
        </section>

        {/* 폼 전체 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* 운영 정보 입력창 */}
          <section>
            <StudyOperationSection 
              register={register}
              control={control}
              errors={errors}
            />
          </section>
          
          {/* 스터디 소개 입력창 */}
          <section>
            <StudyIntroductionSection 
              register={register}
              errors={errors}
            />
          </section>
          
          {/* 취소/제출 버튼 */}
          <div>
            <ButtonContainer />
          </div>
        </form>
      </div>
    </main>
  )
}