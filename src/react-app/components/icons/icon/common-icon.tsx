import { IconProps } from "./icon";

export const CommonIcon = ({
  path,
  label,
  viewBox,
  spacing = [],
  className,
}: {
  path: string,
  viewBox: string,
} & IconProps) => {
  return (
    <div className={[
      "icon-body",
      spacing.map((s) => `icon-spacing-${s}`),
      className,
    ].filter(Boolean).join(" ")}>
      <svg
        className="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        aria-hidden={label ? "false" : "true"}
      >
        {label && <title>{label}</title>}
        <path d={path} />
      </svg>
    </div>
  );
};
