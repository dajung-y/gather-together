// components/common/form/InputField.tsx
// 기본 inputfield 폼

import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  label?: string;
  name: string;    // 입력창 이름
  type?: "text" | "date" | "time";
  placeholder?: string;
  register?: UseFormRegister<any>;
  error?: string;
  className?: string;
}

export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  className = ""
}: InputFieldProps) {
  
  return(
    <div className={`space-y-2 ${className}`}>
      {/* 라벨 표시 */}
      {
        label && (
          <label className="block body-m text-gray-700">
            {label}
          </label>
        )
      }
      {/* 입력창 */}
      <input
        id={name}
        type={type}
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