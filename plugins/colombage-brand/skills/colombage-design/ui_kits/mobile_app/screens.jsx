/* ColombAge mobile app — screens. Self-contained, cosmetic recreation. */

const SERVICES = [
  { id: 'courses', title: 'Aide aux courses', icon: 'shopping-basket', tone: 'pink', desc: 'Accompagnement pour vos achats', price: 'Dès 22 €' },
  { id: 'compagnie', title: 'Compagnie & lien', icon: 'heart-handshake', tone: 'peri', desc: 'Un moment partagé, une présence', price: 'Dès 25 €' },
  { id: 'menage', title: 'Aide ménagère', icon: 'sparkles', tone: 'pink', desc: 'Un intérieur propre et serein', price: 'Dès 24 €' },
  { id: 'repas', title: 'Préparation des repas', icon: 'utensils', tone: 'peri', desc: 'Des repas faits maison', price: 'Dès 26 €' },
  { id: 'sante', title: 'Accompagnement santé', icon: 'stethoscope', tone: 'pink', desc: 'Rendez-vous & rappels', price: 'Dès 28 €' },
  { id: 'visite', title: 'Visite de courtoisie', icon: 'home', tone: 'peri', desc: 'Nous veillons sur vous', price: 'Inclus' },
];

const SLOTS = ['08:30', '10:00', '11:30', '14:00', '15:30', '17:00'];

/* ---------------- Top greeting bar ---------------- */
function TopBar({ name }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 4px 18px' }}>
      <div>
        <div style={{ fontSize: 15, color: 'var(--text-muted)' }}>Bonjour,</div>
        <div style={{ fontSize: 26, color: 'var(--text-strong)' }}>{name}</div>
      </div>
      <span style={{ position: 'relative' }}>
        <Tile tone="cream" size={48}><Icon name="bell" size={22} color="var(--navy-600)" /></Tile>
        <span style={{ position: 'absolute', top: 6, right: 6, width: 10, height: 10, borderRadius: 999, background: 'var(--pink-400)', border: '2px solid #fff' }} />
      </span>
    </div>
  );
}

