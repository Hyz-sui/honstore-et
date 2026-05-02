import { ComponentProps } from "react";
import { Button } from "../button/button";
import styles from "./share-button.module.css";

export const ShareButton = ({
  children,
  onClick,
  className,
  baseVariant = "outlined",
}: {
  children: React.ReactNode;
  baseVariant?: ComponentProps<typeof Button>["variant"];
  onClick: () => void;
  className?: string;
}) => {
  return (
    <Button
      variant={baseVariant}
      className={[styles.shareButton, className].filter(Boolean).join(" ")}
      onClick={onClick}
      type="button"
    >
      {children}
    </Button>
  );
};
