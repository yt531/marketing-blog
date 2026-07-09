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
      name: "folder",
      title: "所屬資料夾",
      type: "reference",
      to: [{ type: "postFolder" }],
    }),
    defineField({
      name: "categories",
      title: "文章分類",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "tags",
      title: "標籤",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
    }),
    defineField({
      name: "visibility",
      title: "能見度",
      type: "string",
      options: {
        list: [
          { title: "公開 (Public)", value: "public" },
          { title: "隱藏 (Hidden)", value: "hidden" },
          { title: "草稿 (Draft)", value: "draft" },
        ],
        layout: "radio",
      },
      initialValue: "public",
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
        // 1. 文字區塊 (Block) - Enhanced for WYSIWYG feel
        {
          type: "block",
          // (A) 樣式設定 (Styles)
          styles: [
            { title: "內文 (Normal)", value: "normal" },
            { title: "標題 1 (H1)", value: "h1" },
            { title: "標題 2 (H2)", value: "h2" },
            { title: "標題 3 (H3)", value: "h3" },
            { title: "標題 4 (H4)", value: "h4" },
            { title: "標題 5 (H5)", value: "h5" },
            { title: "標題 6 (H6)", value: "h6" },
            { 
              title: "引言 (Blockquote)", 
              value: "blockquote",
              component: (props: any) => (
                <blockquote style={{ borderLeft: '3px solid #ccc', paddingLeft: '1rem', fontStyle: 'italic', margin: '1.5rem 0' }}>
                  {props.children}
                </blockquote>
              )
            },
          ],
          lists: [
            { title: "項目符號 (Bullet)", value: "bullet" },
            { title: "編號清單 (Numbered)", value: "number" },
          ],
          // (B) 標記設定 (Marks)
          marks: {
            // 裝飾器 (Decorators): 按鈕開關
            decorators: [
              { title: "粗體 (Bold)", value: "strong" },
              { title: "斜體 (Italic)", value: "em" },
              { title: "底線 (Underline)", value: "underline" },
              { title: "刪除線 (Strike)", value: "strike-through" },
              { title: "程式碼 (Code)", value: "code" },
              { title: "上標 (Superscript)", value: "sup" },
              { title: "下標 (Subscript)", value: "sub" },
            ],
            // 註釋 (Annotations): 需要輸入資料
            annotations: [
              {
                title: "連結 (Link)",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "網址",
                    name: "href",
                    type: "url",
                    validation: Rule => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                  {
                    title: "在新分頁開啟",
                    name: "blank",
                    type: "boolean",
                    initialValue: true,
                  }
                ],
              },
              {
                name: "textColor",
                title: "文字顏色 (Text Color)",
                type: "object",
                fields: [
                  {
                    name: "color",
                    title: "選擇顏色",
                    type: "string",
                    options: {
                      list: [
                        { title: "黑色", value: "#000000" },
                        { title: "白色", value: "#ffffff" },
                        { title: "紅色", value: "#ef4444" },
                        { title: "藍色", value: "#3b82f6" },
                        { title: "綠色", value: "#22c55e" },
                        { title: "黃色", value: "#eab308" },
                        { title: "紫色", value: "#a855f7" },
                        { title: "灰色", value: "#6b7280" },
                      ],
                    },
                  },
                ],
              },
              {
                name: "highlightColor",
                title: "背景顏色 (Highlight)",
                type: "object",
                fields: [
                  {
                    name: "color",
                    title: "選擇背景顏色",
                    type: "string",
                    options: {
                      list: [
                        { title: "黃底", value: "#fef08a" },
                        { title: "紅底", value: "#fecaca" },
                        { title: "藍底", value: "#bfdbfe" },
                        { title: "綠底", value: "#bbf7d0" },
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
