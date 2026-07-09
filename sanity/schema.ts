import { type SchemaTypeDefinition } from "sanity";
import post from "./schemas/post";
import author from "./schemas/author";
import category from "./schemas/category";
import postFolder from "./schemas/postFolder";
import albumFolder from "./schemas/albumFolder";
import album from "./schemas/album";
import tag from "./schemas/tag";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, postFolder, albumFolder, album, tag],
};
