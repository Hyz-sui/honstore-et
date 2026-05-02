export const generateTitleBySearchQuery = (query: string | undefined) => {
  return query ? `「${query}」をストアで探す - honSTOREet` : "お店を選んで本を買おう - honSTOREet";
};

export const generateDescriptionBySearchQuery = (query: string | undefined) => {
  return query
    ? `好きなネット書店、リアル書店、電子書籍ストアを選んで「${query}」を買おう！ honSTOREetは、ワードを指定して各ネット書店/電子書籍ストアの検索・リアル書店の在庫検索のリンクを一覧できるアプリです。`
    : `honSTOREetは、ワードを指定して各ネット書店/電子書籍ストアの検索・リアル書店の在庫検索のリンクを一覧できるアプリです。`;
}
