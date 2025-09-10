// components/common/form/SelectField.tsx
// 기본 select 폼

import { UseFormRegister } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  register?: UseFormRegister<any>;
  error?: string;
  className?: string;
}

export default function SelectField({
  label,
  name,
  options,
  placeholder,
  register,
  error,
  className = ''
}: SelectFieldProps){
  return(
    <div className={`space-y-2 ${className}`}>
      {/* 라벨 표기 */}
      {
        label && (
          <label className="block body-m text-gray-700">
            {label}
          </label>
        )
      }
      {/* select 요소 */}
      <select
        id={name}
        {...register?.(name)}
        className={`
          w-full px-2 py-3 border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-primary-500
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
        `}
      >
        <option value="">
          {placeholder}
        </option>
        {
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        }
      </select>
      {/* 에러 메세지 */}
      {
        error && (
          <span className="block my-1 caption text-red-500">
            {error}
          </span>
        )
      }
    </div>
  )
}