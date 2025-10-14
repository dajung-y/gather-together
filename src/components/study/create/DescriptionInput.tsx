// components/study/create/DescriptionInput.tsx
// 스터디 소개 입력폼

import TextareaField from "@/components/common/form/TextareaField";
import { UseFormRegister } from "react-hook-form";

interface DescriptionInputProps {
  register?: UseFormRegister<any>;
  error?: string;
}

export default function DescriptionInput({ register, error }: DescriptionInputProps) {
  return (
    <TextareaField
      name="description"
      placeholder="스터디에 대한 상세한 설명을 입력해주세요"
      rows={8}
      register={register}
      error={error}
    />
  );
}