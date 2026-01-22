import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2023-05-03";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

// --- 新增：圖片處理工具 ---
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// 👇 新增這一行：同時提供 Default Export，解決 sitemap 找不到 client 的問題
export default client;
