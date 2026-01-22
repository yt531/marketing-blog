import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // 全域樣式保留在這裡，確保 Studio 也能吃到字體或基礎設定(如果有需要)

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeff 的行銷部落格",
  description: "分享網路行銷與 SEO 的實戰經驗",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      {/* 這裡保留 flex 設定是為了讓 WebsiteLayout 裡的 flex-grow 生效 */}
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
