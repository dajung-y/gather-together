'use client'

import { useEffect } from "react";
import { X } from 'lucide-react';
import Portal from "./Portal";

interface ModalProps {
  isOpen: boolean;            // 모달 열림 여부
  onClose: () => void;        // 닫기 핸들러
  children: React.ReactNode;  // 모달 콘텐츠
}

export default function Modal({
  isOpen,
  onClose,
  children,
}: ModalProps) {

  // 모달 열린경우 body 스크롤 방지
  useEffect(() => {
    if(isOpen){
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    }
  },[isOpen]);

  if(!isOpen) return null;

  // 배경 클릭 핸들러
  const handleBgClick = () => {
      onClose();
  }

  return(
    <Portal>
      <div className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black/10"
             onClick={handleBgClick}>
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="
              w-auto 
              min-w-[280px] max-w-[90vw]
              sm:min-w-[320px] sm:max-w-[400px]
              md:min-w-[300px] md:max-w-[500px]
              bg-white rounded-2xl shadow-xl
              relative max-h-[90vh] overflow-y-auto
              "
                onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 transition-colors">
              <X className="w-6 h-6 text-gray-400" />
            </button>
            {/* 각 모달 내용 */}
            {children}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}
