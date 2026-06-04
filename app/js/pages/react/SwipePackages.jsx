/* ==========================================
   HILLS TOUR & TRAVELS — DESTINATION SLIDER
   ==========================================
   Expanding-card slider (per design/curated/code_for_the_packages_slider.md):
   the active destination image fills the stage while the upcoming
   destinations queue as small cards on the right. Advancing rotates the
   deck; because every card is the SAME persistent DOM node that simply
   transitions to a new CSS position, the motion is smooth (no image
   "jumping"). Tabs (Destinations / Experiences) and the "See Packages"
   bottom sheet are preserved. Swipeable on touch.
   ========================================== */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { destinations } from '../../data/destinations.js';
import { PLACE_GROUPS } from '../../data/place-groups.js';
import { DARJEELING_SIGHTS } from '../../data/darjeeling-sights.js';
import { packages, CATEGORY_LABELS, CATEGORY_ORDER } from '../../data/packages.js';
import { routes } from '../../data/routes.js';
import { vehicles } from '../../data/vehicles.js';

// Pre-curated segments based on customer personas
const AUDIENCE_CATEGORIES = [
  {
    id: 'family',
    name: 'Family Getaways',
    tagline: 'Create memories together',
    description: 'Carefully paced, comfortable itineraries with spacious vehicles, professional local drivers, and child-friendly sightseeing stops.',
    elevation: 'Relaxed Pace',
    bestSeason: 'Year-round',
    permitRequired: false,
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=1200',
    packageIds: ['darjeeling-5-point', 'mirik-lake-bokar', 'darjeeling-toy-train-tea', 'kalimpong-heritage-5pt']
  },
  {
    id: 'romantic',
    name: 'Romantic Escapes',
    tagline: 'Love in the misty peaks',
    description: 'Spectacular sunrise points, private tea estate walks, and quiet offbeat village homestays tailored exclusively for couples.',
    elevation: 'High Romance',
    bestSeason: 'Oct–May',
    permitRequired: false,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200',
    packageIds: ['lamahatta-takdah-tinchuley', 'mirik-lake-bokar', 'darjeeling-tiger-hill']
  },
  {
    id: 'solo',
    name: 'Solo Explorers',
    tagline: 'Your journey, your pace',
    description: 'Low-friction transit routes, rustic riverside camping, and immersive homestays for independent mountain backpackers.',
    elevation: 'Self-guided',
    bestSeason: 'Oct–May',
    permitRequired: false,
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=1200',
    packageIds: ['kurseong-heritage-6pt', 'siliguri-gateway-5pt', 'darjeeling-rock-garden']
  },
  {
    id: 'friends',
    name: 'Friend Squads',
    tagline: 'Adventure awaits the pack',
    description: 'White-water rafting, overnight riverside camping, and high-altitude border crossings designed for active group excursions.',
    elevation: 'High Energy',
    bestSeason: 'Oct–May',
    permitRequired: true,
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=80&w=1200',
    packageIds: ['teesta-river-adventure', 'gangtok-nathula-pass', 'sikkim-north-expedition']
  },
  {
    id: 'corporate',
    name: 'Corporate Offsites',
    tagline: 'Unwind, align, and inspire',
    description: 'Seamless group transport, riverside team bonfires, and premium resort partnerships for corporate mountain getaways.',
    elevation: 'Premium Team',
    bestSeason: 'Oct–Apr',
    permitRequired: false,
    image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=1200',
    packageIds: ['teesta-river-adventure', 'gangtok-tsomgo-circuit', 'siliguri-gateway-5pt']
  }
];

const TAB_COPY = {
  places: {
    badge: 'Explore by Place',
    title: 'Tour Packages by Place'
  },
  darjeeling: {
    badge: 'Darjeeling Sightseeing',
    title: 'Things to See in Darjeeling'
  },
  experiences: {
    badge: 'Audience Tiers',
    title: 'Experiences'
  },
  'pickup-dropoff': {
    badge: 'Private Transfers',
    title: 'Pickup / Drop-off'
  },
  fleet: {
    badge: 'Mountain Compliance',
    title: 'Mountain Fleet & Safety'
  }
};

