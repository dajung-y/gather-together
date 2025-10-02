'use client'

import Button from "../common/Button";

interface RecruitToggleProps {
  isRecruiting: boolean | undefined;
  onToggle: () => void;
}

export default function RecruitToggle ({isRecruiting, onToggle} : RecruitToggleProps) {
  return(
    <div className="whitespace-nowrap">
      <Button
        size="md"
        variant={isRecruiting ? "secondary" : "primary"}
        onClick={onToggle}>
          { isRecruiting? "모든스터디 보기" : "모집중만 보기"}
        </Button>
    </div>
  )
}