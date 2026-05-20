// Compass — shared UI primitives + language context.

const LangCtx = React.createContext('en');
const useLang = () => React.useContext(LangCtx);
const useT = () => {
  const lang = useLang();
  return React.useCallback((key) => t(lang, key), [lang]);
};

// ─── Tokens reused across screens ─────────────────────────────────────────
const c = {
  bg:    '#06090f',
  surf:  '#0b0f19',
  elev:  '#121826',
  brand: '#E6A729',
  fg:    '#f8fafc',
  sub:   '#94a3b8',
  mute:  '#64748b',
  ok:    '#10b981',
};

// ─── App header (sticky top, glass) ───────────────────────────────────────
function AppHeader({ left, center, right, onBack, transparent }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 30,
      padding: '12px 14px',
      background: transparent ? 'transparent' : 'rgba(11,15,25,0.85)',
      backdropFilter: 'blur(14px)',
      borderBottom: transparent ? 'none' : '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {onBack ? (
          <button onClick={onBack} aria-label="back" style={{
            width: 36, height: 36, borderRadius: 12,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            color: c.fg, fontSize: 16, cursor: 'pointer',
          }}>←</button>
        ) : left}
        {center}
      </div>
      {right}
    </div>
  );
}

// ─── Bottom sheet (snap low/mid/high) ─────────────────────────────────────
function BottomSheet({ children, state, onStateChange, snaps = { low: '22%', mid: '50%', high: '85%' } }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      maxHeight: snaps[state] || '50%',
      background: 'rgba(11,15,25,0.96)', backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(230,167,41,0.25)',
      borderRadius: '20px 20px 0 0',
      boxShadow: '0 -16px 40px rgba(0,0,0,0.5)',
      transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      overflowY: 'auto',
      paddingBottom: 90,
    }}>
      <div onClick={() => onStateChange && onStateChange(state === 'high' ? 'mid' : state === 'mid' ? 'high' : 'mid')}
        style={{ padding: '12px 0 6px', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
        <div style={{ width: 36, height: 4, background: 'rgba(255,255,255,0.18)', borderRadius: 999 }} />
      </div>
      <div style={{ padding: '0 16px' }}>{children}</div>
    </div>
  );
}

// ─── Buttons ──────────────────────────────────────────────────────────────
function PrimaryBtn({ children, onClick, size = 'md', disabled, full = true, icon }) {
  const pad = size === 'lg' ? '15px 24px' : size === 'sm' ? '8px 14px' : '13px 20px';
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: full ? '100%' : 'auto',
      background: disabled ? 'rgba(255,255,255,0.04)' : 'linear-gradient(135deg, #f59e0b, #e67e22)',
      color: disabled ? c.mute : '#060913', border: 0, padding: pad,
      fontFamily: 'Outfit, sans-serif', fontSize: size === 'lg' ? 15 : 13, fontWeight: 800,
      cursor: disabled ? 'not-allowed' : 'pointer', borderRadius: 12,
      boxShadow: disabled ? 'none' : '0 6px 20px rgba(230,167,41,0.35)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      {children}{icon}
    </button>
  );
}

function GhostBtn({ children, onClick, full = true }) {
  return (
    <button onClick={onClick} style={{
      width: full ? '100%' : 'auto',
      background: 'transparent', border: '1px solid rgba(255,255,255,0.12)',
      color: c.fg, padding: '13px 20px',
      fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 700,
      cursor: 'pointer', borderRadius: 12,
    }}>{children}</button>
  );
}

// ─── Text field ───────────────────────────────────────────────────────────
function Field({ label, ...rest }) {
  return (
    <div style={{ marginBottom: 10 }}>
      {label && <div style={{ fontSize: 10, color: c.mute, letterSpacing: '0.22em', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase' }}>{label}</div>}
      <input {...rest} style={{
        width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10, padding: '12px 14px', color: c.fg, fontSize: 13, outline: 'none', fontFamily: 'Inter',
      }} />
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────
function Avatar({ name, size = 44, hue = 36 }) {
  const initials = name.split(' ').map(p => p[0]).slice(0, 2).join('');
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: `linear-gradient(135deg, hsl(${hue}, 82%, 57%), hsl(${(hue + 20) % 360}, 75%, 45%))`,
      display: 'grid', placeItems: 'center',
      fontFamily: 'Outfit', fontWeight: 800, fontSize: size * 0.36, color: '#060913',
    }}>{initials}</div>
  );
}

// ─── Tab bar (floating) ───────────────────────────────────────────────────
function TabBar({ active = 'home', onChange }) {
  const items = [
    { k: 'home', i: '⌂', l: 'Discover' },
    { k: 'build', i: '✧', l: 'Build' },
    { k: 'trips', i: '✈', l: 'Trips' },
    { k: 'me', i: '◯', l: 'Me' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 14, left: 16, right: 16, height: 62,
      background: 'rgba(11,15,25,0.94)', backdropFilter: 'blur(18px)',
      border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
      zIndex: 40,
    }}>
      {items.map(it => (
        <div key={it.k} onClick={() => onChange && onChange(it.k)} style={{
          textAlign: 'center', color: it.k === active ? c.brand : c.mute, cursor: 'pointer',
        }}>
          <div style={{ fontSize: 18 }}>{it.i}</div>
          <div style={{ fontSize: 9, fontWeight: 700, marginTop: 2, letterSpacing: '0.05em' }}>{it.l}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Pill (location/status chip) ──────────────────────────────────────────
function Pill({ children, icon, color = c.ok, glass = true }) {
  return (
    <div style={{
      background: glass ? 'rgba(11,15,25,0.7)' : 'rgba(230,167,41,0.15)',
      backdropFilter: glass ? 'blur(10px)' : 'none',
      border: `1px solid ${glass ? 'rgba(255,255,255,0.08)' : 'rgba(230,167,41,0.35)'}`,
      padding: '7px 12px', borderRadius: 999,
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontSize: 10.5, fontFamily: 'JetBrains Mono, monospace', color: c.fg,
    }}>
      {color && <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />}
      {icon}
      {children}
    </div>
  );
}

// ─── Eyebrow label ────────────────────────────────────────────────────────
function Eyebrow({ children, color = c.mute, style = {} }) {
  return (
    <div style={{ fontSize: 10, color, letterSpacing: '0.25em', fontWeight: 700, textTransform: 'uppercase', ...style }}>{children}</div>
  );
}

// ─── KV row ───────────────────────────────────────────────────────────────
function KV({ k, v, accent }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ fontSize: 10, color: c.mute, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{k}</div>
      <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: accent ? 18 : 13, color: accent ? c.brand : c.fg }}>{v}</div>
    </div>
  );
}

Object.assign(window, {
  LangCtx, useLang, useT, c, AppHeader, BottomSheet, PrimaryBtn, GhostBtn, Field, Avatar, TabBar, Pill, Eyebrow, KV,
});
