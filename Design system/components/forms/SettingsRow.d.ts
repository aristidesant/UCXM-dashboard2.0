import * as React from "react";

/** Settings-screen row: icon chip + title/subtitle + a trailing control (chevron, Toggle, or RadioDot). Set `danger` for destructive rows like "Cerrar sesión". */
export interface SettingsRowProps {
  icon?: React.ReactNode;
  iconBg?: string;
  title: string;
  subtitle?: string;
  control?: React.ReactNode;
  danger?: boolean;
}

export declare function SettingsRow(props: SettingsRowProps): JSX.Element;
