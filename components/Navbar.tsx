import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 左邊：Logo / 網站名稱 */}
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 tracking-tight"
        >
          Jeff's <span className="text-indigo-600">Marketing</span>
          {/* 👆 如果您剛剛換了顏色，記得把這裡的 indigo 改成您的顏色 */}
        </Link>

        {/* 右邊：選單連結 */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-indigo-600 transition">
            首頁
          </Link>
          <Link href="/about" className="hover:text-indigo-600 transition">
            關於我
          </Link>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition">
            訂閱電子報
          </button>
        </div>
      </div>
    </nav>
  );
}
