'use client'
import CategorySelect from "./CategorySelect";
import CapacitySelect from "./CapacitySelect";
import StudyPeriodInput from "./StudyPeriodInput";
import StudyTimeInput from "./StudyTimeInput";
import { useForm, Controller } from 'react-hook-form';
import Weekdayselect from "./WeekdaySelect";
import StudyNameInput from "./StudyNameInput";

interface StudyOperationSectionProps {
  register?: any;
  control?: any; 
  errors?: any;
}

export default function StudyOperationSection({ register,control, errors }: StudyOperationSectionProps) {
  console.log('StudyOperationSection - control:', control);
  return (
    <section className="space-y-6">
      <div>
        <h2 className="headline3 my-4 text-primary-500">
          운영 정보를 입력해주세요
        </h2>
      </div>
      
      <div className="space-y-4">
        <CategorySelect 
          register={register}
          error={errors?.category?.message}
        />
        
        <CapacitySelect
          register={register}
          error={errors?.maxMembers?.message}
        />
      </div>
      <StudyPeriodInput 
        register={register}
        errors={errors}/>
      <StudyTimeInput
        register={register}
        errors={errors} />
      
      {control && (
        <Controller
          name="weekdays"
          control={control}
          defaultValue={[]}
          render={({field}) => (
            <Weekdayselect
              value={field.value || []}
              onChange={field.onChange}
              error={errors?.weekdays?.message}
            />
          )}
        />
      )}

      <StudyNameInput
        register={register}
        error={errors?.studyName?.message} />
      
    </section>
  );
}