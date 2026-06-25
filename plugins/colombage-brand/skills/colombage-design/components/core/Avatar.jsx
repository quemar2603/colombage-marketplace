import React from 'react';

/**
 * ColombAge Avatar — round portrait for caregivers & clients.
 * Falls back to initials on soft brand tints. Optional status ring.
 */
export function Avatar({ src, name = '', size = 56, tone = 'peri', online = false, style = {}, ...rest }) {
  const tints = {
    peri: { bg: 'var(--peri-200)', color: 'var(--navy-700)' },
    pink: { bg: 'var(--pink-200)', color: 'var(--navy-700)' },
    navy: { bg: 'var(--navy-600)', color: 'var(--white)' },
  }[tone] || {};

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <span style={{ position: 'relative', display: 'inline-flex', flex: 'none', ...style }} {...rest}>
      <span
        style={{
          width: size,
          height: size,
          borderRadius: 999,
          overflow: 'hidden',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: tints.bg,
          color: tints.color,
          fontFamily: 'var(--font-base)',
          fontSize: size * 0.38,
          border: '2px solid var(--white)',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        {src ? (
          <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          initials
        )}
      </span>
      {online && (
        <span
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: size * 0.28,
            height: size * 0.28,
            borderRadius: 999,
            background: 'var(--success)',
            border: '2px solid var(--white)',
          }}
        />
      )}
    </span>
  );
}
