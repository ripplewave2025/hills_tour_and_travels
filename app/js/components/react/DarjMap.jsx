/* ==========================================
   HILLS TOUR & TRAVELS — DARJEELING SVG MAP
   ==========================================
   Roads + pins on a 375 × 600 viewBox. Mobile-first; scales to any
   container width while keeping aspect ratio.
   ========================================== */

import { pins as ALL_PINS, roads as ALL_ROADS, findPin } from '../../data/pins.js';

const KIND_COLORS = {
  view:     '#E6A729',
  heritage: '#fb923c',
  temple:   '#a78bfa',
  town:     '#22d3ee',
  tea:      '#34d399',
  museum:   '#f472b6'
};

export function DarjMap({
  activeId = null,
  routeIds = [],
  onTapPin = () => {},
  showLabels = true,
  height = 'auto'
}) {
  const W = 375;
  const H = 600;

  const routePath = routeIds
    .map(id => findPin(id))
    .filter(Boolean)
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', width: '100%', height, background: 'linear-gradient(180deg, #0f1729 0%, #060913 100%)' }}
      role="img"
      aria-label="Map of Darjeeling sightseeing points"
    >
      {/* Topo wash */}
      <defs>
        <radialGradient id="topo" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(230,167,41,0.05)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="pinGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill="url(#topo)" />

      {/* Roads */}
      {ALL_ROADS.map(r => (
        <path
          key={r.id}
          d={r.d}
          fill="none"
          stroke={r.cls === 'main' ? 'rgba(230,167,41,0.35)' : 'rgba(255,255,255,0.12)'}
          strokeWidth={r.cls === 'main' ? 2.5 : 1.4}
          strokeLinecap="round"
        />
      ))}

      {/* Active route polyline */}
      {routePath && (
        <path
          d={routePath}
          fill="none"
          stroke="#E6A729"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 4"
          opacity={0.9}
        />
      )}

      {/* Pins */}
      {ALL_PINS.map((p, i) => {
        const isActive = p.id === activeId;
        const inRoute = routeIds.includes(p.id);
        const routeIdx = routeIds.indexOf(p.id) + 1;
        const color = KIND_COLORS[p.kind] || '#E6A729';
        return (
          <g
            key={p.id}
            transform={`translate(${p.x}, ${p.y})`}
            style={{ cursor: 'pointer' }}
            onClick={() => onTapPin(p)}
          >
            {isActive && (
              <circle r="22" fill={color} opacity="0.18" filter="url(#pinGlow)" />
            )}
            <circle
              r={isActive ? 11 : (inRoute ? 10 : 7)}
              fill={inRoute ? '#E6A729' : color}
              stroke="#060913"
              strokeWidth="2"
            />
            {inRoute && (
              <text
                x="0" y="3.5" textAnchor="middle"
                fontSize="9" fontWeight="800" fill="#060913"
                fontFamily="Outfit, Inter, sans-serif"
              >{routeIdx}</text>
            )}
            {showLabels && (isActive || inRoute) && (
              <text
                x="0" y={-16}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill="#fff"
                fontFamily="Outfit, Inter, sans-serif"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
                pointerEvents="none"
              >{p.name}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
