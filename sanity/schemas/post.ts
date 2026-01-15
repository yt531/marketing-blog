import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "文章",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "文章標題",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "網址代稱 (Slug)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "作者",
      type: "reference", // 關聯類型：指向另一個文件
      to: [{ type: "author" }], // 指向 author
    }),
    defineField({
      name: "categories",
      title: "文章分類",
      type: "array", // 陣列類型 (因為可以選多個)
      of: [{ type: "reference", to: { type: "category" } }], // 這裡指向 category
    }),
    defineField({
      name: "seoDescription",
      title: "SEO 簡短描述",
      type: "text",
      rows: 3,
      description: "請輸入 50-150 字的摘要，這對搜尋排名非常重要。",
    }),
    defineField({
      name: "mainImage",
      title: "封面圖片",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "publishedAt",
      title: "發布時間",
      type: "datetime",
    }),
  ],
});
