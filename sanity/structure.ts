import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("內容管理系統")
    .items([
      // --- 1. 文章管理 ---
      S.listItem()
        .title("文章管理")
        .child(
          S.list()
            .title("文章管理")
            .items([
              S.listItem()
                .title("所有文章")
                .schemaType("post")
                .child(S.documentTypeList("post").title("所有文章")),
              S.listItem()
                .title("文章資料夾")
                .schemaType("postFolder")
                .child(S.documentTypeList("postFolder").title("文章資料夾")),
              S.listItem()
                .title("文章分類")
                .schemaType("category")
                .child(S.documentTypeList("category").title("文章分類")),
            ])
        ),

      // --- 2. 相簿管理 ---
      S.listItem()
        .title("相簿管理")
        .child(
          S.list()
            .title("相簿管理")
            .items([
              S.listItem()
                .title("所有相簿")
                .schemaType("album")
                .child(S.documentTypeList("album").title("所有相簿")),
              S.listItem()
                .title("相簿資料夾")
                .schemaType("albumFolder")
                .child(S.documentTypeList("albumFolder").title("相簿資料夾")),
            ])
        ),

      // 分隔線
      S.divider(),

      // --- 3. 人員與設定 ---
      S.listItem()
        .title("系統設定")
        .child(
          S.list()
            .title("系統設定")
            .items([
              S.listItem()
                .title("作者管理")
                .schemaType("author")
                .child(S.documentTypeList("author").title("作者管理")),
              S.listItem()
                .title("標籤管理")
                .schemaType("tag")
                .child(S.documentTypeList("tag").title("標籤管理")),
            ])
        ),
    ]);
