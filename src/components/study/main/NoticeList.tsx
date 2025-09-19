import { Notice } from "@/types/notice"
import NoticeItem from "./NoticeItem";

type NoticeListProps = {
  notices: Notice[];
  isLeader: boolean
}

export default function NoticeList({ notices, isLeader }: NoticeListProps) {

  return (
    <div>
      {notices && (notices.map((notice) => (
        <NoticeItem notice={notice} isLeader={isLeader} key={notice._id} />
      )))}
    </div>
  )
}
