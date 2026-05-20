// Compass — Route builder (killer feature) + Route quote.

function ScreenRouteBuilder({ initialStops = ['mall', 'happy', 'hmi'], onQuote, onBack }) {
  const [stops, setStops] = React.useState(initialStops);
  const [sheet, setSheet] = React.useState('mid');

  const toggle = (id) => {
    setStops(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const remove = (id) => setStops(prev => prev.filter(x => x !== id));
  const moveUp = (i) => {
    if (i === 0) return;
    const next = [...stops]; [next[i-1], next[i]] = [next[i], next[i-1]]; setStops(next);
  };

  // Estimate
  const distance = stops.length * 4.5 + 6; // fake km
  const duration = stops.length * 45 + 30; // minutes
  const price = 2200 + stops.length * 650;

  return (
    <div style={{ height: '100%', position: 'relative', background: c.bg, color: c.fg, overflow: 'hidden' }}>
      <AppHeader
        onBack={onBack}
        center={
          <div>
            <Eyebrow color={c.brand}>BUILD YOUR ROUTE</Eyebrow>
            <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, marginTop: 2 }}>Tap pins to add</div>
          </div>
        }
      />

      {/* The map */}
      <div style={{ position: 'absolute', top: 60, left: 0, right: 0 }}>
        <DarjMap
          active={stops[stops.length - 1]}
          routeIds={stops}
          routeProgress={1}
          onTap={(p) => toggle(p.id)}
          height={MAP_H - 20}
          showLabels={false}
        />
      </div>

      {/* Stat strip on top of map */}
      <div style={{
        position: 'absolute', top: 70, left: 14, right: 14, zIndex: 25,
        background: 'rgba(11,15,25,0.9)', backdropFilter: 'blur(14px)',
        border: '1px solid rgba(230,167,41,0.3)', borderRadius: 14,
        padding: '12px 14px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
      }}>
        <Stat n={stops.length} l="STOPS" />
        <Stat n={distance.toFixed(1) + 'km'} l="DISTANCE" />
        <Stat n={fmt(price)} l="EST." accent />
      </div>

      {/* Build sheet */}
      <BottomSheet state={sheet} onStateChange={setSheet} snaps={{ low: '28%', mid: '55%', high: '85%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18 }}>Your itinerary</h3>
          <div style={{ fontSize: 10, color: c.mute, letterSpacing: '0.15em', fontWeight: 600 }}>DRAG TO REORDER</div>
        </div>

        {/* Selected stops timeline */}
        <div style={{ position: 'relative', paddingLeft: 22 }}>
          <div style={{ position: 'absolute', left: 8, top: 12, bottom: 12, width: 2, background: 'linear-gradient(180deg, #E6A729 0%, rgba(230,167,41,0.2) 100%)' }} />
          {stops.map((id, i) => {
            const p = findPin(id);
            return (
              <div key={id} style={{ position: 'relative', paddingBottom: 14, paddingRight: 4 }}>
                <div style={{ position: 'absolute', left: -22, top: 4, width: 18, height: 18, borderRadius: '50%', background: c.brand, border: '2px solid #060913', display: 'grid', placeItems: 'center', fontFamily: 'Outfit', fontWeight: 800, fontSize: 10, color: c.bg }}>{i + 1}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 8, alignItems: 'center', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
                  <div>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13 }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: c.sub, marginTop: 2 }}>{p.sub}</div>
                  </div>
                  <button onClick={() => moveUp(i)} style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: c.fg, cursor: 'pointer', fontSize: 12 }} aria-label="move up">↑</button>
                  <button onClick={() => remove(id)} style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', cursor: 'pointer', fontSize: 13 }} aria-label="remove">×</button>
                </div>
              </div>
            );
          })}
          {stops.length === 0 && (
            <div style={{ padding: 20, textAlign: 'center', color: c.mute, fontSize: 12 }}>Tap pins on the map to start your route.</div>
          )}
        </div>

        {/* Suggest more */}
        <div style={{ marginTop: 16 }}>
          <Eyebrow style={{ marginBottom: 8 }}>SUGGESTED ADDITIONS</Eyebrow>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16 }}>
            {C_PINS.filter(p => !stops.includes(p.id)).slice(0, 5).map(p => (
              <div key={p.id} onClick={() => toggle(p.id)} style={{
                flexShrink: 0, width: 140, padding: 12, borderRadius: 12,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer',
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(230,167,41,0.1)', border: '1px solid rgba(230,167,41,0.3)', display: 'grid', placeItems: 'center', marginBottom: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.brand }} />
                </div>
                <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 12 }}>{p.name}</div>
                <div style={{ fontSize: 10, color: c.sub, marginTop: 2 }}>{p.sub.split('·')[0].trim()}</div>
                <div style={{ marginTop: 8, fontSize: 10, color: c.brand, fontWeight: 700 }}>+ Add</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <PrimaryBtn size="lg" onClick={() => onQuote && onQuote(stops)} icon="→" disabled={stops.length < 2}>
            Get quote · {fmt(price)}
          </PrimaryBtn>
        </div>
      </BottomSheet>
    </div>
  );
}

function Stat({ n, l, accent }) {
  return (
    <div>
      <div style={{ fontSize: 9, color: c.mute, letterSpacing: '0.2em', fontWeight: 600 }}>{l}</div>
      <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 15, color: accent ? c.brand : c.fg, marginTop: 3 }}>{n}</div>
    </div>
  );
}

