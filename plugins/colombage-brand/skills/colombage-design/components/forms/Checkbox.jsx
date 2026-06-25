import React from 'react';

/**
 * ColombAge Checkbox — rounded square, navy fill + white check when on.
 */
export function Checkbox({ checked = false, onChange, label, disabled = false, style = {}, ...rest }) {
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
          width: 28,
          height: 28,
          borderRadius: 'var(--radius-sm)',
          background: checked ? 'var(--navy-600)' : 'var(--white)',
          border: `1.5px solid ${checked ? 'var(--navy-600)' : 'var(--border-strong)'}`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 'none',
          transition: 'background .15s ease, border-color .15s ease',
        }}
      >
        {checked && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
