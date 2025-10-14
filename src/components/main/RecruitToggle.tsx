'use client'

import { useState } from "react"
import Button from "../common/Button";

export default function RecruitToggle () {
  const [isRecruit, setIsRecruit] = useState<boolean>(true);
  const handleRecruitToggle = () => {
    setIsRecruit((prev) => !prev);
  }
  return(
    <div className="whitespace-nowrap">
      <Button
        size="md"
        variant={isRecruit ? "primary" : "outline"}
        onClick={handleRecruitToggle}>
          모집중만 보기
        </Button>
    </div>
  )
}