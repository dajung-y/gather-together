// components/study/create/StudyTimeInput.tsx
// 시간 입력폼

import InputField from "@/components/common/form/InputField";
import { UseFormRegister } from "react-hook-form";

interface StudyTimeInputProps {
  register?: UseFormRegister<any>;
  errors?: {
    startTime?: string;
    endTime?: string;
  }
}

export default function StudyTimeInput({
  register,
  errors
}: StudyTimeInputProps) {
  return (
    <div className="w-full space-y-2">
      <label className="block body-m text-gray-700">시간</label>
      <div className="flex gap-2">
        <InputField
          name="startTime"
          type="time"
          placeholder="시작시간"
          register={register}
          error={errors?.startTime}
          className="flex-1 min-w-0"
        />
        <InputField
          name="endTime"
          type="time"
          placeholder="시작시간"
          register={register}
          error={errors?.endTime}
          className="flex-1 min-w-0"
        />
      </div>
    </div>
  )
}
