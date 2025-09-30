import z from "zod";

export const studyFormSchema = z.object({
  category: z.string().nonempty("카테고리를 선택하세요"),
  capacity: z.coerce.number().min(2, "모집인원을 선택하세요"),
  startDate: z.string().refine(dateStr => {
    const today = new Date();
    const start = new Date(dateStr);
    return start>=today;
  }, {message: "시작일은 오늘 이후로 가능합니다"}),
  endDate: z.string().nonempty("종료일을 선택하세요"),
  startTime: z.string().nonempty("시작시간을 선택하세요"),
  endTime: z.string().nonempty("종료시간을 선택하세요"),
  weekdays: z.array(z.string()).min(1,"요일을 최소 1개 선택하세요"),
  studyName: z.string().min(2, "스터디명을 입력하세요").max(10,"스터디명은 최대 10자까지 가능합니다"),
  title: z.string().min(2, "제목을 입력하세요").max(30, "제목은 최대 30자까지 입력 가능합니다"),
  description: z.string().min(2, "설명을 입력하세요").max(200, "설명은 최대 200자까지 입력 가능합니다")
})
.superRefine((value, ctx) => {
  const start = new Date(value.startDate);
  const end = new Date(value.endDate);

  if(end<start) {
    ctx.addIssue({
      code: "custom",
      path: ["endDate"],
      message: "종료일은 시작일 이후로 가능합니다",
    });
  }
})