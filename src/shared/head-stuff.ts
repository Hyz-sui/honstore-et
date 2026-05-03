export const generateTitleBySearchQuery = (query: string | undefined) => {
  return query ? `「${query}」をストアで探す - honst` : "お店を選んで本を買おう - honst";
};

export const generateDescriptionBySearchQuery = (query: string | undefined) => {
  return query
    ? `好きなネット書店、リアル書店、電子書籍ストアを選んで「${query}」を買おう！ honstは、ワードを指定して各ネット書店/電子書籍ストアの検索・リアル書店の在庫検索のリンクを一覧できるアプリです。`
    : `honstは、ワードを指定して各ネット書店/電子書籍ストアの検索・リアル書店の在庫検索のリンクを一覧できるアプリです。`;
}
