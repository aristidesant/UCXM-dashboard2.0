/** Single-select radio dot, filled green with a white center dot when selected. Used for theme/language pickers. */
export interface RadioDotProps {
  selected?: boolean;
  onSelect?: () => void;
}

export declare function RadioDot(props: RadioDotProps): JSX.Element;
