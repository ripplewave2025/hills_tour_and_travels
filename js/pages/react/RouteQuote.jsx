/* ==========================================
   HILLS TOUR & TRAVELS — ROUTE QUOTE (Compass)
   ==========================================
   Step 2 of the route flow. Reads ?stops=… from the route builder,
   shows a route map, lets the user pick a tier + cab, previews the
   likely driver, and lands on the existing booking page.
   Ported from design/prototypes/compass/screens-route.jsx.
   ========================================== */

import { useMemo, useState } from 'react';
import { DarjMap } from '../../components/react/DarjMap.jsx';
import { findPin } from '../../data/pins.js';
import { cabs, drivers, fmtINR } from '../../data/fleet.js';

const TIERS = [
  { id: 'eco',      n: 'Eco',      d: 'Older cabs',   m: 0.85 },
  { id: 'standard', n: 'Standard', d: 'Most popular', m: 1.00 },
  { id: 'premium',  n: 'Premium',  d: '< 2 yr cab',   m: 1.20 }
];

const LANG_LABEL = { en: 'English', hi: 'Hindi', bn: 'Bengali', ne: 'Nepali' };

function parseStopsQuery(query) {
  if (!query || !query.stops) return [];
  return query.stops.split(',').map(s => s.trim()).filter(id => findPin(id));
}

function Stat({ n, l, accent }) {
  return (
    <div>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', fontWeight: 600 }}>{l}</div>
      <div style={{
        fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 15,
        color: accent ? 'var(--brand-color, #E6A729)' : '#fff', marginTop: 3
      }}>{n}</div>
    </div>
  );
}

function Avatar({ name, hue }) {
  const initials = name.split(' ').map(s => s[0]).join('').slice(0, 2);
  return (
    <div style={{
      width: 44, height: 44, borderRadius: '50%',
      background: `linear-gradient(135deg, hsl(${hue} 70% 55%), hsl(${hue} 60% 35%))`,
      color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 800,
      fontSize: 14, display: 'grid', placeItems: 'center'
    }}>{initials}</div>
  );
}

