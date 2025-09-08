import SelectField from "@/components/common/form/SelectField";

const MemberCountOptions = [
  { value: '2', label: '2명' },
  { value: '3', label: '3명' },
  { value: '4', label: '4명' },
  { value: '5', label: '5명' },
  { value: '6', label: '6명' },
  { value: '7', label: '7명' },
  { value: '8', label: '8명' },
  { value: '10', label: '10명 이상' },
]


interface MemberCountSelectProps {
  register?: any;
  error?: string;
}

export default function MemberCountSelect({ register, error }: MemberCountSelectProps) {
  return (
    <SelectField
      label="모집 인원"
      name="maxMembers"
      options={MemberCountOptions}
      placeholder="인원을 선택하세요"
      register={register}
      error={error}
    />
  );
}