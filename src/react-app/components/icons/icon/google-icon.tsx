import { CommonIcon } from "./common-icon";
import { IconProps } from "./icon";

export const GoogleIcon = ({
  path,
  label,
  spacing = [],
  className,
}: {
  path: string,
} & IconProps) => {
  return (
    <CommonIcon
      path={path}
      label={label}
      viewBox="0 -960 960 960"
      spacing={spacing}
      className={className}
    />
  );
};
