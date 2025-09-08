import InputField from "@/components/common/form/InputField";

interface PeriodInputProps {
  register?: any;
  errors?: any;
}

export default function PeriodInput({
  register,
  errors
}: PeriodInputProps) {
  return(
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        기간
      </label>
      <div className="flex items-center gap-3">
        <InputField
          name="startDate"
          type="date"
          register={register}
          error={errors?.startDate?.message}
          className="flex-1"
        />
        <span className="text-gray-500 font-medium">~</span>
        <InputField
          name="endDate"
          type="date"
          register={register}
          error={errors?.endDate?.message}
          className="flex-1"
        />
      </div>
    </div>
  )
}