// Compass — Trip lifecycle: Confirmed, Driver Arriving (live), On Trip, Completed.

function ScreenConfirmed({ pkg, booking = {}, onTrack, onHome }) {
  const driver = C_DRIVERS[0];
  const tr = useT();
  return (
    <div style={{ height: '100%', position: 'relative', background: c.bg, color: c.fg, overflowY: 'auto' }}>
      <div style={{ position: 'relative', height: 270, overflow: 'hidden' }}>
        <DarjMap routeIds={pkg.stops} routeProgress={1} active={pkg.stops[0]} height={270} showLabels={false} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,9,15,0.5) 0%, transparent 35%, #06090f 100%)' }} />

        <div style={{ position: 'absolute', top: 36, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.18)', border: '2px solid #10b981', margin: '0 auto', display: 'grid', placeItems: 'center', fontSize: 30, color: '#10b981' }}>✓</div>
          <Eyebrow color="#10b981" style={{ marginTop: 14 }}>{tr('confirmed').toUpperCase()}</Eyebrow>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: c.sub, marginTop: 6 }}>HTT-4521 · 14 OCT · 04:30 AM</div>
        </div>
      </div>

      <div style={{ padding: '0 16px', marginTop: -24, position: 'relative' }}>
        <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 28, textAlign: 'center', letterSpacing: '-0.02em' }}>
          You\u2019re going to <span style={{ color: c.brand }}>Tiger Hill.</span>
        </h1>
        <p style={{ textAlign: 'center', marginTop: 8, fontSize: 13, color: c.sub }}>
          Nima will pick you up at <strong style={{ color: c.fg }}>{booking.hotel || C_HOTELS[0]}</strong>.
        </p>

        {/* Driver card */}
        <div style={{ marginTop: 20, padding: 16, background: c.surf, border: '1px solid rgba(230,167,41,0.25)', borderRadius: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr auto', gap: 14, alignItems: 'center' }}>
            <Avatar name={driver.name} hue={driver.hue} size={50} />
            <div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15 }}>{driver.name}</div>
              <div style={{ fontSize: 11, color: c.sub, marginTop: 3 }}>★ {driver.rating} · {driver.yrs} yrs · {driver.cab}</div>
              <div style={{ fontSize: 10, color: c.brand, marginTop: 4, fontFamily: 'JetBrains Mono' }}>{driver.plate}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <button style={{ width: 38, height: 38, borderRadius: '50%', background: '#25D366', border: 0, color: 'white', fontSize: 16, cursor: 'pointer' }}>💬</button>
              <button style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(230,167,41,0.12)', border: '1px solid rgba(230,167,41,0.3)', color: c.brand, fontSize: 14, cursor: 'pointer' }}>📞</button>
            </div>
          </div>
        </div>

        {/* Receipt */}
        <div style={{ marginTop: 14, padding: 16, background: c.surf, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14 }}>
          <KV k="Journey" v={pkg.shortTitle || pkg.title} />
          <KV k="Pickup" v={booking.hotel || C_HOTELS[0]} />
          <KV k={tr('date')} v={(booking.date || '14 OCT') + ' · ' + (booking.time || '04:30') + ' AM'} />
          <KV k={tr('guests')} v={(booking.guests || 2) + ' adults'} />
          <KV k="Stops" v={pkg.stops.length} />
          <KV k="Paid" v={fmt(Math.round(pkg.price * 0.2))} />
          <KV k="Pay in cab" v={fmt(pkg.price - Math.round(pkg.price * 0.2))} accent />
        </div>

        {/* Add to calendar etc */}
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <GhostBtn>📅 Add to calendar</GhostBtn>
          <GhostBtn>📥 Save receipt</GhostBtn>
        </div>

        <div style={{ marginTop: 14 }}>
          <PrimaryBtn onClick={onTrack} icon="↗">Track driver live</PrimaryBtn>
        </div>

        <button onClick={onHome} style={{
          marginTop: 8, width: '100%', padding: '12px 0', background: 'transparent', border: 0,
          color: c.brand, fontFamily: 'Outfit', fontWeight: 700, fontSize: 12, cursor: 'pointer',
        }}>Back to discover</button>
      </div>

      <div style={{ height: 24 }} />
    </div>
  );
}

