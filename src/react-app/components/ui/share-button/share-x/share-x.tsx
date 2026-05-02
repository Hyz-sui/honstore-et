import { IconX } from "../../../icons/icon-x";
import { ShareButton } from "../share-button";
import styles from "./share-x.module.css";

export const ShareX = ({
  body: {
    title,
    url,
  },
  className,
}: {
  body: {
    title: string,
    url: string,
  },
  className?: string;
}) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <ShareButton
      baseVariant="filled"
      className={[styles.shareX, className].filter(Boolean).join(" ")}
      onClick={() => {
        window.open(`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, "_blank", "width=600,height=400");
      }}
    >
      <IconX spacing={["inline-end"]} />
      X
    </ShareButton>
  );
};
