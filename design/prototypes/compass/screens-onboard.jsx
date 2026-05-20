// Compass — Onboarding screens.
// 1) Welcome  2) "Build your own route" pitch  3) Phone + OTP

function ScreenWelcome({ onNext, onSkip }) {
  const tr = useT();
  return (
    <div style={{ height: '100%', position: 'relative', background: c.bg, color: c.fg, overflow: 'hidden' }}>
      {/* Hero map */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '55%', overflow: 'hidden' }}>
        <DarjMap active="tigerhill" routeIds={['tigerhill','batasia','ghoom','mall']} routeProgress={1} height={500} showLabels={false} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,9,15,0.2) 0%, transparent 40%, rgba(6,9,15,0.95) 95%)' }} />
      </div>

      {/* Skip */}
      <button onClick={onSkip} style={{
        position: 'absolute', top: 18, right: 18, background: 'rgba(11,15,25,0.7)',
        backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)',
        color: c.fg, padding: '7px 14px', borderRadius: 999, fontSize: 11, fontWeight: 600, cursor: 'pointer', zIndex: 5,
      }}>{tr('skip')} →</button>

      {/* Brand mark */}
      <div style={{ position: 'absolute', top: 18, left: 18, zIndex: 5 }}>
        <Pill icon={<span style={{ color: c.brand }}>✦</span>} color={null}>
          HILLS · T&T
        </Pill>
      </div>

      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 22px 28px', zIndex: 5 }}>
        <Eyebrow color={c.brand}>Since 2008 · Darjeeling</Eyebrow>
        <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 38, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: 10 }}>
          {tr('tagline')}
        </h1>
        <p style={{ marginTop: 12, fontSize: 13, color: c.sub, lineHeight: 1.55, maxWidth: 320 }}>
          Tap pins on the map to build your trip. Or pick a curated journey planned by drivers who were born on these roads.
        </p>

        {/* Feature pills */}
        <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
          {['🗺 Map-first', '🚗 Local drivers', '★ 4.94 · 12K trips', '₹2,800 sunrise'].map(x => (
            <div key={x} style={{
              padding: '7px 12px', borderRadius: 999,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              fontSize: 11, color: c.fg, fontWeight: 600,
            }}>{x}</div>
          ))}
        </div>

        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryBtn size="lg" onClick={onNext} icon="→">{tr('getStarted')}</PrimaryBtn>
          <button onClick={onNext} style={{ background: 'transparent', border: 0, color: c.brand, padding: '8px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
            I already have an account
          </button>
        </div>

        {/* Page dots */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 14 }}>
          <div style={{ width: 22, height: 4, borderRadius: 2, background: c.brand }} />
          <div style={{ width: 6, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.18)' }} />
          <div style={{ width: 6, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.18)' }} />
        </div>
      </div>
    </div>
  );
}

function ScreenPitch({ onNext, onBack, onSkip }) {
  const tr = useT();
  // Animate route drawing
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const t1 = setTimeout(() => setProgress(1), 300);
    return () => clearTimeout(t1);
  }, []);

  return (
    <div style={{ height: '100%', position: 'relative', background: c.bg, color: c.fg, overflow: 'hidden' }}>
      {/* Map demo */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '55%', overflow: 'hidden' }}>
        <DarjMap routeIds={['mall', 'happy', 'hmi', 'peace']} routeProgress={progress} routeAnimated active="happy" height={500} showLabels={false} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,9,15,0.3) 0%, transparent 35%, rgba(6,9,15,0.95) 95%)' }} />
      </div>

      <button onClick={onSkip} style={{
        position: 'absolute', top: 18, right: 18, background: 'rgba(11,15,25,0.7)',
        backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)',
        color: c.fg, padding: '7px 14px', borderRadius: 999, fontSize: 11, fontWeight: 600, cursor: 'pointer', zIndex: 5,
      }}>{tr('skip')} →</button>

      <button onClick={onBack} style={{
        position: 'absolute', top: 18, left: 18,
        width: 36, height: 36, borderRadius: 12,
        background: 'rgba(11,15,25,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)',
        color: c.fg, fontSize: 16, cursor: 'pointer', zIndex: 5,
      }}>←</button>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 22px 28px', zIndex: 5 }}>
        <Eyebrow color={c.brand}>Step 2 · The Killer Feature</Eyebrow>
        <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 32, letterSpacing: '-0.03em', lineHeight: 1.1, marginTop: 10 }}>
          {tr('buildRoute')}
        </h1>
        <p style={{ marginTop: 10, fontSize: 13, color: c.sub, lineHeight: 1.55 }}>
          {tr('pickStops')}
        </p>

        {/* Bullet list */}
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { i: '⚡', t: 'Real-time pricing', d: 'As you add stops, the cab + permit cost updates live.' },
            { i: '🛖', t: 'Drivers born here', d: 'Nima, Tashi, Pemba — 17 years on these slopes.' },
            { i: '↩', t: 'Free cancel 24h', d: 'No deposit lock-ins. Refund hits your UPI in minutes.' },
          ].map(b => (
            <div key={b.t} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(230,167,41,0.12)', border: '1px solid rgba(230,167,41,0.3)', display: 'grid', placeItems: 'center', fontSize: 14 }}>{b.i}</div>
              <div>
                <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13 }}>{b.t}</div>
                <div style={{ fontSize: 11, color: c.sub, marginTop: 2 }}>{b.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <PrimaryBtn size="lg" onClick={onNext} icon="→">{tr('next')}</PrimaryBtn>
        </div>

        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 14 }}>
          <div style={{ width: 6, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.18)' }} />
          <div style={{ width: 22, height: 4, borderRadius: 2, background: c.brand }} />
          <div style={{ width: 6, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.18)' }} />
        </div>
      </div>
    </div>
  );
}