const ROUTE_DESTINATION_FALLBACKS = {
  pelling: 'gangtok',
  jaigaon: 'bhutan',
  phuentsholing: 'bhutan',
  thimphu: 'bhutan',
  kakarvitta: 'nepal',
  kathmandu: 'nepal'
};

function shortTerminal(name = '') {
  return name.split(' (')[0];
}

function getRouteImage(route) {
  const destinationId = ROUTE_DESTINATION_FALLBACKS[route.to] || route.to;
  return destinations.find((d) => d.id === destinationId)?.image || destinations[0]?.image;
}

function formatFare(amount) {
  return `₹${Number(amount || 0).toLocaleString('en-IN')}`;
}

const PICKUP_DROPOFF_ROUTES = routes.map((route, index) => {
  const priceLabel = route.basePriceSedan
    ? `Sedan from ${formatFare(route.basePriceSedan)}`
    : `SUV from ${formatFare(route.basePriceSuv)}`;

  return {
    id: `route-${route.from}-${route.to}-${index}`,
    name: `${shortTerminal(route.fromName)} to ${shortTerminal(route.toName)}`,
    tagline: `${route.distance} • ${route.duration}`,
    description: route.alert || 'Private point-to-point transfer with live fare estimate and vehicle recommendation.',
    elevation: priceLabel,
    bestSeason: route.isCrossBorder ? 'Border route' : 'Daily departures',
    permitRequired: route.permitRequired,
    image: getRouteImage(route),
    from: route.from,
    to: route.to
  };
});

// A soft dark gradient keeps the bottom-left text legible over any photo.
const SCRIM = 'linear-gradient(0deg, rgba(6,9,19,0.85) 0%, rgba(6,9,19,0.25) 45%, rgba(6,9,19,0.05) 100%)';

function itemBackground(item) {
  return `${SCRIM}, url(${item.image})`;
}

// The slider keeps the first TWO cards full-screen (per the reference design)
// and shows content on the 2nd. Starting with the last index in front means
// items[0] is the visible "active" card on load. This is what makes advancing
// seamless: the active image stays full-screen as the next card grows in.
function startOrder(len) {
  const seq = Array.from({ length: len }, (_, i) => i);
  return seq.length ? [seq[seq.length - 1], ...seq.slice(0, -1)] : seq;
}

