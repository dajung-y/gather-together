import Image from "next/image";

export default function Footer() {
  return(
    <footer className="bg-gray-200">
      <div className="
        max-w-[1280px] mx-auto
        px-4 py-8
        sm:px-4 sm:py-6
        md:px-6 md:py-8
        lg:px-8 lg:py-10
      ">
        {/* 데스크탑/태블릿용 푸터 */}
        <div className="hidden md:block">
          <div className="flex justify-between">
            <div className="flex flex-col space-y-2">
              <Image src='/images/logo.png'
                     alt="모여모여 로고"
                     width={160}
                     height={40}
                     className="w-40 h-10" />
              <p className="caption px-1.5 text-gray-600">© 2025 모여모여</p>
            </div>
            <div className="flex flex-col space-y-2 justify-end">
              <a href="https://github.com/dajung-y/gather-together"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="caption text-gray-600 hover:text-black hover:underline">
                  Github
                </a>
              <a href="https://www.notion.so/263eb6a80dc580668829d15f03fc3c2b?source=copy_link"
                target="_blank"
                rel="noopener noreferrer"
                className="caption text-gray-600 hover:text-black hover:underline">
                프로젝트 소개
              </a>
            </div>
          </div>

        </div>
        {/* 모바일용 푸터 */}
        <div className="block md:hidden">
          <div className="flex flex-col items-center space-y-2">
            <Image src='/images/logo.png'
                      alt="모여모여 로고"
                      width={160}
                      height={40}
                      className="w-40 h-10" />
            <div className="flex space-x-2">
              <a href="https://github.com/dajung-y/gather-together"
                 target="_blank"
                 rel="noopener noreferrer">
                Github
              </a>
              <a href="https://www.notion.so/263eb6a80dc580668829d15f03fc3c2b?source=copy_link"
                 target="_blank"
                 rel="noopener noreferrer">
                프로젝트 소개
              </a>
            </div>
            <p className="caption text-gray-600">© 2025 모여모여</p>
          </div>
        </div>
      </div>

    </footer>
  )
}