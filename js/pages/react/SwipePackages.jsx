/* ==========================================
   HILLS TOUR & TRAVELS — TINDER-STYLE DESTINATION DECK
   ==========================================
   Full-screen swipeable deck of destinations. Drag right (or tap heart)
   opens a bottom-sheet listing packages tied to that destination with
   Book Now CTAs. Drag left (or tap ✕) advances to the next card. Cards
   cycle endlessly. Destinations without curated packages show a
   "Coming Soon" sheet with a WhatsApp enquiry CTA.
   ========================================== */

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { destinations } from '../../data/destinations.js';
import { packages } from '../../data/packages.js';

const SWIPE_THRESHOLD = 110;
const STACK_DEPTH = 3;

// Per-destination overlay tint — destinations sharing the placeholder
// Unsplash photo still look distinct via colored gradient overlays.
const TINTS = {
  darjeeling:        'linear-gradient(165deg, rgba(245, 158, 11, 0.18) 0%, rgba(6, 9, 19, 0.85) 100%)',
  gangtok:           'linear-gradient(165deg, rgba(56, 189, 248, 0.18) 0%, rgba(6, 9, 19, 0.85) 100%)',
  bhutan:            'linear-gradient(165deg, rgba(244, 114, 182, 0.18) 0%, rgba(6, 9, 19, 0.85) 100%)',
  nepal:             'linear-gradient(165deg, rgba(248, 113, 113, 0.18) 0%, rgba(6, 9, 19, 0.85) 100%)',
  siliguri:          'linear-gradient(165deg, rgba(167, 139, 250, 0.18) 0%, rgba(6, 9, 19, 0.85) 100%)',
  kalimpong:         'linear-gradient(165deg, rgba(45, 212, 191, 0.20) 0%, rgba(6, 9, 19, 0.85) 100%)',
  kurseong:          'linear-gradient(165deg, rgba(132, 204, 22, 0.20) 0%, rgba(6, 9, 19, 0.85) 100%)',
  mirik:             'linear-gradient(165deg, rgba(14, 165, 233, 0.22) 0%, rgba(6, 9, 19, 0.85) 100%)',
  sittong:           'linear-gradient(165deg, rgba(251, 146, 60, 0.22) 0%, rgba(6, 9, 19, 0.85) 100%)',
  'lava-lolegaon':   'linear-gradient(165deg, rgba(16, 185, 129, 0.22) 0%, rgba(6, 9, 19, 0.85) 100%)',
  'lamahatta-takdah':'linear-gradient(165deg, rgba(217, 119, 6, 0.22) 0%, rgba(6, 9, 19, 0.85) 100%)',
  'reshi-khola':     'linear-gradient(165deg, rgba(59, 130, 246, 0.22) 0%, rgba(6, 9, 19, 0.85) 100%)',
  'darjeeling-zoo':  'linear-gradient(165deg, rgba(239, 68, 68, 0.22) 0%, rgba(6, 9, 19, 0.85) 100%)'
};

const defaultTint = 'linear-gradient(165deg, rgba(245, 158, 11, 0.16) 0%, rgba(6, 9, 19, 0.85) 100%)';

function cardBackground(dest) {
  const tint = TINTS[dest.id] || defaultTint;
  return `${tint}, url(${dest.image})`;
}

