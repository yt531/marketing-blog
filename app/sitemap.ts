import { MetadataRoute } from "next";
import { client } from "@/lib/sanity.client";

// 定義網址前綴 (請改成你的實際網域)
const baseUrl = "https://你的網址.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. 抓取所有文章的 Slug
  const query = `*[_type == "post"] { slug, publishedAt }`;
  const posts = await client.fetch(query);

  // 2. 產生文章頁面的網址列表
  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/post/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. 回傳完整 Sitemap
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
    ...postUrls,
  ];
}
