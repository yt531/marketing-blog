"use client";

/**
 * 這個檔案是後台的設定中心
 * 它告訴 Sanity Studio 該如何運作，以及要使用哪些資料結構
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from "@sanity/code-input"; // 1. 引入程式碼插件
import { schema } from "./sanity/schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio", // 設定後台的網址路徑
  projectId,
  dataset,
  // 這裡我們引入之前寫好的 schema (包含 post)
  schema,
  plugins: [
    structureTool(), // 這是後台的左側選單工具
    codeInput(), // 2. 在這裡啟用插件
  ],
});
