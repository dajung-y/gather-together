"use client"

import React from 'react'
import { X, Crown } from 'lucide-react';

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
