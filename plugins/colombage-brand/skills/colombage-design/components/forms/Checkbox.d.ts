import * as React from 'react';

export interface CheckboxProps {
  /** Checked state. */
  checked?: boolean;
  /** Called with the next boolean value. */
  onChange?: (next: boolean) => void;
  /** Optional trailing label. */
  label?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** Rounded-square checkbox with navy fill and white check. */
export function Checkbox(props: CheckboxProps): JSX.Element;
