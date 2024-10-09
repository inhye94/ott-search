import "../public/styles/main.css";

import { Metadata } from "next";
import { Navigation } from "../src/components/navigation";
import Link from "next/link";
import Layout from "../src/components/layout";
import Logo from "../src/components/logo";
import Gnb from "../src/components/gnb";

export const metadata: Metadata = {
  title: {
    template: "%s | 멋진 페이지",
    default: "Cool Movie",
  },
  description: "나의 짱 멋진 Next.js 페이지",
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
