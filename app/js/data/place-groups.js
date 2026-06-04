/* ==========================================
   HILLS TOUR & TRAVELS — PLACE GROUPS
   ==========================================
   Consolidates the many individual sub-destinations into the handful of
   headline "Places" the owner actually markets. Each place gathers the tour
   packages of all its member destinationIds, so the packages page can show one
   clean card per place instead of a sprawl of villages.

   To re-shuffle the grouping, just edit a `members` array below — the card's
   photo, elevation and permit flag are derived from the first member, and the
   bottom sheet lists every package across all members grouped by trip length.
   ========================================== */

import { destinations } from './destinations.js';

const byId = Object.fromEntries(destinations.map((d) => [d.id, d]));

// id: stable tab/query key · name/tagline: card copy · members: destinationIds
// whose packages roll up under this place · comingSoon: not yet bookable.
const GROUPS = [
  { id: 'darjeeling', name: 'Darjeeling',  tagline: 'Queen of the Hills',          members: ['darjeeling', 'darjeeling-zoo', 'lamahatta-takdah'] },
  { id: 'mirik',      name: 'Mirik',       tagline: 'The Lake of Whispers',         members: ['mirik'] },
  { id: 'kurseong',   name: 'Kurseong',    tagline: 'Land of White Orchids',        members: ['kurseong', 'sittong'] },
  { id: 'sikkim',     name: 'Sikkim',      tagline: 'The Cloud-Crowned State',      members: ['gangtok', 'reshi-khola'] },
  { id: 'kalimpong',  name: 'Kalimpong',   tagline: "The Horticulturist's Haven",   members: ['kalimpong', 'lava-lolegaon'] },
  { id: 'siliguri',   name: 'Siliguri',    tagline: 'The Gateway Corridor',         members: ['siliguri', 'teesta'] },
  { id: 'bhutan',     name: 'Bhutan',      tagline: 'Land of the Thunder Dragon',   members: ['bhutan'], comingSoon: true },
  { id: 'nepal',      name: 'Nepal',       tagline: 'Roof of the World',            members: ['nepal'],  comingSoon: true }
];

// Enrich each group with display fields pulled from its lead destination.
export const PLACE_GROUPS = GROUPS.map((g) => {
  const lead = byId[g.members[0]] || {};
  return {
    ...g,
    image: lead.image,
    elevation: lead.elevation,
    permitRequired: g.members.some((id) => byId[id]?.permitRequired)
  };
});