export function SwipePackages() {
  const [index, setIndex] = useState(0);
  const [openDest, setOpenDest] = useState(null);
  const deck = useMemo(() => destinations, []);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % deck.length);
  }, [deck.length]);

  const handleLike = useCallback((dest) => {
    setOpenDest(dest);
    // Advance under the sheet so closing it shows the next card
    setTimeout(advance, 220);
  }, [advance]);

  const handlePass = useCallback(() => {
    advance();
  }, [advance]);

  // Render up to STACK_DEPTH cards. The active card is the LAST one in the
  // children array so it sits on top (later siblings overlap earlier ones
  // when they share absolute position).
  const visible = [];
  const count = Math.min(STACK_DEPTH, deck.length);
  for (let i = count - 1; i >= 0; i -= 1) {
    const dest = deck[(index + i) % deck.length];
    visible.push({ dest, pos: i, key: `${index}-${i}-${dest.id}` });
  }

  const currentDest = deck[index];

  return (
    <div className="sw-root">
      <header className="sw-header">
        <span className="badge badge-brand"><i className="fa-solid fa-sparkles" /> Curated Corridors</span>
        <h1 className="sw-title">Swipe to Explore</h1>
        <p className="sw-sub">Drag right to see packages · Drag left to skip · Tap ⓘ for details</p>
      </header>

      <div className="sw-deck">
        <AnimatePresence>
          {visible.map(({ dest, pos, key }) => (
            <Card
              key={key}
              dest={dest}
              pos={pos}
              isTop={pos === 0}
              onLike={() => handleLike(dest)}
              onPass={handlePass}
            />
          ))}
        </AnimatePresence>

        {/* Progress counter floats over the deck */}
        <div className="sw-progress" aria-live="polite">
          <span>{index + 1}</span>
          <span className="sw-progress-sep">/</span>
          <span>{deck.length}</span>
        </div>
      </div>

      <div className="sw-actions" role="group" aria-label="Swipe actions">
        <button
          type="button"
          className="sw-btn sw-btn-pass"
          onClick={handlePass}
          aria-label="Skip this destination"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="sw-btn sw-btn-info"
          onClick={() => setOpenDest(currentDest)}
          aria-label="View packages for this destination"
        >
          <i className="fa-solid fa-info" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="sw-btn sw-btn-like"
          onClick={() => handleLike(currentDest)}
          aria-label="See packages for this destination"
        >
          <i className="fa-solid fa-heart" aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence>
        {openDest && (
          <BottomSheet dest={openDest} onClose={() => setOpenDest(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function Card({ dest, pos, isTop, onLike, onPass }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-16, 0, 16]);
  const likeOpacity = useTransform(x, [40, SWIPE_THRESHOLD], [0, 1]);
  const passOpacity = useTransform(x, [-SWIPE_THRESHOLD, -40], [1, 0]);

  const restingScale = 1 - pos * 0.045;
  const restingY = pos * 14;

  const handleDragEnd = (_, info) => {
    if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > 600) {
      onLike();
    } else if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -600) {
      onPass();
    }
  };

  return (
    <motion.article
      className="sw-card"
      style={{
        background: cardBackground(dest),
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex: 10 - pos
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{ scale: restingScale - 0.04, y: restingY + 12, opacity: 0 }}
      animate={{ scale: restingScale, y: restingY, opacity: 1 }}
      exit={{ x: 0, opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', damping: 22, stiffness: 220 }}
    >
      {isTop && (
        <>
          <motion.div className="sw-stamp sw-stamp-like" style={{ opacity: likeOpacity }}>
            <i className="fa-solid fa-heart" /> View Packages
          </motion.div>
          <motion.div className="sw-stamp sw-stamp-pass" style={{ opacity: passOpacity }}>
            <i className="fa-solid fa-xmark" /> Skip
          </motion.div>
        </>
      )}

      <div className="sw-card-content">
        <div className="sw-card-chips">
          {dest.permitRequired && (
            <span className="sw-chip sw-chip-warn">
              <i className="fa-solid fa-id-card" /> Permit
            </span>
          )}
          <span className="sw-chip">
            <i className="fa-solid fa-mountain" /> {dest.elevation}
          </span>
        </div>
        <h2 className="sw-card-name">{dest.name}</h2>
        <p className="sw-card-tagline">{dest.tagline}</p>
        <div className="sw-card-meta">
          <span><i className="fa-solid fa-route" /> {dest.distanceFromBagdogra}</span>
          <span><i className="fa-solid fa-clock" /> {dest.travelTimeFromBagdogra}</span>
        </div>
      </div>
    </motion.article>
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
