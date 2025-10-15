'use client'
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BackButton() {
  const router = useRouter();
  const [prevPath, setPrevPath] = useState<string>("");
  
  useEffect(() => {
    const path = sessionStorage.getItem('prevPath') || "";
    setPrevPath(path);
  },[]);
  
  const handleBack = () => {
    if(prevPath.includes("study/create")){
      // 세션정리
      sessionStorage.removeItem('prevPath');
      router.push('/');
    } else {
      router.back();
    }
  }
  return (
    <button className='flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 cursor-pointer'
            onClick={handleBack}>
      <ChevronLeft className='w-full h-full text-primary-700' />
    </button>
  )
}
