import Button from "@/components/common/Button";

// page
export default function page({params}: {params: {id:string}}) {
  // 해당 id 확인
  console.log(params.id);

  // 하드코딩 데이터
  const studyData = {
    id: "01",
    name: "정처기스터디",
    title: "정처기 9-10월 스터디 같이해요!",
    description: "정처기 9-10월 스터디 모집 (5명)\n9월부터 10월까지 2개월간 정처기시험 합격을 목표로 함께 공부할 스터디원을 모집합니다\n유튜브, 필기 교재를 통해 체계적 학습, 1주일에 상당 진도를 나가며 매일 줌으로 스터디 진행할 예정입니다.\n중간 중간에 이해된 부분과 개념을 같이 공유하며 서로 성장해나가며 합격의 기쁨을 모두가 느낄 수 있게 열심히 하겠습니다. 🔥",
    category: "자격증",
    maxMembers: 5,
    currentMembers: 2,
    startDate: "2025-08-27",
    endDate: "2025-10-30",
    weekdays: ["mon", "thu"],
    startTime: "17:00",
    endTime: "19:00",
    status: "recruiting",
    author: {
      id: "user_01",
      nickname: "작성자01",
    },
    createdAt: "2025-08-27T14:30:00Z",
    updatedAt: "2025-08-28T09:15:00Z"
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  const getWeekdayText = (weekday: string[]) => {
    const dayMap: {[key:string]: string} = {
      'mon' : '월', 'tue': '화', 'wed' : '수', 'thu': '목',
      'fri' : '금', 'sat': '토', 'sun' : '일'
    }
    return weekday.map((day) => dayMap[day]).join(', ');
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 max-w-5xl mx-auto w-full p-4">
        
        {/* 메인 제목 섹션 */}
        <section className="pb-6 mb-8 border-b border-gray-200">
          <h1 className="headline3 mb-4">
            <span className="headline4 mr-3 px-3 py-1 bg-primary-500 text-white rounded">
              {studyData.name}
            </span>
            {studyData.title}
          </h1>
          
          {/* 작성자 정보 */}
          <div className="flex items-center gap-2 text-gray-500">
            <span className="body-sb text-gray-700">{studyData.author.nickname}</span>
            <span>|</span>
            { studyData.updatedAt ? (
              <span>{formatDateTime(studyData.updatedAt)} (수정됨)</span>
            ) : (
              <span>{formatDateTime(studyData.createdAt)}</span>
            )}
          </div>
        </section>

        {/* 스터디 운영정보 섹션 */}
        <section className="mb-12">
          <h2 className="headline3 text-gray-800 mb-6">운영 정보</h2>
          <div className="bg-primary-50 rounded-2xl p-6">
            <div className="space-y-4">
              <div className="flex">
                <span className="min-w-[80px] headline5 text-gray-600">카테고리</span>
                <span className="body text-gray-900">{studyData.category}</span>
              </div>
              
              <div className="flex">
                <span className="min-w-[80px] headline5 text-gray-600">모집인원</span>
                <span className="body text-gray-900">{studyData.maxMembers}명</span>
              </div>
              
              <div className="flex">
                <span className="min-w-[80px] headline5 text-gray-600">진행기간</span>
                <span className="body text-gray-900">{formatDate(studyData.startDate)} - {formatDate(studyData.endDate)}</span>
              </div>
              
              <div className="flex">
                <span className="min-w-[80px] headline5 text-gray-600">진행요일</span>
                <span className="body text-gray-900">{getWeekdayText(studyData.weekdays)}</span>
              </div>
              
              <div className="flex">
                <span className="min-w-[80px] headline5 text-gray-600">진행시간</span>
                <span className="body text-gray-900">{studyData.startTime} - {studyData.endTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 스터디 소개 섹션 */}
        <section className="mb-12">
          <h2 className="headline3 text-primary-700 mb-6">스터디 소개</h2>
          <div className="bg-white border-t border-gray-200 p-6">
            <p className="body text-gray-800 leading-relaxed whitespace-pre-line">
              {studyData.description}
            </p>
          </div>
        </section>
      </div>

      {/* 하단 버튼 영역 */}
      <section className="mb-8 bg-white">
        <div className="max-w-5xl mx-auto p-6">
          <div className="flex justify-center">
            <Button size="lg" className="px-12">
              참여하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}