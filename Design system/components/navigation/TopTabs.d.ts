/** Underlined top-level tabs within a detail screen (e.g. "Indicadores" / "Detalles de contacto"). */
export interface TopTabsProps {
  /** Tab labels, in order */
  tabs: string[];
  /** Index of the selected tab */
  activeIndex?: number;
  onChange?: (index: number) => void;
}

export declare function TopTabs(props: TopTabsProps): JSX.Element;
