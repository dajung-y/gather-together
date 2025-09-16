'use client'
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  const handleBack = () => {
    router.push('/');
  }
  return (
    <button className='flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100'
            onClick={handleBack}>
      <ChevronLeft className='w-full h-full text-primary-700' />
    </button>
  )
}
