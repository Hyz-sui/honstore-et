import { IconExternalLink } from "../../icons/icon-external-link";
import { IconFolder } from "../../icons/icon-folder";
import { IconShiningStar } from "../../icons/icon-shining-star";
import { IconShiningStarFilled } from "../../icons/icon-shining-star-filled";
import { IconStar } from "../../icons/icon-star";
import { Button } from "../../ui/button/button";
import styles from "./store-link.module.css";

export const StoreLink = ({
  query,
  name,
  category,
  urlConstructor,
  className,
  note,
  isFavorite,
  setFavorite,
}: {
  query: string;
  name: string;
  category?: string;
  urlConstructor: (query: string) => string;
  className?: string;
  note?: string;
  isFavorite: boolean;
  setFavorite: (isFavorite: boolean) => void;
}) => {
  const showDescriptivePanel = !!category;

  return (
    <div className={styles.store}>
      <a href={urlConstructor(query)} target="_blank" rel="noopener noreferrer" className={[styles.link, className, showDescriptivePanel ? styles.linkConnectToDescriptivePanel : ""].filter(Boolean).join(" ")}>
        <div className={styles.storeName}>
          {name}
          <IconExternalLink spacing={["inline-start"]} className={styles.externalIcon} />
        </div>
        {note && <p className={styles.note}>{note}</p>}
      </a>

      <div className={styles.storeAsideContents}>
        {
          showDescriptivePanel && <div className={styles.storeDescriptivePanel}>
            {category && <div className={styles.category}><small>
              <div className={styles.categoryIcon}>
                <IconFolder spacing={["inline-end"]} label="カテゴリ: " />
              </div>
              {category}
            </small></div>}
          </div>
        }

        <div className={styles.storeActionPanel}>
          <Button
            type="button"
            variant="single"
            className={[styles.favoriteButton, isFavorite ? styles.favoriteButtonFavorite : ""].filter(Boolean).join(" ")}
            contentClassName={styles.favoriteButtonContent}
            onClick={() => {
              setFavorite(!isFavorite);
            }}
            buttonProps={{
              "aria-pressed": isFavorite,
              "aria-label": `「${name}」をお気に入り${isFavorite ? "解除" : "登録"}`,
            }}
          >
            <IconShiningStarFilled className={[styles.favoriteButtonIcon, styles.favoriteButtonIconFavorite].join(" ")} />
            <IconShiningStar className={[styles.favoriteButtonIcon, styles.favoriteButtonIconMidFavorite].join(" ")} />
            <IconStar className={[styles.favoriteButtonIcon, styles.favoriteButtonIconNotFavorite].join(" ")} />
          </Button>
        </div>
      </div>
    </div>
  );
}