export function SwipePackages({ query }) {
  const getInitialTab = () => {
    if (query?.tab === 'darjeeling') return 'darjeeling';
    if (query?.tab === 'experiences') return 'experiences';
    if (query?.tab === 'pickup-dropoff') return 'pickup-dropoff';
    if (query?.tab === 'fleet') return 'fleet';
    // 'destinations' is the legacy key for what is now the by-place catalog.
    return 'places';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const items = activeTab === 'darjeeling'
    ? DARJEELING_SIGHTS
    : activeTab === 'experiences'
      ? AUDIENCE_CATEGORIES
      : activeTab === 'pickup-dropoff'
        ? PICKUP_DROPOFF_ROUTES
        : PLACE_GROUPS;
  const tabCopy = TAB_COPY[activeTab] || TAB_COPY.places;

  // Deck rotation order (array of indexes into `items`)
  const [order, setOrder] = useState(() => startOrder(items.length));
  const [openItem, setOpenItem] = useState(null);
  const touchStartX = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [query?.tab]);

  // Reset the deck whenever the tab (and therefore the item set) changes
  useEffect(() => {
    setOrder(startOrder(items.length));
  }, [activeTab, items.length]);

  const next = useCallback(() => {
    setOrder((o) => (o.length ? [...o.slice(1), o[0]] : o));
  }, []);

  const prev = useCallback(() => {
    setOrder((o) => (o.length ? [o[o.length - 1], ...o.slice(0, -1)] : o));
  }, []);

  // Advance the deck while scrolling over the stage (in addition to touch
  // swipe and the arrow buttons). A short cooldown keeps one scroll gesture =
  // one card so the slide animation can finish before the next move. Bound
  // natively with { passive: false } so we can preventDefault the page jump.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;

    let locked = false;
    const onWheel = (e) => {
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 12) return;
      e.preventDefault();
      if (locked) return;
      locked = true;
      if (delta > 0) next(); else prev();
      window.setTimeout(() => { locked = false; }, 760);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [activeTab, next, prev]);

  // Keyboard arrows when the stage is focused (desktop accessibility).
  const onStageKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setOpenItem(null);
    window.location.hash = `#/packages?tab=${tab}`;
  };

  const handlePrimaryAction = (item) => {
    if (activeTab === 'pickup-dropoff') {
      window.location.hash = `#/booking?from=${item.from}&to=${item.to}`;
      return;
    }
    // Darjeeling sightseeing spots aren't packages themselves — open the
    // Darjeeling place sheet so visitors can book a trip covering these stops.
    if (activeTab === 'darjeeling') {
      const darjeeling = PLACE_GROUPS.find((g) => g.id === 'darjeeling');
      if (darjeeling) setOpenItem(darjeeling);
      return;
    }
    setOpenItem(item);
  };

  // Lightweight touch swipe on the stage
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -50) next();
    else if (dx > 50) prev();
    touchStartX.current = null;
  };

  // The visible "active" card is the 2nd in DOM order (nth-child(2))
  const activeIndex = order.length > 1 ? order[1] : (order[0] ?? 0);

  return (
    <div className="hpkg-root">
      <header className="hpkg-header">
        <div className="hpkg-header-left">
          <span className="badge badge-brand">
            <i className="fa-solid fa-sparkles" /> {tabCopy.badge}
          </span>
          <h1 className="hpkg-title">{tabCopy.title}</h1>
        </div>

        <div className="hpkg-tabs">
          <button
            type="button"
            className={`hpkg-tab ${activeTab === 'places' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('places')}
          >
            <i className="fa-solid fa-map-location-dot" /> Places
          </button>
          <button
            type="button"
            className={`hpkg-tab ${activeTab === 'experiences' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('experiences')}
          >
            <i className="fa-solid fa-sparkles" /> Experiences
          </button>
          <button
            type="button"
            className={`hpkg-tab ${activeTab === 'darjeeling' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('darjeeling')}
          >
            <i className="fa-solid fa-mountain-sun" /> Darjeeling Spots
          </button>
          <button
            type="button"
            className={`hpkg-tab ${activeTab === 'pickup-dropoff' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('pickup-dropoff')}
          >
            <i className="fa-solid fa-route" /> Pickup/Drop-off
          </button>
          <button
            type="button"
            className={`hpkg-tab ${activeTab === 'fleet' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('fleet')}
          >
            <i className="fa-solid fa-car" /> Fleet & Safety
          </button>
        </div>
      </header>

      {activeTab === 'fleet' ? (
        <div className="container animate-fade-in" style={{ overflowY: 'auto', flex: 1, paddingBottom: '40px', marginTop: '20px' }}>
          <div className="fleet-grid">
            {vehicles.map(vh => (
              <div key={vh.id} className="fleet-card glass-panel glass-panel-hover" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="fleet-card-image" style={{ backgroundImage: `url(${vh.image})` }}></div>
                <div className="fleet-card-content" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span className="badge badge-brand mb-1" style={{ alignSelf: 'flex-start' }}>{vh.capacity} | {vh.luggage.split(' ')[0]} Bags</span>
                  <h3 className="fleet-name">{vh.name}</h3>
                  <div className="fleet-models" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    Models: {vh.models.join(", ")}
                  </div>
                  <ul className="fleet-features-list" style={{ flexGrow: 1 }}>
                    {vh.features.map(feat => (
                      <li key={feat}>
                        <i className="fa-solid fa-circle-check text-brand"></i> {feat}
                      </li>
                    ))}
                  </ul>
                  {vh.restrictions && vh.restrictions.length > 0 && (
                    <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
                      <strong style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Himalayan Access Restrictions</strong>
                      <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '0.82rem', color: '#fda4af', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {vh.restrictions.map((res, i) => (
                          <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <i className="fa-solid fa-triangle-exclamation" style={{ marginTop: '3px', fontSize: '0.75rem' }}></i>
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {vh.id.startsWith("suv") && (
                    <span className="fleet-suv-tag"><i className="fa-solid fa-snowflake"></i> North Sikkim Approved</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="hpkg-stage"
          ref={stageRef}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={tabCopy.title}
          onKeyDown={onStageKeyDown}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="hpkg-slide">
            {order.map((itemIdx) => {
              const item = items[itemIdx];
              if (!item) return null;
              return (
                <div
                  key={item.id}
                  className="hpkg-item"
                  style={{ backgroundImage: itemBackground(item) }}
                >
                  <div className="hpkg-content">
                    <div className="hpkg-chips">
                      {item.comingSoon && (
                        <span className="hpkg-chip hpkg-chip-warn"><i className="fa-solid fa-hourglass-half" /> Coming Soon</span>
                      )}
                      {item.chip && (
                        <span className="hpkg-chip"><i className="fa-solid fa-camera-retro" /> {item.chip}</span>
                      )}
                      {item.permitRequired && (
                        <span className="hpkg-chip hpkg-chip-warn"><i className="fa-solid fa-id-card" /> Permit</span>
                      )}
                      {item.elevation && (
                        <span className="hpkg-chip"><i className="fa-solid fa-mountain" /> {item.elevation}</span>
                      )}
                    </div>
                    <div className="hpkg-name">{item.name}</div>
                    <div className="hpkg-des">{item.tagline}</div>
                    <button
                      type="button"
                      className="hpkg-cta"
                      onClick={(e) => { e.stopPropagation(); handlePrimaryAction(item); }}
                    >
                      <i className={`fa-solid ${item.comingSoon ? 'fa-hourglass-half' : 'fa-bolt'}`} aria-hidden="true" />
                      <span>{item.comingSoon ? 'Coming Soon' : (activeTab === 'pickup-dropoff' ? 'Book Transfer' : 'Book Now')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hpkg-nav" role="group" aria-label="Destination slider navigation">
            <button type="button" className="hpkg-arrow" onClick={prev} aria-label="Previous destination">
              <i className="fa-solid fa-chevron-left" aria-hidden="true" />
            </button>
            <div className="hpkg-counter">
              <span className="hpkg-counter-cur">{activeIndex + 1}</span>
              <span className="hpkg-counter-sep">/</span>
              <span>{items.length}</span>
            </div>
            <button type="button" className="hpkg-arrow" onClick={next} aria-label="Next destination">
              <i className="fa-solid fa-chevron-right" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {openItem && (
          <BottomSheet
            item={openItem}
            activeTab={activeTab}
            onClose={() => setOpenItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function BottomSheet({ item, activeTab, onClose }) {
  const pkgs = activeTab === 'experiences'
    ? packages.filter((p) => item.packageIds.includes(p.id))
    : item.members
      // Place groups roll up the packages of every member destination.
      ? packages.filter((p) => item.members.includes(p.destinationId))
      : packages.filter((p) => p.destinationId === item.id);

  // Group by duration tier (One-Time → Half-Day → Full-Day → 2-Day → Multi-Day)
  const groups = CATEGORY_ORDER
    .map((cat) => ({ cat, label: CATEGORY_LABELS[cat], list: pkgs.filter((p) => p.category === cat) }))
    .filter((g) => g.list.length > 0);

  return (
    <motion.div
      className="sw-sheet-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="sw-sheet"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 140 || info.velocity.y > 600) onClose();
        }}
      >
        <div className="sw-sheet-handle" aria-hidden="true" />
        <header className="sw-sheet-header">
          <div>
            <h2>{item.name}</h2>
            <p>{item.tagline}</p>
          </div>
          <button type="button" className="sw-sheet-close" onClick={onClose} aria-label="Close packages sheet">
            <i className="fa-solid fa-xmark" />
          </button>
        </header>

        {item.alert && (
          <div className="sw-sheet-alert">
            <i className="fa-solid fa-circle-info" /> {item.alert}
          </div>
        )}

        {(pkgs.length === 0 || item.comingSoon) ? (
          <div className="sw-sheet-empty">
            <i className="fa-solid fa-hourglass-half" />
            <h3>Coming Soon</h3>
            <p>We are curating spectacular bespoke itineraries for {item.name}. Enquire directly on WhatsApp and we'll let you know the moment it opens.</p>
            <a
              href={`https://wa.me/919907219843?text=${encodeURIComponent(`Hi! I'd like to plan a custom trip for ${item.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sw-sheet-cta-wa"
            >
              <i className="fa-brands fa-whatsapp" /> Enquire on WhatsApp
            </a>
          </div>
        ) : (
          <div className="sw-sheet-list">
            {groups.map((group) => (
              <section key={group.cat} className="sw-grp">
                <div className="sw-grp-label">
                  <i className="fa-solid fa-clock" aria-hidden="true" /> {group.label}
                </div>
                {group.list.map((pkg) => (
              <article key={pkg.id} className="sw-pkg">
                <div className="sw-pkg-head">
                  <h3>{pkg.name}</h3>
                  <span className="sw-pkg-dur"><i className="fa-solid fa-clock" /> {pkg.duration}</span>
                </div>
                <p className="sw-pkg-desc">
                  {pkg.description.length > 150 ? `${pkg.description.slice(0, 150)}…` : pkg.description}
                </p>
                <div className="sw-pkg-stops">
                  {pkg.attractions.slice(0, 4).map((a) => (
                    <span key={a} className="sw-pkg-stop">{a}</span>
                  ))}
                  {pkg.attractions.length > 4 && (
                    <span className="sw-pkg-stop sw-pkg-stop-more">+{pkg.attractions.length - 4} more</span>
                  )}
                </div>
                {pkg.suvOnly && (
                  <div className="sw-pkg-flag">
                    <i className="fa-solid fa-snowflake" /> SUV mandatory (PAP high-altitude zones)
                  </div>
                )}
                <div className="sw-pkg-foot">
                  {pkg.isComingSoon ? (
                    <>
                      <div className="sw-pkg-price">
                        <span className="sw-pkg-price-lbl">Status</span>
                        <span className="sw-pkg-price-val">Coming Soon</span>
                      </div>
                      <a
                        href={`https://wa.me/919907219843?text=${encodeURIComponent(`Hi! I'd like to know when the "${pkg.name}" tour will be available.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sw-pkg-cta"
                      >
                        <span>Enquire</span>
                        <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                      </a>
                    </>
                  ) : (
                    <>
                      <div className="sw-pkg-price">
                        <span className="sw-pkg-price-lbl">Starting Fare</span>
                        <span className="sw-pkg-price-val">₹{(pkg.priceSedan || pkg.priceSuv).toLocaleString('en-IN')}</span>
                      </div>
                      <a href={`#/booking?package=${pkg.id}`} className="sw-pkg-cta">
                        <span>Book Now</span>
                        <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                      </a>
                    </>
                  )}
                </div>
              </article>
                ))}
              </section>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default SwipePackages;
