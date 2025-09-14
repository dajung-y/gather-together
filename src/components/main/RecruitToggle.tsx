'use client'

import Button from "../common/Button";

interface RecruitToggleProps {
  isRecruiting: boolean;
  onToggle: () => void;
}

export default function RecruitToggle ({isRecruiting, onToggle} : RecruitToggleProps) {
  return(
    <div className="whitespace-nowrap">
      <Button
        size="md"
        variant={isRecruiting ? "primary" : "outline"}
        onClick={onToggle}>
          모집중만 보기
        </Button>
    </div>
  )
}