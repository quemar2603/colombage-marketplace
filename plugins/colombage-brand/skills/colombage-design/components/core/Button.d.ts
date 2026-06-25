import * as React from 'react';

/**
 * Props for the primary action control — large, pill-shaped, friendly.
 * @startingPoint section="Core" subtitle="Pill buttons in every variant" viewport="700x150"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
  /** Size. @default "md" */
  size?: 'md' | 'lg';
  /** Stretch to container width. */
  fullWidth?: boolean;
  /** Optional leading icon node. */
  iconLeft?: React.ReactNode;
  /** Optional trailing icon node. */
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Primary action control — large, pill-shaped, friendly.
 */
export function Button(props: ButtonProps): JSX.Element;
