import styles from "./flex-panel.module.css";

export type FlexPanelOrientation = "horizontal" | "vertical" | "horizontal-reverse" | "vertical-reverse";
export type FlexPanelAlign = "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly";
export type FlexPanelJustify = "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly";

export const FlexPanel = ({
  children,
  orientation = "horizontal",
  responsiveOrientation = undefined,
  align = "center",
  justify = undefined,
  gapRem = undefined,
  wrap = false,
  className = undefined,
  id = undefined,
  ...props
}: {
  children: React.ReactNode,
  orientation?: FlexPanelOrientation,
  responsiveOrientation?: FlexPanelOrientation,
  align?: FlexPanelAlign,
  justify?: FlexPanelJustify,
  gapRem?: number,
  wrap?: boolean,
  className?: string,
  id?: string,
  props?: React.ComponentProps<"div">,
}) => {
  const gapStyle = gapRem ? { gap: `${gapRem}rem` } : {};
  return (
    <div
      className={[
        styles.flexPanel,
        styles[`orientation-${orientation}`],
        responsiveOrientation && styles[`responsive-orientation-${responsiveOrientation}`],
        styles[`align-${align}`],
        justify && styles[`justify-${justify}`],
        wrap && styles.wrap,
        className
      ].filter(Boolean).join(" ")}
      id={id}
      style={gapStyle}
      {...props}
    >
      {children}
    </div>
  );
};
