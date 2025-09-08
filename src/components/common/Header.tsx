'use client'

import Image from "next/image";
import { useState } from "react";
import Button from "./Button";
import Link from "next/link";
import LoginModal from "./LoginModal";

export default function Header() {

  // 임시 로그인 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 모달
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 로그인 버튼 핸들러
  const handleLoginClick = () => {
    if(!isLoggedIn){
      setIsModalOpen(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  // 모달닫기
  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  return(
    <>
      <header className="bg-white shadow">
        {/* 실제 헤더 body 보일 영역 PC, 태블릿, 모바일 */}
        <div className="
          max-w-[1280px] mx-auto 
          px-4 py-3            
          sm:px-4 sm:py-3        
          md:px-6 md:py-3        
          lg:px-8 lg:py-4 
        ">
          {/* 내부 콘텐츠 */}
          <div className="flex items-center justify-between">
            {/* 로고 */}
            <div>
              <Link href='/'>
                <Image src="/images/logo.png"
                      alt="모여모여 로고"
                      width={240}
                      height={64}
                      className="w-38 h-10" />
              </Link>
            </div>

            {/* 사용자 메뉴 */}
            <div className="w-fit whitespace-nowrap">
              { !isLoggedIn ? (
                <Button size="md"
                        onClick={handleLoginClick}>
                  로그인
                </Button>
              ) : (
                <div className="
                  flex space-x-1
                  md:space-x-4
                  lg:space-x-4
                ">
                  
                  <Button size="md"
                          variant="outline"
                          onClick={handleLoginClick}>
                    로그아웃
                  </Button>
                  <Link href='/mypage'>
                    <Button size="md">
                      마이페이지
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <LoginModal
      isOpen={isModalOpen}
      onClose={handleModalClose} />
    </>
  )
}