import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color tone. @default "pink" */
  tone?: 'pink' | 'navy' | 'peri' | 'neutral' | 'success' | 'warning' | 'danger';
  /** Show a leading status dot. */
  dot?: boolean;
  children?: React.ReactNode;
}

/** Small rounded chip for categories, services and statuses. */
export function Badge(props: BadgeProps): JSX.Element;
