import { IconBluesky } from "../../../icons/icon-bluesky";
import { ShareButton } from "../share-button";
import styles from "./share-bluesky.module.css";

export const ShareBluesky = ({
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
  const text = `${title}\n\n${url}`;
  const encodedText = encodeURIComponent(text);

  return (
    <ShareButton
      baseVariant="filled"
      className={[styles.shareBluesky, className].filter(Boolean).join(" ")}
      onClick={() => {
        window.open(`https://bsky.app/intent/compose?text=${encodedText}`, "_blank", "width=600,height=400");
      }}
    >
      <IconBluesky spacing={["inline-end"]} />
      Bluesky
    </ShareButton>
  );
};
