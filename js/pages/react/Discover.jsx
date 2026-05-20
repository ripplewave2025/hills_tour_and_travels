/* ==========================================
   HILLS TOUR & TRAVELS — DISCOVER (PHASE 02)
   ==========================================
   Map-first home. Tap any pin → detail sheet. CTA to start a route.
   Mobile-first: full-bleed map under 768px, centered phone-shape on
   larger screens.
   ========================================== */

import { useState } from 'react';
import { DarjMap } from '../../components/react/DarjMap.jsx';
import { findPin } from '../../data/pins.js';

const KIND_LABEL = {
  view: 'Viewpoint', heritage: 'Heritage', temple: 'Temple',
  town: 'Town centre', tea: 'Tea estate', museum: 'Museum'
};

function PinSheet({ pin, onClose, onAddToRoute }) {
  if (!pin) return null;
  return (
    <div style={{
      position: 'fixed', left: 0, right: 0, bottom: 0,
      background: 'rgba(11,15,25,0.96)',
      backdropFilter: 'blur(18px)',
      borderTop: '1px solid rgba(230,167,41,0.3)',
      borderRadius: '20px 20px 0 0',
      padding: '20px 22px 28px',
      maxWidth: 560, margin: '0 auto',
      zIndex: 50,
      boxShadow: '0 -8px 40px rgba(0,0,0,0.5)'
    }}>
      <div style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, margin: '-6px auto 16px' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--brand-color, #E6A729)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
            {KIND_LABEL[pin.kind] || 'Stop'}
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.4rem', margin: '4px 0 2px', color: '#fff' }}>
            {pin.name}
          </h2>
          <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>{pin.sub}</div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: 18, flexShrink: 0 }}
        >×</button>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, margin: '14px 0 18px' }}>
        {pin.desc}
      </p>

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => onAddToRoute(pin)}
          style={{
            flex: 1, padding: '14px 16px', borderRadius: 12,
            background: 'linear-gradient(135deg, #E6A729, #f59e0b)',
            border: 'none', color: '#060913', fontWeight: 700, fontSize: '0.95rem',
            cursor: 'pointer', fontFamily: 'Outfit, sans-serif'
          }}
        >
          + Add to route
        </button>
        <a
          href={`#/booking?from=bagdogra-airport&to=darjeeling`}
          style={{
            padding: '14px 16px', borderRadius: 12,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            color: '#fff', fontWeight: 600, fontSize: '0.95rem',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center'
          }}
        >Book cab</a>
      </div>
    </div>
  );
}

export function Discover() {
  const [activeId, setActiveId] = useState('tigerhill');
  const [sheetOpen, setSheetOpen] = useState(true);

  const activePin = findPin(activeId);

  const handleAddToRoute = (pin) => {
    window.location.hash = `#/route?start=${pin.id}`;
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#060913', color: '#fff' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative' }}>

        {/* Top bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 30,
          padding: '14px 18px',
          background: 'linear-gradient(180deg, rgba(6,9,19,0.95) 0%, rgba(6,9,19,0.4) 100%)',
          backdropFilter: 'blur(12px)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>Discover</div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.05rem' }}>Darjeeling, on tap.</div>
          </div>
          <a
            href="#/route"
            style={{
              padding: '10px 14px', borderRadius: 999,
              background: 'rgba(230,167,41,0.12)', border: '1px solid rgba(230,167,41,0.4)',
              color: '#E6A729', fontSize: '0.8rem', fontWeight: 700,
              textDecoration: 'none'
            }}
          >Build a route →</a>
        </div>

        {/* Map */}
        <div style={{ padding: '0 8px 220px' }}>
          <DarjMap
            activeId={activeId}
            onTapPin={(p) => { setActiveId(p.id); setSheetOpen(true); }}
            showLabels={true}
          />
        </div>

        {/* Pin legend hint when sheet closed */}
        {!sheetOpen && activePin && (
          <button
            onClick={() => setSheetOpen(true)}
            style={{
              position: 'fixed', left: 0, right: 0, bottom: 16,
              maxWidth: 460, margin: '0 auto',
              padding: '12px 18px',
              background: 'rgba(11,15,25,0.94)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(230,167,41,0.3)', borderRadius: 14,
              color: '#fff', cursor: 'pointer', textAlign: 'left',
              zIndex: 40
            }}
          >
            <div style={{ fontSize: 11, color: '#E6A729', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {KIND_LABEL[activePin.kind]}
            </div>
            <div style={{ fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>{activePin.name}</div>
          </button>
        )}

        {sheetOpen && (
          <PinSheet
            pin={activePin}
            onClose={() => setSheetOpen(false)}
            onAddToRoute={handleAddToRoute}
          />
        )}
      </div>
    </div>
  );
}
