import { defineField, defineType } from "sanity";

export default defineType({
  name: "postFolder",
  title: "文章資料夾",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "資料夾名稱",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "描述",
      type: "text",
      rows: 3,
    }),
  ],
});
