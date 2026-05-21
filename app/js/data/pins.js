/* ==========================================
   HILLS TOUR & TRAVELS — MAP PINS & ROADS
   ==========================================
   Ported from design/prototypes/compass/data.jsx.
   SVG-space coords on a 375 × 600 viewBox.
   ========================================== */

export const pins = [
  { id: 'tigerhill', name: 'Tiger Hill',         sub: 'Sunrise · 2590 m',          x: 318, y:  78, kind: 'view',    time: '04:30', desc: 'Pre-dawn ascent. First gold strikes Kanchenjunga at 5:14 am, then Everest in clear weather.' },
  { id: 'batasia',   name: 'Batasia Loop',       sub: 'Toy train · 1936',          x: 268, y: 140, kind: 'heritage', time: '06:15', desc: 'The famous spiral of the Darjeeling Himalayan Railway, with a war memorial in the centre.' },
  { id: 'ghoom',     name: 'Ghoom Monastery',    sub: 'Yiga Choeling · 1875',      x: 224, y: 196, kind: 'temple',  time: '07:00', desc: 'Oldest monastery in Darjeeling, 15-foot Maitreya Buddha, Mongolian style.' },
  { id: 'jalapahar', name: 'Jalapahar',          sub: 'Military hill · 2440 m',    x: 196, y: 268, kind: 'view',    time: '08:00', desc: 'Pine-covered military ridge with panoramic town views.' },
  { id: 'mall',      name: 'Chowrasta Mall',     sub: 'Town centre',               x: 178, y: 316, kind: 'town',    time: '09:30', desc: 'The heart of Darjeeling — bandstand, Oxford Books, Keventer’s.' },
  { id: 'mahakal',   name: 'Observatory Hill',   sub: 'Mahakal Mandir',            x: 165, y: 295, kind: 'temple',  time: '10:00', desc: 'Shared Hindu-Buddhist shrine. Walk up from Mall with prayer flags.' },
  { id: 'happy',     name: 'Happy Valley Tea',   sub: 'Working estate · 1854',     x:  98, y: 360, kind: 'tea',     time: '11:00', desc: 'Pluck a leaf, taste the season’s first flush, walk the slopes.' },
  { id: 'hmi',       name: 'HMI & Zoo',          sub: 'Mountaineering Institute',  x: 138, y: 410, kind: 'museum',  time: '13:30', desc: 'Tenzing Norgay’s museum + Padmaja Naidu Himalayan Zoo (snow leopards).' },
  { id: 'peace',     name: 'Peace Pagoda',       sub: 'Japanese Buddhist · 1992',  x: 226, y: 432, kind: 'temple',  time: '14:30', desc: 'White stupa overlooking the valley. Hushed, even with crowds.' },
  { id: 'rock',      name: 'Rock Garden',        sub: 'Chunnu Summer Falls',       x:  76, y: 482, kind: 'view',    time: '16:00', desc: 'Cascading falls + terraced gardens carved into the cliffside.' },
  { id: 'lebong',    name: 'Lebong Race Course', sub: 'World’s highest · 1885', x:  62, y: 218, kind: 'view',  time: '17:00', desc: 'The smallest and highest race course in the world, now mostly a parade ground.' }
];

export const roads = [
  { id: 'hcr',  name: 'Hill Cart Road',       cls: 'main', d: 'M 360,60 Q 320,90 290,130 Q 240,180 200,260 Q 175,310 150,370 Q 120,430 70,500 L 30,560' },
  { id: 'mall', name: 'Mall Road',            cls: 'main', d: 'M 178,316 C 140,302 130,330 140,360 C 155,395 200,395 215,365 C 230,335 215,310 178,316 Z' },
  { id: 'lcr',  name: 'Lebong Cart Road',     cls: 'main', d: 'M 178,316 Q 130,290 100,250 Q 70,210 50,160' },
  { id: 'cbr',  name: 'Cooch Behar Rd',       cls: 'sec',  d: 'M 178,316 L 230,340 L 290,330' },
  { id: 'rob',  name: 'Robertson Rd',         cls: 'sec',  d: 'M 165,295 L 130,310 L 100,340' },
  { id: 'auck', name: 'Auckland Rd',          cls: 'sec',  d: 'M 200,260 L 240,290 L 270,310' },
  { id: 'gan',  name: 'Gandhi Rd',            cls: 'sec',  d: 'M 178,316 L 200,360 L 215,400' },
  { id: 'cir',  name: 'Circular Rd',          cls: 'sec',  d: 'M 224,196 Q 195,230 165,260' },
  { id: 'jp',   name: 'Jalapahar Rd',         cls: 'sec',  d: 'M 196,268 Q 175,290 160,315' }
];

export const findPin = (id) => pins.find(p => p.id === id);
