// components/study/create/StudyPeriodInput.tsx
// 스터디 기간 입력 폼

import InputField from "@/components/common/form/InputField";
import { UseFormRegister } from "react-hook-form";


interface StudyPeriodInputProps {
  register?: UseFormRegister<any>;
  errors?: {
    startDate?: string;
    endDate?: string;
  }
}

export default function StudyPeriodInput({
  register,
  errors
}: StudyPeriodInputProps) {
  return (
    <div className="w-full space-y-2">
      <label className="block body-m text-gray-700">기간</label>
      <div className="flex gap-2">
        <InputField
          name="startDate"
          type="date"
          placeholder="시작일"
          register={register}
          error={errors?.startDate}
          className="flex-1 min-w-0"
        />
        <InputField
          name="endDate"
          type="date"
          placeholder="종료일"
          register={register}
          error={errors?.endDate}
          className="flex-1 min-w-0"
        />
      </div>
    </div>
  )
}
