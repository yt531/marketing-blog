import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // 你的網站正式網址
  const baseUrl = "https://jeff-blog-tw.vercel.app";

  return {
    rules: {
      // 針對所有爬蟲 (Google, Bing, Yahoo 等)
      userAgent: "*",
      // ✅ 允許：爬取首頁及所有子頁面
      allow: "/",
      // ⛔ 禁止：爬取後台和 API 路徑
      disallow: [
        "/studio/", // Sanity 後台登入頁，不需要被搜尋到
        "/api/", // 程式溝通用的 API，不需要被搜尋到
      ],
    },
    // 👇 告訴爬蟲你的 Sitemap 在哪裡 (這行最重要！)
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
