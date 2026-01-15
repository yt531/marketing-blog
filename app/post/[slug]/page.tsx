import { client, urlFor } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";

export const revalidate = 60;

// 1. 修改查詢指令：加入 categories[]->{title}
// 意思：去 categories 欄位找，把裡面所有關聯到的分類(title)都抓出來
const query = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    publishedAt,
    body,
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

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await client.fetch(query, { slug: params.slug });

  if (!post) {
    return <div className="text-center py-20">找不到這篇文章</div>;
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* 頁面頂部：分類標籤區 (新功能 ✨) */}
      {/* 只有當 post.categories 有資料時才顯示 */}
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
        <h1 className="text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
        <p className="text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString("zh-TW")}
          {post.author && ` · by ${post.author.name}`}
        </p>
      </header>

      {/* 封面圖片 */}
      {post.mainImage && (
        <div className="relative w-full h-64 md:h-96 mb-10 rounded-xl overflow-hidden shadow-lg">
          <img
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* 文章內文 */}
      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-16">
        <PortableText value={post.body} />
      </div>

      {/* 作者介紹卡片 */}
      {post.author && (
        <div className="border-t pt-10 mt-10">
          <div className="bg-gray-50 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
            {post.author.image && (
              <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  src={urlFor(post.author.image).width(200).height(200).url()}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
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
              <p className="text-gray-600 leading-relaxed">{post.author.bio}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
