'use client'

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
}

export default function SearchBar({
  value, 
  onChange,
  onSubmit
}: SearchBarProps) {

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  }

  return(
    <form onSubmit={handleSubmit} className="flex w-full h-full">
      <input 
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="검색어를 검색하세요"
        className="flex-1 border border-gray-300 border-r-0 px-2 py-1 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <button
        type="submit"
        className="px-4 whitespace-nowrap text-primary-50 bg-primary-500 rounded-r-md hover:brightness-95 cursor-pointer ">
          검색
      </button>
    </form>
  )
}