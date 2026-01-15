import { type SchemaTypeDefinition } from "sanity";
import post from "./schemas/post";
import author from "./schemas/author";
import category from "./schemas/category"; // 1. 新增這一行

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category], // 2. 把 category 加進去
};
