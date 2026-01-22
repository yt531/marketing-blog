import Link from "next/link";
import { client } from "@/lib/sanity.client";

// 抓取資料的指令
const query = `
  *[_type == "post"] {
    title,
    slug,
    publishedAt,
    seoDescription
  } | order(publishedAt desc)
`;

// 設定每 60 秒更新一次資料
export const revalidate = 60;

export default async function HomePage() {
  // 防呆：如果沒設定 ID
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return <div className="p-10 text-red-600">請檢查 .env.local 設定</div>;
  }

  // 抓取文章資料
  const posts = await client.fetch(query);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">掌握網路行銷的關鍵策略</h1>
        <p className="text-xl text-gray-600 mb-6">歡迎來到Jeff的部落格</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">最新文章</h2>

        <div className="grid gap-8">
          {posts.length === 0 ? (
            <p className="text-gray-500">目前還沒有文章，請到後台新增。</p>
          ) : (
            posts.map((post: any) => (
              <article
                key={post.slug.current}
                className="border p-6 rounded-lg shadow-sm hover:shadow-md transition"
              >
                {/* 關鍵修正：這裡加回了 Link 標籤，把標題和按鈕包起來 */}
                <Link href={`/post/${post.slug.current}`}>
                  <h3 className="text-2xl font-semibold mb-2 hover:text-blue-600">
                    {post.title}
                  </h3>

                  <p className="text-gray-700 mb-4">{post.seoDescription}</p>

                  <span className="text-blue-600 font-medium group-hover:underline">
                    閱讀完整文章 →
                  </span>
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
