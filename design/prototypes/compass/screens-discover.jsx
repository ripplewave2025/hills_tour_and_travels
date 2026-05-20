// Compass — Discover screens: main map + pin detail card + search overlay.

function ScreenDiscover({ initialPin = 'tigerhill', initialSheet = 'mid', onTapPackage, onOpenSearch, onOpenBuild }) {
  const [active, setActive] = React.useState(initialPin);
  const [sheet, setSheet] = React.useState(initialSheet);
  const tr = useT();
  const pin = findPin(active);

  return (
    <div style={{ height: '100%', position: 'relative', background: c.bg, color: c.fg, overflow: 'hidden' }}>
      {/* Top chrome */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '14px 14px 10px', zIndex: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Pill icon="📍">DARJEELING · 27.04°N</Pill>
        <div style={{ display: 'flex', gap: 8 }}>
          <Pill glass color={null}><span style={{ color: c.brand, fontWeight: 700 }}>EN</span></Pill>
          <div style={{ width: 36, height: 36, background: 'rgba(11,15,25,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, display: 'grid', placeItems: 'center', fontSize: 14, cursor: 'pointer' }}>≡</div>
        </div>
      </div>

      {/* Search bar */}
      <div onClick={onOpenSearch} style={{
        position: 'absolute', top: 60, left: 14, right: 14, zIndex: 30,
        background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(14px)',
        border: '1px solid rgba(230,167,41,0.3)', borderRadius: 14,
        padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
      }}>
        <span style={{ color: c.brand, fontSize: 14 }}>⌕</span>
        <span style={{ fontSize: 13, color: c.sub, flex: 1 }}>{tr('search')}</span>
        <span style={{ fontSize: 9, color: c.mute, fontFamily: 'JetBrains Mono', background: 'rgba(255,255,255,0.05)', padding: '3px 7px', borderRadius: 4 }}>⌘K</span>
      </div>

      {/* The map */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <DarjMap active={active} onTap={(p) => setActive(p.id)} routeIds={[]} height={MAP_H} />
      </div>

      {/* Bottom sheet */}
      <BottomSheet state={sheet} onStateChange={setSheet}>
        {/* Active pin card */}
        <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr auto', gap: 14, marginBottom: 18 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(230,167,41,0.15)', border: '1px solid rgba(230,167,41,0.35)', display: 'grid', placeItems: 'center', fontSize: 22 }}>
            {pin.kind === 'temple' ? '🛕' : pin.kind === 'tea' ? '🍃' : pin.kind === 'town' ? '☕' : pin.kind === 'museum' ? '🏛' : pin.kind === 'heritage' ? '🚂' : '⛰'}
          </div>
          <div>
            <Eyebrow color={c.brand}>{pin.kind.toUpperCase()} · {pin.sub.split('·')[1]?.trim()}</Eyebrow>
            <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, marginTop: 2, letterSpacing: '-0.02em' }}>{pin.name}</div>
            <div style={{ fontSize: 11, color: c.sub, marginTop: 4 }}>{pin.sub}</div>
          </div>
          <button style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: c.fg, fontSize: 16, cursor: 'pointer' }}>♡</button>
        </div>

        <p style={{ fontSize: 12.5, color: c.sub, lineHeight: 1.55, marginBottom: 14 }}>{pin.desc}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 22 }}>
          <GhostBtn onClick={onOpenBuild}>+ Add to route</GhostBtn>
          <PrimaryBtn size="sm" onClick={() => onTapPackage && onTapPackage(C_PACKAGES[0])}>See packages →</PrimaryBtn>
        </div>

        {/* Quick chips */}
        <Eyebrow style={{ marginBottom: 10 }}>JOURNEYS THROUGH {pin.name.toUpperCase()}</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
          {C_PACKAGES.filter(p => p.stops.includes(active) || true).slice(0, 3).map(p => (
            <PkgRow key={p.id} pkg={p} onTap={() => onTapPackage && onTapPackage(p)} />
          ))}
        </div>

        <Eyebrow style={{ marginBottom: 10 }}>OR JUST A CAB</Eyebrow>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 8, marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16 }}>
          {C_CABS.map(cab => (
            <div key={cab.id} style={{
              flexShrink: 0, width: 140, padding: 12, borderRadius: 12,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ fontSize: 22 }}>🚙</div>
              <div style={{ fontFamily: 'Outfit', fontSize: 13, fontWeight: 700, marginTop: 6 }}>{cab.name}</div>
              <div style={{ fontSize: 10, color: c.sub, marginTop: 2 }}>{cab.seats} seats · {cab.cls}</div>
              <div style={{ marginTop: 8, fontFamily: 'JetBrains Mono', fontSize: 13, color: c.brand, fontWeight: 700 }}>{fmt(cab.rate)}<span style={{ fontSize: 9, color: c.mute }}>/day</span></div>
            </div>
          ))}
        </div>
      </BottomSheet>

      {/* FAB build route */}
      <button onClick={onOpenBuild} style={{
        position: 'absolute', bottom: 90, right: 16, zIndex: 35,
        width: 56, height: 56, borderRadius: '50%',
        background: 'linear-gradient(135deg, #f59e0b, #e67e22)',
        border: 0, color: '#060913', fontSize: 22, fontWeight: 800,
        cursor: 'pointer', boxShadow: '0 8px 24px rgba(230,167,41,0.5)',
      }}>✧</button>

      <TabBar active="home" />
    </div>
  );
}

