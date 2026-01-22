import Link from "next/link";

export default function FollowPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* 頁面標題 */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-heading mb-4">
          追蹤最新動態 🧋
        </h1>
        <p className="text-gray-600 leading-relaxed">
          不想錯過最新的行銷乾貨與 SEO 實戰經驗嗎？
          <br />
          選擇你最喜歡的方式，與我保持聯繫！
        </p>
      </div>

      {/* 1. 社群連結區塊 (Grid 排版) */}
      <div className="grid md:grid-cols-2 gap-4 mb-16">
        {/* Instagram 卡片 */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-5 bg-white border border-orange-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
        >
          <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform">
            📸
          </div>
          <div>
            <h3 className="font-bold text-heading group-hover:text-primary transition-colors">
              Instagram
            </h3>
            <p className="text-xs text-gray-500">生活日常與圖文懶人包</p>
          </div>
        </a>

        {/* Facebook 卡片 */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-5 bg-white border border-orange-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform">
            📘
          </div>
          <div>
            <h3 className="font-bold text-heading group-hover:text-primary transition-colors">
              Facebook
            </h3>
            <p className="text-xs text-gray-500">行銷觀點與社團討論</p>
          </div>
        </a>

        {/* Threads / 其他連結 */}
        <a
          href="https://threads.net"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-5 bg-white border border-orange-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform">
            🧵
          </div>
          <div>
            <h3 className="font-bold text-heading group-hover:text-primary transition-colors">
              Threads
            </h3>
            <p className="text-xs text-gray-500">即時碎碎念與想法</p>
          </div>
        </a>

        {/* Email 聯絡 */}
        <a
          href="mailto:your-email@example.com"
          className="flex items-center p-5 bg-white border border-orange-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
        >
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform">
            📮
          </div>
          <div>
            <h3 className="font-bold text-heading group-hover:text-primary transition-colors">
              聯絡我
            </h3>
            <p className="text-xs text-gray-500">合作邀約或讀者來信</p>
          </div>
        </a>
      </div>

      {/* 2. 電子報訂閱區塊 */}
      <div className="bg-navbar rounded-3xl p-8 border border-orange-100/50 text-center">
        <h2 className="text-2xl font-bold text-heading mb-3">訂閱電子報 📩</h2>
        <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
          每週一封信，整理我最新的文章與行銷觀察，
          絕不發送垃圾郵件，隨時可以取消訂閱。
        </p>

        {/* 訂閱表單 */}
        <form className="max-w-sm mx-auto flex flex-col gap-3">
          <input
            type="email"
            placeholder="請輸入你的 Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-400"
            required
          />
          <button
            type="submit"
            className="btn-primary w-full py-3 text-white shadow-lg shadow-orange-200/50"
          >
            立即訂閱
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4">目前已有 1,200+ 位讀者加入</p>
      </div>
    </div>
  );
}
