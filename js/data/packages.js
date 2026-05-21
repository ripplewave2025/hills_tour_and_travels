/* ==========================================
   HILLS TOUR & TRAVELS — SIGHTSEEING PACKAGES
   ========================================== */

export const packages = [
  /* --- Mirik Lake & Bokar Monastery --- */
  {
    id: "mirik-lake-bokar",
    destinationId: "mirik",
    name: "Mirik Lake & Bokar Monastery Day",
    duration: "Full Day (8 Hours)",
    priceSedan: 2400,
    priceSuv: 3400,
    attractions: [
      "Sumendu Lake & Arch Footbridge (Boating)",
      "Bokar Monastery (Hilltop Meditation Center)",
      "Tingling View Point (Tea Garden Panorama)",
      "Mirik Pine Tree Trails",
      "Pashupati Market (Nepal Border — optional)"
    ],
    description: "Spend the day at tranquil Sumendu Lake — boating, the arching footbridge, and pine-shaded trails. Climb to Bokar Monastery for meditation views directly over the lake, then take in sweeping tea-garden vistas at Tingling View Point.",
    suvOnly: false,
    restrictions: ["Indian identity card required if continuing across the buffer to Pashupati Market."]
  },

  /* --- Teesta River Adventure --- */
  {
    id: "teesta-river-adventure",
    destinationId: "teesta",
    name: "Teesta River Adventure & Rafting",
    duration: "Full Day (8 Hours)",
    priceSedan: 2600,
    priceSuv: 3600,
    attractions: [
      "Lovers Meet View Point (Rangeet–Teesta Confluence)",
      "Triveni Camping Ground & Sangam",
      "Teesta White-Water Rafting (Class II–III)",
      "Coronation Bridge",
      "Sevoke Viewpoint"
    ],
    description: "Stand on the highway and look down at the bird's-eye confluence of the Rangeet and Teesta rivers, then descend to the white sand at Triveni for a riverside bonfire or an overnight stay. White-water rafting routes carve through the deep gorges of the valley.",
    suvOnly: false,
    restrictions: ["Rafting is river-level dependent — operators may cancel during heavy monsoon flows for safety."]
  },

  /* --- Darjeeling Toy Train + Happy Valley --- */
  {
    id: "darjeeling-toy-train-tea",
    destinationId: "darjeeling",
    name: "Toy Train Joyride & Happy Valley Tea Tour",
    duration: "5 Hours (Half Day)",
    priceSedan: 2000,
    priceSuv: 2900,
    attractions: [
      "Darjeeling Himalayan Railway Toy Train Joyride",
      "Ghoom Station & DHR Museum",
      "Batasia Loop & War Memorial",
      "Happy Valley Tea Estate (Est. 1854)",
      "Chowrasta / The Mall (free time)"
    ],
    description: "Ride the UNESCO World Heritage 'Toy Train' through the loop at Batasia, then walk the green slopes of Happy Valley — the most accessible tea garden from town, in continuous operation since 1854 — and wrap up at Chowrasta for chai and people-watching.",
    suvOnly: false,
    restrictions: ["Toy Train joyride tickets sell out fast in season — book at least 24 hours in advance through us."]
  },

  /* --- Lamahatta · Takdah · Tinchuley Loop --- */
  {
    id: "lamahatta-takdah-tinchuley",
    destinationId: "lamahatta-takdah",
    name: "Lamahatta · Takdah · Tinchuley Loop",
    duration: "5–6 Hours (Half Day)",
    priceSedan: 2200,
    priceSuv: 3200,
    attractions: [
      "Lamahatta Eco Park",
      "Takdah Orchid Center",
      "British Heritage Bungalows",
      "Tinchuley Viewpoint",
      "Peshok Tea Garden",
      "Gumbadara Viewpoint"
    ],
    description: "A scenic loop through misty pine forests at Lamahatta Eco Park, colonial-era heritage bungalows and orchid greenhouses at Takdah, ending at the offbeat Tinchuley viewpoint for unobstructed Kanchenjunga panoramas.",
    suvOnly: false,
    restrictions: []
  },
  /* --- Darjeeling Sightseeing --- */
  {
    id: "darjeeling-5-point",
    destinationId: "darjeeling",
    name: "Classic 5-Point Excursion",
    duration: "3 Hours (Half Day)",
    priceSedan: 1400,
    priceSuv: 2500,
    attractions: [
      "Japanese Temple",
      "Peace Pagoda",
      "Druk Choeling Monastery",
      "Tibet Museum",
      "Dhirdham Temple"
    ],
    description: "An elegant, low-pace spiritual tour covering colonial-era landmarks, Tibetan Buddhist architecture, and the serene Peace Pagoda offering panoramic views of Darjeeling town.",
    suvOnly: false,
    restrictions: []
  },
  {
    id: "darjeeling-7-point",
    destinationId: "darjeeling",
    name: "Darjeeling Heritage 7-Point Tour",
    duration: "4.5 Hours (Half Day)",
    priceSedan: 1800,
    priceSuv: 2700,
    attractions: [
      "Rangeet Valley Tea Garden",
      "Himalayan Mountaineering Institute (HMI)",
      "Padmaja Naidu Himalayan Zoo",
      "Darjeeling Ropeway",
      "Tenzing & Gombu Rocks",
      "Tibetan Refugee Self-Help Centre",
      "Lebong Race Course View"
    ],
    description: "Our most popular sightseeing package covering tea garden tasting, high-altitude wildlife (Red Pandas/Snow Leopards), historical mountaineering exhibits, and breathtaking cable car rides.",
    suvOnly: false,
    restrictions: []
  },
  {
    id: "darjeeling-tiger-hill",
    destinationId: "darjeeling",
    name: "Tiger Hill Golden Sunrise Tour",
    duration: "5 Hours (4:00 AM – 9:00 AM)",
    priceSedan: 1400,
    priceSuv: 2250,
    attractions: [
      "Tiger Hill Sunrise View (Mt. Kanchenjunga)",
      "Yiga Choeling Ghoom Monastery",
      "Batasia Loop & War Memorial"
    ],
    description: "Experience the world-famous golden sunrise illuminating Kanchenjunga and Mount Everest. Followed by a visit to the historic 1850s Ghoom Monastery and the loop engineering marvel.",
    suvOnly: false,
    restrictions: ["Requires early-morning start (strict 3:45 AM dispatch). Tiger Hill entry coupons must be booked in advance."]
  },
  {
    id: "darjeeling-rock-garden",
    destinationId: "darjeeling",
    name: "Rock Garden & Ganga Maya Adventure",
    duration: "4 Hours",
    priceSedan: 1800,
    priceSuv: 2700,
    attractions: [
      "Barbotey Rock Garden",
      "Ganga Maya Park",
      "Chunnu Summer Falls"
    ],
    description: "A steep, winding, scenic descent through lush forests to a multi-tiered rock garden carved around a mountain waterfall, featuring terraced seating and flowering gardens.",
    suvOnly: false,
    restrictions: ["Steep hair-pin curves. High-clearance vehicles recommended."]
  },
  {
    id: "darjeeling-mirik-excursion",
    destinationId: "darjeeling",
    name: "Mirik Lake & Nepal Border Borderlands",
    duration: "Full Day (8 Hours)",
    priceSedan: 3000,
    priceSuv: 4200,
    attractions: [
      "Sumendu Lake (Mirik)",
      "Pashupati Market (Nepal Border)",
      "Simana View Point",
      "Gopaldhara Tea Estate"
    ],
    description: "Traverse high mountain ridges along the international border with Nepal. Walk along the lakeside forest in Mirik and shop for authentic electronic/woolen wares in Pashupati Market.",
    suvOnly: false,
    restrictions: ["Indian identity cards required to cross the border buffer zones to Pashupati Market."]
  },

  /* --- Gangtok Sightseeing --- */
  {
    id: "gangtok-local-explorer",
    destinationId: "gangtok",
    name: "Gangtok Signature 10-Point Explorer",
    duration: "Full Day (8 Hours)",
    priceSedan: 2800,
    priceSuv: 4500,
    attractions: [
      "Tashi Viewpoint",
      "Ganesh Tok",
      "Hanuman Tok",
      "Do Drul Chorten Stupa",
      "Namgyal Institute of Tibetology",
      "Flower Exhibition Center",
      "Enchey Monastery",
      "Banjhakri Waterfalls",
      "Lhasa Falls",
      "Ranka Monastery"
    ],
    description: "A comprehensive sightseeing module exploring Buddhist heritage, cultural museums, floral exhibitions, and high altitude panoramic vistas of Gangtok.",
    suvOnly: false,
    restrictions: []
  },
  {
    id: "gangtok-tsomgo-circuit",
    destinationId: "gangtok",
    name: "Tsomgo Lake & Baba Mandir Excursion",
    duration: "Full Day (7:30 AM – 3:30 PM)",
    priceSedan: null, // Banned by regulation
    priceSuv: 4800,
    attractions: [
      "Tsomgo (Changu) Glacier Lake (12,310 ft)",
      "New Baba Harbhajan Singh Mandir",
      "Mandakini Waterfalls"
    ],
    description: "Ascend to the breathtaking, high-altitude alpine lake sacred to the local people. Pay respects at the unique memorial shrine of Baba Harbhajan Singh.",
    suvOnly: true,
    restrictions: [
      "Protected Area Permit (PAP) mandatory.",
      "Strictly SUV-only (hatchbacks/sedans are legally barred).",
      "Aadhaar cards and PAN cards are NOT legally accepted for permit processing; only Voter ID, Passport, or DL are allowed."
    ]
  },
  {
    id: "gangtok-nathula-pass",
    destinationId: "gangtok",
    name: "Nathula Pass Indo-China Border Extension",
    duration: "Full Day (7:00 AM – 4:00 PM)",
    priceSedan: null,
    priceSuv: 6800,
    attractions: [
      "Nathula Pass Indo-China Border Gate (14,140 ft)",
      "Tsomgo Glacier Lake",
      "Baba Harbhajan Singh Mandir"
    ],
    description: "An ultimate high-altitude pilgrimage to the historic Silk Road mountain pass separating India and Tibet Autonomous Region, China.",
    suvOnly: true,
    restrictions: [
      "Protected Area Permit (PAP) mandatory with early application (1 day in advance).",
      "Strictly restricted to Indian nationals only.",
      "Nathula is completely closed on Mondays and Tuesdays. Documents must be submitted by 10:00 AM at the check-post."
    ]
  },
  {
    id: "sikkim-north-expedition",
    destinationId: "gangtok",
    name: "North Sikkim Majestic Expedition (Lachen & Lachung)",
    duration: "3 Days / 2 Nights",
    priceSedan: null,
    priceSuv: 18500,
    attractions: [
      "Gurudongmar Sacred Lake (17,800 ft)",
      "Yumthang Valley of Flowers",
      "Lachen & Lachung Monasteries",
      "Seven Sisters Waterfalls",
      "Zero Point (Yumesamdong)"
    ],
    description: "A legendary adventure through high-altitude desert plateaus, alpine valleys, bubbling thermal springs, and the sacred Gurudongmar Lake, one of the highest lakes in the world.",
    suvOnly: true,
    restrictions: [
      "Requires 3-day dedicated custom SUV dispatch.",
      "Extreme altitude. Not recommended for infants or tourists with severe respiratory illnesses.",
      "Requires specialized Protected Area Permits (PAP)."
    ]
  },

  /* --- Kalimpong Sightseeing --- */
  {
    id: "kalimpong-heritage-5pt",
    destinationId: "kalimpong",
    name: "Kalimpong Heritage & Deolo Hill 5-Point Tour",
    duration: "4 Hours (Half Day)",
    priceSedan: 2200,
    priceSuv: 3200,
    attractions: [
      "Deolo Hill (Highest Point & Paragliding)",
      "Durpin Dara Monastery (Zang Dhok Palri Phodang)",
      "Morgan House (Colonial Heritage Architecture)",
      "Pine View Cactus Nursery",
      "Mangal Dham Temple"
    ],
    description: "A refined half-day cultural expedition through Kalimpong's hilltop monasteries, colonial-era heritage mansions, panoramic paragliding viewpoints, and world-class botanical nurseries exporting exotic orchids globally.",
    suvOnly: false,
    restrictions: []
  },

  /* --- Kurseong Sightseeing --- */
  {
    id: "kurseong-heritage-6pt",
    destinationId: "kurseong",
    name: "Kurseong Heritage & Makaibari Tea Tour",
    duration: "5 Hours (Half Day)",
    priceSedan: 1800,
    priceSuv: 2800,
    attractions: [
      "Eagle's Craig Viewpoint",
      "Dow Hill Eco Park & Forest",
      "Makaibari Tea Estate (Heritage Tea Factory Tours)",
      "Giddapahar Viewpoint & Seti Mata Temple",
      "Netaji Subhas Chandra Bose Museum",
      "Ambotia Shiva Mandir"
    ],
    description: "An immersive journey through the Land of White Orchids — featuring panoramic eagle-eye viewpoints, heritage tea factory walkthroughs at Makaibari (world's first organic tea estate), haunted colonial-era boarding school forests, and powerful independence-era museums.",
    suvOnly: false,
    restrictions: []
  },

  /* --- Siliguri / Bagdogra Gateway Sightseeing --- */
  {
    id: "siliguri-gateway-5pt",
    destinationId: "siliguri",
    name: "Siliguri Gateway & Bengal Safari Explorer",
    duration: "4.5 Hours (Half Day)",
    priceSedan: 2000,
    priceSuv: 3000,
    attractions: [
      "Bengal Safari Park (Royal Bengal Tiger Habitat)",
      "Salugara Monastery & Kali Mandir Stupa",
      "ISKCON Sri Sri Radha Madhava Temple",
      "Hong Kong Market (Iconic Electronics & Fashion Bazaar)",
      "Mahananda Wildlife Sanctuary Gateway"
    ],
    description: "Explore the vibrant gateway city connecting the Himalayan corridors — from Bengal Safari Park's majestic tiger habitats and ancient monastery stupas to the bustling Hong Kong Market bazaars and serene wildlife sanctuary borders.",
    suvOnly: false,
    restrictions: []
  },

  /* --- Nepal Borderlands & Ilam Tea --- */
  {
    id: "nepal-borderlands-expedition",
    destinationId: "nepal",
    name: "Nepal Borderlands & Ilam Tea Expedition",
    duration: "Full Day (10–12 Hours)",
    priceSedan: 5500,
    priceSuv: 7500,
    attractions: [
      "Panitanki Border Crossing (Indian Side Customs)",
      "Kakarvitta (Nepal Transit Hub)",
      "Ilam Tea Gardens & Rolling Hills",
      "Kanyam Picnic Viewpoint",
      "Antu Danda (Sunrise Viewpoint, Eastern Nepal)"
    ],
    description: "An overland expedition through the eastern Nepal border corridor, featuring lush Nepalese tea plantations in Ilam, scenic Kanyam panoramas, and the legendary Antu Danda sunrise viewpoint — where the first light of Nepal touches the earth.",
    suvOnly: false,
    restrictions: ["Requires Border Custom Permit (Bhansar) and Yatayat Anumati.", "Indian vehicles allowed a maximum of 30 days per year in Nepal."]
  },

  /* --- Bhutan Thunder Dragon --- */
  {
    id: "bhutan-thunder-dragon-voyage",
    destinationId: "bhutan",
    name: "Bhutan Thunder Dragon Cultural Voyage",
    duration: "3 Days / 2 Nights",
    priceSedan: 18000,
    priceSuv: 26000,
    attractions: [
      "Phuentsholing Gate (Border Handshake Hub)",
      "Karbandi Monastery (Phuentsholing)",
      "Thimphu City Center & Clock Tower Square",
      "Buddha Dordenma (Massive Buddha Statue)",
      "Tashichho Dzong (Fortress & Government Seat)",
      "Paro Taktsang (Tiger's Nest — Heavy Trekking)"
    ],
    description: "A legendary cultural voyage into the Land of the Thunder Dragon — spanning ancient cliff monasteries, fortress dzongs guarding pristine valleys, the colossal Buddha Dordenma overlooking Thimphu, and the gravity-defying Tiger's Nest clinging to a Himalayan cliff face.",
    suvOnly: false,
    restrictions: ["Vehicle + driver only — SDF of ₹1,200/person/night and ₹4,500 daily Green Tax are billed separately.", "Indian vehicles swap at Jaigaon/Phuentsholing border; in-country transport on Bhutanese plate."]
  }
];