function ScreenOTP({ onNext, onBack, mode = 'phone' /* 'phone' | 'otp' */ }) {
  const tr = useT();
  const [phone, setPhone] = React.useState('98320 14782');
  const [otp, setOtp] = React.useState(['9','3','4','2','',' ']);

  return (
    <div style={{ height: '100%', position: 'relative', background: c.bg, color: c.fg, overflow: 'hidden' }}>
      {/* Subtle map vignette top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 220, overflow: 'hidden', opacity: 0.35 }}>
        <DarjMap height={300} showLabels={false} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, #06090f 95%)' }} />
      </div>

      <button onClick={onBack} style={{
        position: 'absolute', top: 18, left: 18,
        width: 36, height: 36, borderRadius: 12,
        background: 'rgba(11,15,25,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)',
        color: c.fg, fontSize: 16, cursor: 'pointer', zIndex: 5,
      }}>←</button>

      <div style={{ position: 'absolute', top: 90, left: 22, right: 22 }}>
        <Eyebrow color={c.brand}>Step 3 · Welcome</Eyebrow>
        <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 30, letterSpacing: '-0.03em', lineHeight: 1.1, marginTop: 10 }}>
          {mode === 'phone' ? 'Your number, please.' : 'Check your WhatsApp.'}
        </h1>
        <p style={{ marginTop: 10, fontSize: 13, color: c.sub, lineHeight: 1.55 }}>
          {mode === 'phone'
            ? 'We send the booking confirmation and your driver\u2019s details to WhatsApp.'
            : 'We sent a 6-digit code to +91 98320 14782.'}
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 22px 28px' }}>
        {mode === 'phone' ? (
          <>
            <Eyebrow style={{ marginBottom: 8 }}>Phone</Eyebrow>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 14px', color: c.fg, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                🇮🇳 +91
              </div>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="98320 14782" style={{
                flex: 1, background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(230,167,41,0.4)',
                borderRadius: 10, padding: '12px 14px', color: c.fg, fontSize: 14, fontWeight: 600, outline: 'none', fontFamily: 'JetBrains Mono, monospace',
              }} />
            </div>
          </>
        ) : (
          <>
            <Eyebrow style={{ marginBottom: 8 }}>One-time password</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 12 }}>
              {otp.map((d, i) => (
                <div key={i} style={{
                  height: 50, background: 'rgba(255,255,255,0.04)',
                  border: '1.5px solid ' + (i === 4 ? c.brand : 'rgba(255,255,255,0.08)'),
                  borderRadius: 10, display: 'grid', placeItems: 'center',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 20, fontWeight: 700,
                  color: c.fg,
                }}>{d.trim()}{i === 4 && <span style={{ width: 1.5, height: 22, background: c.brand, animation: 'blink 1s infinite' }} />}</div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: c.mute, marginBottom: 18 }}>Didn\u2019t get it? <span style={{ color: c.brand, fontWeight: 700 }}>Resend in 0:24</span></div>
          </>
        )}

        <PrimaryBtn size="lg" onClick={onNext} icon="→">{tr('continueOTP')}</PrimaryBtn>
        <div style={{ fontSize: 10, color: c.mute, marginTop: 14, textAlign: 'center', lineHeight: 1.5 }}>
          By continuing you agree to our T&C and Privacy. Standard rates apply.
        </div>

        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 14 }}>
          <div style={{ width: 6, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.18)' }} />
          <div style={{ width: 6, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.18)' }} />
          <div style={{ width: 22, height: 4, borderRadius: 2, background: c.brand }} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenWelcome, ScreenPitch, ScreenOTP });
