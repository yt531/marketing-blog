import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        {/* Navbar */}
        <Navbar />

        {/* 主要內容區：設定 flex-grow 確保內容少時 footer 也會沉在底部 */}
        <main className="flex-grow">{children}</main>

        {/* Footer：淡奶茶色背景 (#f4efe9) */}
        <footer className="bg-navbar text-center py-10 text-gray-500 text-sm mt-20 border-t border-orange-100/20">
          <div className="max-w-4xl mx-auto px-4">
            <p className="mb-2">
              © {new Date().getFullYear()} Jeff's Marketing Blog
            </p>
            <p className="text-xs opacity-70">Brewed with ❤️ and Data</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
