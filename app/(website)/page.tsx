import { getPosts, type Post } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();

  return (
    // 1. 外層容器：根據你的規劃，設定電腦版最大寬度與內距
    <div className="max-w-7xl mx-auto px-5 py-12">
      <h1 className="text-3xl md:text-5xl font-bold mb-12 text-heading text-center">
        最新文章
      </h1>

      {/* 2. 響應式 Grid 佈局：手機 1 欄 / 平板 2 欄 / 電腦 3 欄 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post: Post) => (
          <article
            key={post._id}
            // 3. 卡片容器：h-full 確保高度一致，flex-col 讓內容垂直排列
            className="flex flex-col bg-white rounded-2xl shadow-sm border border-orange-100/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
          >
            {/* 圖片區域：固定高度，寬度填滿 */}
            {post.mainImage && (
              <div className="relative w-full h-56 flex-shrink-0 bg-gray-100">
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* 內容區域：flex-col + flex-grow 實現對齊魔法 */}
            <div className="flex flex-col flex-grow p-6">
              {/* 標題：限制 2 行 */}
              <h2 className="text-xl font-bold mb-3 text-heading hover:text-primary transition-colors line-clamp-2 leading-tight">
                <Link href={`/post/${post.slug.current}`}>{post.title}</Link>
              </h2>

              {/* 摘要：flex-grow 自動佔據剩餘空間，推擠下方按鈕 */}
              <p className="text-gray-600 mb-6 line-clamp-3 text-sm flex-grow">
                {post.body?.[0]?.children?.[0]?.text || "點擊閱讀更多內容..."}
              </p>

              {/* 底部區域：日期與按鈕，強制置底 */}
              <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-xs text-gray-400 font-medium">
                  {new Date(post.publishedAt).toLocaleDateString("zh-TW", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>

                <Link
                  href={`/post/${post.slug.current}`}
                  className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 group"
                >
                  閱讀文章
                  {/* 箭頭圖示，Hover 時會稍微移動 */}
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
