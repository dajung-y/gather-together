"use client"

import { Check } from '@/types/todo';
import React, { useState } from 'react'

type TodoCheckProps = {
  todoId: string;
  check: Check;
}

export default function TodoCheck({ todoId, check }: TodoCheckProps) {
  const [checked, setChecked] = useState(check.checked);

  const handleCheck = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    saveCheck(newChecked);
  }

  const saveCheck = async (newChecked: boolean) => {
    console.log("checked" + newChecked);
    await fetch(`/api/todo/check/${todoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: newChecked }),
    });
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => handleCheck()}
      />
    </div>
  )
}
