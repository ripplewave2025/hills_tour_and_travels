// Compass — shared data, real Darjeeling details, and i18n strings.

// ─── DESTINATIONS (with geo + map coords) ────────────────────────────────
// Coords are SVG-space on the realistic 375×600 map.
const C_PINS = [
  { id: 'tigerhill', name: 'Tiger Hill',         sub: 'Sunrise · 2590 m',          x: 318, y:  78, kind: 'view',  time: '04:30', desc: 'Pre-dawn ascent. First gold strikes Kanchenjunga at 5:14 am, then Everest in clear weather.' },
  { id: 'batasia',   name: 'Batasia Loop',       sub: 'Toy train · 1936',          x: 268, y: 140, kind: 'heritage', time: '06:15', desc: 'The famous spiral of the Darjeeling Himalayan Railway, with a war memorial in the centre.' },
  { id: 'ghoom',     name: 'Ghoom Monastery',    sub: 'Yiga Choeling · 1875',      x: 224, y: 196, kind: 'temple', time: '07:00', desc: 'Oldest monastery in Darjeeling, 15-foot Maitreya Buddha, Mongolian style.' },
  { id: 'jalapahar', name: 'Jalapahar',          sub: 'Military hill · 2440 m',    x: 196, y: 268, kind: 'view',  time: '08:00', desc: 'Pine-covered military ridge with panoramic town views.' },
  { id: 'mall',      name: 'Chowrasta Mall',     sub: 'Town centre',               x: 178, y: 316, kind: 'town',  time: '09:30', desc: 'The heart of Darjeeling — bandstand, Oxford Books, Keventer\u2019s.' },
  { id: 'mahakal',   name: 'Observatory Hill',   sub: 'Mahakal Mandir',            x: 165, y: 295, kind: 'temple', time: '10:00', desc: 'Shared Hindu-Buddhist shrine. Walk up from Mall with prayer flags.' },
  { id: 'happy',     name: 'Happy Valley Tea',   sub: 'Working estate · 1854',     x:  98, y: 360, kind: 'tea',   time: '11:00', desc: 'Pluck a leaf, taste the season\u2019s first flush, walk the slopes.' },
  { id: 'hmi',       name: 'HMI & Zoo',          sub: 'Mountaineering Institute',  x: 138, y: 410, kind: 'museum', time: '13:30', desc: 'Tenzing Norgay\u2019s museum + Padmaja Naidu Himalayan Zoo (snow leopards).' },
  { id: 'peace',     name: 'Peace Pagoda',       sub: 'Japanese Buddhist · 1992',  x: 226, y: 432, kind: 'temple', time: '14:30', desc: 'White stupa overlooking the valley. Hushed, even with crowds.' },
  { id: 'rock',      name: 'Rock Garden',        sub: 'Chunnu Summer Falls',       x:  76, y: 482, kind: 'view',  time: '16:00', desc: 'Cascading falls + terraced gardens carved into the cliffside.' },
  { id: 'lebong',    name: 'Lebong Race Course', sub: 'World\u2019s highest · 1885', x:  62, y: 218, kind: 'view',  time: '17:00', desc: 'The smallest and highest race course in the world, now mostly a parade ground.' },
];

// Roads of Darjeeling — paths laid over the 375×600 map viewBox.
const C_ROADS = [
  { id: 'hcr',  name: 'Hill Cart Road',       cls: 'main',  d: 'M 360,60 Q 320,90 290,130 Q 240,180 200,260 Q 175,310 150,370 Q 120,430 70,500 L 30,560' },
  { id: 'mall', name: 'Mall Road',            cls: 'main',  d: 'M 178,316 C 140,302 130,330 140,360 C 155,395 200,395 215,365 C 230,335 215,310 178,316 Z' },
  { id: 'lcr',  name: 'Lebong Cart Road',     cls: 'main',  d: 'M 178,316 Q 130,290 100,250 Q 70,210 50,160' },
  { id: 'cbr',  name: 'Cooch Behar Rd',       cls: 'sec',   d: 'M 178,316 L 230,340 L 290,330' },
  { id: 'rob',  name: 'Robertson Rd',         cls: 'sec',   d: 'M 165,295 L 130,310 L 100,340' },
  { id: 'auck', name: 'Auckland Rd',          cls: 'sec',   d: 'M 200,260 L 240,290 L 270,310' },
  { id: 'gan',  name: 'Gandhi Rd',            cls: 'sec',   d: 'M 178,316 L 200,360 L 215,400' },
  { id: 'cir',  name: 'Circular Rd',          cls: 'sec',   d: 'M 224,196 Q 195,230 165,260' },
  { id: 'jp',   name: 'Jalapahar Rd',         cls: 'sec',   d: 'M 196,268 Q 175,290 160,315' },
];

