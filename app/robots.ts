import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // 你的網域
  const baseUrl = "https://jeff-blog-tw.vercel.app";

  return {
    rules: {
      userAgent: "*", // 針對所有搜尋引擎機器人 (Google, Bing, Yahoo...)
      allow: "/", // 允許爬取所有頁面
      disallow: [
        "/studio/", // ⛔ 禁止爬取 Sanity 後台
        "/api/", // ⛔ 禁止爬取 API 路由 (通常不需要 SEO)
      ],
    },
    // 👇 這裡就是告訴爬蟲 Sitemap 的位置
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
