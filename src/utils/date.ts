const WEEKDAY_MAP: Record<string, number> = {
  sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
};

const WEEKDAY_LABELS: Record<number, string> = {
  0: "일",
  1: "월",
  2: "화",
  3: "수",
  4: "목",
  5: "금",
  6: "토",
};

//다음 스터디 날짜 계산
export const getNextStudyDate = (startDate: string, endDate: string, weekdays: string[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (today > end) return null; // 이미 종료된 스터디

  const targetDays = weekdays.map(d => WEEKDAY_MAP[d.toLowerCase()]);

  let current = today > start ? today : start;

  while (current <= end) {
    if (targetDays.includes(current.getDay())) {
      return current; // 오늘 이후 첫 스터디 날짜
    }
    current.setDate(current.getDate() + 1);
  }

  return null; // 기간 내 스터디 없음
}

//date -> 2025.04.15.목
export const formatDate = (date: string | Date) => {
  const d = typeof date === "string" ? new Date(date) : date;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const weekday = WEEKDAY_LABELS[d.getDay()];

  return `${year}.${month}.${day}.${weekday}`;
};