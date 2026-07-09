import { defineField, defineType } from "sanity";

export default defineType({
  name: "album",
  title: "相簿",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "相簿名稱",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "folder",
      title: "所屬資料夾",
      type: "reference",
      to: [{ type: "albumFolder" }],
    }),
    defineField({
      name: "description",
      title: "相簿描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "images",
      title: "圖片列表",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "替代文字 (Alt Text)",
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    }),
  ],
});
