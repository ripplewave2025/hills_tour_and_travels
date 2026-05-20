// Compass — realistic Darjeeling map (Apple-Maps dark style).
// Real road names traced from the actual town: Hill Cart Rd (NH55), Mall Rd loop,
// Lebong Cart Rd, etc. Buildings, contours, labels, and pins.
//
// All coordinates live in a 375×600 viewBox. Pins come from C_PINS in data.jsx.

const MAP_W = 375;
const MAP_H = 600;

// Subtle map background tiles + topographic contour shapes
function MapBase({ height = MAP_H }) {
  return (
    <g>
      {/* Base land */}
      <rect width={MAP_W} height={height} fill="#0a1020" />

      {/* Topographic contour bands — Darjeeling sits on a ridge */}
      <defs>
        <linearGradient id="ridge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a2238" stopOpacity="0.7" />
          <stop offset="1" stopColor="#0a1020" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="valley" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1428" />
          <stop offset="1" stopColor="#06090f" />
        </linearGradient>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#1a2240" strokeWidth="0.4" />
        </pattern>
      </defs>

      {/* Big elevated ridge mass through the centre */}
      <path d="M 60,30 Q 200,80 320,120 Q 360,180 340,300 Q 320,420 240,500 Q 150,540 60,520 Q 20,400 30,260 Q 35,140 60,30 Z"
            fill="#121a2e" />
      {/* Higher ridge inside */}
      <path d="M 110,80 Q 220,130 300,180 Q 320,260 290,360 Q 240,440 180,460 Q 110,440 80,360 Q 60,260 80,180 Q 95,130 110,80 Z"
            fill="#171f36" />
      {/* Highest ridge */}
      <path d="M 150,140 Q 230,180 280,230 Q 290,300 260,360 Q 220,400 180,400 Q 130,380 110,320 Q 100,240 120,180 Q 135,150 150,140 Z"
            fill="#1c2540" />

      {/* Hatching on lower slopes to imply terrain */}
      <path d="M 60,30 Q 200,80 320,120 Q 360,180 340,300 Q 320,420 240,500 Q 150,540 60,520 Q 20,400 30,260 Q 35,140 60,30 Z"
            fill="url(#hatch)" opacity="0.5" />

      {/* Contour rings (subtle, gold) */}
      {[
        'M 200,260 a 110,160 0 1,0 0.01,0',
        'M 200,260 a 70,110 0 1,0 0.01,0',
        'M 200,260 a 35,60 0 1,0 0.01,0',
      ].map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(230,167,41,0.06)" strokeWidth="0.5" />
      ))}

      {/* Valleys */}
      <path d="M 0,200 Q 60,280 30,400 T 0,560" fill="none" stroke="#0d1530" strokeWidth="40" opacity="0.7" />
      <path d="M 375,180 Q 350,300 370,440 T 360,580" fill="none" stroke="#0d1530" strokeWidth="36" opacity="0.7" />

      {/* Subtle building blocks for the town centre (Mall area) */}
      <g opacity="0.55">
        {[
          [165, 305, 14, 8], [183, 305, 10, 8], [196, 305, 12, 8],
          [165, 316, 8, 10], [176, 316, 12, 10], [191, 316, 9, 10],
          [165, 329, 16, 8], [184, 329, 10, 8],
          [205, 310, 14, 12], [222, 312, 10, 9],
          [142, 308, 10, 8], [142, 320, 12, 6],
          [155, 290, 8, 6], [167, 287, 10, 6],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="#1f2940" stroke="#2a3658" strokeWidth="0.3" rx="0.5" />
        ))}
      </g>

      {/* Smaller building cluster near Ghoom */}
      <g opacity="0.5">
        {[
          [218, 192, 8, 5], [228, 192, 9, 5], [218, 200, 10, 5], [230, 200, 8, 5],
          [212, 207, 7, 4], [222, 207, 12, 4],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="#1c2538" rx="0.5" />
        ))}
      </g>
    </g>
  );
}

