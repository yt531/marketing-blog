import { MetadataRoute } from "next";
// 👇 修改這裡：使用「相對路徑」避免別名錯誤
import { client } from "../lib/sanity.client";

// 定義 Sanity 回傳的資料介面
interface SanityPost {
  slug: string;
  updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 設定你的網站網址 (請確認這是你想要的正式網址)
  const baseUrl = "https://jeff-blog-tw.vercel.app";

  // 1. 定義 GROQ 查詢
  const query = `
    *[_type == "post"] {
      "slug": slug.current,
      "updatedAt": _updatedAt
    }
  `;

  // 2. 從 Sanity 獲取資料 (使用 try-catch 防止連線失敗報錯)
  let posts: SanityPost[] = [];
  try {
    posts = await client.fetch(query);
  } catch (error) {
    console.error("Sitemap生成失敗，無法連線至 Sanity:", error);
  }

  // 3. 將 Sanity 文章轉換為 Sitemap 格式
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 4. 回傳完整的 Sitemap
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/follow`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...postUrls, // 展開動態文章
  ];
}
