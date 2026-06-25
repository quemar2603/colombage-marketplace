import * as React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL. Omit to show initials. */
  src?: string;
  /** Full name — used for initials and alt text. */
  name?: string;
  /** Diameter in px. @default 56 */
  size?: number;
  /** Initials background tint. @default "peri" */
  tone?: 'peri' | 'pink' | 'navy';
  /** Show online/available status dot. */
  online?: boolean;
}

/** Round avatar for caregivers and clients, with initials fallback. */
export function Avatar(props: AvatarProps): JSX.Element;
