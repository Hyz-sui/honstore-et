import styles from "./button.module.css";

export type ButtonVariants = "elevated" | "filled" | "outlined" | "text" | "single";

export const Button = ({
  children,
  onClick,
  variant = "filled",
  type = "button",
  disabled = false,
  className = undefined,
  contentClassName = undefined,
  buttonProps,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariants;
  type?: HTMLButtonElement['type'];
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  buttonProps?: React.ComponentProps<"button">;
}) => {
  return (
    <button
      className={[
        styles.button,
        styles[`button-${variant}`],
        disabled && styles.disabled,
        className
      ].filter(Boolean).join(" ")}
      onClick={disabled ? undefined : onClick}
      type={type}
      aria-disabled={disabled}
      {...buttonProps}
    >
      <div className={[styles.buttonContent, contentClassName].filter(Boolean).join(" ")}>
        {children}
        <div className={styles.outliner} aria-hidden="true" />
      </div>
    </button>
  );
};
