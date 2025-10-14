'use client'

import Button from "./Button";
import Modal from "./Modal";

interface AlertModalProps {
  isOpen: boolean;        // 모달 열림 여부
  onClose: () => void;    // 모달 닫기
  title: string;          // 제목
  subtitle?: string;      // 부제목 (옵션)
  onConfirm: () => void;  // 확인 버튼 동작
  cancelText?: string;    // 취소 버튼 텍스트 (default: 취소)
  confirmText?: string;   // 확인 버튼 텍스트 (default: 확인)
}

export default function AlertModal({
  isOpen,
  onClose,
  title,
  subtitle,
  onConfirm,
  cancelText = "취소",
  confirmText = "확인"
}: AlertModalProps) {

  const handleConfirm = () => {
    onConfirm();  // 로직 실행
    onClose();
  }

  return(
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-8 py-10 sm:px-10">
        <div className="flex flex-col items-center">
          {/* title, subtitle */}
          <h2 className="headline2 mt-8 text-center">{title}</h2>
          { subtitle&& <p className="body my-8 text-center">{subtitle}</p> }
          {/* button */}
          <div className="flex w-full my-4 space-x-4">
            <Button size="md"
                    variant="outline"
                    onClick={onClose}>
              {cancelText}
            </Button>
            <Button size="md"
                    onClick={handleConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}