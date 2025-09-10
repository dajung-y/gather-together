// components/study/create/Weekdayselect.tsx
// 요일 선택폼

// components/study/create/Weekdayselect.tsx
// 요일 선택폼

interface WeekdaySelectProps {
  value?: string[];
  onChange?: (days: string[]) => void;
  error?: string
}

export default function WeekdaySelect({
  value = [],
  onChange,
  error
}: WeekdaySelectProps) {
  
  
  const weekdays = [
    { key: 'mon', label: '월' },
    { key: 'tue', label: '화' },
    { key: 'wed', label: '수' },
    { key: 'thu', label: '목' },
    { key: 'fri', label: '금' },
    { key: 'sat', label: '토' },
    { key: 'sun', label: '일' },
  ]

  const toggleDay = (dayKey: string) => {
    const newValue = value.includes(dayKey)
      ? value.filter(day => day !== dayKey) // 존재하면 제거
      : [...value, dayKey];                 // 없으면 추가

    onChange?.(newValue);                   // 부모에게 변경된값 전달
  }

  return (
    <div className="w-full space-y-2">
      <label className="block body-m text-gray-700">
        요일
      </label>
      {/* 요일버튼 */}
      <div className="flex gap-2 md:gap-4">
        {
          weekdays.map((day) => (
            <button 
              key={day.key}
              type="button"
              onClick={() => toggleDay(day.key)}
              className={`
                px-3 py-2 md:px-4 md:py-3 
                rounded-md border border-gray-300 body
                ${value.includes(day.key)
                  ? 'bg-primary-500 text-white border border-primary-500'
                  : 'bg-white text-black border border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {day.label}
            </button>
          ))
        }
      </div>

      {/* 에러 메세지 */}
      {
        error && (
          <span className="block my-1 caption text-red-500">
            {error}
          </span>
        )
      }

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