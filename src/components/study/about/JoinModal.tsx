'use client'

import Button from "@/components/common/Button"
import Modal from "@/components/common/Modal"
import { useState } from "react";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (formData: {introduction: string}) => void;
}

export default function JoinModal({
  isOpen,
  onClose,
  onConfirm
}: JoinModalProps) {
  const [introduction, setIntroduction] = useState<string>("");
  const handleConfirm = () => {
    onConfirm({introduction});
  }
  return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <div className="px-8 py-10 sm:px-10">
            <div className="flex flex-col items-center">
              {/* title, subtitle */}
              <h2 className="headline2 mt-8 text-center">스터디 참여 신청</h2>
              <p className="body my-8 text-center">간단한 자기소개를 입력해주세요</p>
              {/* 소개칸 */}
              <div className="flex flex-col w-full">
                <textarea
                  className="w-full md:min-w-sm
                            p-3 border border-gray-300 rounded-md
                            focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="자기소개를 입력하세요 (최대50자)"
                  value={introduction}
                  maxLength={50}
                  onChange={(e) =>setIntroduction(e.target.value)}
                />
                <span className="pt-2 text-end">
                  {introduction.length}/50
                </span>
              </div>
              {/* button */}
              <div className="flex justify-center w-full md:w-1/2 my-4 space-x-4">
                <Button size="md"
                        variant="outline"
                        className="w-full"
                        onClick={onClose}>
                  취소
                </Button>
                <Button size="md"
                        className="w-full"
                        onClick={handleConfirm}>
                  신청하기
                </Button>
              </div>
            </div>
          </div>
        </Modal>
  )
}
