"use client"

import debounce from 'lodash.debounce';
import React, { useMemo, useState } from 'react'
import toast from "react-hot-toast";

type TodoCheckProps = {
  task: string;
  todoId: string;
  isChecked: boolean;
  isMine: boolean;
  isLeader: boolean;
  canClick: boolean;
}

export default function TodoCheck({ task, todoId, isChecked, isMine, isLeader, canClick }: TodoCheckProps) {
  const [checked, setChecked] = useState(isChecked);

  //debounce 추가
  const saveCheck = useMemo(() => {
    return debounce(async (newChecked: boolean) => {
      console.log("checked" + newChecked);
      await fetch(`/api/todo/check/${todoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checked: newChecked }),
      });
    }, 500);
  }, [todoId]);

  const handleCheck = () => {
    if (!(isMine || isLeader)) return;
    const newChecked = !checked;
    setChecked(newChecked);
    saveCheck(newChecked);
    if (checked == false && isMine)
      toast.success(`${task} 완료!`, { duration: 2000 })
  }

  return (
    <div className={`flex w-full h-full justify-center items-center
      ${isMine ? "bg-primary-50" : ""}  border-t border-primary-100`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleCheck()}
        className={`w-4 h-4 border border-primary-500 rounded-xs
          ${!isLeader ? "text-gray-500" : ""} appearance-none
        checked:bg-primary-500 bg-white
        disabled:opacity-40 disabled:bg-gray-200
        accent-primary-500 disabled:checked:bg-primary-300`}
        disabled={!(isMine || isLeader)}
      />
    </div>
  )
}
