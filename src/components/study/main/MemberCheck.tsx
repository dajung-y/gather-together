"use client"

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type MemberCheckProps = {
  isMember: boolean;
}
export default function MemberCheck({ isMember }: MemberCheckProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isPublic = pathname.includes('/about') || pathname.includes('/edit');

    if (!isMember && !isPublic) {
      console.log("isMember" + isMember);
      alert('스터디 멤버가 아닙니다.');
      router.push('/');
    }
  }, [pathname]);

  return null;
}
