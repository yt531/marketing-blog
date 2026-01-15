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
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "categories",
      title: "文章分類",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
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

    // --- 文章內容編輯器設定 ---
    defineField({
      name: "body",
      title: "文章內容",
      type: "array",
      of: [
        // 1. 文字區塊 (Block)
        {
          type: "block",
          // (A) 樣式設定 (Styles)
          styles: [
            { title: "內文", value: "normal" },
            { title: "標題 1", value: "h1" },
            { title: "標題 2", value: "h2" },
            { title: "標題 3", value: "h3" },
            { title: "引言", value: "blockquote" },
          ],
          // (B) 標記設定 (Marks)
          marks: {
            // 裝飾器 (Decorators): 按鈕開關
            decorators: [
              { title: "粗體", value: "strong" },
              { title: "斜體", value: "em" },
              { title: "程式碼", value: "code" },
              { title: "底線", value: "underline" },
              { title: "刪除線", value: "strike-through" },
              { title: "大字體", value: "big" }, // 自定義功能
            ],
            // 註釋 (Annotations): 需要輸入資料
            annotations: [
              {
                title: "連結",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "網址",
                    name: "href",
                    type: "url",
                  },
                ],
              },
              {
                name: "textColor",
                title: "文字顏色",
                type: "object",
                fields: [
                  {
                    name: "color",
                    title: "選擇顏色",
                    type: "string",
                    options: {
                      list: [
                        { title: "紅色", value: "red" },
                        { title: "藍色", value: "blue" },
                        { title: "綠色", value: "green" },
                        { title: "灰色", value: "gray" },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
        // 2. 圖片區塊 (Image)
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              type: "text",
              name: "alt",
              title: "圖片替代文字 (Alt Text)",
              rows: 2,
            },
          ],
        },
        // 3. 程式碼區塊 (Code Block)
        {
          type: "code",
          name: "code",
          title: "程式碼區塊",
          options: {
            language: "javascript",
            withFilename: true,
          },
        },
      ],
    }),
  ],
});
