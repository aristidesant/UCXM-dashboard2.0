/** Metric tile used in dashboard grids — a label, a large value, and an optional trend delta. */
export interface StatCardProps {
  label: string;
  /** Big value, e.g. "70.00%" or "7 de 10" */
  value: string;
  /** Trend text, e.g. "-30.0%" */
  delta?: string;
  deltaTone?: "negative" | "positive";
  /** Comparison text, e.g. "· 100.00% · La semana pasada" */
  meta?: string;
  /** "sm" for 2-column grid tiles, "lg" for a full-width detail metric */
  size?: "sm" | "lg";
}

export declare function StatCard(props: StatCardProps): JSX.Element;
