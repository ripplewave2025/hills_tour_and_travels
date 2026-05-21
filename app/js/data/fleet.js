/* ==========================================
   HILLS TOUR & TRAVELS — FLEET, HOTELS, DRIVERS
   ==========================================
   Ported from design/prototypes/compass/data.jsx (C_CABS, C_HOTELS,
   C_DRIVERS). Used by the route builder + quote screens.
   ========================================== */

export const cabs = [
  { id: 'dzire',   name: 'Maruti Dzire',     cls: 'Sedan',   seats: 4, bags: 2, rate: 2800, hour: 350, note: 'Compact, AC' },
  { id: 'ertiga',  name: 'Maruti Ertiga',    cls: 'MUV',     seats: 6, bags: 3, rate: 3800, hour: 450, note: 'Family-friendly' },
  { id: 'scorpio', name: 'Mahindra Scorpio', cls: 'SUV',     seats: 6, bags: 4, rate: 4500, hour: 550, note: 'Hill-tested 4WD' },
  { id: 'innova',  name: 'Innova Crysta',    cls: 'Premium', seats: 7, bags: 5, rate: 5800, hour: 650, note: 'Long trips, premium' }
];

export const hotels = [
  'Mayfair Darjeeling',
  'Cedar Inn',
  'Windamere Hotel',
  'The Elgin',
  'Sterling Darjeeling',
  'Hotel Sonar Bangla',
  'Mahakal View Hotel',
  'New Elgin',
  'Sinclairs Darjeeling',
  'Sumi Yashshree',
  'Pickup from a different address'
];

export const drivers = [
  { id: 'nima',  name: 'Nima Sherpa',   yrs: 8,  rating: 4.94, plate: 'WB-77AB-2814', langs: ['en','ne','hi'],      cab: 'Innova Crysta',    init: 'NS', hue: 36 },
  { id: 'tashi', name: 'Tashi Lama',    yrs: 17, rating: 4.97, plate: 'WB-77C-1129',  langs: ['en','ne','hi','bn'], cab: 'Innova Crysta',    init: 'TL', hue: 12 },
  { id: 'pemba', name: 'Pemba Bhutia',  yrs: 6,  rating: 4.89, plate: 'WB-77B-4402',  langs: ['en','ne','hi'],      cab: 'Mahindra Scorpio', init: 'PB', hue: 200 },
  { id: 'karma', name: 'Karma Tamang',  yrs: 11, rating: 4.92, plate: 'WB-77A-7820',  langs: ['en','ne','hi','bn'], cab: 'Maruti Ertiga',    init: 'KT', hue: 95 }
];

export const fmtINR = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

// Approximate per-stop pricing model: base + per-stop surcharge by cab.
// Keeps quotes in the same realistic range as the prototype packages
// (₹2,800 sunrise → ₹5,400 day-trip), without needing real distance math.
export function quoteForRoute(cab, stops) {
  if (!cab || !stops || stops.length < 2) return 0;
  const extraStops = Math.max(0, stops.length - 2);
  return cab.rate + extraStops * Math.round(cab.rate * 0.18);
}
