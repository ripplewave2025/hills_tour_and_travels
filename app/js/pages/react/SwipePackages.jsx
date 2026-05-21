/* ==========================================
   HILLS TOUR & TRAVELS — SIGHTSEEING SWIPER (TINDER DECK)
   ==========================================
   A highly polished, responsive Tinder-style card deck that stacks
   cards in the center of the viewport, eliminating empty top space.
   Supports touch/mouse dragging to flip cards and a dual-tab toggle
   ("Destinations" vs "Experiences") connected dynamically to the navbar.
   ========================================== */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { destinations } from '../../data/destinations.js';
import { packages } from '../../data/packages.js';

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
  },
  {
    id: 'luxury',
    name: 'Luxury & Custom',
    tagline: 'Ultra-premium comfort',
    description: 'Premium SUV fleet (Innova Crysta), selected luxury suites, private guided tours, and fully managed protected area permits.',
    elevation: 'VIP Service',
    bestSeason: 'Year-round',
    permitRequired: true,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
    packageIds: ['sikkim-north-expedition', 'bhutan-thunder-dragon-voyage', 'nepal-borderlands-expedition']
  }
];

const TINTS = {
  darjeeling:        'linear-gradient(180deg, rgba(245, 158, 11, 0.05) 0%, rgba(6, 9, 19, 0.92) 100%)',
  gangtok:           'linear-gradient(180deg, rgba(56, 189, 248, 0.05) 0%, rgba(6, 9, 19, 0.92) 100%)',
  bhutan:            'linear-gradient(180deg, rgba(244, 114, 182, 0.05) 0%, rgba(6, 9, 19, 0.92) 100%)',
  nepal:             'linear-gradient(180deg, rgba(248, 113, 113, 0.05) 0%, rgba(6, 9, 19, 0.92) 100%)',
  family:            'linear-gradient(180deg, rgba(34, 197, 94, 0.05) 0%, rgba(6, 9, 19, 0.92) 100%)',
  romantic:          'linear-gradient(180deg, rgba(236, 72, 153, 0.05) 0%, rgba(6, 9, 19, 0.92) 100%)',
  solo:              'linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, rgba(6, 9, 19, 0.92) 100%)',
  friends:           'linear-gradient(180deg, rgba(168, 85, 247, 0.05) 0%, rgba(6, 9, 19, 0.92) 100%)',
  corporate:         'linear-gradient(180deg, rgba(234, 179, 8, 0.05) 0%, rgba(6, 9, 19, 0.92) 100%)',
  luxury:            'linear-gradient(180deg, rgba(20, 184, 166, 0.05) 0%, rgba(6, 9, 19, 0.92) 100%)'
};

const defaultTint = 'linear-gradient(180deg, rgba(245, 158, 11, 0.05) 0%, rgba(6, 9, 19, 0.92) 100%)';

function itemBackground(item) {
  const tint = TINTS[item.id] || defaultTint;
  return `${tint}, url(${item.image})`;
}

