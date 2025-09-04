'use client'

import { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;   // 포털로 보내고 싶은 tsx
  containerId?: string;  // children이 붙을 DOM 요소 id
}
export default function Portal({children, containerId = "modal-root"}: PortalProps) {
  // 실제 DOM 요소 저장할 곳
  const [container, setContainer] = useState<HTMLElement | null>(null);

  // 클라이언트 마운트 된 뒤 실행
  useEffect(() => {
    const el = document.getElementById(containerId);
    if(el) setContainer(el); 
  }, [containerId]);

  if (!container) return null;
  return createPortal(children, container);
}