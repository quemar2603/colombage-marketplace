/* Lightweight, self-contained ColombAge UI primitives for the app kit.
   Mirror the design-system components but inlined so screens render without
   the compiled bundle. Visuals follow tokens in styles.css. */

function Icon({ name, size = 24, color = 'currentColor', stroke = 2 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({
        nameAttr: 'data-lucide',
        attrs: { width: size, height: size, stroke: color, 'stroke-width': stroke },
      });
    }
  }, [name, size, color, stroke]);
  return <span ref={ref} style={{ display: 'inline-flex', width: size, height: size }} />;
}

function Btn({ children, variant = 'primary', size = 'lg', full, onClick, iconLeft, style = {} }) {
  const pal = {
    primary: { bg: 'var(--action)', color: '#fff', shadow: 'var(--shadow-sm)', border: 'transparent' },
    accent: { bg: 'var(--pink-400)', color: 'var(--navy-700)', shadow: 'var(--shadow-accent)', border: 'transparent' },
    secondary: { bg: 'var(--peri-200)', color: 'var(--navy-700)', shadow: 'none', border: 'transparent' },
    outline: { bg: '#fff', color: 'var(--navy-700)', shadow: 'none', border: 'var(--border-strong)' },
    ghost: { bg: 'transparent', color: 'var(--navy-600)', shadow: 'none', border: 'transparent' },
  }[variant];
  const h = size === 'lg' ? 'var(--tap-large)' : 'var(--tap-min)';
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      fontFamily: 'var(--font-base)', fontSize: size === 'lg' ? 19 : 17, height: h,
      padding: '0 26px', width: full ? '100%' : 'auto', background: pal.bg, color: pal.color,
      border: `1.5px solid ${pal.border}`, borderRadius: 'var(--radius-button)', boxShadow: pal.shadow,
      cursor: 'pointer', transition: 'transform .12s ease', ...style,
    }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
      {iconLeft}{children}
    </button>
  );
}

function Chip({ children, tone = 'pink', active = false }) {
  const tones = {
    pink: { bg: 'var(--pink-100)', color: 'var(--navy-700)' },
    peri: { bg: 'var(--peri-100)', color: 'var(--navy-700)' },
    navy: { bg: 'var(--navy-600)', color: '#fff' },
  };
  const t = active ? tones.navy : tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px',
      borderRadius: 999, background: t.bg, color: t.color, fontSize: 15, whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

function Avatar({ name = '', src, size = 48, tone = 'peri', online }) {
  const tints = {
    peri: { bg: 'var(--peri-200)', c: 'var(--navy-700)' },
    pink: { bg: 'var(--pink-200)', c: 'var(--navy-700)' },
    navy: { bg: 'var(--navy-600)', c: '#fff' },
  }[tone];
  const initials = name.split(' ').map((w) => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  return (
    <span style={{ position: 'relative', display: 'inline-flex', flex: 'none' }}>
      <span style={{
        width: size, height: size, borderRadius: 999, overflow: 'hidden', display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center', background: tints.bg, color: tints.c,
        fontSize: size * 0.38, border: '2px solid #fff', boxShadow: 'var(--shadow-xs)',
      }}>
        {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
      </span>
      {online && <span style={{ position: 'absolute', right: 0, bottom: 0, width: size * 0.28, height: size * 0.28, borderRadius: 999, background: 'var(--success)', border: '2px solid #fff' }} />}
    </span>
  );
}

function Tile({ children, tone = 'pink', size = 52 }) {
  const tones = {
    pink: { bg: 'var(--pink-200)', c: 'var(--navy-700)' },
    peri: { bg: 'var(--peri-200)', c: 'var(--navy-700)' },
    navy: { bg: 'var(--navy-600)', c: '#fff' },
    cream: { bg: 'var(--navy-50)', c: 'var(--navy-600)' },
  }[tone];
  return (
    <span style={{
      width: size, height: size, borderRadius: 'var(--radius-lg)', background: tones.bg, color: tones.c,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
    }}>{children}</span>
  );
}

Object.assign(window, { Icon, Btn, Chip, Avatar, Tile });
