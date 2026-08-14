import * as React from "react";

/** Filter/status pill, e.g. "Todos (15)" / "Efectivo (11)"; active state tints green. */
export interface ChipProps {
  label: string;
  active?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export declare function Chip(props: ChipProps): JSX.Element;
