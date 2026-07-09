import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("內容管理系統")
    .id("root")
    .items([
      // --- 1. 文章管理 ---
      S.listItem()
        .title("文章管理")
        .id("post-management-item")
        .child(
          S.list()
            .title("文章管理")
            .id("post-management")
            .items([
              S.listItem()
                .title("所有文章")
                .id("all-posts")
                .schemaType("post")
                .child(S.documentTypeList("post").title("所有文章")),
              S.listItem()
                .title("文章資料夾")
                .id("all-post-folders")
                .schemaType("postFolder")
                .child(S.documentTypeList("postFolder").title("文章資料夾")),
              S.listItem()
                .title("文章分類")
                .id("all-categories")
                .schemaType("category")
                .child(S.documentTypeList("category").title("文章分類")),
            ])
        ),

      // --- 2. 相簿管理 ---
      S.listItem()
        .title("相簿管理")
        .id("album-management-item")
        .child(
          S.list()
            .title("相簿管理")
            .id("album-management")
            .items([
              S.listItem()
                .title("所有相簿")
                .id("all-albums")
                .schemaType("album")
                .child(S.documentTypeList("album").title("所有相簿")),
              S.listItem()
                .title("相簿資料夾")
                .id("all-album-folders")
                .schemaType("albumFolder")
                .child(S.documentTypeList("albumFolder").title("相簿資料夾")),
            ])
        ),

      // 分隔線
      S.divider(),

      // --- 3. 人員與設定 ---
      S.listItem()
        .title("系統設定")
        .id("system-settings-item")
        .child(
          S.list()
            .title("系統設定")
            .id("system-settings")
            .items([
              S.listItem()
                .title("作者管理")
                .id("all-authors")
                .schemaType("author")
                .child(S.documentTypeList("author").title("作者管理")),
              S.listItem()
                .title("標籤管理")
                .id("all-tags")
                .schemaType("tag")
                .child(S.documentTypeList("tag").title("標籤管理")),
            ])
        ),
    ]);
