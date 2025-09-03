'use client'

import { useEffect } from "react";
import { X } from 'lucide-react';

interface ModalProps {
  // 모달 오픈 여부
  isOpen: boolean;
  // 모달 닫는 함수
  onClose: () => void;
  // 모달 안에 들어갈 내용
  children: React.ReactNode;
  // 필수 모달 여부
  isRequired?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  isRequired = false      // 기본값 false
}: ModalProps) {

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
    if(!isRequired){
      onClose();
    }
  }

  return(
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/10"
           onClick={handleBgClick}>
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="
            w-full
            max-w-sm mx-4           
            sm:max-w-lg sm:mx-6
            lg:max-w-2xl lg:mx-8
            bg-white rounded-lg shadow-xl
            relative
            max-h-[90vh] overflow-y-auto
            "
              onClick={(e) => e.stopPropagation()}
          >
            {!isRequired && (
              <button onClick={onClose}
                      className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            )}
            {/* 각 모달 내용 */}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}