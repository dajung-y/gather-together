'use client'
import CategorySelect from "./CategorySelect";
import CapacitySelect from "./CapacitySelect";
import StudyPeriodInput from "./StudyPeriodInput";
import StudyTimeInput from "./StudyTimeInput";
import { Controller, UseFormRegister, Control } from 'react-hook-form';
import StudyNameInput from "./StudyNameInput";
import WeekdaySelect from "./WeekdaySelect";


interface StudyOperationSectionProps {
  register?: UseFormRegister<any>;
  control?: Control<any>;
  errors?: {
    category?: string;
    capacity?: string;
    startDate?: string;
    endDate?: string
    startTime?: string;
    endTime?: string
    weekdays?: string;
    studyName?: string
  }
}


export default function StudyOperationSection({
  register,
  control,
  errors,
}: StudyOperationSectionProps) {
  return (
    <section className="my-4 space-y-6">
      <div className="my-4 md:my-8">
        <h2 className="headline2 text-primary-300">
          운영정보를 입력해주세요
        </h2>
      </div>
      {/* 폼들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CategorySelect
          register={register}
          error={errors?.category}
        />
        <CapacitySelect
          register={register}
          error={errors?.capacity}
        />
      </div>
      <StudyPeriodInput
        register={register}
        errors={{
          startDate: errors?.startDate,
          endDate: errors?.endDate
        }}
      />
      <StudyTimeInput
        register={register}
        errors={{
          startTime: errors?.startTime,
          endTime: errors?.endTime
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {
          control && (
            <Controller 
              name="weekdays"
              control={control}
              defaultValue={[]}
              render={({field}) => (
                <WeekdaySelect
                  value={field.value || []}
                  onChange={field.onChange}
                  error={errors?.weekdays}
                />
              )}
            />
          )
        }
        <StudyNameInput
          register={register}
          error={errors?.studyName}
        />
      </div>     
    </section>
  )
}




// export default function StudyOperationSection({ register,control, errors }: StudyOperationSectionProps) {
//   console.log('StudyOperationSection - control:', control);
//   return (
//     <section className="space-y-6">
//       <div>
//         <h2 className="headline3 my-4 text-primary-500">
//           운영 정보를 입력해주세요
//         </h2>
//       </div>
      
//       <div className="space-y-4">
//         <CategorySelect 
//           register={register}
//           error={errors?.category?.message}
//         />
        
//         <CapacitySelect
//           register={register}
//           error={errors?.maxMembers?.message}
//         />
//       </div>
//       <StudyPeriodInput 
//         register={register}
//         errors={errors}/>
//       <StudyTimeInput
//         register={register}
//         errors={errors} />
      
//       {control && (
//         <Controller
//           name="weekdays"
//           control={control}
//           defaultValue={[]}
//           render={({field}) => (
//             <Weekdayselect
//               value={field.value || []}
//               onChange={field.onChange}
//               error={errors?.weekdays?.message}
//             />
//           )}
//         />
//       )}

//       <StudyNameInput
//         register={register}
//         error={errors?.studyName?.message} />
      
//     </section>
//   );
// }