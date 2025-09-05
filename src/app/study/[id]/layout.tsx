import Sidebar, { handleLeaveRoom } from "@/components/common/Sidebar";
import { MenuItem } from "@/types/sidebar";

const menuItems: MenuItem[] = [
  //링크 이동
  {
    label: '메인',
    path: '/study/1'
  },
  {
    label: '일정',
    path: '/study/1/todo'
  },
  {
    label: '설정',
    path: '/study/1/setting'
  },

  //함수 실행
  //useClient 컴포넌트에서만 함수를 만들 수 있기 때문에
  //sidebar component에서 함수 만든 후 export해서 사용
  {
    label: '탈퇴하기',
    onClick: handleLeaveRoom
  },
]

export default function Layout({ children }: { children: React.ReactNode; }) {
  return (
    <div>
      <div className="fixed top-20 left-0">
        {/* 아래 수정필요! */}
        <Sidebar title="1일 1영어" menuItems={menuItems} />
      </div>

      <div>{children}</div>
    </div>
  );
}
