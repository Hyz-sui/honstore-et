export const scrollToRef = (ref: React.RefObject<HTMLElement | null>) => {
  // スクリーンリーダにスクロール先まで来てもらう && タブ移動のフォーカスにスクロール先まで来てもらう
  ref.current?.focus({
    preventScroll: true,
  });

  // スクロール
  ref.current?.scrollIntoView({ behavior: "smooth" });
};