/* ---------------- HOME ---------------- */
function HomeScreen({ onBook, onOpenService }) {
  return (
    <div>
      <TopBar name="Mme Lefèvre" />

      {/* Next visit hero */}
      <div style={{ background: 'var(--navy-600)', borderRadius: 'var(--radius-hero)', padding: 22, color: '#fff', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--peri-300)', letterSpacing: '.04em', textTransform: 'uppercase' }}>
          <Icon name="calendar-heart" size={18} color="var(--peri-300)" /> Prochaine visite
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 16 }}>
          <Avatar name="Sophie Marchand" tone="pink" size={56} online />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 21 }}>Sophie M.</div>
            <div style={{ fontSize: 15, color: 'var(--peri-200)' }}>Auxiliaire de vie</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 21 }}>Aujourd'hui</div>
            <div style={{ fontSize: 15, color: 'var(--peri-200)' }}>14:00</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <Btn variant="accent" size="md" full iconLeft={<Icon name="message-circle" size={18} color="var(--navy-700)" />}>Message</Btn>
          <Btn variant="secondary" size="md" full iconLeft={<Icon name="phone" size={18} color="var(--navy-700)" />}>Appeler</Btn>
        </div>
      </div>

      {/* Quick services */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '26px 2px 14px' }}>
        <div style={{ fontSize: 20, color: 'var(--text-strong)' }}>Nos services</div>
        <span onClick={onOpenService} style={{ fontSize: 15, color: 'var(--navy-600)', cursor: 'pointer' }}>Tout voir</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {SERVICES.slice(0, 4).map((s) => (
          <div key={s.id} onClick={() => onBook(s)} style={{
            background: '#fff', border: '1.5px solid var(--border-soft)', borderRadius: 'var(--radius-card)',
            padding: 16, boxShadow: 'var(--shadow-sm)', cursor: 'pointer',
          }}>
            <Tile tone={s.tone}><Icon name={s.icon} size={24} color="var(--navy-700)" /></Tile>
            <div style={{ fontSize: 17, color: 'var(--text-strong)', marginTop: 12, lineHeight: 1.25 }}>{s.title}</div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>{s.price}</div>
          </div>
        ))}
      </div>

      {/* Reassurance strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--pink-100)', border: '1.5px solid var(--pink-300)', borderRadius: 'var(--radius-card)', padding: 16, marginTop: 18 }}>
        <Tile tone="pink" size={44}><Icon name="shield-check" size={22} color="var(--navy-700)" /></Tile>
        <div style={{ fontSize: 15, color: 'var(--navy-700)' }}>Toutes nos auxiliaires sont formées et de confiance.</div>
      </div>
    </div>
  );
}

/* ---------------- SERVICES LIST ---------------- */
function ServicesScreen({ onBook }) {
  const [filter, setFilter] = React.useState('Tous');
  return (
    <div>
      <div style={{ fontSize: 26, color: 'var(--text-strong)', margin: '6px 2px 16px' }}>Nos services</div>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6, marginBottom: 6 }}>
        {['Tous', 'À domicile', 'Bien-être', 'Santé'].map((f) => (
          <span key={f} onClick={() => setFilter(f)} style={{ cursor: 'pointer' }}>
            <Chip active={filter === f}>{f}</Chip>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
        {SERVICES.map((s) => (
          <div key={s.id} onClick={() => onBook(s)} style={{
            display: 'flex', gap: 14, alignItems: 'center', background: '#fff',
            border: '1.5px solid var(--border-soft)', borderRadius: 'var(--radius-card)', padding: 16,
            boxShadow: 'var(--shadow-sm)', cursor: 'pointer',
          }}>
            <Tile tone={s.tone} size={52}><Icon name={s.icon} size={24} color="var(--navy-700)" /></Tile>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 18, color: 'var(--text-strong)' }}>{s.title}</div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{s.desc}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 15, color: 'var(--navy-600)' }}>{s.price}</div>
              <Icon name="chevron-right" size={20} color="var(--navy-300)" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- BOOKING ---------------- */
function BookingScreen({ service, onBack, onConfirm }) {
  const [day, setDay] = React.useState(1);
  const [slot, setSlot] = React.useState('14:00');
  const days = [
    { d: 'Lun', n: 12 }, { d: 'Mar', n: 13 }, { d: 'Mer', n: 14 }, { d: 'Jeu', n: 15 }, { d: 'Ven', n: 16 },
  ];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0 18px' }}>
        <span onClick={onBack} style={{ cursor: 'pointer' }}><Tile tone="cream" size={44}><Icon name="arrow-left" size={22} color="var(--navy-600)" /></Tile></span>
        <div style={{ fontSize: 22, color: 'var(--text-strong)' }}>Réserver</div>
      </div>

      <div style={{ display: 'flex', gap: 14, alignItems: 'center', background: 'var(--peri-100)', borderRadius: 'var(--radius-card)', padding: 16, marginBottom: 22 }}>
        <Tile tone={service.tone} size={52}><Icon name={service.icon} size={24} color="var(--navy-700)" /></Tile>
        <div>
          <div style={{ fontSize: 18, color: 'var(--text-strong)' }}>{service.title}</div>
          <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{service.desc}</div>
        </div>
      </div>

      <div style={{ fontSize: 17, color: 'var(--text-strong)', marginBottom: 12 }}>Choisissez un jour</div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        {days.map((dd, i) => (
          <div key={i} onClick={() => setDay(i)} style={{
            flex: 1, textAlign: 'center', padding: '12px 0', borderRadius: 'var(--radius-lg)',
            background: day === i ? 'var(--navy-600)' : '#fff', color: day === i ? '#fff' : 'var(--navy-700)',
            border: `1.5px solid ${day === i ? 'var(--navy-600)' : 'var(--border-soft)'}`, cursor: 'pointer',
          }}>
            <div style={{ fontSize: 13, opacity: .8 }}>{dd.d}</div>
            <div style={{ fontSize: 20 }}>{dd.n}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 17, color: 'var(--text-strong)', marginBottom: 12 }}>Heure de la visite</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {SLOTS.map((s) => (
          <div key={s} onClick={() => setSlot(s)} style={{
            textAlign: 'center', padding: '14px 0', borderRadius: 'var(--radius-md)',
            background: slot === s ? 'var(--pink-200)' : '#fff', color: 'var(--navy-700)',
            border: `1.5px solid ${slot === s ? 'var(--pink-400)' : 'var(--border-soft)'}`,
            outline: slot === s ? '3px solid var(--pink-100)' : 'none', cursor: 'pointer', fontSize: 16,
          }}>{s}</div>
        ))}
      </div>

      <div style={{ marginTop: 28 }}>
        <Btn variant="primary" full onClick={() => onConfirm({ day: days[day], slot })}>Confirmer la visite</Btn>
      </div>
    </div>
  );
}

/* ---------------- CONFIRMATION ---------------- */
function ConfirmScreen({ service, when, onDone }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 40 }}>
      <span style={{ width: 96, height: 96, borderRadius: 999, background: 'var(--success-soft)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="check" size={48} color="var(--success)" stroke={2.4} />
      </span>
      <div style={{ fontSize: 26, color: 'var(--text-strong)', marginTop: 24 }}>C'est confirmé !</div>
      <div style={{ fontSize: 16, color: 'var(--text-muted)', marginTop: 8, maxWidth: 280 }}>
        Sophie viendra pour « {service.title} ».
      </div>
      <div style={{ background: '#fff', border: '1.5px solid var(--border-soft)', borderRadius: 'var(--radius-card)', padding: 20, marginTop: 28, width: '100%', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name="Sophie Marchand" tone="pink" size={48} online />
          <div style={{ textAlign: 'left', flex: 1 }}>
            <div style={{ fontSize: 17, color: 'var(--text-strong)' }}>Sophie Marchand</div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>Auxiliaire de vie</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 17, color: 'var(--navy-600)' }}>{when.day.d} {when.day.n}</div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{when.slot}</div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 26, width: '100%' }}>
        <Btn variant="primary" full onClick={onDone}>Revenir à l'accueil</Btn>
      </div>
    </div>
  );
}

