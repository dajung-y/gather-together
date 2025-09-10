import DescriptionInput from "./DescriptionInput";
import StudyTitleInput from "./StudyTitleInput";

interface StudyIntroductionSectionProps {
  register?: any;
  errors?: any;
}

export default function StudyIntroductionSection({ register, errors }: StudyIntroductionSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="headline3 mb-4 text-primary-500">
          스터디 소개를 입력해주세요
        </h2>
      </div>
      <div className="space-y-2">
        <StudyTitleInput
          register={register}
          error={errors?.title?.message}
        />
        <DescriptionInput 
          register={register}
          error={errors?.description?.message}
        />
      </div>
    </div>
  );
}