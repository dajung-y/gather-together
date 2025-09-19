"use client"

import React from 'react'
import { Circle, X, Triangle } from 'lucide-react';
import AlertModal from '@/components/common/AlertModal';

type UserDeleteProps = {
  name: string;
}

export default function UserDelete({ name }: UserDeleteProps) {

  const handleKick = () => {
    if (confirm("정말로 강퇴하시겠습니까?")) {

      console.log("네");
    } else {

      console.log("취소");
    }
  }
  return (
    <div className='flex justify-center items-center w-max border rounded-full px-3 gap-2
    border-primary-500'
    >
      <span className="mt-0.5 body">{name}</span>
      <X size={16} className='ml-auto' />
    </div>
  )
}
