"use client"
import { useParams } from "next/navigation";
import Button from "@/components/common/Button";

export default function page() {
  const params = useParams();
  const { id } = params;

  return (
    <>
      <h1>{id}의 About 페이지</h1>
      <Button>버튼테스트</Button>
      <Button variant="outline">버튼테스트</Button>
      <Button variant="secondary">버튼테스트</Button>

    </>
  )
}