export function SwipePackages({ query }) {
  // Sync tab with URL query parameter, e.g., ?tab=experiences or ?tab=destinations
  const getInitialTab = () => {
    if (query?.tab === 'experiences') return 'experiences';
    if (query?.tab === 'destinations') return 'destinations';
    return 'destinations';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const items = activeTab === 'experiences' ? AUDIENCE_CATEGORIES : destinations;
  
  // Track deck sequence array
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const [openItem, setOpenItem] = useState(null);

  // Sync state if navbar triggers route query change
  useEffect(() => {
    const nextTab = getInitialTab();
    setActiveTab(nextTab);
  }, [query?.tab]);

  // Reset deck indexes when active tab toggles
  useEffect(() => {
    setOrder(items.map((_, i) => i));
  }, [activeTab, items.length]);

  const next = useCallback(() => {
    setOrder((o) => [...o.slice(1), o[0]]);
  }, []);

  const prev = useCallback(() => {
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update hash query silently so it matches URL structure
    window.location.hash = `#/packages?tab=${tab}`;
  };

  return (
    <div className="ps-root">
      <header className="ps-header">
        <div className="ps-header-main">
          <div className="ps-header-left animate-fade-in">
            <span className="badge badge-brand">
              <i className="fa-solid fa-sparkles" /> {activeTab === 'experiences' ? 'Audience Tiers' : 'Corridor Explorer'}
            </span>
            <h1 className="ps-title">{activeTab === 'experiences' ? 'Experiences' : 'Destinations'}</h1>
          </div>

          <div className="ps-tabs-container">
            <button
              type="button"
              className={`ps-tab-btn ${activeTab === 'destinations' ? 'is-active' : ''}`}
              onClick={() => handleTabChange('destinations')}
            >
              <i className="fa-solid fa-map-location-dot" /> Destinations
            </button>
            <button
              type="button"
              className={`ps-tab-btn ${activeTab === 'experiences' ? 'is-active' : ''}`}
              onClick={() => handleTabChange('experiences')}
            >
              <i className="fa-solid fa-sparkles" /> Experiences
            </button>
          </div>
        </div>
      </header>

      {/* Tinder Overlapping Stack Container */}
      <div className="ps-stage">
        <div className="ps-deck">
          {order.map((itemIdx, stackIndex) => {
            const item = items[itemIdx];
            if (!item) return null;

            // Tinder layers styling: index 0 is on top, 1 peeks, 2 stands back.
            // Cards are rendered in reverse order in DOM so index 0 stays on top.
            const isTopCard = stackIndex === 0;
            const isSecondCard = stackIndex === 1;
            const isThirdCard = stackIndex === 2;
            const isVisible = stackIndex < 3;

            let scale = 0.85;
            let yOffset = 30;
            let opacity = 0;
            let pointerEvents = 'none';

            if (isTopCard) {
              scale = 1.0;
              yOffset = 0;
              opacity = 1;
              pointerEvents = 'auto';
            } else if (isSecondCard) {
              scale = 0.94;
              yOffset = 15;
              opacity = 0.85;
              pointerEvents = 'none';
            } else if (isThirdCard) {
              scale = 0.88;
              yOffset = 30;
              opacity = 0.55;
              pointerEvents = 'none';
            }

            return (
              <motion.div
                key={item.id}
                className={`ps-item-tinder ${isTopCard ? 'is-active-card' : ''}`}
                style={{
                  backgroundImage: itemBackground(item),
                  zIndex: items.length - stackIndex,
                  pointerEvents
                }}
                animate={{
                  scale,
                  y: yOffset,
                  opacity,
                  transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] }
                }}
                drag={isTopCard ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                onDragEnd={(event, info) => {
                  const threshold = 110;
                  if (info.offset.x < -threshold) {
                    next(); // Swiped left
                  } else if (info.offset.x > threshold) {
                    prev(); // Swiped right
                  }
                }}
              >
                {/* Visual Content inside the top card */}
                {isTopCard && (
                  <div className="ps-content animate-fade-in">
                    <div className="ps-meta-row">
                      {item.permitRequired && (
                        <span className="ps-chip ps-chip-warn">
                          <i className="fa-solid fa-id-card" /> Permit Required
                        </span>
                      )}
                      <span className="ps-badge-tag">
                        <i className="fa-solid fa-mountain" /> {item.elevation}
                      </span>
                    </div>
                    
                    <h2 className="ps-name">{item.name}</h2>
                    <p className="ps-desc">{item.tagline}</p>
                    <p className="ps-long-desc">{item.description}</p>
                    
                    <button
                      type="button"
                      className="ps-cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenItem(item);
                      }}
                    >
                      <span>See Packages</span>
                      <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Floating Tinder Navigation Controls */}
        <div className="ps-nav" role="group" aria-label="Slider navigation">
          <button
            type="button"
            className="ps-btn ps-prev"
            onClick={prev}
            aria-label="Previous card"
          >
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </button>
          
          <div className="ps-nav-info">
            <span className="ps-counter-cur">{(order[0] ?? 0) + 1}</span>
            <span className="ps-counter-sep">/</span>
            <span>{items.length}</span>
          </div>

          <button
            type="button"
            className="ps-btn ps-next"
            onClick={next}
            aria-label="Next card"
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      </div>

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
  // Query matching packages based on tab mode (destinationId vs packageIds array)
  const pkgs = activeTab === 'experiences'
    ? packages.filter((p) => item.packageIds.includes(p.id))
    : packages.filter((p) => p.destinationId === item.id);

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
          <button
            type="button"
            className="sw-sheet-close"
            onClick={onClose}
            aria-label="Close packages sheet"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </header>

        {item.alert && (
          <div className="sw-sheet-alert">
            <i className="fa-solid fa-circle-info" /> {item.alert}
          </div>
        )}

        {pkgs.length === 0 ? (
          <div className="sw-sheet-empty">
            <i className="fa-solid fa-hourglass-half" />
            <h3>Packages Coming Soon</h3>
            <p>
              We are curating spectacular bespoke itineraries for this experience. Enquire directly on WhatsApp to book.
            </p>
            <a
              href={`https://wa.me/919907219843?text=${encodeURIComponent(
                `Hi! I'd like to plan a custom trip for ${item.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sw-sheet-cta-wa"
            >
              <i className="fa-brands fa-whatsapp" /> Enquire on WhatsApp
            </a>
          </div>
        ) : (
          <div className="sw-sheet-list">
            {pkgs.map((pkg) => (
              <article key={pkg.id} className="sw-pkg">
                <div className="sw-pkg-head">
                  <h3>{pkg.name}</h3>
                  <span className="sw-pkg-dur">
                    <i className="fa-solid fa-clock" /> {pkg.duration}
                  </span>
                </div>
                <p className="sw-pkg-desc">
                  {pkg.description.length > 150
                    ? `${pkg.description.slice(0, 150)}…`
                    : pkg.description}
                </p>
                <div className="sw-pkg-stops">
                  {pkg.attractions.slice(0, 4).map((a) => (
                    <span key={a} className="sw-pkg-stop">{a}</span>
                  ))}
                  {pkg.attractions.length > 4 && (
                    <span className="sw-pkg-stop sw-pkg-stop-more">
                      +{pkg.attractions.length - 4} more
                    </span>
                  )}
                </div>
                {pkg.suvOnly && (
                  <div className="sw-pkg-flag">
                    <i className="fa-solid fa-snowflake" /> SUV mandatory (PAP high-altitude zones)
                  </div>
                )}
                <div className="sw-pkg-foot">
                  <div className="sw-pkg-price">
                    <span className="sw-pkg-price-lbl">Starting Fare</span>
                    <span className="sw-pkg-price-val">
                      ₹{(pkg.priceSedan || pkg.priceSuv).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <a href={`#/booking?package=${pkg.id}`} className="sw-pkg-cta">
                    <span>Book Now</span>
                    <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default SwipePackages;
