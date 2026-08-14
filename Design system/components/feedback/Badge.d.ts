/** Small colored status pill (e.g. "Semana" on the metric detail card). */
export interface BadgeProps {
  label: string;
  tone?: "neutral" | "positive" | "info" | "negative";
}

export declare function Badge(props: BadgeProps): JSX.Element;
