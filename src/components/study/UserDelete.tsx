import React from 'react'
import { Circle, X, Triangle } from 'lucide-react';

type UserDeleteProps = {
  name: string;
}

export default function UserDelete({ name }: UserDeleteProps) {
  return (
    <div className='flex justify-center items-center w-max border rounded-full px-3 gap-2
    border-primary-500'>
      <span className="mt-0.5 body">{name}</span>
      <X size={16} className='ml-auto' />
    </div>
  )
}