export function RouteQuote({ query }) {
  const stops = parseStopsQuery(query);
  const [tier, setTier] = useState('standard');
  const [cabId, setCabId] = useState('innova');

  const cab = cabs.find(c => c.id === cabId) || cabs[0];
  const tierMul = (TIERS.find(t => t.id === tier) || TIERS[1]).m;

  const distance = stops.length * 4.5 + 6;
  const baseHours = stops.length * 0.75 + 1;
  const price = useMemo(
    () => Math.round((cab.hour * baseHours + 800) * tierMul),
    [cab, baseHours, tierMul]
  );

  const goBook = () => {
    // Hand off to the existing booking page. Use the first stop as a
    // soft pickup hint; the booking form will collect real pickup.
    const first = stops[0];
    const params = new URLSearchParams({
      route: stops.join(','),
      cab: cab.id,
      tier
    });
    window.location.hash = `#/booking?${params.toString()}`;
  };

  if (stops.length < 2) {
    return (
      <div style={{
        minHeight: '100vh', background: '#060913', color: '#fff',
        display: 'grid', placeItems: 'center', padding: 24
      }}>
        <div style={{ textAlign: 'center', maxWidth: 360 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.4rem' }}>
            No route yet
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', margin: '8px 0 20px' }}>
            Pick at least two stops on the map to get a quote.
          </p>
          <a href="#/route" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Build a route →
          </a>
        </div>
      </div>
    );
  }

  const drv = drivers[0];

  return (
    <div style={{ minHeight: '100vh', background: '#060913', color: '#fff' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 30,
          padding: '14px 18px',
          background: 'linear-gradient(180deg, rgba(6,9,19,0.95) 0%, rgba(6,9,19,0.4) 100%)',
          backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', gap: 14
        }}>
          <a href="#/route" aria-label="Back" style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#fff', textDecoration: 'none',
            display: 'grid', placeItems: 'center', fontSize: 16
          }}>←</a>
          <div>
            <div style={{
              fontSize: 10, color: 'var(--brand-color, #E6A729)',
              textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700
            }}>Step 2 / 2 · Quote</div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.05rem' }}>
              Your custom route
            </div>
          </div>
        </div>

        {/* Route map */}
        <div style={{ position: 'relative' }}>
          <DarjMap routeIds={stops} activeId={stops[0]} showLabels={false} />
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, height: 80,
            background: 'linear-gradient(180deg, transparent 0%, #060913 100%)',
            pointerEvents: 'none'
          }} />
        </div>

        <div style={{ padding: '0 16px', marginTop: -28, position: 'relative' }}>
          {/* Summary */}
          <div style={{
            background: 'var(--bg-elevated, #121826)',
            border: '1px solid rgba(230,167,41,0.25)',
            borderRadius: 14, padding: 18
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              <Stat n={stops.length} l="STOPS" />
              <Stat n={distance.toFixed(1) + 'km'} l="DISTANCE" />
              <Stat n={baseHours.toFixed(1) + 'h'} l="DURATION" />
              <Stat n={fmtINR(price)} l="TOTAL" accent />
            </div>
          </div>
        </div>

        {/* Tier picker */}
        <section style={{ padding: '24px 16px 0' }}>
          <div style={{
            fontSize: 10, color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.2em', fontWeight: 600, marginBottom: 10
          }}>RIDE TIER</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {TIERS.map(t => (
              <button
                key={t.id}
                onClick={() => setTier(t.id)}
                style={{
                  padding: 12, borderRadius: 12, cursor: 'pointer', textAlign: 'center',
                  background: tier === t.id ? 'rgba(230,167,41,0.12)' : 'rgba(255,255,255,0.03)',
                  border: '1.5px solid ' + (tier === t.id ? '#E6A729' : 'rgba(255,255,255,0.06)'),
                  color: '#fff'
                }}
              >
                <div style={{
                  fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13,
                  color: tier === t.id ? '#E6A729' : '#fff'
                }}>{t.n}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>{t.d}</div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                  color: 'rgba(255,255,255,0.5)', marginTop: 6
                }}>×{t.m.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Cab picker */}
        <section style={{ padding: '20px 16px 0' }}>
          <div style={{
            fontSize: 10, color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.2em', fontWeight: 600, marginBottom: 10
          }}>CAB</div>
          <div style={{
            display: 'flex', gap: 10, overflowX: 'auto',
            marginLeft: -16, marginRight: -16, padding: '4px 16px'
          }}>
            {cabs.map(cb => (
              <button
                key={cb.id}
                onClick={() => setCabId(cb.id)}
                style={{
                  flexShrink: 0, width: 140, padding: 14, borderRadius: 14, cursor: 'pointer',
                  background: cabId === cb.id ? 'rgba(230,167,41,0.1)' : 'rgba(255,255,255,0.03)',
                  border: '1.5px solid ' + (cabId === cb.id ? '#E6A729' : 'rgba(255,255,255,0.06)'),
                  color: '#fff', textAlign: 'left'
                }}
              >
                <div style={{ fontSize: 22 }}>🚙</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13, marginTop: 6 }}>
                  {cb.name}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
                  {cb.seats} seats · {cb.cls}
                </div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
                  color: cabId === cb.id ? '#E6A729' : '#fff',
                  marginTop: 8, fontWeight: 700
                }}>
                  {fmtINR(cb.hour)}
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>/hr</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Itinerary preview */}
        <section style={{ padding: '20px 16px 0' }}>
          <div style={{
            fontSize: 10, color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.2em', fontWeight: 600, marginBottom: 10
          }}>ITINERARY</div>
          <div style={{
            position: 'relative',
            background: 'var(--bg-elevated, #121826)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12, padding: '14px 14px 14px 36px'
          }}>
            <div style={{
              position: 'absolute', left: 22, top: 18, bottom: 18, width: 2,
              background: 'linear-gradient(180deg, #E6A729 0%, rgba(230,167,41,0.2) 100%)'
            }} />
            {stops.map((id, i) => {
              const p = findPin(id);
              if (!p) return null;
              return (
                <div key={id} style={{
                  position: 'relative',
                  paddingBottom: i === stops.length - 1 ? 0 : 12
                }}>
                  <div style={{
                    position: 'absolute', left: -22, top: 2, width: 16, height: 16,
                    borderRadius: '50%', background: '#E6A729',
                    border: '2px solid #060913', display: 'grid', placeItems: 'center',
                    fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 9, color: '#060913'
                  }}>{i + 1}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13 }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
                        {p.sub.split('·')[0].trim()}
                      </div>
                    </div>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                      color: 'rgba(255,255,255,0.5)'
                    }}>{p.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Likely driver */}
        <section style={{ padding: '20px 16px 0' }}>
          <div style={{
            fontSize: 10, color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.2em', fontWeight: 600, marginBottom: 10
          }}>LIKELY DRIVER</div>
          <div style={{
            background: 'var(--bg-elevated, #121826)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12, padding: 14,
            display: 'grid', gridTemplateColumns: '44px 1fr auto',
            gap: 12, alignItems: 'center'
          }}>
            <Avatar name={drv.name} hue={drv.hue} />
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13 }}>
                {drv.name}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
                ★ {drv.rating} · {drv.yrs} yrs · {drv.langs.map(l => LANG_LABEL[l]).join(' / ')}
              </div>
            </div>
            <div style={{
              fontSize: 10, color: '#E6A729',
              letterSpacing: '0.15em', fontWeight: 700
            }}>SUGGESTED</div>
          </div>
        </section>

        {/* Final CTA */}
        <div style={{
          padding: '20px 16px 24px', marginTop: 24,
          position: 'sticky', bottom: 0,
          background: 'linear-gradient(0deg, #060913 70%, transparent)'
        }}>
          <div style={{
            background: 'var(--bg-elevated, #121826)',
            border: '1px solid rgba(230,167,41,0.3)',
            borderRadius: 14, padding: 14
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline', marginBottom: 10
            }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                Custom route · {stops.length} stops
              </div>
              <div style={{
                fontFamily: 'Outfit, sans-serif', fontWeight: 800,
                fontSize: 24, color: '#E6A729'
              }}>{fmtINR(price)}</div>
            </div>
            <button
              onClick={goBook}
              style={{
                width: '100%', padding: '14px 16px', borderRadius: 12,
                background: 'linear-gradient(135deg, #E6A729 0%, #f59e0b 100%)',
                color: '#060913', border: 'none',
                fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
              }}
            >
              Book this route <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
