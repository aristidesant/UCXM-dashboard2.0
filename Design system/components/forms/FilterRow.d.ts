/** Full-width "Filtros" summary button that opens a filter sheet; shows the active-filter count as a pill. */
export interface FilterRowProps {
  label?: string;
  summary?: string;
  onClick?: () => void;
}

export declare function FilterRow(props: FilterRowProps): JSX.Element;
