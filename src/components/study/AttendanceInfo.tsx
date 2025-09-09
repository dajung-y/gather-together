import { Circle, X, Triangle, Pen, Trash } from 'lucide-react';

export default function AttendanceInfo() {
  return (
    <>
      {/* 출석 현황 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 px-2">
          <div className="flex flex-col border-r border-gray-300 pr-4">
            <span className="text-gray-400">기간</span>
            <span className="">2025.08.01 - 2025.09.28</span>
          </div>
          <div className="flex flex-col border-r border-gray-300 pr-4">
            <span className=" text-gray-400">요일</span>
            <span className="">월, 화, 목</span>
          </div>
          <div className="flex flex-col">
            <span className=" text-gray-400">참여일수</span>
            <span className=" text-status-info">13/24</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col flex-1 items-center">
            <div className="flex w-full h-full rounded-tl-lg bg-primary-50 items-center justify-center gap-1 p-2">
              <Circle size={20} className="text-status-info" />
              <span>출석</span>
            </div>
            <span className="w-full h-full p-2 border-l border-b rounded-bl-lg border-gray-300 
                  text-center body-sb text-primary-900">
              10
            </span>
          </div>
          <div className="flex flex-col flex-1 items-center">
            <div className="flex w-full h-full bg-primary-50 items-center justify-center gap-1 p-2">
              <Triangle size={18} className="text-status-success" />
              <span>지각</span>
            </div>
            <span className="w-full h-full p-2 border-b border-gray-300 
                  text-center body-sb text-primary-900">
              10
            </span>
          </div>
          <div className="flex flex-col flex-1 items-center">
            <div className="flex w-full h-full rounded-tr-lg bg-primary-50 items-center justify-center gap-1 p-2">
              <X size={20} className="text-status-error" />
              <span>결석</span>
            </div>
            <span className="w-full h-full p-2 border-r border-b rounded-br-lg border-gray-300 
                  text-center body-sb text-primary-900">
              10
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
