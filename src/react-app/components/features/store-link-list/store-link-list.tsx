import styles from "./store-link-list.module.css";
import { StoreLink } from "../store-link/store-link";
import { BookStoresEnumeration } from "../../../book/book-stores";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const StoreLinkList = ({
  title,
  word,
  stores,
  categoryResolver,
  headingRef,
  isFavorite,
  setFavorite,
}: {
  title: string,
  word: string,
  stores: BookStoresEnumeration,
  categoryResolver?: (id: string) => string,
  headingRef: React.RefObject<HTMLHeadingElement | null> | null,
  isFavorite: (id: string) => boolean,
  setFavorite: (id: string, isFavorite: boolean) => void,
}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const linkListBoxRef = useRef<HTMLDivElement>(null);

  const [isInView, setIsInView] = useState(false);

  // Chrome & Firefox 画面外でのトランジションによる画面揺れバグ対策 画面外では高さをトランジションしない
  // Safariさんは画面外だろうと下に伸びてズレる。勝手にガタついててください ;P
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0 });

    if (linkListBoxRef.current) {
      observer.observe(linkListBoxRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const listElement = listRef.current;
    const linkListBoxElement = linkListBoxRef.current;
    if (!listElement || !linkListBoxElement) {
      return;
    }
    const observer = new ResizeObserver(() => {
      const scrollHeight = listElement.scrollHeight;
      const ceilScrollHeight = Math.ceil(scrollHeight);
      if (linkListBoxElement.style.height !== `${ceilScrollHeight}px`) {
        linkListBoxElement.style.height = `${ceilScrollHeight}px`;
      }
    });
    observer.observe(listElement);
    linkListBoxElement.style.height = `${Math.ceil(listElement.scrollHeight)}px`;
    return () => {
      observer.disconnect();
    };
  }, [stores]);

  return (
    <div className={styles.listArea}>
      <h3 className={styles.listTitle} ref={headingRef ?? undefined} tabIndex={-1}>{title}</h3>
      <div className={[styles.linkListBox, isInView ? styles.linkListBoxVisible : ""].filter(Boolean).join(" ")} ref={linkListBoxRef}>
        <ul className={styles.linkList} ref={listRef}>
          {Object.values(stores).map((store) => (
            <li key={store.id} className={styles.linkItem}>
              <StoreLink
                query={word}
                name={store.label}
                urlConstructor={store.urlConstructor}
                className={styles.link}
                note={store.note}
                category={categoryResolver?.(store.id)}
                isFavorite={isFavorite(store.id)}
                setFavorite={(isFavorite: boolean) => setFavorite(store.id, isFavorite)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
