import Button from "@/components/common/Button";

// 버튼 padding 해결방법 생각해보기
export default function ButtonContainer() {
  return(
    <div className="flex justify-center my-4 w-full">
      <div className="flex justify-center gap-4">
        <Button size="md"
                variant="outline"
                >
          취소
        </Button>
        <Button size="md"
                >
          등록
        </Button>    
      </div>
    </div>
  )
}