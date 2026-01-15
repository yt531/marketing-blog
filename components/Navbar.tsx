import Link from "next/link";

export default function Navbar() {
  return (
    // 使用 sticky top-0 讓選單固定在上方，加上淡奶茶色背景
    <nav className="w-full sticky top-0 z-50 bg-navbar/95 backdrop-blur-sm border-b border-orange-100/50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO 區域 */}
        <Link
          href="/"
          className="text-2xl font-bold text-heading hover:opacity-80 transition-opacity tracking-tight"
        >
          Jeff<span className="text-primary">.Marketing</span>
        </Link>

        {/* 選單連結 */}
        <div className="flex gap-6 text-sm font-medium">
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
          {/* 你可以加上這個按鈕來測試我們的新樣式 */}
          <Link href="/studio" className="btn-primary text-xs !py-2 !px-4">
            後台管理
          </Link>
        </div>
      </div>
    </nav>
  );
}
