// components/study/create/StudyIntroductionSection.tsx
// 스터디 소개 작성폼

import { UseFormRegister } from "react-hook-form";
import DescriptionInput from "./DescriptionInput";
import StudyTitleInput from "./StudyTitleInput";

interface StudyIntroductionSectionProps {
  register?: UseFormRegister<any>;
  errors?: {
    title?: string;
    description?: string;
  }
}

export default function StudyIntroductionSection({ register, errors }: StudyIntroductionSectionProps) {
  return (
    <section className="my-4 space-y-6">
      <div className="my-4 md:my-8">
        <h2 className="headline2 text-primary-300">
          스터디소개를 작성해주세요
        </h2>
      </div>
      {/* 폼들 */}
      <div className="space-y-2">
        <StudyTitleInput 
          register={register}
          error={errors?.title}
        />
        <DescriptionInput
          register={register}
          error={errors?.description}
        />
      </div>
    </section>
  );
}