/** iOS-style switch, green when on. Used as the `control` of a SettingsRow (e.g. "Inicio de sesión biométrico"). */
export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export declare function Toggle(props: ToggleProps): JSX.Element;
