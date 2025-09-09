// components/study/create/CapacitySelect.tsx
// 인원 선택폼

import SelectField from "@/components/common/form/SelectField";
import { UseFormRegister } from "react-hook-form";

const capacityOptions = [
  { value: '2', label: '2명' },
  { value: '3', label: '3명' },
  { value: '4', label: '4명' },
  { value: '5', label: '5명' },
  { value: '6', label: '6명' },
  { value: '7', label: '7명' },
  { value: '8', label: '8명' },
  { value: '9', label: '9명' },
  { value: '10', label: '10명 이상' },
]

interface CapacitySelectProps {
  register?: UseFormRegister<any>;
  error?: string;
}

export default function CapacitySelect({
  register,
  error
}: CapacitySelectProps) {
  return (
    <SelectField
      label="모집인원"
      name="capacity"
      options={capacityOptions}
      placeholder="모집인원을 선택하세요"
      register={register}
      error={error}
    />
  )
}



