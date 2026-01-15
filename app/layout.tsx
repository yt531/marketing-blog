import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // 1. 引入剛剛寫的 Navbar

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
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {/* 2. 把 Navbar 放在這裡，所有頁面都會顯示 */}
        <Navbar />

        {/* 這是原本的頁面內容 */}
        {children}

        {/* 3. 順手加個簡單的 Footer */}
        <footer className="text-center py-10 text-gray-400 text-sm border-t mt-20">
          © {new Date().getFullYear()} Jeff's Marketing Blog. All rights
          reserved.
        </footer>
      </body>
    </html>
  );
}
