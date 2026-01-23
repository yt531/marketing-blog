import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url"; // 1. 引入圖片處理工具

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

// 2. 設定圖片網址產生器
const builder = imageUrlBuilder(client);

// 3. 匯出 urlFor 函式，這就是錯誤訊息說「找不到」的部分
export function urlFor(source: any) {
  return builder.image(source);
}

// 文章類型定義
export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  mainImage?: {
    asset: {
      url: string;
    };
  };
  body?: Array<{
    children?: Array<{
      text?: string;
    }>;
  }>;
}

// 取得所有文章
export async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post"] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset -> {
        url
      }
    },
    body
  } | order(publishedAt desc)`;

  return client.fetch(query);
}
