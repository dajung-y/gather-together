"use client"

import React from 'react'
import { Circle, X, Triangle, Crown } from 'lucide-react';
import AlertModal from '@/components/common/AlertModal';

type UserDeleteProps = {
  name: string;
  isLeader: boolean;
}

export default function UserDelete({ name, isLeader }: UserDeleteProps) {
  return (
    <div className='flex justify-center items-center w-max border rounded-full px-3 gap-2
    border-primary-500'
    >
      <span className="mt-0.5 body">{name}</span>
      {isLeader ? <Crown size={16} className='ml-auto text-yellow-500' /> : <X size={16} className='ml-auto' />}
    </div>
  )
}
