import TextareaField from "@/components/common/form/TextareaField";

interface DescriptionInputProps {
  register?: any;
  error?: string;
}

export default function DescriptionInput({ register, error }: DescriptionInputProps) {
  return (
    <TextareaField
      // label 없음 (라벨 없는 요구사항)
      name="description"
      placeholder="스터디에 대한 상세한 설명을 입력해주세요"
      rows={8}
      register={register}
      error={error}
    />
  );
}