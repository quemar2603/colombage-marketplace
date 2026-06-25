import React from 'react';

/**
 * ColombAge Card — soft white surface, rounded, gentle shadow.
 * The default container for every grouped piece of content.
 */
export function Card({ children, padding = 'var(--space-6)', tone = 'white', interactive = false, style = {}, ...rest }) {
  const tones = {
    white: { bg: 'var(--surface-card)', border: 'var(--border-soft)' },
    cream: { bg: 'var(--cream)', border: 'var(--border-soft)' },
    accent: { bg: 'var(--pink-100)', border: 'var(--border-accent)' },
    info: { bg: 'var(--peri-100)', border: 'var(--peri-200)' },
  }[tone] || {};

  return (
    <div
      style={{
        background: tones.bg,
        border: `1.5px solid ${tones.border}`,
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-sm)',
        padding,
        transition: 'transform .15s ease, box-shadow .15s ease',
        cursor: interactive ? 'pointer' : 'default',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!interactive) return;
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        if (!interactive) return;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
