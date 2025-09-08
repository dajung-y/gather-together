import InputField from "@/components/common/form/InputField";

interface TimeInputProps {
  register?: any;
  errors?: any;
}

export default function TimeInput({ register, errors }: TimeInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        시간
      </label>
      <div className="flex items-center gap-3">
        <InputField
          name="startTime"
          type="time"
          register={register}
          error={errors?.startTime?.message}
          className="flex-1"
        />
        <span className="text-gray-500 font-medium">~</span>
        <InputField
          name="endTime"
          type="time"
          register={register}
          error={errors?.endTime?.message}
          className="flex-1"
        />
      </div>
    </div>
  );
}