// ─── ROUTE QUOTE ─────────────────────────────────────────────────────────
function ScreenRouteQuote({ stops = ['tigerhill', 'batasia', 'ghoom', 'mall'], onBack, onBook }) {
  const [cabId, setCabId] = React.useState('innova');
  const [tier, setTier] = React.useState('standard');
  const distance = stops.length * 4.5 + 6;
  const baseHours = stops.length * 0.75 + 1;
  const cab = C_CABS.find(x => x.id === cabId);
  const tierMul = { eco: 0.85, standard: 1.0, premium: 1.2 }[tier];
  const price = Math.round((cab.hour * baseHours + 800) * tierMul);

  return (
    <div style={{ height: '100%', position: 'relative', background: c.bg, color: c.fg, overflowY: 'auto' }}>
      <AppHeader onBack={onBack} center={
        <div>
          <Eyebrow color={c.brand}>STEP 2 / 2 · QUOTE</Eyebrow>
          <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, marginTop: 2 }}>Your custom route</div>
        </div>
      } />

      {/* Route map */}
      <div style={{ height: 320, overflow: 'hidden', position: 'relative' }}>
        <DarjMap routeIds={stops} routeProgress={1} active={stops[0]} height={320} showLabels={false} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 70%, #06090f 100%)' }} />
      </div>

      <div style={{ padding: '0 16px', marginTop: -32 }}>
        {/* Summary */}
        <div style={{ background: c.surf, border: '1px solid rgba(230,167,41,0.25)', borderRadius: 14, padding: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            <Stat n={stops.length} l="STOPS" />
            <Stat n={distance.toFixed(1) + 'km'} l="DISTANCE" />
            <Stat n={baseHours.toFixed(1) + 'h'} l="DURATION" />
            <Stat n={fmt(price)} l="TOTAL" accent />
          </div>
        </div>
      </div>

      {/* Tier picker */}
      <section style={{ padding: '24px 16px 0' }}>
        <Eyebrow style={{ marginBottom: 12 }}>RIDE TIER</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { id: 'eco', n: 'Eco', d: 'Older cabs', m: 0.85 },
            { id: 'standard', n: 'Standard', d: 'Most popular', m: 1.0 },
            { id: 'premium', n: 'Premium', d: '< 2 yr cab', m: 1.2 },
          ].map(t => (
            <div key={t.id} onClick={() => setTier(t.id)} style={{
              padding: 12, borderRadius: 12, cursor: 'pointer', textAlign: 'center',
              background: tier === t.id ? 'rgba(230,167,41,0.12)' : 'rgba(255,255,255,0.03)',
              border: '1.5px solid ' + (tier === t.id ? c.brand : 'rgba(255,255,255,0.06)'),
            }}>
              <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: tier === t.id ? c.brand : c.fg }}>{t.n}</div>
              <div style={{ fontSize: 10, color: c.sub, marginTop: 3 }}>{t.d}</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: c.mute, marginTop: 6 }}>×{t.m.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cab picker */}
      <section style={{ padding: '20px 16px 0' }}>
        <Eyebrow style={{ marginBottom: 12 }}>CAB</Eyebrow>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16, paddingBottom: 4 }}>
          {C_CABS.map(cb => (
            <div key={cb.id} onClick={() => setCabId(cb.id)} style={{
              flexShrink: 0, width: 130, padding: 14, borderRadius: 14, cursor: 'pointer',
              background: cabId === cb.id ? 'rgba(230,167,41,0.1)' : 'rgba(255,255,255,0.03)',
              border: '1.5px solid ' + (cabId === cb.id ? c.brand : 'rgba(255,255,255,0.06)'),
            }}>
              <div style={{ fontSize: 22 }}>🚙</div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, marginTop: 6 }}>{cb.name}</div>
              <div style={{ fontSize: 10, color: c.sub, marginTop: 2 }}>{cb.seats} · {cb.cls}</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: cabId === cb.id ? c.brand : c.fg, marginTop: 8, fontWeight: 700 }}>{fmt(cb.hour)}<span style={{ fontSize: 9, color: c.mute }}>/hr</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* Itinerary preview */}
      <section style={{ padding: '20px 16px 0' }}>
        <Eyebrow style={{ marginBottom: 12 }}>ITINERARY</Eyebrow>
        <div style={{ position: 'relative', paddingLeft: 22, background: c.surf, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 14px 14px 36px' }}>
          <div style={{ position: 'absolute', left: 22, top: 18, bottom: 18, width: 2, background: 'linear-gradient(180deg, #E6A729 0%, rgba(230,167,41,0.2) 100%)' }} />
          {stops.map((id, i) => {
            const p = findPin(id);
            return (
              <div key={id} style={{ position: 'relative', paddingBottom: i === stops.length - 1 ? 0 : 12 }}>
                <div style={{ position: 'absolute', left: -22, top: 2, width: 16, height: 16, borderRadius: '50%', background: c.brand, border: '2px solid #060913', display: 'grid', placeItems: 'center', fontFamily: 'Outfit', fontWeight: 800, fontSize: 9, color: c.bg }}>{i + 1}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13 }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: c.sub, marginTop: 2 }}>{p.sub.split('·')[0].trim()}</div>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: c.mute }}>{p.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Driver assignment preview */}
      <section style={{ padding: '20px 16px 0' }}>
        <Eyebrow style={{ marginBottom: 12 }}>LIKELY DRIVER</Eyebrow>
        <div style={{ background: c.surf, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 14, display: 'grid', gridTemplateColumns: '44px 1fr auto', gap: 12, alignItems: 'center' }}>
          <Avatar name={C_DRIVERS[0].name} hue={C_DRIVERS[0].hue} />
          <div>
            <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13 }}>{C_DRIVERS[0].name}</div>
            <div style={{ fontSize: 10, color: c.sub, marginTop: 2 }}>★ {C_DRIVERS[0].rating} · {C_DRIVERS[0].yrs} yrs · {C_DRIVERS[0].langs.map(l => C_LANGS[l]).join(' / ')}</div>
          </div>
          <div style={{ fontSize: 10, color: c.brand, letterSpacing: '0.15em', fontWeight: 700 }}>SUGGESTED</div>
        </div>
      </section>

      <div style={{ padding: 16, position: 'sticky', bottom: 0, background: 'linear-gradient(0deg, #06090f 70%, transparent)', marginTop: 24 }}>
        <div style={{ background: c.surf, border: '1px solid rgba(230,167,41,0.3)', borderRadius: 14, padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: c.sub }}>Custom route · {stops.length} stops</div>
            <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: c.brand }}>{fmt(price)}</div>
          </div>
          <PrimaryBtn onClick={() => onBook && onBook({ stops, cabId, tier, price })} icon="→">Book this route</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenRouteBuilder, ScreenRouteQuote });
