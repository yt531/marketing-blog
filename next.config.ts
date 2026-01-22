import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // -------------------------------------------------------------------------
  // 1. 圖片優化設定
  // -------------------------------------------------------------------------
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // 允許 Sanity 的圖片伺服器
      },
      // 如果未來有其他圖片來源 (例如 Google 使用者頭像)，請加在這裡
    ],
  },

  // -------------------------------------------------------------------------
  // 2. 安全標頭設定 (Security Headers) - 防止病毒與惡意廣告
  // -------------------------------------------------------------------------
  async headers() {
    return [
      {
        // 套用到所有路徑
        source: "/:path*",
        headers: [
          {
            // 防止 Clickjacking 攻擊 (防止別人用 iframe 把你的網站內嵌在假網站裡)
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            // 防止瀏覽器推測檔案類型 (防止駭客把 .txt 偽裝成 .js 執行)
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // 保護使用者隱私，只傳送網域給外部連結，不傳送完整路徑
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            // 強制瀏覽器使用 HTTPS (有效期 2 年)
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // ★★★ 最重要的防禦：CSP 內容安全策略 ★★★
            // 這裡定義了「白名單」，未列出的來源一律封鎖
            key: "Content-Security-Policy",
            value: [
              // 預設：只允許同個網域 (self)
              "default-src 'self';",

              // 程式碼 (Script)：
              // 'unsafe-eval' 和 'unsafe-inline' 是 Next.js 開發模式必須的
              // 👇 未來如果要加 Google Ads，請在後面加上 https://pagead2.googlesyndication.com
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com;",

              // 樣式 (Style)：允許自己和行內樣式
              "style-src 'self' 'unsafe-inline';",

              // 圖片 (Image)：允許自己、Sanity、以及 Base64 格式
              "img-src 'self' blob: data: https://cdn.sanity.io;",

              // 字型 (Font)：只允許自己 (如果有用 Google Fonts 需加 https://fonts.gstatic.com)
              "font-src 'self';",

              // 媒體 (影片/音訊)：只允許自己
              "media-src 'self';",

              // 連線 (API 呼叫)：允許自己和 Sanity API
              // 如果有錯誤，請加上 https://*.sanity.io
              "connect-src 'self' https://*.sanity.io;",

              // 禁止使用 <object> 標籤 (Flash 等舊技術)
              "object-src 'none';",

              // 防止 <base> 標籤注入攻擊
              "base-uri 'self';",

              // 表單提交：只允許提交到自己的網站
              "form-action 'self';",
            ]
              .join(" ") // 把陣列接成一長串字串
              .replace(/\s{2,}/g, " ") // 移除多餘空白
              .trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
