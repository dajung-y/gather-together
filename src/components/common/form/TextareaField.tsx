interface TextareaFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  rows?: number;
  register?: any;
  error?: string;
  className?: string;
}

export default function TextareaField({ 
  label, 
  name, 
  placeholder, 
  rows = 4,
  register, 
  error,
  className = ''
}: TextareaFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register?.(name)}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          placeholder:text-gray-400 resize-vertical
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
        `}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1 block">
          {error}
        </span>
      )}
    </div>
  );
}