// ─── PACKAGES ─────────────────────────────────────────────────────────────
const C_PACKAGES = [
  {
    id: 'sunrise', title: 'Sunrise at Tiger Hill', shortTitle: 'Sunrise Tiger Hill',
    duration: 'Half day · 4:30am – 12pm', days: 0.5, price: 2800, perPerson: false, badge: 'Most booked',
    stops: ['tigerhill', 'batasia', 'ghoom'],
    pitch: 'Pre-dawn pickup. First gold on Kanchenjunga. Steaming chai at Batasia.',
    includes: ['Pickup at 4:30 am', 'Driver-guide', 'Parking & entries', 'Hotel drop by noon'],
    excludes: ['Breakfast', 'Tipping', 'Camera fees'],
    coverMood: 'dawn',
  },
  {
    id: 'heritage', title: 'Heritage Loop', shortTitle: 'Heritage Loop',
    duration: 'Full day · 9am – 6pm', days: 1, price: 4200, perPerson: false, badge: 'Editor\u2019s pick',
    stops: ['mall', 'mahakal', 'happy', 'hmi', 'peace'],
    pitch: 'Slow wander through Darjeeling\u2019s soul — tea, prayer, books, vistas.',
    includes: ['7-hour cab', 'English-speaking driver', 'Tea estate guided tour', 'All entries'],
    excludes: ['Lunch', 'Ropeway tickets'],
    coverMood: 'golden',
  },
  {
    id: 'mirik', title: 'Mirik & Pashupati Border', shortTitle: 'Mirik Day Trip',
    duration: 'Full day · 8am – 7pm', days: 1, price: 5400, perPerson: false, badge: 'Scenic',
    stops: ['mall', 'happy', 'lebong'],
    pitch: 'Pine forests, a boat on Sumendu Lake, the Nepal border in your hand.',
    includes: ['Innova/SUV full day', 'Boating ticket', 'Driver allowance', 'Toll & parking'],
    excludes: ['Meals', 'Personal shopping'],
    coverMood: 'mist',
  },
  {
    id: 'hills3', title: '3 Nights · Hills Sampler', shortTitle: '3N Hills Sampler',
    duration: '3N · 4D · Darjeeling base', days: 3, price: 18500, perPerson: true, badge: 'Curated',
    stops: ['tigerhill', 'batasia', 'happy', 'mall', 'peace', 'rock'],
    pitch: 'Three unhurried days. Two sunrises. A tea estate tasting. A balcony of clouds.',
    includes: ['3N hotel (4★)', 'All transfers in Innova Crysta', 'Daily breakfast', 'Permits'],
    excludes: ['Air/train to NJP', 'Lunch & dinner', 'Adventure activities'],
    coverMood: 'night',
  },
];

// ─── CABS ─────────────────────────────────────────────────────────────────
const C_CABS = [
  { id: 'dzire',   name: 'Maruti Dzire',     cls: 'Sedan',   seats: 4, bags: 2, rate: 2800, hour: 350, note: 'Compact, AC' },
  { id: 'ertiga',  name: 'Maruti Ertiga',    cls: 'MUV',     seats: 6, bags: 3, rate: 3800, hour: 450, note: 'Family-friendly' },
  { id: 'scorpio', name: 'Mahindra Scorpio', cls: 'SUV',     seats: 6, bags: 4, rate: 4500, hour: 550, note: 'Hill-tested 4WD' },
  { id: 'innova',  name: 'Innova Crysta',    cls: 'Premium', seats: 7, bags: 5, rate: 5800, hour: 650, note: 'Long trips, premium' },
];

// ─── HOTELS (real Darjeeling stays) ───────────────────────────────────────
const C_HOTELS = [
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
  'Pickup from a different address',
];

// ─── DRIVERS (placeholders) ───────────────────────────────────────────────
const C_DRIVERS = [
  { id: 'nima',  name: 'Nima Sherpa',   yrs: 8,  rating: 4.94, plate: 'WB-77AB-2814', langs: ['en','ne','hi'], cab: 'Innova Crysta', init: 'NS', hue: 36 },
  { id: 'tashi', name: 'Tashi Lama',    yrs: 17, rating: 4.97, plate: 'WB-77C-1129',  langs: ['en','ne','hi','bn'], cab: 'Innova Crysta', init: 'TL', hue: 12 },
  { id: 'pemba', name: 'Pemba Bhutia',  yrs: 6,  rating: 4.89, plate: 'WB-77B-4402',  langs: ['en','ne','hi'], cab: 'Mahindra Scorpio', init: 'PB', hue: 200 },
  { id: 'karma', name: 'Karma Tamang',  yrs: 11, rating: 4.92, plate: 'WB-77A-7820',  langs: ['en','ne','hi','bn'], cab: 'Maruti Ertiga', init: 'KT', hue: 95 },
];

// ─── i18n ─────────────────────────────────────────────────────────────────
const C_LANGS = { en: 'English', hi: 'हिन्दी', bn: 'বাংলা', ne: 'नेपाली' };

