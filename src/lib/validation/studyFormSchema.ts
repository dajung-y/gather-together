import z from "zod";

export const studyFormSchema = z.object({
  category: z.string().nonempty("카테고리를 선택하세요"),
  capacity: z.string().nonempty("모집인원을 선택하세요"),
  startDate: z.string().nonempty("시작일을 선택하세요"),
  endDate: z.string().nonempty("종료일을 선택하세요"),
  startTime: z.string().nonempty("시작시간을 선택하세요"),
  endTime: z.string().nonempty("종료시간을 선택하세요"),
  weekdays: z.array(z.string()).min(1,"요일을 최소 1개 선택하세요"),
  studyName: z.string().min(2, "스터디명을 입력하세요"),
  title: z.string().min(2, "제목을 입력하세요"),
  description: z.string().min(2, "설명을 입력하세요")
})