/* ColombAge marketing site — sections. Self-contained, token-driven. */

function WIcon({ name, size = 24, color = 'currentColor', stroke = 2 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({ nameAttr: 'data-lucide', attrs: { width: size, height: size, stroke: color, 'stroke-width': stroke } });
    }
  });
  return <span ref={ref} style={{ display: 'inline-flex', width: size, height: size }} />;
}

function WBtn({ children, variant = 'primary', onClick, iconRight }) {
  const pal = {
    primary: { bg: 'var(--action)', color: '#fff', shadow: 'var(--shadow-sm)', border: 'transparent' },
    accent: { bg: 'var(--pink-400)', color: 'var(--navy-700)', shadow: 'var(--shadow-accent)', border: 'transparent' },
    outline: { bg: '#fff', color: 'var(--navy-700)', shadow: 'none', border: 'var(--border-strong)' },
    ghost: { bg: 'transparent', color: 'var(--navy-600)', shadow: 'none', border: 'transparent' },
  }[variant];
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-base)',
      fontSize: 18, height: 56, padding: '0 30px', background: pal.bg, color: pal.color,
      border: `1.5px solid ${pal.border}`, borderRadius: 'var(--radius-button)', boxShadow: pal.shadow, cursor: 'pointer',
      transition: 'transform .12s ease',
    }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
      {children}{iconRight}
    </button>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const links = ['Nos services', 'Comment ça marche', 'Nos auxiliaires', 'Tarifs'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(251,250,248,0.92)', borderBottom: '1px solid var(--border-soft)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="../../assets/logo-mark-navy.svg" alt="ColombAge" style={{ width: 46, height: 46 }} />
          <span style={{ fontSize: 24, color: 'var(--navy-600)' }}>ColombAge</span>
        </div>
        <nav style={{ display: 'flex', gap: 26, flex: 1 }}>
          {links.map((l) => (
            <a key={l} href="#" style={{ fontSize: 16, color: 'var(--text-body)' }}>{l}</a>
          ))}
        </nav>
        <a href="#" style={{ fontSize: 16, color: 'var(--navy-600)' }}>Espace client</a>
        <WBtn variant="primary">Être rappelé</WBtn>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '64px 32px 40px', display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center' }}>
      <div>
        <span className="ca-eyebrow">Services d'aide à domicile</span>
        <h1 style={{ fontSize: 56, lineHeight: 1.08, margin: '14px 0 20px', color: 'var(--text-strong)' }}>
          Bien vieillir chez soi,<br />en toute sérénité.
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.6, color: 'var(--text-body)', maxWidth: 480, margin: '0 0 28px' }}>
          ColombAge accompagne vos proches âgés à la maison : compagnie, aide aux
          courses, ménage et présence rassurante. Des auxiliaires de confiance,
          près de chez vous.
        </p>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <WBtn variant="primary" iconRight={<WIcon name="arrow-right" size={20} color="#fff" />}>Découvrir nos services</WBtn>
          <WBtn variant="outline" iconRight={<WIcon name="phone" size={18} color="var(--navy-700)" />}>01 23 45 67 89</WBtn>
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 34 }}>
          {[['shield-check', 'Auxiliaires formées & vérifiées'], ['heart', 'Accompagnement humain'], ['map-pin', 'Partout en France']].map(([ic, t]) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: 'var(--text-muted)' }}>
              <WIcon name={ic} size={20} color="var(--pink-600)" />{t}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <image-slot id="ca-hero" style={{ display: 'block', width: '100%', height: 460 }} shape="rounded" radius="36"
          placeholder="Déposez une photo chaleureuse (senior accompagné)"></image-slot>
        <div style={{ position: 'absolute', left: -18, bottom: 28, background: '#fff', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-lg)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, border: '1.5px solid var(--border-soft)' }}>
          <span style={{ width: 46, height: 46, borderRadius: 999, background: 'var(--pink-200)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <WIcon name="calendar-heart" size={24} color="var(--navy-700)" />
          </span>
          <div>
            <div style={{ fontSize: 16, color: 'var(--text-strong)' }}>Prochaine visite</div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>Sophie · aujourd'hui 14:00</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
const WSERVICES = [
  { t: 'Aide aux courses', d: 'Accompagnement pour les achats du quotidien.', i: 'shopping-basket', tone: 'pink' },
  { t: 'Compagnie & lien', d: 'Un moment partagé, une présence rassurante.', i: 'heart-handshake', tone: 'peri' },
  { t: 'Aide ménagère', d: 'Un intérieur propre, sain et agréable.', i: 'sparkles', tone: 'pink' },
  { t: 'Préparation des repas', d: 'Des repas faits maison, adaptés aux goûts.', i: 'utensils', tone: 'peri' },
  { t: 'Accompagnement santé', d: 'Rendez-vous, rappels et suivi en douceur.', i: 'stethoscope', tone: 'pink' },
  { t: 'Visite de courtoisie', d: 'Nous passons veiller sur ce qui compte.', i: 'home', tone: 'peri' },
];
function Services() {
  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 32px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span className="ca-eyebrow">Ce que nous proposons</span>
        <h2 style={{ fontSize: 40, margin: '10px 0 0', color: 'var(--text-strong)' }}>Des services pensés pour le quotidien</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
        {WSERVICES.map((s) => (
          <div key={s.t} style={{ background: '#fff', border: '1.5px solid var(--border-soft)', borderRadius: 'var(--radius-card)', padding: 26, boxShadow: 'var(--shadow-sm)', transition: 'transform .15s, box-shadow .15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
            <span style={{ width: 58, height: 58, borderRadius: 'var(--radius-lg)', background: s.tone === 'pink' ? 'var(--pink-200)' : 'var(--peri-200)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <WIcon name={s.i} size={28} color="var(--navy-700)" />
            </span>
            <h3 style={{ fontSize: 22, margin: '18px 0 8px', color: 'var(--text-strong)' }}>{s.t}</h3>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */
function HowItWorks() {
  const steps = [
    { n: '1', i: 'phone-call', t: 'On échange', d: 'Un conseiller vous rappelle pour comprendre vos besoins.' },
    { n: '2', i: 'user-check', t: 'On vous présente', d: 'Nous choisissons ensemble l\'auxiliaire la plus adaptée.' },
    { n: '3', i: 'calendar-heart', t: 'On accompagne', d: 'Les visites commencent, à votre rythme, en toute sérénité.' },
  ];
  return (
    <section style={{ background: 'var(--peri-100)', padding: '64px 0' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="ca-eyebrow">Simple et rassurant</span>
          <h2 style={{ fontSize: 40, margin: '10px 0 0', color: 'var(--text-strong)' }}>Comment ça marche</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-flex' }}>
                <span style={{ width: 88, height: 88, borderRadius: 999, background: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <WIcon name={s.i} size={36} color="var(--navy-600)" />
                </span>
                <span style={{ position: 'absolute', top: -6, right: -6, width: 34, height: 34, borderRadius: 999, background: 'var(--pink-400)', color: 'var(--navy-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{s.n}</span>
              </div>
              <h3 style={{ fontSize: 24, margin: '20px 0 8px', color: 'var(--text-strong)' }}>{s.t}</h3>
              <p style={{ fontSize: 16, color: 'var(--text-body)', margin: '0 auto', maxWidth: 260, lineHeight: 1.55 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonial ---------------- */
function Testimonial() {
  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '72px 32px', textAlign: 'center' }}>
      <WIcon name="quote" size={44} color="var(--pink-400)" />
      <p style={{ fontSize: 28, lineHeight: 1.5, color: 'var(--text-strong)', margin: '18px 0 28px', textWrap: 'balance' }}>
        Depuis que Sophie passe voir maman, toute la famille est plus tranquille.
        On sent une vraie présence, chaleureuse et fiable.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
        <span style={{ width: 52, height: 52, borderRadius: 999, background: 'var(--peri-200)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy-700)', fontSize: 19 }}>JL</span>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 17, color: 'var(--text-strong)' }}>Julien L.</div>
          <div style={{ fontSize: 15, color: 'var(--text-muted)' }}>Fils de Mme Lefèvre · Nantes</div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer CTA + footer ---------------- */
function FooterCTA() {
  return (
    <section style={{ maxWidth: 1180, margin: '0 auto 64px', padding: '0 32px' }}>
      <div style={{ background: 'var(--navy-600)', borderRadius: 'var(--radius-hero)', padding: '56px 48px', textAlign: 'center', color: '#fff', boxShadow: 'var(--shadow-md)' }}>
        <h2 style={{ fontSize: 38, margin: '0 0 14px', color: '#fff' }}>Parlons de vos besoins</h2>
        <p style={{ fontSize: 19, color: 'var(--peri-200)', maxWidth: 520, margin: '0 auto 28px' }}>
          Un conseiller vous rappelle gratuitement pour construire l'accompagnement
          qui vous ressemble.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          <WBtn variant="accent">Être rappelé gratuitement</WBtn>
          <WBtn variant="ghost" iconRight={<WIcon name="arrow-right" size={20} color="#fff" />}><span style={{ color: '#fff' }}>Voir les tarifs</span></WBtn>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  const cols = [
    ['Services', ['Aide aux courses', 'Compagnie', 'Aide ménagère', 'Repas']],
    ['ColombAge', ['Notre mission', 'Nos auxiliaires', 'Recrutement', 'Contact']],
    ['Aide', ['Centre d\'aide', 'Tarifs', 'Espace client', 'CGU']],
  ];
  return (
    <footer style={{ borderTop: '1px solid var(--border-soft)', padding: '48px 0 36px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="../../assets/logo-mark-navy.svg" alt="" style={{ width: 40, height: 40 }} />
            <span style={{ fontSize: 21, color: 'var(--navy-600)' }}>ColombAge</span>
          </div>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 14, maxWidth: 240 }}>Bien chez soi. Des services d'aide à domicile, humains et de confiance.</p>
        </div>
        {cols.map(([h, items]) => (
          <div key={h}>
            <div style={{ fontSize: 15, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>{h}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((it) => <a key={it} href="#" style={{ fontSize: 16, color: 'var(--text-body)' }}>{it}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1180, margin: '32px auto 0', padding: '20px 32px 0', borderTop: '1px solid var(--border-soft)', fontSize: 14, color: 'var(--text-muted)' }}>
        © 2026 ColombAge — Tous droits réservés.
      </div>
    </footer>
  );
}

Object.assign(window, { Header, Hero, Services, HowItWorks, Testimonial, FooterCTA, Footer });
