'use client'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import { Ellipsis } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DropdownMenuProps {
  params: string;
}

export default function DropdownMenu({params} : DropdownMenuProps) {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/study/${params}/edit`);
  }
  return (
    <Menu as="div" className="relative inline-block text-left p-1">
      <MenuButton className="flex items-center justify-center cursor-pointer">
        <Ellipsis />
      </MenuButton>
      <MenuItems 
        anchor="right start"
        className="flex flex-col ml-2 p-1 shadow-md ring-1 ring-gray-300 ring-opacity-10 rounded-md  focus:outline-none
                   transition duration-100 ease-out">
        <MenuItem>
          <button className='flex w-full items-center gap-2 rounded-lg px-4 py-1.5 hover:bg-gray-100'
                  onClick={handleEdit}>
            수정
          </button>
        </MenuItem>
        {/* <MenuItem>
          <button className='flex w-full items-center gap-2 rounded-lg px-4 py-1.5 text-red-500 hover:bg-gray-100'>
            삭제
          </button>
        </MenuItem> */}
      </MenuItems>
    </Menu>
  )
}
