"use client"; // 1. 標記為客戶端元件，因為我們需要用 useState

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  // 2. 建立一個狀態來控制選單的開 (true) 與關 (false)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-navbar/95 backdrop-blur-sm border-b border-orange-100/50 shadow-sm transition-all duration-300">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO 區域 */}
        <Link
          href="/"
          className="text-2xl font-bold text-heading hover:opacity-80 transition-opacity tracking-tight"
          onClick={() => setIsOpen(false)} // 點擊 Logo 關閉選單，提供更好的體驗
        >
          Jeff<span className="text-primary">.Marketing</span>
        </Link>

        {/* 3. 桌面版選單 
          hidden md:flex -> 手機隱藏，中型螢幕(md)以上變回 flex 顯示
        */}
        <div className="hidden md:flex gap-6 text-sm font-medium items-center">
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            首頁
          </Link>
          <Link
            href="/about"
            className="text-foreground hover:text-primary transition-colors"
          >
            關於我
          </Link>
          <Link
            href="/follow"
            className="btn-primary text-xs !py-2 !px-4 shadow-sm hover:shadow-md transition-all"
          >
            追蹤新消息
          </Link>
        </div>

        {/* 4. 手機版漢堡按鈕 
          md:hidden -> 中型螢幕(md)以上隱藏，只在手機顯示
        */}
        <button
          className="md:hidden p-2 text-heading focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="切換選單"
        >
          {/* 根據 isOpen 狀態切換圖示 */}
          {isOpen ? (
            // 關閉圖示 (X)
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // 漢堡圖示 (三條線)
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* 5. 手機版下拉選單 (Overlay)
        absolute top-full -> 絕對定位，緊貼在 Navbar 下方
      */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-orange-100/50 shadow-xl py-6 px-4 flex flex-col gap-6 animate-in slide-in-from-top-2">
          <Link
            href="/"
            className="text-lg font-medium text-foreground hover:text-primary"
            onClick={() => setIsOpen(false)} // 點擊連結後自動關閉選單
          >
            首頁
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium text-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            關於我
          </Link>
          <Link
            href="/follow"
            className="btn-primary text-center py-3 shadow-md"
            onClick={() => setIsOpen(false)}
          >
            追蹤新消息
          </Link>
        </div>
      )}
    </nav>
  );
}
