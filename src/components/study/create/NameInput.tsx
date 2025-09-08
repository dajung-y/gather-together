
import InputField from "@/components/common/form/InputField";

interface NameInputProps {
  register?: any;
  error?: string;
}

export default function NameInput({ register, error }: NameInputProps) {
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