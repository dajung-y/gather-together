import { Notice } from "@/types/notice";
import NoticeItem from "./NoticeItem";

export default async function NoticeList() {

  const res = await fetch(`http://localhost:3000/api/notice?groupId=1`, {
    cache: "no-store"
  });
  const result = await res.json();
  const notices: Notice[] = result.data;

  return (
    <>
      {notices.map((notice, index) => (
        <NoticeItem
          key={index}
          title={notice.title}
          content={notice.content}
          createdAt={notice.createdAt}
        />
      ))}
    </>
  )
}
