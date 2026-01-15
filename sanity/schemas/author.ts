import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "作者",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "姓名",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "網址代稱 (Slug)",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "image",
      title: "大頭貼",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "簡介",
      type: "text",
      rows: 3,
    }),
  ],
});
