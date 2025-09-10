
import Button from "@/components/common/Button";


export default function ButtonContainer() {

  return(
    <div className="flex justify-center my-4 w-full">
      <div className="flex justify-center w-1/2 md:w-1/3 gap-4">
        <Button size="md"
                variant="outline"
                className="w-full"
                >
          취소
        </Button>
        <Button size="md"
                className="w-full"
                >
          등록
        </Button>    
      </div>
    </div>
  )
}