"use client"

import debounce from 'lodash.debounce';
import React, { useMemo, useState } from 'react'

type TodoCheckProps = {
  todoId: string;
  isChecked: boolean;
  canClick: boolean;
}

export default function TodoCheck({ todoId, isChecked, canClick }: TodoCheckProps) {
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
    if (!canClick) return;
    const newChecked = !checked;
    setChecked(newChecked);
    saveCheck(newChecked);
  }

  return (
    <div className={`flex w-full h-full justify-center items-center
      ${canClick ? "bg-primary-50" : ""} `}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleCheck()}
        className={`w-4 h-4 border border-primary-500 rounded-xs
          ${!canClick ? "text-gray-500" : ""} appearance-none
        checked:bg-primary-500 bg-white
        disabled:opacity-40 disabled:bg-gray-200
        accent-primary-500 disabled:checked:bg-primary-300`}
        disabled={!canClick}
      />
    </div>
  )
}
