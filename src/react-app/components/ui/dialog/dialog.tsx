import { Button } from "../button/button";
import styles from "./dialog.module.css";

export const Dialog = ({ children, dialogRef }: { children: React.ReactNode, dialogRef: React.RefObject<HTMLDialogElement | null> }) => {
  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <div className={styles.dialogContent}>
        {children}
      </div>

      <div className={styles.dialogFooter}>
        <Button variant="filled" type="button" className={styles.closeButton} onClick={() => dialogRef.current?.close()}>
          閉じる
        </Button>
      </div>
    </dialog>
  );
};
