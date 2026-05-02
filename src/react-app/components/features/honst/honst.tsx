import { useEffect, useId, useRef, useState } from "react";
import { generateTitleBySearchQuery } from "../../../../shared/head-stuff";
import { Button } from "../../ui/button/button";
import { TextInput } from "../../ui/text-input/text-input";
import { bookStores } from "../../../book/book-stores";
import styles from "./honst.module.css";
import { FlexPanel } from "../../ui/flex-panel/flex-panel";
import { useDebounce } from "../../../react/utilities/use-debounce";
import { StoreLinkList } from "../store-link-list/store-link-list";
import { scrollToRef } from "../../../react/action";
import { IconOpenBookWBookmark } from "../../icons/icon-open-book-w-bookmark";
import { IconEbookPc } from "../../icons/icon-ebook-pc";
import { IconStore } from "../../icons/icon-store";
import { IconBookshelf } from "../../icons/icon-bookshelf";
import { IconShare } from "../../icons/icon-share";
import { ShareBluesky } from "../../ui/share-button/share-bluesky/share-bluesky";
import { ShareX } from "../../ui/share-button/share-x/share-x";
import { ShareOS } from "../../ui/share-button/share-os/share-os";
import { IconManga } from "../../icons/icon-manga";
import { Icon3R } from "../../icons/icon-3r";
import { Card } from "../../ui/card/card";
import { IconShiningStarFilled } from "../../icons/icon-shining-star-filled";
import { IconSearch } from "../../icons/icon-search";
import { IconLibrary } from "../../icons/icon-library";

const wordFromUrl = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const currentLocation = window.location.href;
  const currentUrl = new URL(currentLocation);
  const query = currentUrl.searchParams.get("word");
  return query || undefined;
};

const setTitleByWord = (word: string | undefined) => {
  if (typeof window === "undefined") {
    return;
  }
  document.title = generateTitleBySearchQuery(word);
};

const FAVORITE_STORES_KEY = "favorite-stores";

const setStoredFavoriteStores = (favoriteStores: string[]) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(FAVORITE_STORES_KEY, JSON.stringify(favoriteStores));
};

const getStoredFavoriteStores = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const rawFavoriteStores = localStorage.getItem(FAVORITE_STORES_KEY);
  if (!rawFavoriteStores) {
    return [];
  }
  try {
    const savedFavoriteStores = JSON.parse(rawFavoriteStores);
    if (!Array.isArray(savedFavoriteStores) || !savedFavoriteStores.every((store) => typeof store === "string")) {
      return [];
    }
    return savedFavoriteStores;

  } catch (error) {
    console.error(error);
    return [];
  }
};

