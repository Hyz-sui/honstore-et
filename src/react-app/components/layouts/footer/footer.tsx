import { Button } from "../../ui/button/button";
import { Dialog } from "../../ui/dialog/dialog";
import { HyperLink } from "../../ui/hyper-link/hyper-link";
import styles from "./footer.module.css";
import { useRef } from "react";
import licenses from "../../../../generated/licenses.json";
import additionalCredits from "../../../../metadata/additional-credits.json";
import { ThirdpartyLicense } from "../../features/thirdparty-license/thirdparty-license";

export const Footer = () => {
  const aboutDialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <p className={styles.footerNote}>
        {"ストアのリニューアル等によってリンクが壊れている場合、"}
        <HyperLink href="https://bsky.app/profile/hyzsui.com" openNew>制作者</HyperLink>
        {"までお知らせください。"}
      </p>

      <Dialog dialogRef={aboutDialog}>
        <p className={styles.description}>
          {`honstは書店や電子書籍ストア等の検索リンク集を表示するWebアプリです。
          買いたい本を各ストアで比較したいときのほか、だれかに本を勧めたいときに「共有」ボタンからリンク集を共有することで、相手の好きなストアで買ってもらうことができます。
          なにかありましたら`}
          <HyperLink href="https://bsky.app/profile/hyzsui.com" openNew>制作者</HyperLink>
          {"までお知らせください。"}
        </p>

        <p className="visually-hidden focus-to-show">
          <span className="visually-hidden">この後に長いクレジット表示があります。スキップするには以下のボタンで閉じてください。</span>
          <Button variant="outlined" onClick={() => aboutDialog.current?.close()}>
            閉じる
          </Button>
        </p>

        <h2>クレジット</h2>
        <dl className={styles.creditList}>
          {Object.entries({...additionalCredits, ...licenses}).map(([name, { version, license, text, homepage, repository }]) => (
            <div className={styles.creditListContent} key={name}>
              <ThirdpartyLicense
                name={name}
                version={version}
                license={license}
                text={text}
                homepage={homepage}
                repository={repository}
              />
            </div>
          ))}
        </dl>
      </Dialog>

      <ul className={styles.footerUList}>
        <li>
          <Button variant="outlined" type="button" onClick={() => aboutDialog.current?.showModal()}>
            このアプリについて
          </Button>
        </li>
      </ul>
    </>
  );
};
