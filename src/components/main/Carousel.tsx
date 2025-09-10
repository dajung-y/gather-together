'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import Link from 'next/link';

interface Slide {
  id: number
  desktop: string;
  mobile: string;
  alt: string;
  link?: string;
}

export default function Carousel() {
  // 모바일 고려
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  return(
    <div className='rounded-2xl overflow-hidden'>
      <Swiper
        modules={[Autoplay, Navigation]}
        loop={true}
        autoplay={{
          delay:5000,
          disableOnInteraction: false
        }}
        navigation={{
          nextEl: '.swiper-button-next'
          }}>

        { slides.map((slide) => (
          <SwiperSlide key={slide.id}>
           { slide.link? (
            <Link href={slide.link}>
              <Image 
                src={isMobile? slide.mobile : slide.desktop}
                alt={slide.alt}
                width={1280}
                height={330}
                className="w-full h-auto"
                priority={slide.id===1} />
            </Link>
           ) : (
            <Image
              src={isMobile? slide.mobile : slide.desktop}
              alt={slide.alt}
              width={1280}
              height={330}
              className="w-full h-auto"
              priority={slide.id===1} />
           )}
          </SwiperSlide>
        ))}    
      </Swiper>
    </div>
  )
}