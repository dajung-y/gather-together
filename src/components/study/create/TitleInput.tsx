
import InputField from "@/components/common/form/InputField";

interface TitleInputProps {
  register?: any;
  error?: string;
}

export default function TitleInput({ register, error }: TitleInputProps) {
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