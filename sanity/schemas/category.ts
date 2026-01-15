import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "文章分類",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "分類名稱",
      type: "string",
      validation: (Rule) => Rule.required(), // 必填
    }),
    defineField({
      name: "description",
      title: "分類描述",
      type: "text",
      rows: 3,
    }),
  ],
});