// Reusable package row
function PkgRow({ pkg, onTap, dense }) {
  return (
    <div onClick={onTap} style={{
      padding: dense ? 12 : 14, borderRadius: 12,
      background: 'linear-gradient(135deg, rgba(230,167,41,0.06) 0%, rgba(255,255,255,0.02) 100%)',
      border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer',
      display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, alignItems: 'center',
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ background: 'rgba(230,167,41,0.15)', color: c.brand, fontSize: 9, padding: '3px 8px', borderRadius: 4, letterSpacing: '0.1em', fontWeight: 700 }}>{pkg.badge.toUpperCase()}</span>
          <span style={{ fontSize: 10, color: c.mute }}>{pkg.duration.split('·')[0]}</span>
        </div>
        <div style={{ fontFamily: 'Outfit', fontSize: 15, fontWeight: 700 }}>{pkg.title}</div>
        <div style={{ fontSize: 10.5, color: c.sub, marginTop: 4 }}>
          {pkg.stops.length} stops · {pkg.stops.slice(0, 2).map(id => findPin(id)?.name).join(' → ')}…
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 15, fontWeight: 700, color: c.brand }}>{fmt(pkg.price)}</div>
        <div style={{ fontSize: 9, color: c.mute, marginTop: 2 }}>{pkg.perPerson ? '/ pax' : '/ cab'}</div>
      </div>
    </div>
  );
}

// ─── SEARCH OVERLAY ──────────────────────────────────────────────────────
function ScreenSearch({ onClose, onPick }) {
  const tr = useT();
  const [q, setQ] = React.useState('tig');
  return (
    <div style={{ height: '100%', background: c.bg, color: c.fg, position: 'relative', overflow: 'hidden' }}>
      {/* Search header */}
      <div style={{ padding: '14px 14px 12px', display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={onClose} aria-label="close" style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: c.fg, fontSize: 16, cursor: 'pointer' }}>←</button>
        <div style={{ flex: 1, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: c.brand, fontSize: 14 }}>⌕</span>
          <input value={q} onChange={e => setQ(e.target.value)} autoFocus placeholder={tr('search')} style={{
            width: '100%', background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(230,167,41,0.5)',
            borderRadius: 12, padding: '12px 14px 12px 38px', color: c.fg, fontSize: 14, outline: 'none',
            fontFamily: 'Inter', boxShadow: '0 0 0 4px rgba(230,167,41,0.12)',
          }} />
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 14px 12px', overflowX: 'auto' }}>
        {['All', 'Spots', 'Packages', 'Cabs', 'Hotels'].map((f, i) => (
          <div key={f} style={{
            flexShrink: 0, padding: '7px 14px', borderRadius: 999,
            background: i === 0 ? c.brand : 'rgba(255,255,255,0.04)',
            color: i === 0 ? c.bg : c.fg, fontSize: 11, fontWeight: 700, cursor: 'pointer',
            border: '1px solid ' + (i === 0 ? c.brand : 'rgba(255,255,255,0.06)'),
          }}>{f}</div>
        ))}
      </div>

      {/* Results */}
      <div style={{ padding: '0 14px', overflowY: 'auto', height: 'calc(100% - 110px)' }}>
        <Eyebrow style={{ marginBottom: 10 }}>Matches in spots</Eyebrow>
        {C_PINS.filter(p => p.name.toLowerCase().startsWith(q.toLowerCase())).map(p => (
          <div key={p.id} onClick={() => onPick && onPick(p.id)} style={{
            display: 'grid', gridTemplateColumns: '36px 1fr auto', gap: 12, alignItems: 'center',
            padding: '12px 10px', borderRadius: 10, cursor: 'pointer',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', marginBottom: 8,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(230,167,41,0.1)', display: 'grid', placeItems: 'center' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: c.brand, border: '2px solid #060913' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13 }}>
                <span style={{ color: c.brand }}>{p.name.slice(0, q.length)}</span>{p.name.slice(q.length)}
              </div>
              <div style={{ fontSize: 10, color: c.sub, marginTop: 2 }}>{p.sub}</div>
            </div>
            <div style={{ fontSize: 18, color: c.mute }}>↗</div>
          </div>
        ))}

        <Eyebrow style={{ marginBottom: 10, marginTop: 18 }}>Popular this week</Eyebrow>
        {['Sunrise at Tiger Hill', 'Tea estate tour', 'Mirik day trip', 'Toy Train ride'].map(s => (
          <div key={s} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 10px', borderRadius: 10, cursor: 'pointer',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', marginBottom: 8,
            fontSize: 13,
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: c.mute }}>⌕</span>{s}
            </span>
            <span style={{ fontSize: 12, color: c.mute }}>↖</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenDiscover, ScreenSearch, PkgRow });
