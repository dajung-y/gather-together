
import SelectField from "@/components/common/form/SelectField";

const CategoryOptions = [
  { value: "it", label:"IT" },
  { value: 'language', label: '어학' },
  { value: 'design', label: '디자인' },
  { value: 'business', label: '경영' },
  { value: 'exam', label: '자격증' },
  { value: 'culture', label: '교양' },
  { value: 'hobby', label: '취미' },
  { value: 'exercise', label: '운동' },
  { value: 'reading', label: '독서' },
  { value: 'finance', label: '재테크' }
];

interface CategorySelectProps {
  register?: any;
  error?: string;
}

export default function CategorySelect({ register, error }: CategorySelectProps) {
  return (
    <SelectField
      label="카테고리"
      name="category"
      options={CategoryOptions}
      placeholder="카테고리를 선택하세요"
      register={register}
      error={error}
    />
  );
}