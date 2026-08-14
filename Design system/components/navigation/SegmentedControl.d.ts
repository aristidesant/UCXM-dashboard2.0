/** Pill-shaped two/three-way switch (e.g. "Reporte" / "Contactos"), selected option lifted on a white pill. */
export interface SegmentedControlProps {
  options: string[];
  activeIndex?: number;
  onChange?: (index: number) => void;
}

export declare function SegmentedControl(props: SegmentedControlProps): JSX.Element;
