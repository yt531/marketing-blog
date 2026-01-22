// 👇 修正這裡：使用四個 "../" 回到最外層，才能找到 lib
import { client, urlFor } from "../../../../lib/sanity.client";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { Metadata } from "next";

// 設定快取更新時間 (60秒)
export const revalidate = 60;

// 1. 定義 PortableText 的渲染規則 (樣式設定)
const myPortableTextComponents: PortableTextComponents = {
  // (A) 自定義區塊類型
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-8 overflow-hidden rounded-lg shadow-md">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "文章圖片"}
            width={800}
            height={500}
            className="w-full h-auto object-cover"
          />
          {value.alt && (
            <p className="mt-2 text-center text-sm text-gray-500">
              {value.alt}
            </p>
          )}
        </div>
      );
    },
    code: ({ value }: any) => {
      return (
        <div className="my-6 overflow-hidden rounded-lg bg-gray-900 p-4 text-white shadow-lg">
          <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2">
            <span className="text-xs font-mono text-gray-400">
              {value.language || "text"}
            </span>
            {value.filename && (
              <span className="text-xs text-gray-500">{value.filename}</span>
            )}
          </div>
          <pre className="overflow-x-auto">
            <code className="font-mono text-sm">{value.code}</code>
          </pre>
        </div>
      );
    },
  },

  // (B) 自定義文字區塊
  block: {
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 bg-blue-50 py-3 pl-4 italic text-gray-700 my-6 rounded-r-lg">
        {children}
      </blockquote>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-10 mb-4 text-gray-900">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-800">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-lg leading-relaxed text-gray-700">{children}</p>
    ),
  },

  // (C) 自定義標記 (大字體、顏色、連結)
  marks: {
    big: ({ children }) => (
      <span className="text-xl font-bold md:text-2xl text-gray-800 leading-tight">
        {children}
      </span>
    ),
    textColor: ({ children, value }: any) => {
      const colorClass =
        {
          red: "text-red-600",
          blue: "text-blue-600",
          green: "text-green-600",
          gray: "text-gray-500",
        }[value?.color as string] || "text-gray-800";
      return <span className={colorClass}>{children}</span>;
    },
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-600 hover:underline decoration-blue-400 underline-offset-2"
        >
          {children}
        </a>
      );
    },
  },
};

// 2. 定義資料抓取函式
const query = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    publishedAt,
    body,
    seoDescription,
    author->{
      name,
      image,
      bio
    },
    categories[]->{
      title
    }
  }
`;

async function getPost(slug: string) {
  try {
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}

// 3. 產生動態 SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "文章不存在",
    };
  }

  return {
    title: `${post.title} | Jeff 的行銷部落格`,
    description: post.seoDescription || "觀看 Jeff 的行銷實戰文章",
    openGraph: {
      title: post.title,
      description: post.seoDescription,
      type: "article",
      images: post.mainImage
        ? [urlFor(post.mainImage).width(1200).height(630).url()]
        : [],
    },
  };
}

// 4. 頁面主程式
export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <div className="text-center py-20 text-xl">
        <h1 className="font-bold text-2xl mb-4">找不到這篇文章</h1>
        <a href="/" className="text-blue-600 hover:underline">
          返回首頁
        </a>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* 頁面頂部：分類標籤區 */}
      {post.categories && (
        <div className="flex justify-center gap-2 mb-4">
          {post.categories.map((category: any) => (
            <span
              key={category.title}
              className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium tracking-wide"
            >
              {category.title}
            </span>
          ))}
        </div>
      )}

      {/* 文章標題區 */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-gray-900">
          {post.title}
        </h1>
        <div className="text-gray-500 flex justify-center items-center gap-2 text-sm md:text-base">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("zh-TW", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.author && <span>· by {post.author.name}</span>}
        </div>
      </header>

      {/* 封面圖片 */}
      {post.mainImage && (
        <div className="relative w-full h-64 md:h-96 mb-10 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* 文章內文 (已套用樣式設定) */}
      <div className="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed mb-16">
        {post.body ? (
          <PortableText
            value={post.body}
            components={myPortableTextComponents}
          />
        ) : (
          <p className="text-gray-500 italic">本篇文章暫無內容...</p>
        )}
      </div>

      {/* 作者介紹卡片 */}
      {post.author && (
        <div className="border-t border-gray-200 pt-10 mt-10">
          <div className="bg-gray-50 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
            {post.author.image && (
              <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md relative">
                <Image
                  src={urlFor(post.author.image).width(200).height(200).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">
                關於作者
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {post.author.name}
              </h3>
              {post.author.bio ? (
                <div className="text-gray-600 leading-relaxed">
                  <PortableText value={post.author.bio} />
                </div>
              ) : (
                <p className="text-gray-600">作者簡介尚未提供</p>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
