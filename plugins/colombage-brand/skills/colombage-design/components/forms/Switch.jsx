import React from 'react';

/**
 * ColombAge Switch — friendly rounded toggle. Navy when on.
 */
export function Switch({ checked = false, onChange, label, disabled = false, style = {}, ...rest }) {
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'var(--font-base)',
        fontSize: 'var(--text-base)',
        color: 'var(--text-body)',
        ...style,
      }}
      {...rest}
    >
      <span
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          width: 56,
          height: 32,
          borderRadius: 999,
          background: checked ? 'var(--navy-600)' : 'var(--navy-200)',
          position: 'relative',
          transition: 'background .18s ease',
          flex: 'none',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 3,
            left: checked ? 27 : 3,
            width: 26,
            height: 26,
            borderRadius: 999,
            background: 'var(--white)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'left .18s ease',
          }}
        />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
