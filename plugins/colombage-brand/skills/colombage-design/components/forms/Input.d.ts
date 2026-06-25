import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the input. */
  label?: string;
  /** Helper text below the field. */
  helper?: string;
  /** Error message — turns the border + text red. */
  error?: string;
  /** Optional leading icon node. */
  iconLeft?: React.ReactNode;
}

/** Large rounded text field with label, helper and error states. */
export function Input(props: InputProps): JSX.Element;
