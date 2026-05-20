// Compass — Booking flow: Package detail (route-draw anim), Book form, Payment.

function ScreenPkgDetail({ pkg, onBack, onBook }) {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setProgress(1), 250);
    return () => clearTimeout(t);
  }, [pkg.id]);

  const tr = useT();
  return (
    <div style={{ height: '100%', position: 'relative', background: c.bg, color: c.fg, overflowY: 'auto' }}>
      {/* Hero map with route drawing animation */}
      <div style={{ position: 'relative', height: 340, overflow: 'hidden' }}>
        <DarjMap routeIds={pkg.stops} routeProgress={progress} routeAnimated active={pkg.stops[0]} height={340} showLabels={false} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,9,15,0.4) 0%, transparent 30%, #06090f 100%)' }} />

        {/* Top controls */}
        <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(11,15,25,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', color: c.fg, fontSize: 16, cursor: 'pointer' }}>←</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(11,15,25,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', color: c.fg, fontSize: 14, cursor: 'pointer' }}>↗</button>
            <button style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(11,15,25,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', color: c.fg, fontSize: 14, cursor: 'pointer' }}>♡</button>
          </div>
        </div>

        {/* Pin counter overlay */}
        <div style={{ position: 'absolute', bottom: 16, left: 14 }}>
          <Pill icon="📍" color={c.brand}>{pkg.stops.length} STOPS · {pkg.duration.split('·')[0].trim().toUpperCase()}</Pill>
        </div>
      </div>

      {/* Title block */}
      <div style={{ padding: '0 16px', marginTop: -16, position: 'relative' }}>
        <div style={{ background: c.surf, border: '1px solid rgba(230,167,41,0.25)', borderRadius: 16, padding: 18 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ background: 'rgba(230,167,41,0.15)', color: c.brand, fontSize: 10, padding: '4px 10px', borderRadius: 999, letterSpacing: '0.15em', fontWeight: 700 }}>{pkg.badge.toUpperCase()}</span>
            <span style={{ fontSize: 11, color: c.mute }}>★ 4.94 · 274 reviews</span>
          </div>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 26, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{pkg.title}</h1>
          <p style={{ marginTop: 10, fontSize: 13, color: c.sub, lineHeight: 1.6 }}>{pkg.pitch}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <Eyebrow>Stops</Eyebrow>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, marginTop: 4 }}>{pkg.stops.length}</div>
            </div>
            <div>
              <Eyebrow>Cab</Eyebrow>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, marginTop: 4 }}>Innova</div>
            </div>
            <div>
              <Eyebrow>From</Eyebrow>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, marginTop: 4, color: c.brand }}>{fmt(pkg.price)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Route timeline */}
      <section style={{ padding: '24px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18 }}>Hour by hour</h2>
          <Eyebrow color={c.brand}>{pkg.stops.length} STOPS</Eyebrow>
        </div>
        <div style={{ position: 'relative', paddingLeft: 24 }}>
          <div style={{ position: 'absolute', left: 9, top: 16, bottom: 16, width: 2, background: 'linear-gradient(180deg, #E6A729 0%, rgba(230,167,41,0.2) 100%)' }} />
          {pkg.stops.map((id, i) => {
            const p = findPin(id);
            return (
              <div key={id} style={{ position: 'relative', paddingBottom: 16 }}>
                <div style={{ position: 'absolute', left: -24, top: 4, width: 20, height: 20, borderRadius: '50%', background: c.brand, border: '2px solid #060913', display: 'grid', placeItems: 'center', fontFamily: 'Outfit', fontWeight: 800, fontSize: 10, color: c.bg }}>{i + 1}</div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: c.brand, fontWeight: 700, flexShrink: 0 }}>{p.time}</div>
                  </div>
                  <div style={{ fontSize: 11, color: c.sub, marginTop: 6, lineHeight: 1.55 }}>{p.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Includes */}
      <section style={{ padding: '20px 16px 0' }}>
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>What\u2019s in the price</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12, padding: 14 }}>
            <Eyebrow color="#10b981" style={{ marginBottom: 8 }}>Included</Eyebrow>
            {pkg.includes.map(i => <div key={i} style={{ fontSize: 11, color: '#cdd6e0', padding: '3px 0' }}>✓ {i}</div>)}
          </div>
          <div style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 12, padding: 14 }}>
            <Eyebrow color="#ef4444" style={{ marginBottom: 8 }}>Extra</Eyebrow>
            {pkg.excludes.map(i => <div key={i} style={{ fontSize: 11, color: c.sub, padding: '3px 0' }}>− {i}</div>)}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: '20px 16px 0' }}>
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>Travellers say</h2>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16 }}>
          {[
            { n: 'Priyanka S.', f: 'Bengaluru', t: 'Nima arrived at 4:15 sharp. The sunrise made us cry.' },
            { n: 'Arjun M.',    f: 'Delhi',     t: 'Innova spotless, driver knew every viewpoint by heart.' },
            { n: 'The Mehtas',  f: 'Mumbai',    t: 'Handled everything. Two kids and grandparents — flawless.' },
          ].map(r => (
            <div key={r.n} style={{ flexShrink: 0, width: 240, padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ color: c.brand, fontSize: 11 }}>★★★★★</div>
              <p style={{ marginTop: 8, fontSize: 12, color: c.fg, lineHeight: 1.55 }}>\u201C{r.t}\u201D</p>
              <div style={{ marginTop: 10, fontSize: 10, color: c.sub }}>{r.n} · {r.f}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky CTA */}
      <div style={{ position: 'sticky', bottom: 0, padding: 16, background: 'linear-gradient(0deg, #06090f 75%, transparent)', marginTop: 24 }}>
        <div style={{ background: c.surf, border: '1px solid rgba(230,167,41,0.3)', borderRadius: 14, padding: 14, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, color: c.mute, letterSpacing: '0.18em', fontWeight: 600 }}>FROM</div>
            <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: c.brand }}>{fmt(pkg.price)}</div>
          </div>
          <PrimaryBtn onClick={() => onBook && onBook(pkg)} icon="→">{tr('reserve')}</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

