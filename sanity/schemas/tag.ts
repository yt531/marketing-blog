import { defineField, defineType } from "sanity";

export default defineType({
  name: "tag",
  title: "標籤",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "標籤名稱",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
