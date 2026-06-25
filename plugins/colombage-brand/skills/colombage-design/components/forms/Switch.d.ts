import * as React from 'react';

export interface SwitchProps {
  /** On/off state. */
  checked?: boolean;
  /** Called with the next boolean value. */
  onChange?: (next: boolean) => void;
  /** Optional trailing label. */
  label?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** Rounded on/off toggle — navy track when enabled. */
export function Switch(props: SwitchProps): JSX.Element;