// ─── BOOK FORM ───────────────────────────────────────────────────────────
function ScreenBook({ pkg, onBack, onPay }) {
  const [data, setData] = React.useState({ date: '14 OCT', dow: 'TUE', time: '04:30', guests: 2, cab: 'innova', hotel: C_HOTELS[0] });
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));
  const tr = useT();

  return (
    <div style={{ height: '100%', position: 'relative', background: c.bg, color: c.fg, overflowY: 'auto' }}>
      <AppHeader onBack={onBack} center={
        <div>
          <Eyebrow color={c.brand}>STEP 1 / 2 · DETAILS</Eyebrow>
          <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, marginTop: 2 }}>{pkg.shortTitle || pkg.title}</div>
        </div>
      } right={
        <div style={{ display: 'flex', gap: 4 }}>
          {[1,2].map(n => <div key={n} style={{ width: 18, height: 3, borderRadius: 4, background: n === 1 ? c.brand : 'rgba(255,255,255,0.1)' }} />)}
        </div>
      } />

      <section style={{ padding: '18px 16px 0' }}>
        <Eyebrow style={{ marginBottom: 10 }}>{tr('date').toUpperCase()}</Eyebrow>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16 }}>
          {[
            ['14 OCT', 'TUE'], ['15 OCT', 'WED'], ['16 OCT', 'THU'], ['17 OCT', 'FRI'], ['18 OCT', 'SAT'], ['19 OCT', 'SUN'], ['20 OCT', 'MON'],
          ].map(([d, dow]) => (
            <div key={d} onClick={() => setData({ ...data, date: d, dow })} style={{
              flexShrink: 0, padding: '12px 14px', borderRadius: 12, textAlign: 'center', minWidth: 70,
              background: data.date === d ? c.brand : 'rgba(255,255,255,0.04)',
              color: data.date === d ? c.bg : c.fg,
              border: '1.5px solid ' + (data.date === d ? c.brand : 'rgba(255,255,255,0.06)'),
              cursor: 'pointer',
            }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, opacity: 0.65, fontWeight: 700 }}>{dow}</div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 14, marginTop: 4 }}>{d}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '20px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <Eyebrow style={{ marginBottom: 10 }}>PICKUP</Eyebrow>
          <div style={{ display: 'grid', gap: 8 }}>
            {['04:30 am', '05:00 am', '06:00 am'].map(t => (
              <div key={t} onClick={() => update('time', t.split(' ')[0])} style={{
                padding: '11px 12px', borderRadius: 10,
                background: data.time === t.split(' ')[0] ? 'rgba(230,167,41,0.15)' : 'rgba(255,255,255,0.04)',
                color: data.time === t.split(' ')[0] ? c.brand : c.fg,
                border: '1.5px solid ' + (data.time === t.split(' ')[0] ? c.brand : 'rgba(255,255,255,0.06)'),
                fontFamily: 'JetBrains Mono', fontSize: 13, cursor: 'pointer', textAlign: 'center', fontWeight: 600,
              }}>{t}</div>
            ))}
          </div>
        </div>
        <div>
          <Eyebrow style={{ marginBottom: 10 }}>{tr('guests').toUpperCase()}</Eyebrow>
          <div style={{ padding: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, textAlign: 'center' }}>
            <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 36 }}>{data.guests}</div>
            <div style={{ fontSize: 10, color: c.mute, letterSpacing: '0.15em', marginTop: 2, fontWeight: 600 }}>ADULTS</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center' }}>
              <button onClick={() => update('guests', Math.max(1, data.guests - 1))} style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: c.fg, cursor: 'pointer', fontSize: 16 }}>−</button>
              <button onClick={() => update('guests', data.guests + 1)} style={{ width: 30, height: 30, borderRadius: '50%', background: c.brand, border: 0, color: c.bg, cursor: 'pointer', fontSize: 16, fontWeight: 800 }}>+</button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 16px 0' }}>
        <Eyebrow style={{ marginBottom: 10 }}>HOTEL PICKUP</Eyebrow>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 4 }}>
          {C_HOTELS.slice(0, 5).map(h => (
            <div key={h} onClick={() => update('hotel', h)} style={{
              padding: '12px 14px', borderRadius: 9, cursor: 'pointer',
              background: data.hotel === h ? 'rgba(230,167,41,0.12)' : 'transparent',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13,
            }}>
              <span style={{ color: data.hotel === h ? c.brand : c.fg, fontWeight: data.hotel === h ? 700 : 500 }}>{h}</span>
              {data.hotel === h && <span style={{ color: c.brand, fontSize: 14 }}>✓</span>}
            </div>
          ))}
          <div style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: c.brand, cursor: 'pointer', fontWeight: 700 }}>
            + Pickup from somewhere else
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 16px 0' }}>
        <Eyebrow style={{ marginBottom: 10 }}>{tr('cab').toUpperCase()}</Eyebrow>
        <div style={{ display: 'grid', gap: 8 }}>
          {C_CABS.map(cab => (
            <div key={cab.id} onClick={() => update('cab', cab.id)} style={{
              display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 14, alignItems: 'center',
              padding: 14, borderRadius: 12, cursor: 'pointer',
              background: data.cab === cab.id ? 'rgba(230,167,41,0.1)' : 'rgba(255,255,255,0.04)',
              border: '1.5px solid ' + (data.cab === cab.id ? c.brand : 'rgba(255,255,255,0.06)'),
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(230,167,41,0.1)', display: 'grid', placeItems: 'center', fontSize: 18 }}>🚙</div>
              <div>
                <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13 }}>{cab.name}</div>
                <div style={{ fontSize: 10, color: c.sub, marginTop: 2 }}>{cab.seats} seats · {cab.bags} bags · {cab.cls}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: data.cab === cab.id ? c.brand : c.fg, fontWeight: 700 }}>
                  {cab.id === 'innova' ? 'Included' : '+' + fmt(cab.rate - C_CABS[3].rate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '20px 16px 0' }}>
        <Eyebrow style={{ marginBottom: 10 }}>CONTACT</Eyebrow>
        <Field placeholder="Full name" defaultValue="Priyanka Sharma" />
        <Field placeholder="WhatsApp number" defaultValue="+91 98320 14782" />
        <Field placeholder="Any special requests?" />
      </section>

      <div style={{ padding: 16, position: 'sticky', bottom: 0, background: 'linear-gradient(0deg, #06090f 75%, transparent)', marginTop: 16 }}>
        <div style={{ background: c.surf, border: '1px solid rgba(230,167,41,0.3)', borderRadius: 14, padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: c.sub }}>{tr('total')} · {data.guests} guest{data.guests > 1 ? 's' : ''}</div>
            <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: c.brand }}>{fmt(pkg.price)}</div>
          </div>
          <PrimaryBtn onClick={() => onPay && onPay({ ...data, pkg, total: pkg.price })} icon="→">
            Continue to {tr('pay').toLowerCase()}
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