// Real Darjeeling roads, traced. Class hierarchy decides stroke weights.
const ROADS_GEOM = [
  // Hill Cart Road (NH55) — the spine
  { id: 'hcr-n', name: 'HILL CART ROAD',  cls: 'highway', d: 'M 178,316 Q 220,275 268,225 Q 305,180 340,90' },
  { id: 'hcr-s', name: 'HILL CART ROAD',  cls: 'highway', d: 'M 178,316 Q 195,360 215,400 Q 230,440 240,500' },
  // Mall Road loop around Observatory Hill
  { id: 'mall',  name: 'MALL ROAD',       cls: 'main',    d: 'M 178,316 C 158,310 148,322 146,338 C 145,360 165,375 188,372 C 210,368 222,350 218,328 C 215,316 200,310 178,316 Z' },
  // Lebong Cart Road north
  { id: 'lcr',   name: 'LEBONG CART RD',  cls: 'main',    d: 'M 178,316 Q 140,290 115,260 Q 85,225 65,180 Q 50,140 55,90' },
  // Cooch Behar Rd east
  { id: 'cbr',   name: 'COOCH BEHAR RD',  cls: 'main',    d: 'M 178,316 L 220,340 L 270,338 L 320,320' },
  // Robertson Rd
  { id: 'rob',   name: 'ROBERTSON RD',    cls: 'sec',     d: 'M 165,295 L 130,310 L 95,335 L 78,360' },
  // Auckland Rd
  { id: 'auck',  name: 'AUCKLAND RD',     cls: 'sec',     d: 'M 220,275 L 250,290 L 280,300' },
  // Gandhi Rd
  { id: 'gan',   name: 'GANDHI RD',       cls: 'sec',     d: 'M 188,372 L 200,400 L 215,430 L 228,460' },
  // Jalapahar Rd
  { id: 'jp',    name: 'JALAPAHAR RD',    cls: 'sec',     d: 'M 215,400 L 210,380 L 196,360' },
  // Lebong cut-back
  { id: 'lb2',   name: 'LEBONG RD',       cls: 'sec',     d: 'M 115,260 L 95,225 L 65,205' },
  // Tea garden lane
  { id: 'tea',   name: 'PAMPHAWATI RD',   cls: 'sec',     d: 'M 146,338 L 120,360 L 100,378 L 95,395' },
  // Rock garden cut
  { id: 'rg',    name: 'CART RD',         cls: 'sec',     d: 'M 100,378 L 80,420 L 70,460 L 76,482' },
  // Ghoom branch
  { id: 'gm',    name: 'OLD GHOOM RD',    cls: 'sec',     d: 'M 268,225 L 240,205 L 224,196' },
  // Tiger Hill
  { id: 'th',    name: 'TIGER HILL RD',   cls: 'sec',     d: 'M 268,225 Q 295,170 318,78' },
  // Mahakal Mandir path
  { id: 'mh',    name: 'MAHAKAL RD',      cls: 'foot',    d: 'M 178,316 L 168,308 L 165,295' },
];

function MapRoads({ showLabels = true }) {
  return (
    <g>
      {/* Road casings (light outer halo) */}
      {ROADS_GEOM.map(r => (
        <path key={r.id + '-c'} d={r.d}
          fill="none"
          stroke={r.cls === 'highway' ? '#3a4868' : r.cls === 'main' ? '#2a3656' : '#1f2942'}
          strokeWidth={r.cls === 'highway' ? 6 : r.cls === 'main' ? 4.5 : r.cls === 'foot' ? 2 : 3}
          strokeLinejoin="round" strokeLinecap="round"
        />
      ))}
      {/* Road inner */}
      {ROADS_GEOM.map(r => (
        <path key={r.id + '-i'} d={r.d}
          id={r.id}
          fill="none"
          stroke={r.cls === 'highway' ? '#9aa9c8' : r.cls === 'main' ? '#5e6e90' : r.cls === 'foot' ? '#3a4868' : '#3e4c6e'}
          strokeWidth={r.cls === 'highway' ? 2.4 : r.cls === 'main' ? 1.6 : r.cls === 'foot' ? 0.6 : 1}
          strokeLinejoin="round" strokeLinecap="round"
          strokeDasharray={r.cls === 'foot' ? '2 2' : 'none'}
        />
      ))}

      {/* Road labels along the path */}
      {showLabels && ROADS_GEOM.filter(r => r.cls !== 'foot').map((r, i) => (
        <text key={r.id + '-t'} fontSize={r.cls === 'highway' ? 7 : 6} fontFamily="Inter, sans-serif" letterSpacing="0.18em" fill="rgba(180,194,222,0.55)" fontWeight="600">
          <textPath href={`#${r.id}`} startOffset="35%">{r.name}</textPath>
        </text>
      ))}
    </g>
  );
}

