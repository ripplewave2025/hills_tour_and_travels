/* ==========================================
   HILLS TOUR & TRAVELS — FANNED DESTINATION SLIDER
   ==========================================
   Lead full-bleed card with name + tagline + "Book This One" CTA;
   peek cards stacked to the right. Prev / Next arrows reorder the
   deck. Touch swipe also advances. Tapping the CTA on the active
   card opens a bottom-sheet listing every package tied to that
   destination with Book Now deep-links into /booking.
   ========================================== */

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { destinations } from '../../data/destinations.js';
import { packages } from '../../data/packages.js';

// Per-destination tint so destinations sharing a placeholder photo
// still feel visually distinct.
const TINTS = {
  darjeeling:        'linear-gradient(180deg, rgba(245, 158, 11, 0.10) 0%, rgba(6, 9, 19, 0.88) 100%)',
  gangtok:           'linear-gradient(180deg, rgba(56, 189, 248, 0.10) 0%, rgba(6, 9, 19, 0.88) 100%)',
  bhutan:            'linear-gradient(180deg, rgba(244, 114, 182, 0.10) 0%, rgba(6, 9, 19, 0.88) 100%)',
  nepal:             'linear-gradient(180deg, rgba(248, 113, 113, 0.10) 0%, rgba(6, 9, 19, 0.88) 100%)',
  siliguri:          'linear-gradient(180deg, rgba(167, 139, 250, 0.10) 0%, rgba(6, 9, 19, 0.88) 100%)',
  kalimpong:         'linear-gradient(180deg, rgba(45, 212, 191, 0.12) 0%, rgba(6, 9, 19, 0.88) 100%)',
  kurseong:          'linear-gradient(180deg, rgba(132, 204, 22, 0.12) 0%, rgba(6, 9, 19, 0.88) 100%)',
  mirik:             'linear-gradient(180deg, rgba(14, 165, 233, 0.14) 0%, rgba(6, 9, 19, 0.88) 100%)',
  sittong:           'linear-gradient(180deg, rgba(251, 146, 60, 0.14) 0%, rgba(6, 9, 19, 0.88) 100%)',
  'lava-lolegaon':   'linear-gradient(180deg, rgba(16, 185, 129, 0.14) 0%, rgba(6, 9, 19, 0.88) 100%)',
  'lamahatta-takdah':'linear-gradient(180deg, rgba(217, 119, 6, 0.14) 0%, rgba(6, 9, 19, 0.88) 100%)',
  'reshi-khola':     'linear-gradient(180deg, rgba(59, 130, 246, 0.14) 0%, rgba(6, 9, 19, 0.88) 100%)',
  'darjeeling-zoo':  'linear-gradient(180deg, rgba(239, 68, 68, 0.14) 0%, rgba(6, 9, 19, 0.88) 100%)',
  'teesta':          'linear-gradient(180deg, rgba(20, 184, 166, 0.16) 0%, rgba(6, 9, 19, 0.88) 100%)'
};

const defaultTint = 'linear-gradient(180deg, rgba(245, 158, 11, 0.10) 0%, rgba(6, 9, 19, 0.88) 100%)';

function itemBackground(dest) {
  const tint = TINTS[dest.id] || defaultTint;
  return `${tint}, url(${dest.image})`;
}

export function SwipePackages() {
  const [order, setOrder] = useState(() => destinations.map((_, i) => i));
  const [openDest, setOpenDest] = useState(null);
  const touchRef = useRef({ start: 0, active: false });

  const next = useCallback(() => {
    setOrder((o) => [...o.slice(1), o[0]]);
  }, []);

  const prev = useCallback(() => {
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  }, []);

  const items = order.map((idx) => destinations[idx]);
  // Active card is the 2nd DOM child (matches the reference design)
  const activeDest = items[1] || items[0];

  const onTouchStart = (e) => {
    touchRef.current.start = e.touches[0].clientX;
    touchRef.current.active = true;
  };
  const onTouchEnd = (e) => {
    if (!touchRef.current.active) return;
    const delta = e.changedTouches[0].clientX - touchRef.current.start;
    touchRef.current.active = false;
    if (delta < -50) next();
    else if (delta > 50) prev();
  };

  return (
    <div className="ps-root">
      <header className="ps-header">
        <span className="badge badge-brand">
          <i className="fa-solid fa-sparkles" /> Curated Corridors
        </span>
        <h1 className="ps-title">Pick Your Mountain</h1>
        <p className="ps-sub">Tap an arrow or swipe to flip through destinations. Book what you love.</p>
      </header>

      <div
        className="ps-stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="ps-deck">
          {items.map((dest) => (
            <div
              key={dest.id}
              className="ps-item"
              style={{ background: itemBackground(dest), backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="ps-content">
                {dest.permitRequired && (
                  <span className="ps-chip ps-chip-warn">
                    <i className="fa-solid fa-id-card" /> Permit
                  </span>
                )}
                <h2 className="ps-name">{dest.name}</h2>
                <p className="ps-desc">{dest.tagline}</p>
                <button
                  type="button"
                  className="ps-cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDest(dest);
                  }}
                >
                  <span>Book This One</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="ps-nav" role="group" aria-label="Slider navigation">
          <button
            type="button"
            className="ps-btn ps-prev"
            onClick={prev}
            aria-label="Previous destination"
          >
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="ps-btn ps-next"
            onClick={next}
            aria-label="Next destination"
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="ps-counter" aria-live="polite">
        <span className="ps-counter-cur">{(order[1] ?? order[0]) + 1}</span>
        <span className="ps-counter-sep">of</span>
        <span>{destinations.length}</span>
      </div>

      <AnimatePresence>
        {openDest && <BottomSheet dest={openDest} onClose={() => setOpenDest(null)} />}
      </AnimatePresence>
    </div>
  );
}

function BottomSheet({ dest, onClose }) {
  const pkgs = packages.filter((p) => p.destinationId === dest.id);

  return (
    <motion.div
      className="sw-sheet-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="sw-sheet"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 280 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 140 || info.velocity.y > 700) onClose();
        }}
      >
        <div className="sw-sheet-handle" aria-hidden="true" />
        <header className="sw-sheet-header">
          <div>
            <h2>{dest.name}</h2>
            <p>{dest.tagline}</p>
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

        {dest.alert && (
          <div className="sw-sheet-alert">
            <i className="fa-solid fa-circle-info" /> {dest.alert}
          </div>
        )}

        {pkgs.length === 0 ? (
          <div className="sw-sheet-empty">
            <i className="fa-solid fa-hourglass-half" />
            <h3>Packages Coming Soon</h3>
            <p>
              We&rsquo;re curating handcrafted journeys for {dest.name}. Reach out and we&rsquo;ll
              plan a custom trip tailored to your dates.
            </p>
            <a
              href={`https://wa.me/919907219843?text=${encodeURIComponent(
                `Hi! I'd like to plan a custom trip to ${dest.name}.`
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
                  {pkg.description.length > 160
                    ? `${pkg.description.slice(0, 160)}…`
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
                    <i className="fa-solid fa-snowflake" /> SUV-only (high-altitude permits)
                  </div>
                )}
                <div className="sw-pkg-foot">
                  <div className="sw-pkg-price">
                    <span className="sw-pkg-price-lbl">From</span>
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
