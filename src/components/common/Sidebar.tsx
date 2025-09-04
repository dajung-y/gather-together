"use client"
import { MenuItem } from "@/types/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";

type SidebarProps = {
  menuItems: MenuItem[];
  title: string;
};

export const handleLeaveRoom = () => {
  alert("방 나가기");
}
export default function Sidebar({ menuItems, title }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="w-max h-max bg-primary-50 rounded-r-2xl p-4">
        {isOpen ?
          <div>
            <div className="flex items-center gap-4">
              <p className="text-primary-900 headline4">{title}</p>
              <ChevronsLeft className="text-gray-500" onClick={() => setIsOpen(!isOpen)} />
            </div>
            <hr className=" border-primary-100 my-2" />
            {menuItems.map((menuItem, index) => (
              <div key={index} className="py-1">
                {menuItem.path && <Link href={menuItem.path} prefetch
                  className={`cursor-pointer text-primary-300 ${pathname === menuItem.path ? "font-bold" : ""}`}>
                  {menuItem.label}
                </Link>}
                {menuItem.onClick && <p
                  className="cursor-pointer text-gray-400 pt-4"
                  onClick={menuItem.onClick}>
                  {menuItem.label}
                </p>}
              </div>
            ))}
          </div>
          :
          <div>
            <ChevronsRight className="text-gray-500" onClick={() => setIsOpen(!isOpen)} />
          </div>
        }
      </div>
    </>
  )
}