// ─── PAYMENT ─────────────────────────────────────────────────────────────
function ScreenPay({ pkg, total = 2800, onBack, onConfirm }) {
  const [method, setMethod] = React.useState('upi');
  const [option, setOption] = React.useState('partial'); // partial = 20% / full
  const [upiId, setUpiId] = React.useState('priyanka@okhdfcbank');
  const amount = option === 'partial' ? Math.round(total * 0.2) : total;
  const tr = useT();

  return (
    <div style={{ height: '100%', position: 'relative', background: c.bg, color: c.fg, overflowY: 'auto' }}>
      <AppHeader onBack={onBack} center={
        <div>
          <Eyebrow color={c.brand}>STEP 2 / 2 · PAYMENT</Eyebrow>
          <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, marginTop: 2 }}>How will you pay?</div>
        </div>
      } right={
        <div style={{ display: 'flex', gap: 4 }}>
          {[1,2].map(n => <div key={n} style={{ width: 18, height: 3, borderRadius: 4, background: c.brand }} />)}
        </div>
      } />

      {/* Pay split */}
      <section style={{ padding: '18px 16px 0' }}>
        <Eyebrow style={{ marginBottom: 10 }}>HOW MUCH NOW</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { id: 'partial', t: '20% deposit', a: Math.round(total * 0.2), sub: 'Pay rest in cab' },
            { id: 'full', t: 'Pay in full', a: total, sub: 'Get 3% off' },
          ].map(o => (
            <div key={o.id} onClick={() => setOption(o.id)} style={{
              padding: 16, borderRadius: 14, cursor: 'pointer',
              background: option === o.id ? 'rgba(230,167,41,0.1)' : 'rgba(255,255,255,0.03)',
              border: '1.5px solid ' + (option === o.id ? c.brand : 'rgba(255,255,255,0.06)'),
            }}>
              <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13 }}>{o.t}</div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: option === o.id ? c.brand : c.fg, marginTop: 6 }}>{fmt(o.a)}</div>
              <div style={{ fontSize: 10, color: c.sub, marginTop: 4 }}>{o.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Method */}
      <section style={{ padding: '20px 16px 0' }}>
        <Eyebrow style={{ marginBottom: 10 }}>PAYMENT METHOD</Eyebrow>
        <div style={{ display: 'grid', gap: 8 }}>
          {[
            { id: 'upi', t: 'UPI', d: 'GPay, PhonePe, Paytm, BHIM', i: '🇮🇳' },
            { id: 'card', t: 'Credit / Debit card', d: 'Visa, Mastercard, Rupay', i: '💳' },
            { id: 'cash', t: 'Cash in cab', d: 'Pay driver on pickup', i: '💵' },
            { id: 'netb', t: 'Net banking', d: 'HDFC, ICICI, SBI, Axis', i: '🏦' },
          ].map(m => (
            <div key={m.id} onClick={() => setMethod(m.id)} style={{
              padding: 14, borderRadius: 12, cursor: 'pointer',
              display: 'grid', gridTemplateColumns: '36px 1fr 20px', gap: 12, alignItems: 'center',
              background: method === m.id ? 'rgba(230,167,41,0.08)' : 'rgba(255,255,255,0.03)',
              border: '1.5px solid ' + (method === m.id ? c.brand : 'rgba(255,255,255,0.06)'),
            }}>
              <div style={{ fontSize: 22 }}>{m.i}</div>
              <div>
                <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13 }}>{m.t}</div>
                <div style={{ fontSize: 10, color: c.sub, marginTop: 2 }}>{m.d}</div>
              </div>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                border: '2px solid ' + (method === m.id ? c.brand : 'rgba(255,255,255,0.2)'),
                background: method === m.id ? c.brand : 'transparent',
                display: 'grid', placeItems: 'center',
              }}>
                {method === m.id && <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.bg }} />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UPI ID input */}
      {method === 'upi' && (
        <section style={{ padding: '16px 16px 0' }}>
          <div style={{ background: 'rgba(230,167,41,0.06)', border: '1px solid rgba(230,167,41,0.25)', borderRadius: 12, padding: 14 }}>
            <Eyebrow color={c.brand} style={{ marginBottom: 8 }}>YOUR UPI ID</Eyebrow>
            <input value={upiId} onChange={e => setUpiId(e.target.value)} style={{
              width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10, padding: '12px 14px', color: c.fg, fontSize: 14, outline: 'none',
              fontFamily: 'JetBrains Mono, monospace',
            }} />
            <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
              {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(p => (
                <div key={p} style={{ padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', fontSize: 10, color: c.fg, fontWeight: 600 }}>{p}</div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Receipt */}
      <section style={{ padding: '20px 16px 0' }}>
        <Eyebrow style={{ marginBottom: 10 }}>ORDER</Eyebrow>
        <div style={{ background: c.surf, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 14 }}>
          <KV k="Journey" v={pkg.shortTitle || pkg.title} />
          <KV k="Cab" v="Innova Crysta" />
          <KV k="Driver" v={C_DRIVERS[0].name} />
          <KV k="Subtotal" v={fmt(total)} />
          {option === 'full' && <KV k="3% discount" v={'− ' + fmt(Math.round(total * 0.03))} />}
          <KV k="Pay now" v={fmt(amount)} accent />
        </div>
      </section>

      <div style={{ padding: 16, position: 'sticky', bottom: 0, background: 'linear-gradient(0deg, #06090f 75%, transparent)', marginTop: 16 }}>
        <PrimaryBtn size="lg" onClick={onConfirm} icon="🔒">
          {tr('pay')} {fmt(amount)} securely
        </PrimaryBtn>
        <div style={{ marginTop: 10, fontSize: 10, color: c.mute, textAlign: 'center' }}>
          Refund up to 24h before pickup. Razorpay secure.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenPkgDetail, ScreenBook, ScreenPay });