const C_STRINGS = {
  appName:      { en: 'Hills T&T',       hi: 'हिल्स टी एंड टी', bn: 'হিলস টি অ্যান্ড টি', ne: 'हिल्स टी एण्ड टी' },
  tagline:      { en: 'Darjeeling, on tap.', hi: 'दार्जिलिंग, हाथ में।', bn: 'দার্জিলিং, হাতের মুঠোয়।', ne: 'दार्जिलिङ, हातैमा।' },
  search:       { en: 'Where to today?', hi: 'आज कहाँ चलें?',  bn: 'আজ কোথায় যাবেন?', ne: 'आज कहाँ जाने?' },
  todayPick:    { en: 'Today\u2019s pick',    hi: 'आज की पसंद',    bn: 'আজকের পছন্দ',     ne: 'आजको रोजाइ' },
  curated:      { en: 'Curated journeys', hi: 'चुनिंदा यात्राएँ', bn: 'বাছাই করা যাত্রা', ne: 'छानिएका यात्रा' },
  buildRoute:   { en: 'Build your route', hi: 'अपना रास्ता बनाएँ', bn: 'নিজের রুট তৈরি করুন', ne: 'आफ्नो बाटो बनाउनुहोस्' },
  pickStops:    { en: 'Pick the stops, we plan the rest.', hi: 'जगहें चुनिए, बाकी हम संभालेंगे।', bn: 'জায়গা বাছুন, বাকিটা আমরা সামলাব।', ne: 'ठाउँ छान्नुहोस्, बाँकी हामी मिलाउँछौँ।' },
  bookNow:      { en: 'Book now',         hi: 'अभी बुक करें',   bn: 'এখনই বুক করুন',   ne: 'अहिले बुक गर्नुहोस्' },
  reserve:      { en: 'Reserve',          hi: 'रिज़र्व करें',    bn: 'রিজার্ভ করুন',     ne: 'रिजर्भ गर्नुहोस्' },
  whatsappDriver: { en: 'WhatsApp driver', hi: 'ड्राइवर को WhatsApp', bn: 'চালককে WhatsApp', ne: 'चालकलाई WhatsApp' },
  callDriver:   { en: 'Call driver',      hi: 'ड्राइवर को कॉल', bn: 'চালককে কল করুন',   ne: 'चालकलाई कल' },
  guests:       { en: 'Guests',           hi: 'यात्री',          bn: 'অতিথি',           ne: 'यात्रु' },
  date:         { en: 'Date',             hi: 'तारीख',           bn: 'তারিখ',            ne: 'मिति' },
  cab:          { en: 'Cab',              hi: 'कैब',             bn: 'গাড়ি',            ne: 'गाडी' },
  total:        { en: 'Total',            hi: 'कुल',             bn: 'মোট',             ne: 'जम्मा' },
  pay:          { en: 'Pay',              hi: 'भुगतान',          bn: 'পেমেন্ট',          ne: 'भुक्तानी' },
  confirmed:    { en: 'Confirmed',        hi: 'पुष्टि हो गई',     bn: 'নিশ্চিত হয়েছে',     ne: 'पुष्टि भयो' },
  arriving:     { en: 'Arriving in',      hi: 'आ रहा है',        bn: 'আসছে',            ne: 'आउँदै' },
  enRoute:      { en: 'En route',         hi: 'रास्ते में',       bn: 'পথে',              ne: 'बाटोमा' },
  nextStop:     { en: 'Next stop',        hi: 'अगला पड़ाव',      bn: 'পরবর্তী স্টপ',       ne: 'अर्को बिसौनी' },
  trips:        { en: 'My trips',         hi: 'मेरी यात्राएँ',     bn: 'আমার যাত্রা',       ne: 'मेरा यात्रा' },
  signin:       { en: 'Sign in',          hi: 'साइन इन',         bn: 'সাইন ইন',          ne: 'साइन इन' },
  continueOTP:  { en: 'Continue with OTP', hi: 'OTP से जारी रखें', bn: 'OTP দিয়ে চালিয়ে যান', ne: 'OTP बाट जारी राख्नुहोस्' },
  getStarted:   { en: 'Get started',      hi: 'शुरू करें',        bn: 'শুরু করুন',         ne: 'सुरु गर्नुहोस्' },
  next:         { en: 'Next',             hi: 'अगला',            bn: 'পরবর্তী',          ne: 'अर्को' },
  skip:         { en: 'Skip',             hi: 'छोड़ें',           bn: 'এড়িয়ে যান',         ne: 'छोड्नुहोस्' },
};

// translation helper
const t = (lang, key) => (C_STRINGS[key] && C_STRINGS[key][lang]) || (C_STRINGS[key] && C_STRINGS[key].en) || key;

const fmt = (n) => '₹' + n.toLocaleString('en-IN');

const findPin = (id) => C_PINS.find((p) => p.id === id);

Object.assign(window, {
  C_PINS, C_ROADS, C_PACKAGES, C_CABS, C_HOTELS, C_DRIVERS, C_LANGS, C_STRINGS, t, fmt, findPin,
});
