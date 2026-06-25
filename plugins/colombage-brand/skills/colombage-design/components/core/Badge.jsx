import React from 'react';

/**
 * ColombAge Badge / Tag — soft rounded chip for categories & statuses.
 * tone: pink (default accent), navy, peri, success, warning, danger, neutral.
 */
export function Badge({ children, tone = 'pink', dot = false, style = {}, ...rest }) {
  const tones = {
    pink: { bg: 'var(--pink-100)', color: 'var(--navy-700)', dot: 'var(--pink-400)' },
    navy: { bg: 'var(--navy-600)', color: 'var(--white)', dot: 'var(--peri-300)' },
    peri: { bg: 'var(--peri-100)', color: 'var(--navy-700)', dot: 'var(--peri-400)' },
    neutral: { bg: 'var(--navy-50)', color: 'var(--navy-700)', dot: 'var(--navy-300)' },
    success: { bg: 'var(--success-soft)', color: 'var(--success)', dot: 'var(--success)' },
    warning: { bg: 'var(--warning-soft)', color: 'var(--warning)', dot: 'var(--warning)' },
    danger: { bg: 'var(--danger-soft)', color: 'var(--danger)', dot: 'var(--danger)' },
  }[tone] || {};

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: '6px 14px',
        borderRadius: 'var(--radius-pill)',
        background: tones.bg,
        color: tones.color,
        fontFamily: 'var(--font-base)',
        fontSize: 'var(--text-sm)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span style={{ width: 8, height: 8, borderRadius: 999, background: tones.dot, flex: 'none' }} />
      )}
      {children}
    </span>
  );
}
