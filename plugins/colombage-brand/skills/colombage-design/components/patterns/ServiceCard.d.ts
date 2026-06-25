import * as React from 'react';

/**
 * Props for the tappable home-care service card.
 * @startingPoint section="Patterns" subtitle="Service selection card" viewport="700x150"
 */
export interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Service name. */
  title: string;
  /** Short supporting description. */
  description?: string;
  /** Icon node shown in the rounded tile. */
  icon?: React.ReactNode;
  /** Optional meta line (price, frequency). */
  meta?: React.ReactNode;
  /** Icon tile tone. @default "pink" */
  tone?: 'pink' | 'peri' | 'navy';
  /** Highlights the card with a pink selection ring. */
  selected?: boolean;
  onClick?: () => void;
}

/**
 * Tappable home-care service card with icon tile, title and description.
 */
export function ServiceCard(props: ServiceCardProps): JSX.Element;
