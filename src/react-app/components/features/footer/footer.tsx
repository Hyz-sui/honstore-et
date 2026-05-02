import { HyperLink } from "../../ui/hyper-link/hyper-link";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <>
      <p className={styles.footerNote}>
        {"ストアのリニューアル等によってリンクが壊れている場合、"}
        <HyperLink href="https://bsky.app/profile/hyzsui.com" openNew>制作者</HyperLink>
        {"までお知らせください。"}
      </p>
      <p>フッタ</p>
      <p>フッタ</p>
      <p>フッタ</p>
      <p>フッタ</p>
      <p>フッタ</p>
      <p>フッタ</p>
      <p>フッタ</p>
      <p>フッタ</p>
      <p>フッタ</p>
      <p>フッタ</p>
      <p>フッタ</p>
      <p>フッタ</p>
      <p>フッタ</p>
      <p>フッタ</p>
    </>
  );
};
