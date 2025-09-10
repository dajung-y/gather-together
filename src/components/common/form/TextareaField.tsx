// components/common/form/TextareaField.tsx
// 기본 textarea 폼

import { UseFormRegister } from "react-hook-form";

interface TextareaFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  rows?: number;
  register?: UseFormRegister<any>;
  error?: string;
  className?: string;
}

export default function TextareaField({
  label,
  name,
  placeholder,
  rows = 8,
  register,
  error,
  className = ""
}: TextareaFieldProps){
  return(
    <div className={`space-y-2 ${className}`}>
      {/* 라벨있는 경우 */}
      {
        label && (
          <label className="block body-m text-gray-700">
            {label}
          </label>
        )
      }
      {/* 입력창 */}
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register?.(name)}
        className={`
          w-full px-2 py-3 border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-primary-500
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
        `}
      />
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
