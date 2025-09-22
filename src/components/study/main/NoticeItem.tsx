"use client"
import { useState } from "react";
import { Pen, Trash } from 'lucide-react';
import { Notice } from "@/types/notice";
import { formatDate } from "@/utils/date";
import { useForm } from "react-hook-form";
import Button from "@/components/common/Button";

type NoticeItemProps = {
  notice: Notice;
  isLeader: boolean;
}

export default function NoticeItem({ notice, isLeader }: NoticeItemProps) {
  const [showDetail, setShowDetail] = useState(false)
  const [deleted, setDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: notice.title,
      content: notice.content,
    },
  });

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch("/api/notice", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: notice._id }),
      });

      const data = await res.json();
      if (data.success) {
        setDeleted(true);
      } else {
        alert("삭제 실패");
      }
    } catch (err) {
      console.error(err);
      alert("삭제 중 오류 발생");
    }
  };

  const handleEdit = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    reset({
      title: notice.title,
      content: notice.content
    });
  }

  const onSubmit = async (data: any) => {
    notice.title = data.title;
    notice.content = data.content;
    setIsEditing(false);
    try {
      await fetch("/api/notice", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          noticeId: notice._id,
          title: data.title,
          content: data.content,
        }),
      });

    } catch (err) {
      console.error(err);
    }
  };



  if (deleted) return null;


  return (
    <>

      {!isEditing ?
        <div>
          <div className="flex gap-2 p-4 border rounded-lg items-center"
            onClick={() => setShowDetail(!showDetail)}>
            <span className="flex-1 headline4">{notice.title} </span>
            <span>{formatDate(notice.createdAt)}</span>
            <span className="body-sb text-primary-500">NEW</span>
            {isLeader &&
              <div className="flex gap-2 items-center">
                <Pen size={20} className="ml-4 cursor-pointer" onClick={handleEdit} />
                <span>|</span>
                <Trash size={20} className="cursor-pointer" onClick={handleDelete} />
              </div>
            }

          </div>
          {showDetail &&
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="whitespace-pre-line">
                {notice.content}</div>
            </div>
          }
        </div>
        :
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col p-4 mb-8 border gap-2 border-primary-500 rounded-lg">

              <div className="flex gap-4">
                {/* 제목 */}
                <div className="flex-1 flex flex-col">
                  <input
                    {...register("title", { required: "제목을 입력해주세요" })}
                    type="text"
                    placeholder="제목"
                    className="flex-1 border px-4 border-primary-300 rounded-lg"
                  />
                </div>

                {/* 버튼 */}
                <Button variant="outline" onClick={() => handleEditCancel()}>
                  취소
                </Button>
                <Button type="submit">수정</Button>

              </div>
              {errors.title && <span className="text-red-500 text-sm">{errors.title.message as string}</span>}

              {/* 내용 */}
              <div className="flex flex-col">
                <textarea
                  {...register("content", { required: "내용을 입력해주세요" })}
                  placeholder="내용"
                  className="w-full border p-4 border-primary-300 rounded-lg"
                />
                {errors.content && <span className="text-red-500 text-sm">{errors.content.message as string}</span>}
              </div>
            </div>
          </form>
        </div>
      }

    </>
  )
}
