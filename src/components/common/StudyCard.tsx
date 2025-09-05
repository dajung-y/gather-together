import { X } from "lucide-react";
import { User } from "lucide-react";
import Toggle from "./Toggle";
import { variantStyles } from "@/styles/studyCardStyles";
import Button from "./Button";

type StudyCardProps = {
  variant?: keyof typeof variantStyles;
  name: string;
  title: string;
  startDate: Date;
  endDate: Date;
  time: string;
  currentMembers: number;
  maxMembers: number;
  tag: string;
}

export default function StudyCard({
  variant = "mainClosed",
  name,
  title,
  startDate,
  endDate,
  time,
  currentMembers,
  maxMembers,
  tag,
}: StudyCardProps
) {
  const style = variantStyles[variant];

  function formatDate(date: Date): string {
    const yy = String(date.getFullYear()).slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yy}/${mm}/${dd}`;
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full ">
      <div className={`flex flex-col gap-4 w-full h-full p-4 border border-gray-300 shadow-lg rounded-lg
      ${style.isDisabled ? "bg-gray-100 opacity-60" : "bg-white"}`}>
        <div className="flex">
          <span className="bg-primary-500 text-white px-2 ">{name}</span>
          {style.canDelete && <X className="ml-auto" />}
        </div>
        <p className="headline3 text-primary-700 mb-2">{title}</p>
        <div className="pb-4">
          <p className="body-m">{`${formatDate(startDate)} - ${formatDate(endDate)}`}</p>
          <p>{time}</p>
          <div className="flex items-center gap-2 text-gray-500">
            <User size={20} />
            <span>{currentMembers}/{maxMembers}</span>
          </div>
        </div>
        <div className="flex">
          <span className="border border-primary-100 text-primary-500 px-3 rounded-full self-center">#{tag}</span>
          {!style.isTagDisabled &&
            <span className="bg-primary-50 text-primary-500 px-3 rounded-full ml-auto self-center">
              모집 중
            </span>}
          {!style.isToggleDisabled &&
            <div className="ml-auto">
              <Toggle />
            </div>
          }

        </div>
      </div>
      {style.canEnter && <Button>스터디 입장하기</Button>}
    </div >
  )
}
