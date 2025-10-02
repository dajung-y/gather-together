import { Notice } from "@/types/notice"
import NoticeItem from "./NoticeItem";

type NoticeListProps = {
  notices: Notice[];
  isLeader: boolean
}

export default function NoticeList({ notices, isLeader }: NoticeListProps) {

  return (
    <div className="flex flex-col gap-2">
      {notices &&
        [...notices]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((notice) => (
            <NoticeItem notice={notice} isLeader={isLeader} key={notice._id} />
          ))
      }

    </div>
  )
}
