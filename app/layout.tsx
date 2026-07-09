import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeff's Blog",
  description: "分享網路行銷與 SEO 的實戰經驗",
  // ✨ 這裡就是加入驗證碼的地方
  verification: {
    google: "T-C1mu7s8pJ3eq8MrhrWlIEMbYz3S4wJU0ztBh5fab0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      {/* 這裡保留 flex 設定是為了讓 WebsiteLayout 裡的 flex-grow 生效 */}
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
      {/* 2. 插入 Google Analytics 腳本 (以 lazyOnload 延遲載入) */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-HZXCPQTZEB`}
      />
      <Script strategy="lazyOnload" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HZXCPQTZEB', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </html>
  );
}