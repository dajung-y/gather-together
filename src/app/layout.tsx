import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "모여모여",
  description: "함께 성장하는 스터디 플랫폼, 모여모여에서 새로운 동료들과 학습하세요",
  keywords: ["스터디", "온라인 스터디", "온라인 학습", "스터디 플랫폼"]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <div id="modal-root" />
      </body>
    </html>
  );
}