// Place labels (in addition to pins) — small grey labels for context
const PLACE_LABELS = [
  { x: 178, y: 295, name: 'CHOWRASTA',    size: 7 },
  { x: 224, y: 215, name: 'GHOOM',        size: 7 },
  { x: 100, y: 240, name: 'NORTH POINT',  size: 6 },
  { x: 320, y: 110, name: 'SENCHAL',      size: 6 },
  { x: 215, y: 470, name: 'JALAPAHAR',    size: 6 },
  { x: 60,  y: 460, name: 'BALLOC',       size: 6 },
];

function MapPlaces() {
  return (
    <g>
      {PLACE_LABELS.map(p => (
        <text key={p.name} x={p.x} y={p.y}
          fontSize={p.size} fontFamily="Inter" fontWeight="700"
          letterSpacing="0.22em" fill="rgba(160,178,210,0.45)" textAnchor="middle">{p.name}</text>
      ))}
    </g>
  );
}

// ─── PINS ─────────────────────────────────────────────────────────────────
function Pin({ pin, state = 'default', onTap }) {
  // state: 'default' | 'active' | 'route' | 'dim'
  const isActive = state === 'active';
  const isRoute = state === 'route';
  const dim = state === 'dim';
  const gold = '#E6A729';
  return (
    <g onClick={() => onTap && onTap(pin)} style={{ cursor: 'pointer' }}>
      {isActive && (
        <>
          <circle cx={pin.x} cy={pin.y} r="22" fill={gold} opacity="0.15">
            <animate attributeName="r" values="14;28;14" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
          </circle>
        </>
      )}
      {/* Shadow */}
      <ellipse cx={pin.x} cy={pin.y + 1.5} rx={isActive ? 7 : 5} ry={1.4} fill="rgba(0,0,0,0.5)" />
      {/* Pin body */}
      <circle cx={pin.x} cy={pin.y}
        r={isActive ? 7 : isRoute ? 5.5 : 4.5}
        fill={dim ? 'rgba(11,15,25,0.6)' : (isActive || isRoute ? gold : '#0b0f19')}
        stroke={dim ? 'rgba(230,167,41,0.3)' : gold}
        strokeWidth={isActive ? 2 : 1.4}
      />
      {/* Inner dot */}
      {(isActive || isRoute) && (
        <circle cx={pin.x} cy={pin.y} r={isActive ? 2.4 : 1.6} fill="#060913" />
      )}
    </g>
  );
}

// Route polyline between an ordered list of pin ids (smooth bezier).
function RoutePath({ stopIds, animated = false, progress = 1 }) {
  const pts = stopIds.map(id => findPin(id)).filter(Boolean);
  if (pts.length < 2) return null;
  // Build smooth path via quadratic curves
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const cur = pts[i];
    const cx = (prev.x + cur.x) / 2 + (Math.sin(i) * 12);
    const cy = (prev.y + cur.y) / 2 + (Math.cos(i) * 8);
    d += ` Q ${cx},${cy} ${cur.x},${cur.y}`;
  }
  return (
    <g>
      {/* Casing */}
      <path d={d} fill="none" stroke="#06090f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      {/* Gold route */}
      <path d={d} fill="none" stroke="#E6A729" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={animated ? '600' : 'none'}
        strokeDashoffset={animated ? (600 - 600 * progress) : 0}
        style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
        opacity="0.95"
        id="route-path"
      />
      {/* Stop numbers */}
      {pts.map((p, i) => (
        <g key={p.id}>
          <circle cx={p.x} cy={p.y} r="9" fill="#E6A729" stroke="#060913" strokeWidth="1.5" />
          <text x={p.x} y={p.y + 3} fontSize="9" fontWeight="800" fontFamily="Inter" fill="#060913" textAnchor="middle">{i + 1}</text>
        </g>
      ))}
    </g>
  );
}

