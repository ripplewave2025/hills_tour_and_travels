/* ==========================================
   HILLS TOUR & TRAVELS — CINEMATIC HERO
   ==========================================
   Single-image hero with subtle Ken-Burns zoom, top-anchored trust
   badge, word-swap headline, feature pills, and a clean two-CTA row
   (Explore Packages on the left, Book Now on the right). Language is
   driven from the navbar; this component listens to the hh:langchange
   event to swap copy.
   ========================================== */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import three cinematic mountain hero images
import heroImg1 from '../../../images/Hero_images_for_mobile/Tiger_hill_hero_mobile_1.png';
import heroImg2 from '../../../images/Hero_images_for_mobile/Tiger_hill_hero_mobile.png';
import heroImg3 from '../../../images/Hero_images_for_mobile/Darjeeling_nigh_hero_mobile.png';

const HERO_IMAGES = [heroImg1, heroImg2, heroImg3];

const T = {
  en: {
    trust: '850+ travelers',
    explore: 'Explore',
    withUs: 'with us.',
    pills: ['Premium Fleet', 'Local Drivers', 'Curated Tours', 'Door-to-Door'],
    bookNow: 'Book Now',
    explorePkgs: 'Explore Packages'
  },
  hi: {
    trust: '850+ यात्री',
    explore: 'खोजें',
    withUs: 'हमारे साथ।',
    pills: ['प्रीमियम बेड़ा', 'स्थानीय ड्राइवर', 'क्यूरेटेड टूर', 'घर तक पिकअप'],
    bookNow: 'अभी बुक करें',
    explorePkgs: 'पैकेज देखें'
  },
  bn: {
    trust: '৮৫০+ পর্যটক',
    explore: 'আবিষ্কার করুন',
    withUs: 'আমাদের সাথে।',
    pills: ['প্রিমিয়াম গাড়ি', 'স্থানীয় চালক', 'কিউরেটেড ট্যুর', 'দ্বার-থেকে-দ্বার'],
    bookNow: 'এখনই বুক করুন',
    explorePkgs: 'প্যাকেজ দেখুন'
  },
  ne: {
    trust: '८५०+ यात्रु',
    explore: 'अन्वेषण गर्नुहोस्',
    withUs: 'हामीसँग।',
    pills: ['प्रिमियम गाडी', 'स्थानीय चालक', 'क्युरेटेड टुर', 'ढोका-देखि-ढोका'],
    bookNow: 'अहिले बुक गर्नुहोस्',
    explorePkgs: 'प्याकेजहरू हेर्नुहोस्'
  },
  zh: {
    trust: '850+ 位旅客',
    explore: '探索',
    withUs: '与我们同行。',
    pills: ['高端车队', '本地司机', '精选行程', '门到门接送'],
    bookNow: '立即预订',
    explorePkgs: '查看套餐'
  },
  th: {
    trust: '850+ นักเดินทาง',
    explore: 'สำรวจ',
    withUs: 'ไปกับเรา',
    pills: ['รถพรีเมียม', 'คนขับท้องถิ่น', 'ทัวร์คัดสรร', 'รับส่งถึงที่'],
    bookNow: 'จองเลย',
    explorePkgs: 'ดูแพ็กเกจ'
  }
};

// Homepage hero cycles the scenic hill places. Bhutan & Nepal are "coming
// soon" — they stay in the packages area but are kept out of this animation.
const SWAP_WORDS = ['Darjeeling', 'Kalimpong', 'Sikkim', 'Mirik', 'Kurseong'];
const WORD_MS = 2400;

function readLang() {
  if (typeof window === 'undefined') return 'en';
  return window.localStorage.getItem('hh.lang') || 'en';
}

export function HillsHero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [lang, setLang] = useState(readLang);
  const t = T[lang] || T.en;

  // Sync with navbar's language toggle
  useEffect(() => {
    const onLangChange = (e) => {
      const code = e?.detail?.lang;
      if (code && T[code]) setLang(code);
    };
    window.addEventListener('hh:langchange', onLangChange);
    return () => window.removeEventListener('hh:langchange', onLangChange);
  }, []);

  // Cycle the swapped destination word
  useEffect(() => {
    const id = setInterval(() => {
      setWordIdx((i) => (i + 1) % SWAP_WORDS.length);
    }, WORD_MS);
    return () => clearInterval(id);
  }, []);

  // Cycle the background hero images every 6 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setImgIdx((i) => (i + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hh-hero" aria-label="Hills Tour & Travels — Eastern Himalayan journeys">
      {/* Background image cross-fade slider */}
      <div className="hh-hero-bg" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.img
            key={imgIdx}
            src={HERO_IMAGES[imgIdx]}
            alt=""
            className="hh-hero-bg-img"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.6, ease: 'easeInOut' },
              scale: { duration: 15, ease: 'linear' }
            }}
            loading="eager"
            fetchpriority="high"
          />
        </AnimatePresence>
        <div className="hh-hero-gradient" />
      </div>

      {/* Top-anchored trust badge */}
      <motion.div
        key={`trust-${lang}`}
        className="hh-trust-badge"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.55, ease: 'easeOut' }}
      >
        <span className="hh-stars" aria-hidden="true">★ ★ ★ ★ ★</span>
        <span className="hh-trust-text">
          <strong>4.9</strong>
          <span className="hh-trust-sep">·</span>
          <span>{t.trust}</span>
        </span>
      </motion.div>

      {/* Middle zone — vertically centered headline + pills */}
      <div className="hh-hero-mid">
        <motion.h1
          key={`hl-${lang}`}
          className="hh-headline"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hh-headline-line">{t.explore}</span>{' '}
          <span className="hh-word-swap" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span
                key={SWAP_WORDS[wordIdx]}
                className="hh-word"
                initial={{ opacity: 0, y: 22, rotateX: -75 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -22, rotateX: 75 }}
                transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {SWAP_WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
          <br />
          <span className="hh-headline-line hh-headline-secondary">{t.withUs}</span>
        </motion.h1>

        <motion.div
          key={`pills-${lang}`}
          className="hh-pills"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } }
          }}
        >
          {[
            { i: 'fa-car-side', t: t.pills[0] },
            { i: 'fa-user-tie', t: t.pills[1] },
            { i: 'fa-map-location-dot', t: t.pills[2] },
            { i: 'fa-plane-arrival', t: t.pills[3] }
          ].map((p) => (
            <motion.span
              key={p.t}
              className="hh-pill"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
              }}
            >
              <i className={`fa-solid ${p.i}`} aria-hidden="true" />
              <span>{p.t}</span>
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Foot — CTAs pinned to the bottom */}
      <div className="hh-hero-foot">
        <motion.div
          key={`cta-${lang}`}
          className="hh-cta-row"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a href="#/packages" className="hh-cta hh-cta-ghost">
            <i className="fa-solid fa-compass" aria-hidden="true" />
            <span>{t.explorePkgs}</span>
          </a>
          <a href="#/booking" className="hh-cta hh-cta-primary">
            <span>{t.bookNow}</span>
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default HillsHero;
