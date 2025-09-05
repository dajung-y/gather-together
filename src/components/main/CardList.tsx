import {variantStyles} from '../../styles/studyCardStyles'
import StudyCard from '../common/StudyCard';

interface StudyCardProps {
  variant?: keyof typeof variantStyles;
  name: string;
  title: string;
  startDate: Date;
  endDate: Date;
  time: string;
  currentMembers: number;
  maxMembers: number;
  tag: string;
}

// 더미 데이터
const dummyStudyCards: StudyCardProps[] = [
  {
    variant: "mainOpen",
    name: "토익뿌셔",
    title: "[웹팀 토익공부 모집합니다]",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-03-30"),
    time: "오후 7시",
    currentMembers: 3,
    maxMembers: 6,
    tag: "어학/외국어"
  },
  {
    variant: "mainClosed",
    name: "알고알고",
    title: "[알고리즘 스터디 함께하실 분]",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-04-15"),
    time: "오후 8시",
    currentMembers: 8,
    maxMembers: 8,
    tag: "프로그래밍"
  },
  {
    variant: "mainOpen",
    name: "다독다독",
    title: "[독서 토론 모임 신규 멤버 모집]",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-05-01"),
    time: "오후 6시 30분",
    currentMembers: 2,
    maxMembers: 5,
    tag: "문화/교양"
  },
  {
    variant: "mainOpen",
    name: "리액트스터디",
    title: "[리액트 스터디 초보 환영]",
    startDate: new Date("2024-01-20"),
    endDate: new Date("2024-04-20"),
    time: "오후 9시",
    currentMembers: 4,
    maxMembers: 6,
    tag: "프로그래밍"
  },
  {
    variant: "mainClosed",
    name: "토익말고토플",
    title: "[TOEFL 집중반 스터디]",
    startDate: new Date("2024-01-10"),
    endDate: new Date("2024-03-10"),
    time: "오전 10시",
    currentMembers: 4,
    maxMembers: 4,
    tag: "어학/외국어"
  },
  {
    variant: "mainOpen",
    name: "오늘은 경제왕",
    title: "[경제학 원서 읽기 모임]",
    startDate: new Date("2024-02-05"),
    endDate: new Date("2024-05-05"),
    time: "오후 7시 30분",
    currentMembers: 1,
    maxMembers: 4,
    tag: "경제/경영"
  },
  {
    variant: "mainOpen",
    name: "디자이너스",
    title: "[피그마 디자인 스터디]",
    startDate: new Date("2024-01-25"),
    endDate: new Date("2024-03-25"),
    time: "오후 8시 30분",
    currentMembers: 3,
    maxMembers: 5,
    tag: "디자인"
  },
  {
    variant: "mainClosed",
    name: "내일은 공무원",
    title: "[공무원 시험 준비 스터디]",
    startDate: new Date("2024-01-05"),
    endDate: new Date("2024-12-31"),
    time: "오전 9시",
    currentMembers: 6,
    maxMembers: 6,
    tag: "시험/자격증"
  },
  {
    variant: "mainOpen",
    name: "파이썬 스터디",
    title: "[파이썬 기초부터 심화까지]",
    startDate: new Date("2024-02-10"),
    endDate: new Date("2024-05-10"),
    time: "오후 7시",
    currentMembers: 2,
    maxMembers: 8,
    tag: "프로그래밍"
  },
  {
    variant: "mainOpen",
    name: "영어로 말해요",
    title: "[영어 회화 실력 향상 모임]",
    startDate: new Date("2024-01-30"),
    endDate: new Date("2024-04-30"),
    time: "오후 6시",
    currentMembers: 5,
    maxMembers: 8,
    tag: "어학/외국어"
  },
  {
    variant: "mainClosed",
    name: "분석분석",
    title: "[데이터 분석 실무 스터디]",
    startDate: new Date("2024-01-12"),
    endDate: new Date("2024-04-12"),
    time: "오후 8시",
    currentMembers: 4,
    maxMembers: 4,
    tag: "프로그래밍"
  },
  {
    variant: "mainOpen",
    name: "너도 나도 창업",
    title: "[창업 아이디어 발굴 모임]",
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-05-15"),
    time: "오후 7시",
    currentMembers: 1,
    maxMembers: 3,
    tag: "경제/경영"
  },
  {
    variant: "mainOpen",
    name: "역사천재",
    title: "[한국사 능력검정시험 대비]",
    startDate: new Date("2024-01-22"),
    endDate: new Date("2024-03-22"),
    time: "오후 9시",
    currentMembers: 3,
    maxMembers: 6,
    tag: "시험/자격증"
  },
  {
    variant: "mainClosed",
    name: "포폴제작",
    title: "[UI/UX 디자인 포트폴리오 제작]",
    startDate: new Date("2024-01-08"),
    endDate: new Date("2024-04-08"),
    time: "오후 8시",
    currentMembers: 5,
    maxMembers: 5,
    tag: "디자인"
  },
  {
    variant: "mainOpen",
    name: "듣고말해요",
    title: "[클래식 음악 감상 및 토론]",
    startDate: new Date("2024-02-20"),
    endDate: new Date("2024-05-20"),
    time: "오후 6시 30분",
    currentMembers: 2,
    maxMembers: 4,
    tag: "문화/교양"
  },
  {
    variant: "mainOpen",
    name: "JS 스터디",
    title: "[자바스크립트 마스터하기]",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-05-01"),
    time: "오후 9시 30분",
    currentMembers: 6,
    maxMembers: 10,
    tag: "프로그래밍"
  }
];

export default function CardList () {
  return(
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {dummyStudyCards.map((card,i) => (
        <article key={i}
                 className='flex justify-center w-full h-full'>
          <StudyCard 
            key={i}
            variant={card.variant}
            name={card.name}
            title={card.title}
            startDate={card.startDate}
            endDate={card.endDate}
            time={card.time}
            currentMembers={card.currentMembers}
            maxMembers={card.maxMembers}
            tag={card.tag} />
        </article>
      ))}
    </div>
  )
}