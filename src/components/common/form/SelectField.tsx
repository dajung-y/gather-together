
interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  register?: any;
  error?: string;
  className?: string;
}

export default function SelectField({
  label,
  name,
  options,
  placeholder = "선택해주세요",
  register,
  error,
  className = ''
}: SelectFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={name} className="block caption-m text-gray-700">
          {label}
        </label>
      )}
      <select
        id={name}
        {...register?.(name)}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          bg-white cursor-pointer
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
        `}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-red-500 text-sm mt-1 block">
          {error}
        </span>
      )}
    </div>
  );
}