// components/main/CategoryFilter.tsx
// 카테고리 선택

'use client'

const categoryOptions = [
  { value: "it", label:"IT" },
  { value: 'language', label: '어학' },
  { value: 'design', label: '디자인' },
  { value: 'business', label: '경영' },
  { value: 'exam', label: '자격증' },
  { value: 'culture', label: '교양' },
  { value: 'hobby', label: '취미' },
  { value: 'exercise', label: '운동' },
  { value: 'reading', label: '독서' },
  { value: 'finance', label: '재테크' }
];

interface CategoryFilterProps {
  value: string;
  onChange: (val: string) => void;
}

export default function CategoryFilter({
  value,
  onChange
}: CategoryFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer">
        <option value="">카테고리 전체</option>
        {categoryOptions.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
    </select>
  )
}