/* ---------------- PROFILE ---------------- */
function ProfileScreen() {
  const [sms, setSms] = React.useState(true);
  const [news, setNews] = React.useState(false);
  const rows = [
    { icon: 'user', label: 'Mes informations' },
    { icon: 'map-pin', label: 'Adresse & accès' },
    { icon: 'credit-card', label: 'Moyens de paiement' },
    { icon: 'users', label: 'Mes proches aidants' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '18px 0 24px' }}>
        <Avatar name="Mme Lefèvre" tone="peri" size={84} />
        <div style={{ fontSize: 24, color: 'var(--text-strong)', marginTop: 12 }}>Mme Lefèvre</div>
        <div style={{ fontSize: 15, color: 'var(--text-muted)' }}>Abonnée depuis mars 2024</div>
      </div>
      <div style={{ background: '#fff', border: '1.5px solid var(--border-soft)', borderRadius: 'var(--radius-card)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        {rows.map((r, i) => (
          <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderTop: i ? '1px solid var(--border-soft)' : 'none' }}>
            <Tile tone="cream" size={42}><Icon name={r.icon} size={20} color="var(--navy-600)" /></Tile>
            <div style={{ flex: 1, fontSize: 17, color: 'var(--text-body)' }}>{r.label}</div>
            <Icon name="chevron-right" size={20} color="var(--navy-300)" />
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1.5px solid var(--border-soft)', borderRadius: 'var(--radius-card)', padding: '6px 18px', marginTop: 16, boxShadow: 'var(--shadow-sm)' }}>
        <Row><span>Rappels par SMS</span><Toggle on={sms} set={setSms} /></Row>
        <Row last><span>Newsletter mensuelle</span><Toggle on={news} set={setNews} /></Row>
      </div>
    </div>
  );
}
function Row({ children, last }) {
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: last ? 'none' : '1px solid var(--border-soft)', fontSize: 17, color: 'var(--text-body)' }}>{children}</div>;
}
function Toggle({ on, set }) {
  return (
    <span onClick={() => set(!on)} style={{ width: 56, height: 32, borderRadius: 999, background: on ? 'var(--navy-600)' : 'var(--navy-200)', position: 'relative', cursor: 'pointer', transition: 'background .18s', flex: 'none' }}>
      <span style={{ position: 'absolute', top: 3, left: on ? 27 : 3, width: 26, height: 26, borderRadius: 999, background: '#fff', boxShadow: 'var(--shadow-sm)', transition: 'left .18s' }} />
    </span>
  );
}

Object.assign(window, { SERVICES, HomeScreen, ServicesScreen, BookingScreen, ConfirmScreen, ProfileScreen });
