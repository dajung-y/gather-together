'use client'
import Image from "next/image";
import Modal from "./Modal";
import Button from "./Button";
import {signIn} from 'next-auth/react'

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}


export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess
}: LoginModalProps) {

  // 구글 로그인 연동
  const handleGoogleLogin = () => {
    signIn('google', {callbackUrl : '/'})
  }
  
  return(
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-8 py-10 md:m-4">
        <div className="flex flex-col items-center space-y-4 md:space-y-8">
          <Image 
            src='/images/logo.png'
            alt="로고"
            width={240}
            height={64}
            className="
              my-4 w-40 h-auto
              md:my-8" />
          <h2 className="headline2">함께 성장하는 스터디의 시작</h2>
          <p>스터디 생성부터 일정 관리까지<br/>모든 것을 한 곳에서 간편하게</p>
          <Button 
            size="lg"
            variant="secondary"
            onClick={handleGoogleLogin}
            className="my-4 w-full">
            구글로 로그인
          </Button>
        </div>
      </div>
    </Modal>
  )
}