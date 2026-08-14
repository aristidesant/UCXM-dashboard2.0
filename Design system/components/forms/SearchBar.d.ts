/** Search field + a dark circular filter button, shown at the top of list screens (e.g. Dashboards). */
export interface SearchBarProps {
  placeholder?: string;
  onFilterClick?: () => void;
}

export declare function SearchBar(props: SearchBarProps): JSX.Element;
