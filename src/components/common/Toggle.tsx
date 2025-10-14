"use client"

import { useState } from "react";

type ToggleProps = {
  on?: boolean;
}

export default function Toggle() {
  const [on, setOn] = useState(true);

  return (
    <div className="flex gap-2">
      <span className="text-primary-700">
        {on ? "모집 중" : "모집 완료"}
      </span>
      <div className="w-12 h-6 bg-gray-200 shadow-inner shadow-black/25 rounded-full flex items-center  cursor-pointer"
        onClick={() => setOn(!on)}>
        <div className={`w-4 h-4 rounded-full m-1 transition-all duration-200
                  ${on ? "bg-primary-500 ml-7" : "bg-gray-400 ml-1"}`}>
        </div>
      </div>
    </div>
  )
}
