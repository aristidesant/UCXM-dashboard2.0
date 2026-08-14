import * as React from "react";

export interface ListRowAvatar {
  content: React.ReactNode;
  bg?: string;
  color?: string;
}

/** Generic gray-pill row used for contact lists and dashboard lists — optional avatar, title, subtitle/meta, trailing chevron or link text. */
export interface ListRowProps {
  avatar?: ListRowAvatar;
  title: string;
  subtitle?: string;
  subtitleTone?: "muted" | "positive";
  meta?: string;
  trailing?: React.ReactNode;
}

export declare function ListRow(props: ListRowProps): JSX.Element;
