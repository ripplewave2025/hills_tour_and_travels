/* ==========================================
   HILLS TOUR & TRAVELS — SIGHTSEEING PACKAGES
   ==========================================
   Every package carries a `category` duration tier so the UI can group
   them cleanly for travellers:
     'one-time'  — a single quick experience (2–4 hrs)
     'half-day'  — a morning or afternoon circuit (4–6 hrs)
     'full-day'  — a complete day out (7–9 hrs)
     'two-day'   — an overnight escape (1 night)
     'multi-day' — a dedicated expedition (2+ nights)
   Prices are starting fares (whole vehicle, not per head); SUV fares apply
   where hatchback/sedan entry is restricted. Benchmarked against 2026
   government taxi charts — see claude_research.md.
   ========================================== */

export const CATEGORY_LABELS = {
  'one-time': 'One-Time Quick Trip',
  'half-day': 'Half-Day Tour',
  'full-day': 'Full-Day Tour',
  'two-day': '2-Day Escape',
  'multi-day': 'Multi-Day Expedition'
};

// Order in which duration tiers are shown in the packages sheet
export const CATEGORY_ORDER = ['one-time', 'half-day', 'full-day', 'two-day', 'multi-day'];

export const packages = [
  /* ===================== DARJEELING ===================== */
  {
    id: "darjeeling-tiger-hill",
    destinationId: "darjeeling",
    name: "Tiger Hill Golden Sunrise",
    category: "one-time",
    duration: "Early Morning · 4–5 hrs",
    priceSedan: 1400,
    priceSuv: 2250,
    attractions: [
      "Tiger Hill Sunrise over Kanchenjunga",
      "Ghoom Monastery (Yiga Choeling)",
      "Batasia Loop & War Memorial"
    ],
    description: "The closest sunrise you'll ever see — golden first light on Kanchenjunga, then the 1850s Ghoom Monastery and the famous toy-train loop on the way back.",
    suvOnly: false,
    restrictions: ["Strict 3:45 AM dispatch. Tiger Hill entry coupons booked in advance."]
  },
  {
    id: "darjeeling-ropeway-ride",
    destinationId: "darjeeling",
    name: "Darjeeling Ropeway & Tea Garden",
    category: "one-time",
    duration: "2.5–3 hrs",
    priceSedan: 1200,
    priceSuv: 1900,
    attractions: [
      "Darjeeling Ropeway (Rangeet Valley cable car)",
      "Happy Valley Tea Estate (Est. 1854)"
    ],
    description: "A short, scenic outing: glide over the Rangeet Valley tea estates by cable car, then walk the slopes of Darjeeling's most accessible tea garden.",
    suvOnly: false,
    restrictions: ["Ropeway closes in high winds; timings vary by season."]
  },
  {
    id: "darjeeling-5-point",
    destinationId: "darjeeling",
    name: "Darjeeling Spiritual 5-Point",
    category: "half-day",
    duration: "3–4 hrs",
    priceSedan: 1400,
    priceSuv: 2500,
    attractions: [
      "Japanese Peace Pagoda",
      "Dali (Druk Sangak Choling) Monastery",
      "Tibet Museum",
      "Dhirdham Temple",
      "Chowrasta / The Mall"
    ],
    description: "An easy, low-pace tour of Darjeeling's calmest spots — Tibetan Buddhist temples, the white Peace Pagoda, and the town's lively Mall.",
    suvOnly: false,
    restrictions: []
  },
  {
    id: "darjeeling-toy-train-tea",
    destinationId: "darjeeling",
    name: "Toy Train Joyride & Happy Valley Tea",
    category: "half-day",
    duration: "5 hrs",
    priceSedan: 2000,
    priceSuv: 2900,
    attractions: [
      "Darjeeling Himalayan Railway Toy Train Joyride",
      "Ghoom Station & DHR Museum",
      "Batasia Loop & War Memorial",
      "Happy Valley Tea Estate"
    ],
    description: "Ride the UNESCO World Heritage 'Toy Train' through the Batasia loop, then walk the green slopes of the 1854 Happy Valley tea garden.",
    suvOnly: false,
    restrictions: ["Toy Train tickets sell out fast in season — book at least 24 hours ahead."]
  },
  {
    id: "darjeeling-rock-garden",
    destinationId: "darjeeling",
    name: "Rock Garden & Ganga Maya Park",
    category: "half-day",
    duration: "4 hrs",
    priceSedan: 1800,
    priceSuv: 2700,
    attractions: [
      "Barbotey Rock Garden",
      "Ganga Maya Park",
      "Chunnu Summer Falls"
    ],
    description: "A winding descent through forest to a multi-tiered garden carved around a mountain waterfall, with terraced seating and flowering beds.",
    suvOnly: false,
    restrictions: ["Steep hairpin curves; high-clearance vehicles recommended."]
  },
  {
    id: "darjeeling-7-point",
    destinationId: "darjeeling",
    name: "Darjeeling Signature Full-Day",
    category: "full-day",
    duration: "Full Day · 7–8 hrs",
    priceSedan: 2600,
    priceSuv: 3600,
    attractions: [
      "Tiger Hill Sunrise (optional early start)",
      "Padmaja Naidu Himalayan Zoo (Red Panda, Snow Leopard)",
      "Himalayan Mountaineering Institute (HMI)",
      "Darjeeling Ropeway",
      "Tibetan Refugee Self-Help Centre",
      "Tea garden tasting + Chowrasta"
    ],
    description: "Our most complete Darjeeling day — high-altitude wildlife, mountaineering history, the cable car, tea tasting and the Mall, all in one well-paced loop.",
    suvOnly: false,
    restrictions: []
  },
  {
    id: "darjeeling-mirik-excursion",
    destinationId: "darjeeling",
    name: "Darjeeling → Mirik & Nepal Border",
    category: "full-day",
    duration: "Full Day · 8 hrs",
    priceSedan: 3000,
    priceSuv: 4200,
    attractions: [
      "Sumendu Lake (Mirik)",
      "Pashupati Market (Nepal Border)",
      "Simana View Point",
      "Gopaldhara Tea Estate"
    ],
    description: "Ride the ridgeline along the Nepal border, boat on Mirik's Sumendu Lake, and shop the Pashupati border market.",
    suvOnly: false,
    restrictions: ["Indian ID card needed to cross the border buffer to Pashupati Market."]
  },
  {
    id: "darjeeling-mirik-2day",
    destinationId: "darjeeling",
    name: "Darjeeling + Mirik 2-Day Escape",
    category: "two-day",
    duration: "2 Days / 1 Night",
    priceSedan: 6500,
    priceSuv: 8500,
    attractions: [
      "Day 1 — Tiger Hill sunrise, Ghoom, Batasia, Darjeeling sightseeing",
      "Overnight in Darjeeling",
      "Day 2 — Mirik Lake, tea gardens & Simana on the way down"
    ],
    description: "The relaxed way to see the best of the hills: a full Darjeeling day, a night in town, and a scenic Mirik run on the way back to the plains.",
    suvOnly: false,
    restrictions: ["Hotel billed separately — we can arrange partner stays on request."]
  },

  /* ===================== GANGTOK / SIKKIM ===================== */
  {
    id: "gangtok-local-explorer",
    destinationId: "gangtok",
    name: "Gangtok Signature 10-Point",
    category: "full-day",
    duration: "Full Day · 8 hrs",
    priceSedan: 2800,
    priceSuv: 4000,
    attractions: [
      "Tashi Viewpoint", "Ganesh Tok", "Hanuman Tok",
      "Do Drul Chorten Stupa", "Namgyal Institute of Tibetology",
      "Flower Exhibition Centre", "Enchey Monastery",
      "Banjhakri Waterfalls", "Ranka Monastery", "MG Marg"
    ],
    description: "The complete Gangtok city day — Buddhist monasteries, viewpoints, museums and waterfalls, ending at the vehicle-free MG Marg promenade.",
    suvOnly: false,
    restrictions: ["Sightseeing inside Sikkim uses a local Sikkim-registered vehicle."]
  },
  {
    id: "gangtok-tsomgo-circuit",
    destinationId: "gangtok",
    name: "Tsomgo Lake & Baba Mandir",
    category: "full-day",
    duration: "Full Day · 7:30 AM – 3:30 PM",
    priceSedan: null,
    priceSuv: 4800,
    attractions: [
      "Tsomgo (Changu) Glacier Lake — 12,310 ft",
      "Baba Harbhajan Singh Mandir",
      "Yak rides & Mandakini Falls"
    ],
    description: "Climb to the sacred high-altitude glacial lake that changes colour with the seasons, and the unique memorial shrine of Baba Harbhajan Singh.",
    suvOnly: true,
    restrictions: [
      "Protected Area Permit (PAP) mandatory; arranged by us.",
      "SUV-only — hatchbacks/sedans are legally barred.",
      "Permits need Voter ID, Passport or DL (Aadhaar/PAN not accepted)."
    ]
  },
  {
    id: "gangtok-nathula-pass",
    destinationId: "gangtok",
    name: "Nathula Pass Indo-China Border",
    category: "full-day",
    duration: "Full Day · 7:00 AM – 4:00 PM",
    priceSedan: null,
    priceSuv: 6800,
    attractions: [
      "Nathula Pass Border Gate — 14,140 ft",
      "Tsomgo Glacier Lake",
      "Baba Harbhajan Singh Mandir"
    ],
    description: "A high-altitude journey to the historic Silk Road pass on the India–China border, combined with Tsomgo Lake and Baba Mandir.",
    suvOnly: true,
    restrictions: [
      "PAP mandatory, applied 1 day in advance.",
      "Indian nationals only — foreigners not permitted.",
      "Closed Mondays & Tuesdays; documents in by 10:00 AM."
    ]
  },
  {
    id: "gangtok-tsomgo-2day",
    destinationId: "gangtok",
    name: "Gangtok + Tsomgo 2-Day Starter",
    category: "two-day",
    duration: "2 Days / 1 Night",
    priceSedan: null,
    priceSuv: 9500,
    attractions: [
      "Day 1 — Bagdogra/NJP transfer + Gangtok local sightseeing",
      "Overnight in Gangtok",
      "Day 2 — Tsomgo Lake & Baba Mandir (PAP, SUV)"
    ],
    description: "The easiest first taste of Sikkim — a city day in Gangtok, a night in the capital, and the Tsomgo Lake high-altitude run the next morning.",
    suvOnly: true,
    restrictions: ["SUV-only for the Tsomgo leg; PAP arranged by us.", "Hotel billed separately."]
  },
  {
    id: "sikkim-north-expedition",
    destinationId: "gangtok",
    name: "North Sikkim Expedition (Lachen & Lachung)",
    category: "multi-day",
    duration: "3 Days / 2 Nights",
    priceSedan: null,
    priceSuv: 18500,
    attractions: [
      "Gurudongmar Sacred Lake — 17,800 ft",
      "Yumthang Valley of Flowers",
      "Lachen & Lachung Monasteries",
      "Zero Point (Yumesamdong)"
    ],
    description: "A legendary high-altitude expedition through alpine valleys, thermal springs and the sacred Gurudongmar Lake, one of the highest lakes on earth.",
    suvOnly: true,
    restrictions: [
      "Dedicated 3-day SUV dispatch with specialized PAPs.",
      "Extreme altitude — not advised for infants or severe respiratory conditions."
    ]
  },

  /* ===================== KALIMPONG ===================== */
  {
    id: "kalimpong-heritage-5pt",
    destinationId: "kalimpong",
    name: "Kalimpong Heritage & Deolo Hill",
    category: "half-day",
    duration: "4–5 hrs",
    priceSedan: 2200,
    priceSuv: 3200,
    attractions: [
      "Deolo Hill (highest point, paragliding)",
      "Durpin Monastery (Zang Dhok Palri Phodang)",
      "Morgan House (colonial heritage)",
      "Pine View Cactus Nursery",
      "Mangal Dham Temple"
    ],
    description: "Hilltop monasteries, colonial mansions, paragliding viewpoints and world-class orchid & cactus nurseries — Kalimpong in one easy half-day.",
    suvOnly: false,
    restrictions: []
  },

  /* ===================== KURSEONG ===================== */
  {
    id: "kurseong-heritage-6pt",
    destinationId: "kurseong",
    name: "Kurseong Heritage & Makaibari Tea",
    category: "half-day",
    duration: "5 hrs",
    priceSedan: 1800,
    priceSuv: 2800,
    attractions: [
      "Eagle's Crag Viewpoint",
      "Dow Hill Eco Park & Forest",
      "Makaibari Tea Estate (heritage factory tour)",
      "Giddapahar Viewpoint & Seti Mata Temple",
      "Netaji Subhas Chandra Bose Museum"
    ],
    description: "The Land of White Orchids — eagle-eye viewpoints, the world's first organic tea estate at Makaibari, misty forests and an independence-era museum.",
    suvOnly: false,
    restrictions: []
  },

  /* ===================== MIRIK ===================== */
  {
    id: "mirik-lake-bokar",
    destinationId: "mirik",
    name: "Mirik Lake & Bokar Monastery",
    category: "full-day",
    duration: "Full Day · 8 hrs",
    priceSedan: 2400,
    priceSuv: 3400,
    attractions: [
      "Sumendu Lake & arch footbridge (boating)",
      "Bokar Monastery (hilltop meditation centre)",
      "Tingling View Point (tea-garden panorama)",
      "Pashupati Market (Nepal border — optional)"
    ],
    description: "A calm day at Sumendu Lake — boating and pine trails — plus Bokar Monastery's lake views and sweeping tea-garden vistas at Tingling.",
    suvOnly: false,
    restrictions: ["Indian ID needed to cross to Pashupati Market."]
  },

  /* ===================== LAMAHATTA · TAKDAH · TINCHULEY ===================== */
  {
    id: "lamahatta-takdah-tinchuley",
    destinationId: "lamahatta-takdah",
    name: "Lamahatta · Takdah · Tinchuley Loop",
    category: "half-day",
    duration: "5–6 hrs",
    priceSedan: 2200,
    priceSuv: 3200,
    attractions: [
      "Lamahatta Eco Park",
      "Takdah Orchid Centre & British heritage bungalows",
      "Tinchuley Viewpoint",
      "Peshok Tea Garden",
      "Gumbadara Viewpoint"
    ],
    description: "Misty pine forests at Lamahatta, colonial bungalows and orchids at Takdah, and offbeat Kanchenjunga panoramas at Tinchuley.",
    suvOnly: false,
    restrictions: []
  },

  /* ===================== TEESTA ===================== */
  {
    id: "teesta-river-adventure",
    destinationId: "teesta",
    name: "Teesta River Adventure & Rafting",
    category: "full-day",
    duration: "Full Day · 8 hrs",
    priceSedan: 2600,
    priceSuv: 3600,
    attractions: [
      "Lovers Meet View Point (Rangeet–Teesta confluence)",
      "Triveni Camping Ground & Sangam",
      "Teesta white-water rafting (Class II–III)",
      "Coronation Bridge"
    ],
    description: "See the rivers crash together from the highway, descend to the white sand at Triveni, and raft the gorges of the Teesta valley.",
    suvOnly: false,
    restrictions: ["Rafting is river-level dependent; may pause in heavy monsoon."]
  },

  /* ===================== SITTONG ===================== */
  {
    id: "sittong-orange-village",
    destinationId: "sittong",
    name: "Sittong Orange Village & Bamboo Church",
    category: "full-day",
    duration: "Full Day · 7–8 hrs",
    priceSedan: 2800,
    priceSuv: 3800,
    attractions: [
      "Orange orchards (best Nov–Jan)",
      "Sittong Bamboo Church",
      "Jogighat suspension bridge",
      "Riang River banks"
    ],
    description: "A quiet, offbeat day among orange orchards and clear streams, with Kanchenjunga views and warm homestay hospitality away from the crowds.",
    suvOnly: false,
    restrictions: ["Steep, partly unpaved roads — SUV strongly recommended."]
  },

  /* ===================== LAVA & LOLEGAON ===================== */
  {
    id: "lava-lolegaon-canopy",
    destinationId: "lava-lolegaon",
    name: "Lava, Lolegaon & Canopy Walk",
    category: "full-day",
    duration: "Full Day · 9 hrs",
    priceSedan: 3500,
    priceSuv: 4800,
    attractions: [
      "Lava Jamgyong Monastery",
      "Lolegaon Canopy Walk",
      "Neora Valley National Park edge",
      "Changey Waterfall"
    ],
    description: "Misty pine forests on the edge of Neora Valley, the famous Lolegaon canopy walk, and a serene Buddhist monastery at Lava.",
    suvOnly: false,
    restrictions: []
  },

  /* ===================== RESHI KHOLA ===================== */
  {
    id: "reshi-khola-riverside",
    destinationId: "reshi-khola",
    name: "Reshi Khola Riverside Retreat",
    category: "full-day",
    duration: "Full Day · 8 hrs",
    priceSedan: null,
    priceSuv: 4500,
    attractions: [
      "Reshi River banks & camping spots",
      "Angling / fishing",
      "Forest trekking trails",
      "Organic Himalayan meals"
    ],
    description: "A laid-back day by the Reshi River on the Bengal–Sikkim border — riverside walks, fishing, and birdsong away from any crowd.",
    suvOnly: true,
    restrictions: ["Gravel river tracks — SUV-only dispatch to the campsites."]
  },

  /* ===================== SILIGURI GATEWAY ===================== */
  {
    id: "siliguri-gateway-5pt",
    destinationId: "siliguri",
    name: "Siliguri Gateway & Bengal Safari",
    category: "half-day",
    duration: "4–5 hrs",
    priceSedan: 2000,
    priceSuv: 3000,
    attractions: [
      "Bengal Safari Park (Royal Bengal Tiger habitat)",
      "Salugara Monastery & Stupa",
      "ISKCON Temple",
      "Hong Kong Market"
    ],
    description: "A handy half-day in the gateway city — tiger safari, monastery stupa, and the buzzing Hong Kong Market, perfect for a layover.",
    suvOnly: false,
    restrictions: []
  },

  /* ===================== DARJEELING ZOO & HMI ===================== */
  {
    id: "darjeeling-zoo-hmi",
    destinationId: "darjeeling-zoo",
    name: "Padmaja Naidu Zoo & HMI",
    category: "one-time",
    duration: "2.5–3 hrs",
    priceSedan: 1200,
    priceSuv: 1900,
    attractions: [
      "Red Panda & Snow Leopard enclosures",
      "HMI Everest Museum",
      "Tenzing Rock"
    ],
    description: "A focused visit to the famous high-altitude zoo and the Himalayan Mountaineering Institute on the same campus.",
    suvOnly: false,
    restrictions: ["Closed on Thursdays."]
  },

  /* ===================== NEPAL ===================== */
  {
    id: "nepal-borderlands-expedition",
    destinationId: "nepal",
    name: "Nepal Borderlands & Ilam Tea",
    category: "full-day",
    duration: "Full Day · 10–12 hrs",
    priceSedan: 5500,
    priceSuv: 7500,
    attractions: [
      "Panitanki–Kakarvitta border crossing",
      "Ilam Tea Gardens",
      "Kanyam picnic viewpoint",
      "Antu Danda sunrise viewpoint"
    ],
    description: "An overland day into eastern Nepal — lush Ilam tea plantations, the Kanyam panorama, and the Antu Danda sunrise where Nepal's first light lands.",
    suvOnly: false,
    restrictions: ["Border Custom Permit (Bhansar) required.", "Indian vehicles allowed max 30 days/year in Nepal."]
  },

  /* ===================== BHUTAN ===================== */
  {
    id: "bhutan-thunder-dragon-voyage",
    destinationId: "bhutan",
    name: "Bhutan Thunder Dragon Voyage",
    category: "multi-day",
    duration: "3 Days / 2 Nights",
    priceSedan: 18000,
    priceSuv: 26000,
    attractions: [
      "Phuentsholing border gate",
      "Thimphu city & Buddha Dordenma",
      "Tashichho Dzong",
      "Paro Taktsang (Tiger's Nest trek)"
    ],
    description: "A cultural voyage into the Land of the Thunder Dragon — fortress dzongs, the colossal Buddha Dordenma, and the cliff-clinging Tiger's Nest.",
    suvOnly: false,
    restrictions: [
      "SDF ₹1,200/person/night + ₹4,500 daily Green Tax billed separately.",
      "Vehicles swap at Jaigaon/Phuentsholing; in-country transport on Bhutanese plate."
    ]
  }
];
