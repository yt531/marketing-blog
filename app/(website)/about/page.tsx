import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "關於我 | Jeff 的行銷部落格",
  description: "了解更多關於 Jeff 的行銷經驗與故事",
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      {/* 上半部：個人形象區 */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
        {/* 左側：大頭照 */}
        <div className="shrink-0">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            <Image
              src="/me.png"
              alt="Jeff 的大頭照"
              width={400}
              height={400}
              className="object-cover w-full h-full"
              priority // ✨ 新增這一行：告訴瀏覽器這張圖很重要，要優先下載
            />
          </div>
        </div>

        {/* 右側：簡短介紹 */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            嗨，我是 <span className="text-amber-900">Jeff</span> 👋
          </h1>
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            這是一個專注於網路行銷、SEO 策略與品牌故事的部落格。
            我致力於用最白話的方式，分享複雜的行銷概念。
          </p>

          {/* 專業技能標籤 */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {["SEO 優化", "內容行銷", "品牌策略", "Google Ads", "數據分析"].map(
              (skill) => (
                <span
                  key={skill}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  # {skill}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* 下半部：詳細故事 (模擬文章排版) */}
      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">
          我的故事
        </h2>
        <p>
          歡迎來到這裡！我是一名熱愛行銷的數位遊牧者。在過去的幾年裡，我協助過許多品牌從零開始建立網路聲量。我發現，許多人對於「行銷」這兩個字感到恐懼，認為它需要高深的數學或複雜的工具。
        </p>
        <p>但其實，行銷的核心只是「人」。</p>
        <p>
          建立這個部落格的初衷，是希望將我這幾年來的實戰經驗，整理成容易閱讀的文章。無論你是剛起步的創業者，還是想轉職的行銷新鮮人，希望這裡的內容能為你帶來一點靈感。
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">聯絡我</h3>
        <p>
          如果你有任何合作需求，或是單純想聊聊行銷趨勢，歡迎透過以下方式聯繫我：
        </p>
        <ul className="list-none pl-0">
          <li>
            📧 Email:{" "}
            <a
              href="mailto:jeff@gmail.com"
              className="text-amber-900 hover:underline"
            >
              jeff@example.com
            </a>
          </li>
          <li>
            📱 LinkedIn:{" "}
            <a href="#" className="text-amber-900 hover:underline">
              Jeff Profile
            </a>
          </li>
        </ul>
      </div>

      {/* 底部 CTA */}
      <div className="mt-16 text-center bg-orange-100 rounded-2xl p-10">
        <h3 className="text-2xl font-bold mb-4">不想錯過最新文章？</h3>
        <p className="text-gray-600 mb-6">歡迎回到首頁查看更多行銷乾貨！</p>
        <Link
          href="/"
          className="inline-block text-amber-900 bg-white px-8 py-3 rounded-full font-semibold hover:bg-[#e6992b] transition shadow-lg hover:shadow-xl"
        >
          閱讀文章 →
        </Link>
      </div>
    </main>
  );
}
