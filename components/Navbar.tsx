import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50 bg-navbar/95 backdrop-blur-sm border-b border-orange-100/50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO 區域 (維持不變) */}
        <Link
          href="/"
          className="text-2xl font-bold text-heading hover:opacity-80 transition-opacity tracking-tight"
        >
          Jeff<span className="text-primary">.Marketing</span>
        </Link>

        {/* 選單連結 */}
        <div className="flex gap-6 text-sm font-medium items-center">
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

          {/* ✨ 修改這裡：改為「追蹤新消息」按鈕 ✨ */}
          <Link
            href="/follow"
            className="btn-primary text-xs !py-2 !px-4 shadow-sm hover:shadow-md"
          >
            追蹤新消息
          </Link>
        </div>
      </div>
    </nav>
  );
}
