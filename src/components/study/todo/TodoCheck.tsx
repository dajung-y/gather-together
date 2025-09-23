"use client"

import { Check } from '@/types/todo';
import debounce from 'lodash.debounce';
import React, { useMemo, useState } from 'react'

type TodoCheckProps = {
  todoId: string;
  check: Check;
}

export default function TodoCheck({ todoId, check }: TodoCheckProps) {
  const [checked, setChecked] = useState(check.checked);

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
    const newChecked = !checked;
    setChecked(newChecked);
    saveCheck(newChecked);
  }



  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleCheck()}
      />
    </div>
  )
}
