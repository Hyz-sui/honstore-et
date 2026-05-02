import styles from "./hyper-link.module.css";

export const HyperLink = ({
  href,
  children,
  openNew = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  openNew?: boolean;
  className?: string;
}) => {
  return (
    <a
      href={href}
      target={openNew ? "_blank" : undefined}
      rel={openNew ? "noopener noreferrer" : undefined}
      className={[styles.link, className].filter(Boolean).join(" ")}
    >
      {children}
    </a>
  );
};
