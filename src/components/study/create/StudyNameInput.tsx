// components/study/create/StudyNameInput.tsx
// 스터디 이름 입력폼

import InputField from "@/components/common/form/InputField";
import { UseFormRegister } from "react-hook-form";

interface StudyNameInputProps {
  register?: UseFormRegister<any>;
  error?: string;
}

export default function StudyNameInput({ 
  register, 
  error 
}: StudyNameInputProps) {
  return (
    <InputField
      label="스터디명"
      name="studyName"
      type="text"
      placeholder="스터디명을 입력하세요"
      register={register}
      error={error}
    />
  );
}