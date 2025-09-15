'use client'

import { Search } from 'lucide-react';

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
        className="flex-1 bg-primary-50 px-3 py-1 rounded-l-2xl focus:outline-none"
      />
      <button
        type="submit"
        className="px-2 py-1 whitespace-nowrap bg-primary-50 rounded-r-2xl cursor-pointer
                   flex items-center justify-center">
          <Search className='w-6 h-6 text-primary-500' />
      </button>
    </form>
  )
}