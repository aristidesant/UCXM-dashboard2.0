/** Filled pill action button, used in sheets/toolbars (e.g. "Cancelar" / "Limpiar" / "Aplicar" on the filter sheet). "primary" (green) marks the confirming action; "secondary" (blue) marks other in-sheet actions. */
export interface ButtonProps {
  label: string;
  tone?: "primary" | "secondary";
  onClick?: () => void;
  fullWidth?: boolean;
}

export declare function Button(props: ButtonProps): JSX.Element;
