interface WeekdaySelectProps {
  value?: string[];
  onChange?: (days: string[]) => void;
  error?: string;
}

export default function Weekdayselect({
  value=[],
  onChange,
  error
}: WeekdaySelectProps) {
  console.log('WeekdaySelect rendered:', { value, onChange, error });
  const weekdays = [
    { key: 'mon', label: '월' },
    { key: 'tue', label: '화' },
    { key: 'wed', label: '수' },
    { key: 'thu', label: '목' },
    { key: 'fri', label: '금' },
    { key: 'sat', label: '토' },
    { key: 'sun', label: '일' }
  ];
  const toggleDay = (dayKey: string) => {
    const newValue = value.includes(dayKey)
      ? value.filter(day => day !== dayKey)  // 제거
      : [...value, dayKey];                  // 추가
    
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        요일
      </label>
      <div className="flex gap-2">
        {weekdays.map(day => (
          <button
            key={day.key}
            type="button"
            onClick={() => toggleDay(day.key)}
            className={`
              px-3 py-2 rounded-md border text-sm font-medium transition-colors
              ${value.includes(day.key) 
                ? 'bg-primary-500 text-white border border-primary-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            {day.label}
          </button>
        ))}
      </div>
      {error && (
        <span className="text-red-500 text-sm mt-1 block">
          {error}
        </span>
      )}
    </div>
  );
}