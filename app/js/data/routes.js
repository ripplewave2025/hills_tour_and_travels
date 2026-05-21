/* ==========================================
   HILLS TOUR & TRAVELS — TRANSIT ROUTES & FARES
   ========================================== */

export const routes = [
  /* --- Airport / Railway Hub drops --- */
  {
    from: "bagdogra-airport",
    fromName: "Bagdogra Airport (IXB)",
    to: "darjeeling",
    toName: "Darjeeling",
    distance: "68 km",
    duration: "2.5–3 hours",
    basePriceSedan: 2800,
    basePriceSuv: 4200,
    isCrossBorder: false,
    permitRequired: false
  },
  {
    from: "njp-station",
    fromName: "New Jalpaiguri Railway Station (NJP)",
    to: "darjeeling",
    toName: "Darjeeling",
    distance: "72 km",
    duration: "3 hours",
    basePriceSedan: 2800,
    basePriceSuv: 4200,
    isCrossBorder: false,
    permitRequired: false
  },
  {
    from: "bagdogra-airport",
    fromName: "Bagdogra Airport (IXB)",
    to: "gangtok",
    toName: "Gangtok",
    distance: "115 km",
    duration: "4.5–5 hours",
    basePriceSedan: 3500,
    basePriceSuv: 5000,
    isCrossBorder: false,
    permitRequired: false,
    alert: "Sikkim state geofencing applies. WB taxis drop at Deorali Stand."
  },
  {
    from: "njp-station",
    fromName: "New Jalpaiguri Railway Station (NJP)",
    to: "gangtok",
    toName: "Gangtok",
    distance: "120 km",
    duration: "5 hours",
    basePriceSedan: 3500,
    basePriceSuv: 5000,
    isCrossBorder: false,
    permitRequired: false,
    alert: "Sikkim state geofencing applies. WB taxis drop at Deorali Stand."
  },
  {
    from: "bagdogra-airport",
    fromName: "Bagdogra Airport (IXB)",
    to: "kalimpong",
    toName: "Kalimpong",
    distance: "75 km",
    duration: "2.5–3 hours",
    basePriceSedan: 2900,
    basePriceSuv: 4000,
    isCrossBorder: false,
    permitRequired: false
  },
  {
    from: "njp-station",
    fromName: "New Jalpaiguri Railway Station (NJP)",
    to: "kalimpong",
    toName: "Kalimpong",
    distance: "79 km",
    duration: "3 hours",
    basePriceSedan: 2900,
    basePriceSuv: 4000,
    isCrossBorder: false,
    permitRequired: false
  },
  {
    from: "bagdogra-airport",
    fromName: "Bagdogra Airport (IXB)",
    to: "pelling",
    toName: "Pelling",
    distance: "135 km",
    duration: "5–6 hours",
    basePriceSedan: 4200,
    basePriceSuv: 6000,
    isCrossBorder: false,
    permitRequired: false
  },
  {
    from: "bagdogra-airport",
    fromName: "Bagdogra Airport (IXB)",
    to: "mirik",
    toName: "Mirik",
    distance: "45 km",
    duration: "1.5–2 hours",
    basePriceSedan: 2200,
    basePriceSuv: 3200,
    isCrossBorder: false,
    permitRequired: false
  },
  
  /* --- Inter-Hill Transit --- */
  {
    from: "darjeeling",
    fromName: "Darjeeling",
    to: "gangtok",
    toName: "Gangtok",
    distance: "98 km",
    duration: "3.5 hours",
    basePriceSedan: 3200,
    basePriceSuv: 4800,
    isCrossBorder: false,
    permitRequired: false
  },
  {
    from: "darjeeling",
    fromName: "Darjeeling",
    to: "kalimpong",
    toName: "Kalimpong",
    distance: "50 km",
    duration: "2 hours",
    basePriceSedan: 2200,
    basePriceSuv: 3200,
    isCrossBorder: false,
    permitRequired: false
  },
  {
    from: "gangtok",
    fromName: "Gangtok",
    to: "kalimpong",
    toName: "Kalimpong",
    distance: "75 km",
    duration: "2.5 hours",
    basePriceSedan: 2800,
    basePriceSuv: 3800,
    isCrossBorder: false,
    permitRequired: false
  },

  /* --- Bhutan Corridors --- */
  {
    from: "bagdogra-airport",
    fromName: "Bagdogra Airport (IXB)",
    to: "jaigaon",
    toName: "Jaigaon (Bhutan Border)",
    distance: "170 km",
    duration: "4.5 hours",
    basePriceSedan: 4200,
    basePriceSuv: 5800,
    isCrossBorder: false,
    permitRequired: false
  },
  {
    from: "bagdogra-airport",
    fromName: "Bagdogra Airport (IXB)",
    to: "phuentsholing",
    toName: "Phuentsholing (Bhutan Entry)",
    distance: "172 km",
    duration: "5 hours",
    basePriceSedan: 4800,
    basePriceSuv: 6500,
    isCrossBorder: true,
    permitRequired: true,
    country: "bhutan",
    alert: "Bhutan border entry require physical tourist document verification."
  },
  {
    from: "bagdogra-airport",
    fromName: "Bagdogra Airport (IXB)",
    to: "thimphu",
    toName: "Thimphu (Bhutan Capital)",
    distance: "340 km",
    duration: "9–10 hours",
    basePriceSedan: null, // Banned due to daily Green Tax economics
    basePriceSuv: 11500,
    isCrossBorder: true,
    permitRequired: true,
    country: "bhutan",
    alert: "Bypasses Green Tax via optimized 'Jaigaon Swap' models unless reserved."
  },

  /* --- Nepal Corridors --- */
  {
    from: "bagdogra-airport",
    fromName: "Bagdogra Airport (IXB)",
    to: "kakarvitta",
    toName: "Kakarvitta (Nepal Border)",
    distance: "25 km",
    duration: "45 mins",
    basePriceSedan: 2500,
    basePriceSuv: 3500,
    isCrossBorder: true,
    permitRequired: true,
    country: "nepal"
  },
  {
    from: "bagdogra-airport",
    fromName: "Bagdogra Airport (IXB)",
    to: "kathmandu",
    toName: "Kathmandu (Nepal)",
    distance: "480 km",
    duration: "14–16 hours",
    basePriceSedan: null,
    basePriceSuv: 19500,
    isCrossBorder: true,
    permitRequired: true,
    country: "nepal",
    alert: "Includes automated pre-paid digital Bhansar customs processing."
  }
];
