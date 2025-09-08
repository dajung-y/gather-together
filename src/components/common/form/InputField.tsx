interface InputFieldProps {
  label?: string;
  name: string;
  type?: "text" | "date" | "time";
  placeholder?: string;
  register?: any;
  error?: string;
  className?: string
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
      {label && (
        <label htmlFor={name} className="block caption-m text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register?.(name)}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          placeholder:text-gray-400
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
        `} />
      {error && (
        <span className="text-red-500 text-sm mt-1 block">
          {error}
        </span>
      )}
    </div>
  )
}