// components/study/create/StudyTitleInput.tsx
// 스터디 제목 입력폼
import InputField from "@/components/common/form/InputField";
import { UseFormRegister } from "react-hook-form";

interface StudyTitleInputProps {
  register?: UseFormRegister<any>;
  error?: string;
}

export default function StudyTitleInput({ 
  register,
  error 
}: StudyTitleInputProps) {
  return (
    <InputField
      label="제목"
      name="title"
      type="text"
      placeholder="스터디 소개 제목을 입력하세요"
      register={register}
      error={error}
    />
  );
}