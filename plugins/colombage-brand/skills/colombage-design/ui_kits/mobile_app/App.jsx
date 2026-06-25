/* ColombAge mobile app — shell: phone frame, routing, bottom nav. */

function BottomNav({ tab, setTab }) {
  const items = [
    { id: 'home', icon: 'house', label: 'Accueil' },
    { id: 'services', icon: 'layout-grid', label: 'Services' },
    { id: 'messages', icon: 'message-circle', label: 'Messages' },
    { id: 'profile', icon: 'user', label: 'Profil' },
  ];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      background: '#fff', borderTop: '1px solid var(--border-soft)', padding: '10px 8px 22px',
    }}>
      {items.map((it) => {
        const active = tab === it.id;
        return (
          <div key={it.id} onClick={() => setTab(it.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            cursor: 'pointer', color: active ? 'var(--navy-600)' : 'var(--navy-300)', flex: 1,
          }}>
            <Icon name={it.icon} size={26} color={active ? 'var(--navy-600)' : 'var(--navy-300)'} stroke={active ? 2.4 : 2} />
            <span style={{ fontSize: 12 }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function MessagesScreen() {
  const msgs = [
    { from: 'Sophie Marchand', tone: 'pink', text: 'Bonjour Mme Lefèvre, je passe à 14h aujourd\'hui 🙂', time: '09:12', unread: true },
    { from: 'Équipe ColombAge', tone: 'navy', text: 'Votre visite de mercredi est confirmée.', time: 'Hier' },
    { from: 'Julien (proche aidant)', tone: 'peri', text: 'Merci pour tout cette semaine !', time: 'Lun' },
  ];
  return (
    <div>
      <div style={{ fontSize: 26, color: 'var(--text-strong)', margin: '6px 2px 18px' }}>Messages</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', background: '#fff', border: '1.5px solid var(--border-soft)', borderRadius: 'var(--radius-card)', padding: 16, boxShadow: 'var(--shadow-sm)' }}>
            <Avatar name={m.from} tone={m.tone} size={50} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 16, color: 'var(--text-strong)' }}>{m.from}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{m.time}</span>
              </div>
              <div style={{ fontSize: 15, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.text}</div>
            </div>
            {m.unread && <span style={{ width: 12, height: 12, borderRadius: 999, background: 'var(--pink-400)', flex: 'none' }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [tab, setTab] = React.useState('home');
  const [route, setRoute] = React.useState(null); // {name:'booking'|'confirm', service, when}

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons({ nameAttr: 'data-lucide' }); });

  function book(service) { setRoute({ name: 'booking', service }); }
  function confirm(when) { setRoute({ name: 'confirm', service: route.service, when }); }
  function home() { setRoute(null); setTab('home'); }

  let body;
  if (route?.name === 'booking') body = <BookingScreen service={route.service} onBack={() => setRoute(null)} onConfirm={confirm} />;
  else if (route?.name === 'confirm') body = <ConfirmScreen service={route.service} when={route.when} onDone={home} />;
  else if (tab === 'home') body = <HomeScreen onBook={book} onOpenService={() => setTab('services')} />;
  else if (tab === 'services') body = <ServicesScreen onBook={book} />;
  else if (tab === 'messages') body = <MessagesScreen />;
  else body = <ProfileScreen />;

  const hideNav = route !== null;

  return (
    <div className="phone">
      <div className="statusbar">
        <span>9:41</span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <Icon name="signal" size={16} color="var(--navy-700)" />
          <Icon name="wifi" size={16} color="var(--navy-700)" />
          <Icon name="battery-full" size={18} color="var(--navy-700)" />
        </span>
      </div>
      <div className="screen">{body}</div>
      {!hideNav && <BottomNav tab={tab} setTab={setTab} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
setTimeout(() => window.lucide && window.lucide.createIcons({ nameAttr: 'data-lucide' }), 300);
