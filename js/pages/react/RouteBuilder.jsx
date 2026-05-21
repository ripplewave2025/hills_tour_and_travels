/* ==========================================
   HILLS TOUR & TRAVELS — ROUTE BUILDER (Compass)
   ==========================================
   Killer feature: tap pins on the Darjeeling map to build a sightseeing
   route. Live itinerary, reorder, remove, and a continuously updating
   estimate. Ported from design/prototypes/compass/screens-route.jsx.
   ========================================== */

import { useMemo, useState } from 'react';
import { DarjMap } from '../../components/react/DarjMap.jsx';
import { pins as ALL_PINS, findPin } from '../../data/pins.js';
import { fmtINR } from '../../data/fleet.js';

const DEFAULT_STOPS = ['mall', 'happy', 'hmi'];

function parseStopsQuery(query) {
  if (!query || !query.stops) return null;
  const ids = query.stops.split(',').map(s => s.trim()).filter(Boolean);
  const valid = ids.filter(id => findPin(id));
  return valid.length ? valid : null;
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

export function RouteBuilder({ query }) {
  const initial = parseStopsQuery(query) || DEFAULT_STOPS;
  const [stops, setStops] = useState(initial);

  const toggle = (id) => {
    setStops(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const remove = (id) => setStops(prev => prev.filter(x => x !== id));
  const moveUp = (i) => {
    if (i === 0) return;
    setStops(prev => {
      const next = [...prev];
      [next[i - 1], next[i]] = [next[i], next[i - 1]];
      return next;
    });
  };

  // Estimates mirror the prototype's heuristic so the numbers stay in
  // realistic Darjeeling-day-trip range (₹2,800 – ₹6,000).
  const { distance, duration, price } = useMemo(() => {
    const d = stops.length * 4.5 + 6;
    const m = stops.length * 45 + 30;
    const p = 2200 + stops.length * 650;
    return { distance: d, duration: m, price: p };
  }, [stops.length]);

  const goQuote = () => {
    if (stops.length < 2) return;
    window.location.hash = `#/route/quote?stops=${encodeURIComponent(stops.join(','))}`;
  };

  return (
    <div style={{
      position: 'relative', minHeight: '100vh',
      background: '#060913', color: '#fff'
    }}>
      <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 30,
          padding: '14px 18px',
          background: 'linear-gradient(180deg, rgba(6,9,19,0.95) 0%, rgba(6,9,19,0.4) 100%)',
          backdropFilter: 'blur(12px)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <div style={{
              fontSize: 10, color: 'var(--brand-color, #E6A729)',
              textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700
            }}>Build your route</div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.05rem' }}>
              Tap pins to add stops
            </div>
          </div>
          <a
            href="#/discover"
            style={{
              padding: '10px 14px', borderRadius: 999,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', fontSize: '0.8rem', fontWeight: 600,
              textDecoration: 'none'
            }}
          >Discover ↗</a>
        </div>

        {/* Map */}
        <div style={{ padding: '0 8px', position: 'relative' }}>
          <DarjMap
            activeId={stops[stops.length - 1]}
            routeIds={stops}
            onTapPin={(p) => toggle(p.id)}
            showLabels={false}
          />

          {/* Live stat strip overlay */}
          <div style={{
            position: 'absolute', top: 14, left: 16, right: 16, zIndex: 25,
            background: 'rgba(11,15,25,0.9)', backdropFilter: 'blur(14px)',
            border: '1px solid rgba(230,167,41,0.3)', borderRadius: 14,
            padding: '12px 14px', display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)', gap: 10
          }}>
            <Stat n={stops.length} l="STOPS" />
            <Stat n={distance.toFixed(1) + ' km'} l="DISTANCE" />
            <Stat n={fmtINR(price)} l="EST." accent />
          </div>
        </div>

        {/* Itinerary panel */}
        <section style={{ padding: '20px 16px 40px' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'baseline', marginBottom: 12
          }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.15rem', margin: 0 }}>
              Your itinerary
            </h2>
            <div style={{
              fontSize: 10, color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.15em', fontWeight: 600
            }}>USE ↑ TO REORDER</div>
          </div>

          {/* Timeline of stops */}
          <div style={{ position: 'relative', paddingLeft: 22 }}>
            <div style={{
              position: 'absolute', left: 8, top: 12, bottom: 12, width: 2,
              background: 'linear-gradient(180deg, #E6A729 0%, rgba(230,167,41,0.2) 100%)'
            }} />
            {stops.length === 0 && (
              <div style={{
                padding: 20, textAlign: 'center',
                color: 'rgba(255,255,255,0.5)', fontSize: 13
              }}>
                Tap pins on the map to start your route.
              </div>
            )}
            {stops.map((id, i) => {
              const p = findPin(id);
              if (!p) return null;
              return (
                <div key={id} style={{ position: 'relative', paddingBottom: 14, paddingRight: 4 }}>
                  <div style={{
                    position: 'absolute', left: -22, top: 4, width: 18, height: 18,
                    borderRadius: '50%', background: 'var(--brand-color, #E6A729)',
                    border: '2px solid #060913', display: 'grid', placeItems: 'center',
                    fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 10, color: '#060913'
                  }}>{i + 1}</div>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr auto auto',
                    gap: 8, alignItems: 'center',
                    padding: '10px 12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 10
                  }}>
                    <div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 14 }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{p.sub}</div>
                    </div>
                    <button
                      onClick={() => moveUp(i)}
                      disabled={i === 0}
                      aria-label="Move stop up"
                      style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        color: '#fff', cursor: i === 0 ? 'not-allowed' : 'pointer',
                        opacity: i === 0 ? 0.35 : 1, fontSize: 13
                      }}
                    >↑</button>
                    <button
                      onClick={() => remove(id)}
                      aria-label="Remove stop"
                      style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        color: '#ef4444', cursor: 'pointer', fontSize: 14
                      }}
                    >×</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Suggested additions */}
          <div style={{ marginTop: 24 }}>
            <div style={{
              fontSize: 10, color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.2em', fontWeight: 600, marginBottom: 10
            }}>SUGGESTED ADDITIONS</div>
            <div style={{
              display: 'flex', gap: 8, overflowX: 'auto',
              marginLeft: -16, marginRight: -16, padding: '4px 16px'
            }}>
              {ALL_PINS.filter(p => !stops.includes(p.id)).slice(0, 6).map(p => (
                <button
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  style={{
                    flexShrink: 0, width: 150, padding: 12, borderRadius: 12,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: '#fff', cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: 'rgba(230,167,41,0.1)',
                    border: '1px solid rgba(230,167,41,0.3)',
                    display: 'grid', placeItems: 'center', marginBottom: 8
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E6A729' }} />
                  </div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13 }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
                    {p.sub.split('·')[0].trim()}
                  </div>
                  <div style={{ marginTop: 8, fontSize: 11, color: '#E6A729', fontWeight: 700 }}>
                    + Add
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Sticky CTA */}
        <div style={{
          position: 'sticky', bottom: 0, left: 0, right: 0,
          padding: '14px 16px 22px',
          background: 'linear-gradient(180deg, rgba(6,9,19,0) 0%, rgba(6,9,19,0.92) 30%, #060913 100%)'
        }}>
          <button
            onClick={goQuote}
            disabled={stops.length < 2}
            style={{
              width: '100%', padding: '16px 18px', borderRadius: 14,
              background: stops.length < 2
                ? 'rgba(230,167,41,0.25)'
                : 'linear-gradient(135deg, #E6A729 0%, #f59e0b 100%)',
              color: '#060913', border: 'none',
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1rem',
              cursor: stops.length < 2 ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
            }}
          >
            <span>Get quote · {fmtINR(price)}</span>
            <span aria-hidden="true">→</span>
          </button>
          {stops.length < 2 && (
            <div style={{
              marginTop: 8, textAlign: 'center', fontSize: 11,
              color: 'rgba(255,255,255,0.5)'
            }}>
              Add at least 2 stops to get a quote.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
