import * as React from "react";

/** Top screen header: centered title with an optional back chevron, used on every detail screen. */
export interface NavHeaderProps {
  /** Centered screen title, e.g. "Localizacion" */
  title: string;
  /** Shows the back chevron and handles taps; omit to hide it */
  onBack?: () => void;
  /** Custom leading element, overrides the default back chevron */
  leading?: React.ReactNode;
  /** Trailing action element (rare in this app) */
  trailing?: React.ReactNode;
}

export declare function NavHeader(props: NavHeaderProps): JSX.Element;