// Animated driver dot along the route (uses animateMotion against #route-path)
function DriverDot({ routeId = 'route-path', duration = 18 }) {
  return (
    <g>
      <circle r="9" fill="#E6A729" opacity="0.35">
        <animate attributeName="r" values="6;14;6" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
        <animateMotion dur={duration + 's'} repeatCount="indefinite" rotate="auto">
          <mpath href={`#${routeId}`} />
        </animateMotion>
      </circle>
      <circle r="5.5" fill="#E6A729" stroke="#060913" strokeWidth="2">
        <animateMotion dur={duration + 's'} repeatCount="indefinite" rotate="auto">
          <mpath href={`#${routeId}`} />
        </animateMotion>
      </circle>
      <circle r="2" fill="#060913">
        <animateMotion dur={duration + 's'} repeatCount="indefinite" rotate="auto">
          <mpath href={`#${routeId}`} />
        </animateMotion>
      </circle>
    </g>
  );
}

// Compass rose + scale chrome (Apple Maps style)
function MapChrome({ height = MAP_H }) {
  return (
    <g>
      {/* Compass */}
      <g transform="translate(340, 28)">
        <circle r="14" fill="rgba(11,15,25,0.7)" stroke="rgba(230,167,41,0.3)" strokeWidth="0.6" />
        <path d="M 0,-9 L 2.4,0 L 0,2.4 L -2.4,0 Z" fill="#E6A729" />
        <path d="M 0,9 L 2.4,0 L 0,-2.4 L -2.4,0 Z" fill="rgba(180,194,222,0.6)" />
        <text y="-17" textAnchor="middle" fontSize="6" fontWeight="800" fontFamily="Inter" fill="#E6A729">N</text>
      </g>
      {/* Scale */}
      <g transform={`translate(20, ${height - 30})`}>
        <line x1="0" y1="0" x2="34" y2="0" stroke="#94a3b8" strokeWidth="1" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="#94a3b8" strokeWidth="1" />
        <line x1="34" y1="-3" x2="34" y2="3" stroke="#94a3b8" strokeWidth="1" />
        <text x="40" y="3" fontSize="7" fill="#94a3b8" fontFamily="JetBrains Mono">1 km</text>
      </g>
    </g>
  );
}

// ─── TOP-LEVEL MAP COMPONENT ──────────────────────────────────────────────
// Props:
//   active: pin id to highlight
//   onTap: pin → void
//   routeIds: ordered ids that form a route polyline
//   routeProgress: 0..1, for animated draw
//   routeAnimated: boolean
//   selectableIds: when set, only these pins are tappable, others render dim
//   showDriver: boolean — animate the driver dot along route
//   height
function DarjMap({
  active, onTap, routeIds = [], routeProgress = 1, routeAnimated = false,
  selectableIds = null, showDriver = false, height = MAP_H, showLabels = true,
}) {
  const showRoute = routeIds.length >= 2;
  return (
    <svg viewBox={`0 0 ${MAP_W} ${height}`} width="100%" height={height} style={{ display: 'block' }}>
      <MapBase height={height} />
      <MapRoads showLabels={showLabels} />
      <MapPlaces />

      {showRoute && <RoutePath stopIds={routeIds} animated={routeAnimated} progress={routeProgress} />}
      {showDriver && showRoute && <DriverDot />}

      {/* Pins (skip ones already drawn as route stops to avoid double) */}
      {C_PINS.map(p => {
        if (showRoute && routeIds.includes(p.id)) return null;
        let state = 'default';
        if (selectableIds && !selectableIds.includes(p.id)) state = 'dim';
        if (active === p.id) state = 'active';
        return <Pin key={p.id} pin={p} state={state} onTap={onTap} />;
      })}

      {/* Active label tooltip */}
      {(() => {
        const p = active && findPin(active);
        if (!p) return null;
        const lblOnRight = p.x < 200;
        const lx = lblOnRight ? p.x + 12 : p.x - 130;
        return (
          <g style={{ pointerEvents: 'none' }}>
            <rect x={lx} y={p.y - 24} width="118" height="34" rx="6" fill="rgba(11,15,25,0.94)" stroke="rgba(230,167,41,0.5)" strokeWidth="0.75" />
            <text x={lx + 8} y={p.y - 10} fontSize="10" fontWeight="700" fontFamily="Inter" fill="#f8fafc">{p.name}</text>
            <text x={lx + 8} y={p.y + 2} fontSize="7" fontFamily="Inter" letterSpacing="0.12em" fill="#E6A729" fontWeight="600">{p.sub.toUpperCase()}</text>
          </g>
        );
      })()}

      <MapChrome height={height} />
    </svg>
  );
}

Object.assign(window, { DarjMap, Pin, RoutePath, MAP_W, MAP_H });
