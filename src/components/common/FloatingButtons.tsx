// components/common/FloatingButtons.tsx
'use client'

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import { ChevronUp } from 'lucide-react';

export default function FloatingButtons() {
  const {data: session} = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [showTopButton, setShowTopButton] = useState<boolean>(false);
  const [hideButtons, setHideButtons] = useState<boolean>(false);

  // 모달
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 메인페이지 확인
  const isMainPage = pathname === '/';

  // 높이에 따른 버튼 유무
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY>300)

      const footer = document.querySelector('footer');
      if(footer){
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        setHideButtons(footerRect.top<windowHeight-100);
      }
    }
    window.addEventListener('scroll',handleScroll);
    return () => window.removeEventListener('scroll',handleScroll);
  }, []);

  // 스크롤 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const handleStudyCreate = () => {
    if(!session){
      setIsModalOpen(true);
    } else {
      router.push('/study/create')
    }
  }

  if(hideButtons) return null;

  return (
    <div className="
      fixed bottom-6 right-4 
      md:bottom-10 md:right-6
      lg:bottom-10 lg:right-30
      z-50 flex flex-col gap-3 items-end
    ">
      {/* 탑버튼 - 스크롤했을 때만 표시 */}
      {
        showTopButton && (
          <button 
            onClick={scrollToTop}
            className="
              w-10 h-10
              md:w-12 md:h-12
              bg-primary-50 shadow-md rounded-full
              flex items-center justify-between
            ">
              <ChevronUp 
                className="w-full h-full p-2 text-primary-700"/>
            </button>
        )
      }
      {/* 스터디 만들기 버튼 - 메인 페이지에서만 표시 */}
      {
        isMainPage && (
          <button
            onClick={handleStudyCreate}
            className="
              p-2
              md:text-lg md: px-4
              bg-primary-500 text-white
              rounded-4xl border-2 border-white shadow-md
          ">
            스터디 만들기
          </button>
        )
      }
      <LoginModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  )
}
