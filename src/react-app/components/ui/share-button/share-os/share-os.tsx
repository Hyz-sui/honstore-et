import { IconShare } from "../../../icons/icon-share";
import { ShareButton } from "../share-button";
import styles from "./share-os.module.css";

export const ShareOS = ({
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
  if (!navigator.share) {
    return null;
  }
  const shareObject = {
    title,
    url,
  };
  if (!navigator.canShare(shareObject)) {
    return null;
  }
  return (
    <ShareButton
      baseVariant="outlined"
      className={[styles.shareOS, className].filter(Boolean).join(" ")}
      onClick={() => {
        navigator.share(shareObject);
      }}
    >
      <IconShare spacing={["inline-end"]} />
      その他
    </ShareButton>
  );
};
