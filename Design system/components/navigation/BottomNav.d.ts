import * as React from "react";

export interface BottomNavItem {
  icon: React.ReactNode;
  label: string;
}

/** Fixed 5-item bottom tab bar (Dashboards / Calidad / Cumplimiento / Insights / Ajustes); active tab tints blue. */
export interface BottomNavProps {
  items: BottomNavItem[];
  activeIndex?: number;
  onChange?: (index: number) => void;
}

export declare function BottomNav(props: BottomNavProps): JSX.Element;
