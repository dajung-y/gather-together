export const categoryOptions = [
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

export function getCategoryLabel(value: string){
  const option = categoryOptions.find(opt => opt.value === value);
  return option ? option.label : value;
}