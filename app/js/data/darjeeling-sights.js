/* ==========================================
   HILLS TOUR & TRAVELS — DARJEELING SIGHTSEEING SPOTS
   ==========================================
   Every famous Darjeeling sightseeing place in one place: a photo, the
   place name, and a one-line description. Photos live in
   app/images/darjeeling_sights/ (the owner's own set) and are resolved to
   hashed, build-safe URLs by Vite's import.meta.glob — drop a new image in
   that folder, add a row below, and it appears in the slider automatically.
   ========================================== */

// Eagerly import every spot photo as a URL string, keyed by file path.
const imageModules = import.meta.glob(
  '../../images/darjeeling_sights/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, query: '?url', import: 'default' }
);

// Build a { base-filename -> url } lookup so rows can reference a clean slug.
const imageBySlug = {};
for (const [path, url] of Object.entries(imageModules)) {
  const base = (path.split('/').pop() || '').replace(/\.[^.]+$/, '');
  imageBySlug[base] = url;
}

// One row per place. `file` matches the image's base filename (no extension).
// `chip` is the short category tag shown on the active card; `tagline` is the
// one-line description. These reuse the slider's existing card fields, so the
// design stays exactly the same — only the photos and names change.
const SPOTS = [
  {
    id: 'tiger-hill',
    file: 'tiger-hill',
    name: 'Tiger Hill',
    chip: 'Sunrise Point',
    tagline: "Darjeeling's most famous sunrise, where first light sets Kanchenjunga ablaze in gold."
  },
  {
    id: 'batasia-loop',
    file: 'batasia-loop',
    name: 'Batasia Loop',
    chip: 'Toy Train',
    tagline: 'A spiralling toy-train loop wrapped around a Gorkha war memorial and flower garden.'
  },
  {
    id: 'padmaja-naidu-zoo',
    file: 'padmaja-naidu-zoo',
    name: 'Padmaja Naidu Zoo',
    chip: 'Himalayan Wildlife',
    tagline: "India's largest high-altitude zoo, home to red pandas and snow leopards."
  },
  {
    id: 'himalayan-mountaineering-institute',
    file: 'himalayan-mountaineering-institute',
    name: 'Mountaineering Institute',
    chip: 'HMI Museum',
    tagline: "Tenzing Norgay's legendary climbing school, with an Everest museum and historic gear."
  },
  {
    id: 'happy-valley-tea-estate',
    file: 'happy-valley-tea-estate',
    name: 'Happy Valley Tea Estate',
    chip: 'Tea Garden',
    tagline: "Darjeeling's oldest tea garden (1854) — walk the slopes and watch the leaf being made."
  },
  {
    id: 'japanese-peace-pagoda',
    file: 'japanese-peace-pagoda',
    name: 'Japanese Peace Pagoda',
    chip: 'Buddhist Stupa',
    tagline: 'A gleaming white stupa with serene Kanchenjunga views and daily drum prayers.'
  },
  {
    id: 'dali-monastery',
    file: 'dali-monastery',
    name: 'Dali Monastery',
    chip: 'Monastery',
    tagline: 'A vivid Tibetan Buddhist monastery (Druk Sangak Choling) draped in murals and prayer flags.'
  },
  {
    id: 'observatory-hill',
    file: 'observatory-hill',
    name: 'Observatory Hill',
    chip: 'Sacred Hill',
    tagline: 'The sacred hilltop above Chowrasta, shared by the Mahakal temple and sweeping ridge views.'
  },
  {
    id: 'mall-road',
    file: 'mall-road',
    name: 'Mall Road & Chowrasta',
    chip: 'Town Square',
    tagline: "Darjeeling's lively pedestrian heart — cafés, curio shops and a bandstand on the open square."
  },
  {
    id: 'lloyds-botanical-garden',
    file: 'lloyds-botanical-garden',
    name: "Lloyd's Botanical Garden",
    chip: 'Botanical Garden',
    tagline: 'A peaceful Victorian-era garden of Himalayan orchids, ferns and towering conifers.'
  },
  {
    id: 'rock-garden',
    file: 'rock-garden',
    name: 'Rock Garden',
    chip: 'Waterfall Garden',
    tagline: 'A terraced garden carved around a tumbling mountain waterfall on the way to Ganga Maya.'
  },
  {
    id: 'nightingale-park',
    file: 'nightingale-park',
    name: 'Shrubbery Nightingale Park',
    chip: 'Hill Park',
    tagline: 'A landscaped hillside park with musical fountains and a grand Kanchenjunga viewing deck.'
  },
  {
    id: 'lamahatta-eco-park',
    file: 'lamahatta-eco-park',
    name: 'Lamahatta Eco Park',
    chip: 'Eco Park',
    tagline: 'A forested eco-park of pines and a sacred pond, with offbeat Himalayan vistas.'
  },
  {
    id: 'tinchuley-viewpoint',
    file: 'tinchuley-viewpoint',
    name: 'Tinchuley Viewpoint',
    chip: 'Ridge Viewpoint',
    tagline: 'A quiet ridge hamlet famed for organic farms and uninterrupted Kanchenjunga sunrises.'
  }
];

// Resolve each row's image and normalise to the shape the slider cards expect.
export const DARJEELING_SIGHTS = SPOTS
  .map((spot) => ({
    ...spot,
    image: imageBySlug[spot.file],
    permitRequired: false
  }))
  .filter((spot) => Boolean(spot.image));
