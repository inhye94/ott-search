import "../public/styles/main.css";

import { Metadata } from "next";
import Gnb from "../src/components/gnb";

export const metadata: Metadata = {
  title: {
    template: "%s | 어디서 볼 수 있을까?",
    default: "바로 여기",
  },
  description:
    "나의 짱 멋진 첫 Next.js 프로젝트이자, 미디어 컨텐츠를 어디서 볼 수 있는지 검색하는 페이지.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Gnb />
        {children}
      </body>
    </html>
  );
}
