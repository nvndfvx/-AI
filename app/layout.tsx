import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "追根 AI",
  description: "一个基于用户原创思维体系的引导式问题解决对话软件",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
