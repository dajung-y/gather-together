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
          { isRecruiting? "모집중만 보기" : "모집마감"}
        </Button>
    </div>
  )
}