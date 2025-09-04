'use client'
import AlertModal from "@/components/common/AlertModal";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Alert 모달 열기
      </button>

      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="스터디룸이 생성되었습니다"
        subtitle="스터디 룸으로 이동할까요?"
        onConfirm={() => {
          alert("확인 처리 로직 실행!");
        }}
        confirmText="확인"
        cancelText="취소"
      />
    </>
  );
}
