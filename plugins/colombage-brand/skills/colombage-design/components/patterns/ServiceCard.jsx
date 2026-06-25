import React from 'react';

/**
 * ColombAge ServiceCard — presents a home-care service with an icon glyph,
 * title, short description and optional price/frequency. Composes the brand
 * card surface with a soft pink or periwinkle icon tile.
 */
export function ServiceCard({
  title,
  description,
  icon = null,
  meta,
  tone = 'pink',
  selected = false,
  onClick,
  style = {},
  ...rest
}) {
  const tile = {
    pink: { bg: 'var(--pink-200)', fg: 'var(--navy-700)' },
    peri: { bg: 'var(--peri-200)', fg: 'var(--navy-700)' },
    navy: { bg: 'var(--navy-600)', fg: 'var(--white)' },
  }[tone] || {};

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        gap: 'var(--space-4)',
        alignItems: 'flex-start',
        background: 'var(--surface-card)',
        border: `1.5px solid ${selected ? 'var(--pink-400)' : 'var(--border-soft)'}`,
        outline: selected ? '3px solid var(--pink-200)' : 'none',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-sm)',
        padding: 'var(--space-5)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform .15s ease, box-shadow .15s ease, border-color .15s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!onClick) return;
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        if (!onClick) return;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
      {...rest}
    >
      <span
        style={{
          width: 56,
          height: 56,
          borderRadius: 'var(--radius-lg)',
          background: tile.bg,
          color: tile.fg,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 'none',
        }}
      >
        {icon}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ margin: '2px 0 4px', fontSize: 'var(--text-lg)', color: 'var(--text-strong)' }}>{title}</h3>
        {description && (
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.5 }}>{description}</p>
        )}
        {meta && (
          <div style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--navy-600)' }}>{meta}</div>
        )}
      </div>
    </div>
  );
}
