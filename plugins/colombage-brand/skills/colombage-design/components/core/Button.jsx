import React from 'react';

/**
 * ColombAge Button — large, rounded, reassuring.
 * Variants: primary (navy), secondary (periwinkle-tint), accent (pink),
 * ghost (text-only). Sizes: md, lg. Full-width optional.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  disabled = false,
  style = {},
  ...rest
}) {
  const palette = {
    primary: { bg: 'var(--action)', color: 'var(--action-text)', border: 'transparent', shadow: 'var(--shadow-sm)' },
    secondary: { bg: 'var(--peri-200)', color: 'var(--navy-700)', border: 'transparent', shadow: 'none' },
    accent: { bg: 'var(--pink-400)', color: 'var(--navy-700)', border: 'transparent', shadow: 'var(--shadow-accent)' },
    ghost: { bg: 'transparent', color: 'var(--navy-600)', border: 'transparent', shadow: 'none' },
    outline: { bg: 'var(--white)', color: 'var(--navy-700)', border: 'var(--border-strong)', shadow: 'none' },
  }[variant] || {};

  const sizing = {
    md: { padding: '0 22px', height: 'var(--tap-min)', fontSize: 'var(--text-base)' },
    lg: { padding: '0 30px', height: 'var(--tap-large)', fontSize: 'var(--text-md)' },
  }[size];

  return (
    <button
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        fontFamily: 'var(--font-base)',
        fontSize: sizing.fontSize,
        height: sizing.height,
        padding: sizing.padding,
        width: fullWidth ? '100%' : 'auto',
        background: palette.bg,
        color: palette.color,
        border: `1.5px solid ${palette.border}`,
        borderRadius: 'var(--radius-button)',
        boxShadow: palette.shadow,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'transform .12s ease, filter .15s ease, background .15s ease',
        ...style,
      }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = 'scale(0.97)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
