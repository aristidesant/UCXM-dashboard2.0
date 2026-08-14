import * as React from "react";

/** App-background layer: flat surface color plus the soft two-color radial gradient wash used behind every screen. Wrap a screen's root in this instead of repeating the gradient CSS. Theme-aware — respects an ancestor's data-theme="dark". */
export interface BackgroundWashProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function BackgroundWash(props: BackgroundWashProps): JSX.Element;
