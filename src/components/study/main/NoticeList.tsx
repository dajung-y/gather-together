import { Notice } from "@/types/notice"
import NoticeItem from "./NoticeItem";

type NoticeListProps = {
  notices: Notice[];
}

export default function NoticeList({ notices }: NoticeListProps) {

  return (
    <div>
      {notices && (notices.map((notice) => (
        <NoticeItem notice={notice} key={notice._id} />
      )))}
    </div>
  )
}
