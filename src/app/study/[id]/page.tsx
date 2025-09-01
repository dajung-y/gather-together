// page
"use client"
import { useParams } from "next/navigation";

export default function page() {
  const params = useParams();
  const { id } = params;

  return (
    <>
      <h1>{id}의 About 페이지</h1>
    </>
  )
}