export const Honst = () => {
  const uniqueId = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const shareButtonCloseRef = useRef<HTMLSpanElement>(null);
  const shareButtonOpenRef = useRef<HTMLSpanElement>(null);
  const shareRingRef = useRef<HTMLUListElement>(null);
  const searchLinksHeadingRef = useRef<HTMLHeadingElement>(null);
  const onlineRealBookHeadingRef = useRef<HTMLHeadingElement>(null);
  const eBookHeadingRef = useRef<HTMLHeadingElement>(null);
  const realStoreHeadingRef = useRef<HTMLHeadingElement>(null);
  const comicSpecialtyStoreHeadingRef = useRef<HTMLHeadingElement>(null);
  const usedBookHeadingRef = useRef<HTMLHeadingElement>(null);
  const bibliographyHeadingRef = useRef<HTMLHeadingElement>(null);
  const libraryHeadingRef = useRef<HTMLHeadingElement>(null);

  const storeLinkLists = [
    { title: "紙の本", stores: bookStores.onlineRealBook, headingRef: onlineRealBookHeadingRef },
    { title: "電子書籍", stores: bookStores.eBook, headingRef: eBookHeadingRef },
    { title: "リアル店舗の在庫検索", stores: bookStores.realStore, headingRef: realStoreHeadingRef },
    { title: "コミック系専門店", stores: bookStores.comicSpecialtyStore, headingRef: comicSpecialtyStoreHeadingRef },
    { title: "中古", stores: bookStores.used, headingRef: usedBookHeadingRef },
    { title: "書誌情報", stores: bookStores.bibliography, headingRef: bibliographyHeadingRef },
    { title: "図書館", stores: bookStores.library, headingRef: libraryHeadingRef },
  ];

  const [word, setWord] = useState(() => wordFromUrl() ?? "");
  const [debouncedWord, setDebouncedWordImmediately] = useDebounce(word, 200);
  const [location, setLocation] = useState(() => new URL(window.location.href));
  const [favoriteStores, setFavoriteStores] = useState<string[]>(getStoredFavoriteStores());

  useEffect(() => {
    const query = wordFromUrl();
    if (query && !window.location.search.includes("noscroll")) {
      scrollToRef(searchLinksHeadingRef);
    }
    window.addEventListener("popstate", () => {
      const query = wordFromUrl();
      setWord(query ?? "");
      setDebouncedWordImmediately(query ?? "");
      if (searchInputRef.current) {
        searchInputRef.current.value = query ?? "";
      }
    });
    setTitleByWord(query);
  }, [setDebouncedWordImmediately]);

  useEffect(() => {
    setStoredFavoriteStores(favoriteStores);
  }, [favoriteStores]);

  const pushLocation = () => {
    const currentLocation = window.location.href;
    window.history.replaceState({}, "", location);
    window.history.pushState({}, "", currentLocation);
    setLocation(new URL(currentLocation));
  };

  const handleWordChange = (value: string) => {
    setWord(value);
    const currentLocation = window.location.href;
    const currentUrl = new URL(currentLocation);
    if (value) {
      currentUrl.searchParams.set("word", value);
    } else {
      currentUrl.searchParams.delete("word");
    }
    window.history.replaceState({}, "", currentUrl);
    setTitleByWord(value);
  };

  // requestAnimationFrame: Chrome特有のバグ対策 ボタンの反応が妙に鈍くなる

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    requestAnimationFrame(() => {
      setDebouncedWordImmediately(word);
      if (word) {
        scrollToRef(searchLinksHeadingRef);
      }
      pushLocation();
    });
  };

  return (
    <div className={styles.honst}>
      <section className={styles.searchSection}>

        <h2>本を検索</h2>

        <form onSubmit={handleSubmit}>
          <FlexPanel gapRem={1} orientation="vertical" align="stretch">
            <TextInput
              label="検索することば"
              value={word}
              onChange={handleWordChange}
              name={`search-input-${uniqueId}`}
              inputClassName={styles.searchInput}
              labelClassName={styles.searchLabel}
              inputRef={searchInputRef}
            />
            <Button
              variant="filled"
              type="submit"
              disabled={!word}
            >
              <IconBookshelf spacing={["inline-end"]} />
              検索
            </Button>

            <div className={styles.shareRingBox}>
              <FlexPanel orientation="vertical" gapRem={1}>
                <Button
                  variant="elevated"
                  type="button"
                  onClick={() => {
                    // workaround: PCのChromeでメニューの展開が遅れる問題を回避。たぶんなんかもっとマシな方法あるんだろなって思ってる
                    const isShareRingOpen = shareRingRef.current?.classList.toggle(styles.shareRingOpen);
                    if (isShareRingOpen) {
                      shareButtonCloseRef.current?.classList.remove(styles.hiddenShareLabel);
                      shareButtonOpenRef.current?.classList.add(styles.hiddenShareLabel);
                      shareButtonRef.current?.setAttribute("aria-expanded", "true");
                    } else {
                      shareButtonCloseRef.current?.classList.add(styles.hiddenShareLabel);
                      shareButtonOpenRef.current?.classList.remove(styles.hiddenShareLabel);
                      shareButtonRef.current?.setAttribute("aria-expanded", "false");
                    }
                  }}
                  disabled={!word}
                  buttonProps={{
                    "aria-expanded": "false",
                    "aria-haspopup": "true",
                    "aria-controls": `share-ring-${uniqueId}`,
                    "ref": shareButtonRef
                  }}
                >
                  <IconShare spacing={["inline-end"]} />
                  <span ref={shareButtonCloseRef} className={styles.hiddenShareLabel}>閉じる</span>
                  <span ref={shareButtonOpenRef}>共有</span>
                </Button>

                <ul
                  className={styles.shareRing}
                  id={`share-ring-${uniqueId}`}
                  ref={shareRingRef}
                >
                  <li className={styles.shareRingItem}>
                    <ShareBluesky body={{ title: generateTitleBySearchQuery(word), url: window.location.href }} />
                  </li>
                  <li className={styles.shareRingItem}>
                    <ShareX body={{ title: generateTitleBySearchQuery(word), url: window.location.href }} />
                  </li>
                  <li className={styles.shareRingItem}>
                    <ShareOS body={{ title: generateTitleBySearchQuery(word), url: window.location.href }} />
                  </li>
                </ul>
              </FlexPanel>
            </div>
          </FlexPanel>
        </form>

      </section>

      <section
        className={[
          styles.searchLinksSection,
          debouncedWord && word ? styles.searchLinksSectionVisible : styles.searchLinksSectionHidden,
        ].join(" ")}
      >

        <h2
          ref={searchLinksHeadingRef}
          // ボタンでスクロールしたときにフォーカスを当てられるようにする
          tabIndex={-1}
        >
          「{debouncedWord}」を探す
        </h2>

        <FlexPanel
          gapRem={1}
          orientation="horizontal"
          responsiveOrientation="vertical"
          align="stretch"
          justify="center"
          wrap
          className={styles.buttonPanel}
        >

          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              requestAnimationFrame(() => {
                setDebouncedWordImmediately(word);
                pushLocation();
                if (word) {
                  scrollToRef(onlineRealBookHeadingRef);
                }
              });
            }}
            disabled={!word}
          >
            <IconOpenBookWBookmark spacing={["inline-end"]} />
            紙の本
          </Button>

          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              requestAnimationFrame(() => {
                setDebouncedWordImmediately(word);
                pushLocation();
                if (word) {
                  scrollToRef(eBookHeadingRef);
                }
              });
            }}
            disabled={!word}
          >
            <IconEbookPc spacing={["inline-end"]} />
            電子書籍
          </Button>

          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              requestAnimationFrame(() => {
                setDebouncedWordImmediately(word);
                pushLocation();
                if (word) {
                  scrollToRef(realStoreHeadingRef);
                }
              });
            }}
            disabled={!word}
          >
            <IconStore spacing={["inline-end"]} />
            リアル店舗の在庫検索
          </Button>

          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              requestAnimationFrame(() => {
                setDebouncedWordImmediately(word);
                pushLocation();
                if (word) {
                  scrollToRef(comicSpecialtyStoreHeadingRef);
                }
              });
            }}
            disabled={!word}
          >
            <IconManga spacing={["inline-end"]} />
            コミック系専門店
          </Button>

          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              requestAnimationFrame(() => {
                setDebouncedWordImmediately(word);
                pushLocation();
                if (word) {
                  scrollToRef(usedBookHeadingRef);
                }
              });
            }}
            disabled={!word}
          >
            <Icon3R spacing={["inline-end"]} />
            中古
          </Button>

          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              requestAnimationFrame(() => {
                setDebouncedWordImmediately(word);
                pushLocation();
                if (word) {
                  scrollToRef(bibliographyHeadingRef);
                }
              });
            }}
            disabled={!word}
          >
            <IconSearch spacing={["inline-end"]} />
            書誌情報
          </Button>

          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              requestAnimationFrame(() => {
                setDebouncedWordImmediately(word);
                pushLocation();
                if (word) {
                  scrollToRef(libraryHeadingRef);
                }
              });
            }}
            disabled={!word}
          >
            <IconLibrary spacing={["inline-end"]} />
            図書館
          </Button>

        </FlexPanel>

        <p className={styles.searchNote}>
          リンクは機械的に生成されます。ストアに取り扱いがない場合があります。
        </p>

        {favoriteStores.length > 0 ? (
          <StoreLinkList
            title="お気に入り"
            word={debouncedWord}
            stores={Object.values(bookStores)
              .flatMap(
                (stores) => Object.values(stores).filter((store) => favoriteStores.includes(store.id))
              )
              .reduce((acc, store) => ({ ...acc, [store.id]: store }), {})}
            headingRef={null}
            categoryResolver={(id: string) => storeLinkLists.find((storeLinkList) => Object.values(storeLinkList.stores).some((store) => store.id === id))?.title ?? ""}
            isFavorite={(id: string) => favoriteStores.includes(id)}
            setFavorite={(id: string, isFavorite: boolean) => {
              requestAnimationFrame(() => {
                setFavoriteStores(prev => isFavorite ? [...prev, id] : prev.filter((storeId) => storeId !== id));
              });
            }}
          />
        ) : (
          <>
            <h3>お気に入り</h3>
            <Card className={styles.emptyFavoriteCard}>
              <div className={styles.emptyFavoriteCardIcon}>
                <IconShiningStarFilled />
              </div>
              <p>お気に入りストアがありません。ストアをお気に入りに追加すると、先頭にまとめて表示されます。</p>
            </Card>
          </>
        )}

        {storeLinkLists.map((storeLinkList) => (
          <StoreLinkList
            key={storeLinkList.title}
            title={storeLinkList.title}
            word={debouncedWord}
            stores={storeLinkList.stores}
            headingRef={storeLinkList.headingRef}
            isFavorite={(id: string) => favoriteStores.includes(id)}
            setFavorite={(id: string, isFavorite: boolean) => {
              requestAnimationFrame(() => {
                setFavoriteStores(prev => isFavorite ? [...prev, id] : prev.filter((storeId) => storeId !== id));
              });
            }}
          />
        ))}

      </section>
    </div>
  );
}
