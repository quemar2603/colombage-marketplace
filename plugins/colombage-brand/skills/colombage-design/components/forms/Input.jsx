import React from 'react';

/**
 * ColombAge Input — large, rounded text field with optional label & helper.
 */
export function Input({
  label,
  helper,
  error,
  iconLeft = null,
  id,
  style = {},
  ...rest
}) {
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger)' : 'var(--border-strong)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', ...style }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>
          {label}
        </label>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          background: 'var(--white)',
          border: `1.5px solid ${borderColor}`,
          borderRadius: 'var(--radius-control)',
          padding: '0 var(--space-4)',
          height: 'var(--tap-min)',
        }}
      >
        {iconLeft}
        <input
          id={inputId}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'var(--font-base)',
            fontSize: 'var(--text-base)',
            color: 'var(--text-strong)',
            minWidth: 0,
          }}
          {...rest}
        />
      </div>
      {(helper || error) && (
        <span style={{ fontSize: 'var(--text-sm)', color: error ? 'var(--danger)' : 'var(--text-muted)' }}>
          {error || helper}
        </span>
      )}
    </div>
  );
}
