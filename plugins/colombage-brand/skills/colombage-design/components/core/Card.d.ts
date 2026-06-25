import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Surface tone. @default "white" */
  tone?: 'white' | 'cream' | 'accent' | 'info';
  /** CSS padding value. @default var(--space-6) */
  padding?: string;
  /** Adds hover lift + pointer cursor. */
  interactive?: boolean;
  children?: React.ReactNode;
}

/** Rounded, softly-shadowed surface — the default content container. */
export function Card(props: CardProps): JSX.Element;
