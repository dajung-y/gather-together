'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import { useSession } from 'next-auth/react';
import LoginModal from '../common/LoginModal';
import { useRouter } from 'next/navigation';

interface Slide {
  id: number
  desktop: string;
  mobile: string;
  alt: string;
  link?: string;
}

export default function Carousel() {
  const {data: session} = useSession();
  const router = useRouter();
  // 모바일 고려
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const slides: Slide[] = [
    {
      id:1,
      desktop: "/images/carousel1-lg.png",
      mobile: "/images/carousel1-sm.png",
      alt: "slide1"
    },
    {
      id:2,
      desktop: "/images/carousel2-lg.png",
      mobile: "/images/carousel2-sm.png",
      alt: "slide2",
      link: "/study/create"
    }
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[]);

  // 로그인 안된 사용자
  const handleSlideClick = (link?: string) => {
    if(!link) return;
    if(!session) {
      setIsModalOpen(true);
    } else {
      router.push(link);
    }
  }

  return(
    <>
      <div className='rounded-2xl overflow-hidden'>
        <Swiper
          modules={[Autoplay, Navigation]}
          loop={true}
          autoplay={{ delay:5000, disableOnInteraction:false }}
          navigation={{ nextEl: '.swiper-button-next' }}
          preventClicks={false}      // 클릭이 막히지 않도록
          preventClicksPropagation={false}
        >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div
              onClick={() => handleSlideClick(slide.link)}
              className="cursor-pointer"
            >
              <Image
                src={isMobile ? slide.mobile : slide.desktop}
                alt={slide.alt}
                width={1280}
                height={330}
                className="w-full h-auto"
                priority={slide.id===1}
              />
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
      </div>
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        />
    </>
  )
}