// ─── DRIVER ARRIVING (live tracking) ────────────────────────────────────
function ScreenArriving({ pkg, onCancel, onShare }) {
  const driver = C_DRIVERS[0];
  const tr = useT();
  return (
    <div style={{ height: '100%', position: 'relative', background: c.bg, color: c.fg, overflow: 'hidden' }}>
      {/* Full-bleed map with live driver dot */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <DarjMap routeIds={['mall', 'mahakal', 'tigerhill']} routeProgress={1} showDriver active="mall" height={MAP_H} showLabels={false} />
      </div>

      {/* ETA strip */}
      <div style={{ position: 'absolute', top: 14, left: 14, right: 14, zIndex: 25 }}>
        <div style={{
          background: 'rgba(11,15,25,0.92)', backdropFilter: 'blur(18px)',
          border: '1px solid rgba(230,167,41,0.35)', borderRadius: 14, padding: '12px 14px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <Eyebrow color={c.brand}>{tr('arriving').toUpperCase()}</Eyebrow>
            <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginTop: 2 }}>
              4 min · <span style={{ color: c.brand }}>1.2 km</span>
            </div>
          </div>
          <button onClick={onShare} style={{
            background: 'rgba(230,167,41,0.15)', border: '1px solid rgba(230,167,41,0.35)',
            color: c.brand, padding: '8px 12px', borderRadius: 10, fontSize: 11, fontWeight: 700, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>📍 Share</button>
        </div>
      </div>

      {/* Live indicator badge */}
      <div style={{ position: 'absolute', top: 76, left: 14, zIndex: 25 }}>
        <Pill color="#10b981" glass>
          <span>LIVE · Updated 2s ago</span>
        </Pill>
      </div>

      {/* Driver bottom card */}
      <div style={{
        position: 'absolute', bottom: 16, left: 14, right: 14, zIndex: 25,
        background: 'rgba(11,15,25,0.96)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(230,167,41,0.25)', borderRadius: 18,
        padding: 16,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr auto', gap: 14, alignItems: 'center' }}>
          <Avatar name={driver.name} hue={driver.hue} size={50} />
          <div>
            <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15 }}>{driver.name}</div>
            <div style={{ fontSize: 11, color: c.sub, marginTop: 2 }}>★ {driver.rating} · {driver.cab}</div>
            <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: c.brand, marginTop: 4 }}>{driver.plate}</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{ width: 40, height: 40, borderRadius: 12, background: '#25D366', border: 0, color: 'white', fontSize: 16, cursor: 'pointer' }}>💬</button>
            <button style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(230,167,41,0.12)', border: '1px solid rgba(230,167,41,0.3)', color: c.brand, fontSize: 14, cursor: 'pointer' }}>📞</button>
          </div>
        </div>

        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          <div>
            <Eyebrow>PICKING UP</Eyebrow>
            <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 12, marginTop: 4 }}>{C_HOTELS[0]}</div>
          </div>
          <div>
            <Eyebrow>FIRST STOP</Eyebrow>
            <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 12, marginTop: 4 }}>{findPin(pkg.stops[0]).name}</div>
          </div>
          <div>
            <Eyebrow>OTP</Eyebrow>
            <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 16, marginTop: 2, color: c.brand, letterSpacing: '0.1em' }}>4729</div>
          </div>
        </div>

        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <GhostBtn>SOS · Help</GhostBtn>
          <button onClick={onCancel} style={{
            background: 'transparent', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444',
            padding: '13px 0', borderRadius: 12, fontFamily: 'Outfit', fontWeight: 700, fontSize: 12, cursor: 'pointer',
          }}>Cancel trip</button>
        </div>
      </div>
    </div>
  );
}

// ─── ON TRIP ─────────────────────────────────────────────────────────────
function ScreenOnTrip({ pkg, currentIdx = 1, onShare }) {
  const tr = useT();
  const cur = findPin(pkg.stops[currentIdx]);
  const next = pkg.stops[currentIdx + 1] && findPin(pkg.stops[currentIdx + 1]);

  return (
    <div style={{ height: '100%', position: 'relative', background: c.bg, color: c.fg, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <DarjMap routeIds={pkg.stops} routeProgress={1} showDriver active={cur.id} height={MAP_H} showLabels={false} />
      </div>

      {/* Top status */}
      <div style={{ position: 'absolute', top: 14, left: 14, right: 14, zIndex: 25 }}>
        <div style={{
          background: 'rgba(11,15,25,0.92)', backdropFilter: 'blur(18px)',
          border: '1px solid rgba(230,167,41,0.35)', borderRadius: 14, padding: '12px 14px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Eyebrow color={c.brand}>STOP {currentIdx + 1} OF {pkg.stops.length}</Eyebrow>
            <Pill color="#10b981" glass={false}><span>{tr('enRoute').toUpperCase()}</span></Pill>
          </div>
          {/* Progress bar */}
          <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${((currentIdx + 0.5) / pkg.stops.length) * 100}%`, background: 'linear-gradient(90deg, #f59e0b, #e67e22)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: c.sub }}>
            <span>{findPin(pkg.stops[0]).name}</span>
            <span>{findPin(pkg.stops[pkg.stops.length - 1]).name}</span>
          </div>
        </div>
      </div>

      {/* Bottom: current + next stop card */}
      <div style={{
        position: 'absolute', bottom: 16, left: 14, right: 14, zIndex: 25,
        background: 'rgba(11,15,25,0.96)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(230,167,41,0.25)', borderRadius: 18, padding: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(230,167,41,0.15)', border: '1px solid rgba(230,167,41,0.35)', display: 'grid', placeItems: 'center', fontSize: 22, flexShrink: 0 }}>📍</div>
          <div style={{ flex: 1 }}>
            <Eyebrow color={c.brand}>NOW AT</Eyebrow>
            <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 20, marginTop: 2, letterSpacing: '-0.02em' }}>{cur.name}</div>
            <div style={{ fontSize: 11, color: c.sub, marginTop: 4 }}>{cur.sub}</div>
          </div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: c.brand, fontWeight: 700 }}>{cur.time}</div>
        </div>

        {next && (
          <div style={{ paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'grid', placeItems: 'center', fontSize: 14, color: c.mute, flexShrink: 0 }}>→</div>
            <div style={{ flex: 1 }}>
              <Eyebrow>{tr('nextStop').toUpperCase()}</Eyebrow>
              <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, marginTop: 2 }}>{next.name}</div>
            </div>
            <div style={{ fontSize: 11, color: c.sub }}>~25 min</div>
          </div>
        )}

        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <button onClick={onShare} style={{
            background: 'rgba(230,167,41,0.12)', border: '1px solid rgba(230,167,41,0.3)',
            color: c.brand, padding: '11px 0', borderRadius: 10,
            fontFamily: 'Outfit', fontWeight: 700, fontSize: 12, cursor: 'pointer',
          }}>📍 Share location</button>
          <button style={{
            background: '#25D366', border: 0, color: 'white', padding: '11px 0', borderRadius: 10,
            fontFamily: 'Outfit', fontWeight: 700, fontSize: 12, cursor: 'pointer',
          }}>💬 Message Nima</button>
        </div>
      </div>
    </div>
  );
}

// ─── COMPLETED ────────────────────────────────────────────────────────────
function ScreenCompleted({ pkg, onRate, onHome }) {
  const driver = C_DRIVERS[0];
  const [rating, setRating] = React.useState(5);
  const [tipIdx, setTipIdx] = React.useState(2);
  const tips = [0, 50, 100, 200, 500];
  return (
    <div style={{ height: '100%', position: 'relative', background: c.bg, color: c.fg, overflowY: 'auto' }}>
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <DarjMap routeIds={pkg.stops} routeProgress={1} active={pkg.stops[pkg.stops.length - 1]} height={200} showLabels={false} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,9,15,0.6) 0%, transparent 40%, #06090f 100%)' }} />
        <div style={{ position: 'absolute', top: 30, left: 0, right: 0, textAlign: 'center' }}>
          <Eyebrow color="#10b981" style={{ fontSize: 11 }}>TRIP COMPLETE · 4 hr 28 min</Eyebrow>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 26, marginTop: 8, letterSpacing: '-0.02em' }}>
            That was a <span style={{ color: c.brand }}>good morning.</span>
          </h1>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {/* Rate driver */}
        <div style={{ background: c.surf, border: '1px solid rgba(230,167,41,0.25)', borderRadius: 14, padding: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 12, alignItems: 'center', marginBottom: 14 }}>
            <Avatar name={driver.name} hue={driver.hue} size={44} />
            <div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14 }}>How was {driver.name.split(' ')[0]}?</div>
              <div style={{ fontSize: 11, color: c.sub, marginTop: 2 }}>Your rating helps other travellers</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => setRating(n)} style={{
                width: 44, height: 44, borderRadius: '50%',
                background: n <= rating ? c.brand : 'rgba(255,255,255,0.04)',
                border: '1px solid ' + (n <= rating ? c.brand : 'rgba(255,255,255,0.06)'),
                color: n <= rating ? c.bg : c.mute, fontSize: 20, cursor: 'pointer',
              }}>★</button>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div style={{ marginTop: 12, background: c.surf, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 16 }}>
          <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14 }}>Tip your driver</div>
          <div style={{ fontSize: 11, color: c.sub, marginTop: 2 }}>100% goes to Nima</div>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
            {tips.map((t, i) => (
              <button key={t} onClick={() => setTipIdx(i)} style={{
                padding: '10px 0', borderRadius: 10,
                background: tipIdx === i ? c.brand : 'rgba(255,255,255,0.04)',
                color: tipIdx === i ? c.bg : c.fg,
                border: '1px solid ' + (tipIdx === i ? c.brand : 'rgba(255,255,255,0.06)'),
                fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700, cursor: 'pointer',
              }}>{t === 0 ? 'No tip' : '+₹' + t}</button>
            ))}
          </div>
        </div>

        {/* Receipt summary */}
        <div style={{ marginTop: 12, background: c.surf, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 16 }}>
          <Eyebrow style={{ marginBottom: 10 }}>RECEIPT · HTT-4521</Eyebrow>
          <KV k="Journey" v={pkg.shortTitle || pkg.title} />
          <KV k="Distance" v="42.7 km" />
          <KV k="Stops visited" v={pkg.stops.length + ' / ' + pkg.stops.length} />
          <KV k="Subtotal" v={fmt(pkg.price)} />
          <KV k="Tip" v={'+' + fmt(tips[tipIdx])} />
          <KV k="Paid" v={fmt(pkg.price + tips[tipIdx])} accent />
        </div>

        {/* CTAs */}
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <GhostBtn>📥 Download receipt</GhostBtn>
          <PrimaryBtn onClick={onRate}>Submit review</PrimaryBtn>
        </div>
        <button onClick={onHome} style={{ marginTop: 8, width: '100%', padding: '12px 0', background: 'transparent', border: 0, color: c.brand, fontFamily: 'Outfit', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          Plan another journey →
        </button>
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
}

Object.assign(window, { ScreenConfirmed, ScreenArriving, ScreenOnTrip, ScreenCompleted });
