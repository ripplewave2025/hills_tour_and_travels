/* ==========================================
   HILLS TOUR & TRAVELS — CINEMATIC HERO
   ==========================================
   Cross-fading 3-image carousel with Ken-Burns zoom, animated trust badge,
   word-swap headline (Darjeeling ↔ Sikkim ↔ Kalimpong ↔ Bhutan ↔ Nepal),
   feature pills, dual CTAs, and slide indicator dots.
   ========================================== */

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import nightImg from '../../../images/Hero_images_for_mobile/Darjeeling_nigh_hero_mobile.png';
import sunriseImg from '../../../images/Hero_images_for_mobile/Tiger_hill_hero_mobile_1.png';
import tigerImg from '../../../images/Hero_images_for_mobile/Tiger_hill_hero_mobile.png';

// Hero-copy translations. Place names stay as English proper nouns.
const LANGS = [
  { code: 'en', label: 'English',  flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी',     flag: '🇮🇳' },
  { code: 'bn', label: 'বাংলা',     flag: '🇧🇩' },
  { code: 'ne', label: 'नेपाली',    flag: '🇳🇵' },
  { code: 'zh', label: '中文',       flag: '🇨🇳' },
  { code: 'th', label: 'ไทย',        flag: '🇹🇭' }
];

const T = {
  en: {
    trust: 'Trusted by 850+ travelers',
    explore: 'Explore',
    withUs: 'with us.',
    pills: ['Premium Fleet', 'Local Drivers', 'Curated Tours', 'Door-to-Door'],
    bookNow: 'Book Now',
    explorePkgs: 'Explore Packages',
    chat: 'Chat',
    pickup: 'Pickup from Bagdogra · NJP · Siliguri · Darjeeling · Gangtok',
    scroll: 'Scroll'
  },
  hi: {
    trust: '850+ यात्रियों का भरोसा',
    explore: 'खोजें',
    withUs: 'हमारे साथ।',
    pills: ['प्रीमियम बेड़ा', 'स्थानीय ड्राइवर', 'क्यूरेटेड टूर', 'घर तक पिकअप'],
    bookNow: 'अभी बुक करें',
    explorePkgs: 'पैकेज देखें',
    chat: 'चैट',
    pickup: 'पिकअप: बागडोगरा · एनजेपी · सिलीगुड़ी · दार्जिलिंग · गंगटोक',
    scroll: 'स्क्रॉल'
  },
  bn: {
    trust: '৮৫০+ পর্যটকের আস্থা',
    explore: 'আবিষ্কার করুন',
    withUs: 'আমাদের সাথে।',
    pills: ['প্রিমিয়াম গাড়ি', 'স্থানীয় চালক', 'কিউরেটেড ট্যুর', 'দ্বার-থেকে-দ্বার'],
    bookNow: 'এখনই বুক করুন',
    explorePkgs: 'প্যাকেজ দেখুন',
    chat: 'চ্যাট',
    pickup: 'পিকআপ: বাগডোগরা · এনজেপি · শিলিগুড়ি · দার্জিলিং · গ্যাংটক',
    scroll: 'স্ক্রল'
  },
  ne: {
    trust: '८५०+ यात्रुहरूको भरोसा',
    explore: 'अन्वेषण गर्नुहोस्',
    withUs: 'हामीसँग।',
    pills: ['प्रिमियम गाडी', 'स्थानीय चालक', 'क्युरेटेड टुर', 'ढोका-देखि-ढोका'],
    bookNow: 'अहिले बुक गर्नुहोस्',
    explorePkgs: 'प्याकेजहरू हेर्नुहोस्',
    chat: 'च्याट',
    pickup: 'पिकअप: बागडोगरा · एनजेपी · सिलीगुडी · दार्जिलिङ · गान्तोक',
    scroll: 'स्क्रोल'
  },
  zh: {
    trust: '850+ 位旅客的信赖之选',
    explore: '探索',
    withUs: '与我们同行。',
    pills: ['高端车队', '本地司机', '精选行程', '门到门接送'],
    bookNow: '立即预订',
    explorePkgs: '查看套餐',
    chat: '聊天',
    pickup: '接送:巴格多格拉 · NJP · 西里古里 · 大吉岭 · 甘托克',
    scroll: '滚动'
  },
  th: {
    trust: 'นักเดินทางกว่า 850+ คนไว้วางใจ',
    explore: 'สำรวจ',
    withUs: 'ไปกับเรา',
    pills: ['รถพรีเมียม', 'คนขับท้องถิ่น', 'ทัวร์คัดสรร', 'รับส่งถึงที่'],
    bookNow: 'จองเลย',
    explorePkgs: 'ดูแพ็กเกจ',
    chat: 'แชท',
    pickup: 'รับจาก: บากโดกรา · NJP · สิลิกุริ · ดาร์จีลิ่ง · กังต็อก',
    scroll: 'เลื่อน'
  }
};

// Object-position values nudge each frame to keep the baked-in
// text overlays of slides 1 and 3 out of the focal area on desktop.
const SLIDES = [
  {
    src: nightImg,
    alt: 'Darjeeling town glowing at night beneath moonlit Kanchenjunga',
    objectPosition: '50% 72%',
    tag: 'Darjeeling Nights',
    icon: 'fa-moon'
  },
  {
    src: sunriseImg,
    alt: 'Golden sunrise on the Kanchenjunga range above the clouds',
    objectPosition: '50% 50%',
    tag: 'Sunrise on Kanchenjunga',
    icon: 'fa-sun'
  },
  {
    src: tigerImg,
    alt: 'Sunrise crowd at Tiger Hill, Darjeeling',
    objectPosition: '50% 78%',
    tag: 'Tiger Hill at Dawn',
    icon: 'fa-mountain-sun'
  }
];

const SWAP_WORDS = ['Darjeeling', 'Sikkim', 'Kalimpong', 'Bhutan', 'Nepal'];

const SLIDE_MS = 5200;
const WORD_MS = 2400;

export function HillsHero() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    return window.localStorage.getItem('hh.lang') || 'en';
  });
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef(null);
  const t = T[lang] || T.en;
  const currentLang = LANGS.find((l) => l.code === lang) || LANGS[0];

  // Persist language choice + broadcast for future site-wide listeners
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('hh.lang', lang);
      document.documentElement.setAttribute('lang', lang);
      window.dispatchEvent(new CustomEvent('hh:langchange', { detail: { lang } }));
    }
  }, [lang]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!langOpen) return undefined;
    const onClick = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [langOpen]);

  // Track mobile breakpoint so we can soften Ken-Burns on phones
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = (e) => setIsMobile(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  // Auto-advance background slides
  useEffect(() => {
    const t = setInterval(() => {
      setSlideIdx((i) => (i + 1) % SLIDES.length);
    }, SLIDE_MS);
    return () => clearInterval(t);
  }, []);

  // Auto-swap destination word in the headline
  useEffect(() => {
    const t = setInterval(() => {
      setWordIdx((i) => (i + 1) % SWAP_WORDS.length);
    }, WORD_MS);
    return () => clearInterval(t);
  }, []);

  const scrollToBooking = useCallback((e) => {
    e.preventDefault();
    const target = document.querySelector('.quick-booking-bar');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const slide = SLIDES[slideIdx];

  return (
    <section className="hh-hero" aria-label="Hills Tour & Travels — Eastern Himalayan journeys">
      {/* Background image carousel */}
      <div className="hh-hero-bg" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.img
            key={slideIdx}
            src={slide.src}
            alt=""
            className="hh-hero-bg-img"
            style={{ objectPosition: slide.objectPosition }}
            initial={{ opacity: 0, scale: isMobile ? 1.02 : 1.08 }}
            animate={{ opacity: 1, scale: isMobile ? 1.07 : 1.16 }}
            exit={{ opacity: 0, scale: isMobile ? 1.10 : 1.22 }}
            transition={{
              opacity: { duration: 1.6, ease: 'easeInOut' },
              scale: { duration: SLIDE_MS / 1000 + 1.6, ease: 'linear' }
            }}
            loading={slideIdx === 0 ? 'eager' : 'lazy'}
            fetchpriority={slideIdx === 0 ? 'high' : 'auto'}
          />
        </AnimatePresence>
        <div className="hh-hero-gradient" />
        <div className="hh-hero-vignette" />
      </div>

      {/* Foreground content */}
      <div className="hh-hero-content">
        {/* Language toggle (top-left) */}
        <div className="hh-lang" ref={langMenuRef}>
          <button
            type="button"
            className="hh-lang-btn"
            onClick={() => setLangOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={langOpen}
            aria-label="Change language"
          >
            <i className="fa-solid fa-globe" aria-hidden="true" />
            <span className="hh-lang-label">{currentLang.label}</span>
            <i className={`fa-solid fa-chevron-down hh-lang-caret ${langOpen ? 'is-open' : ''}`} aria-hidden="true" />
          </button>
          <AnimatePresence>
            {langOpen && (
              <motion.ul
                className="hh-lang-menu"
                role="listbox"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {LANGS.map((l) => (
                  <li key={l.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={l.code === lang}
                      className={`hh-lang-item ${l.code === lang ? 'is-active' : ''}`}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                    >
                      <span className="hh-lang-flag" aria-hidden="true">{l.flag}</span>
                      <span>{l.label}</span>
                      {l.code === lang && <i className="fa-solid fa-check hh-lang-check" aria-hidden="true" />}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Live slide tag (top-right) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`tag-${slideIdx}`}
            className="hh-slide-tag"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.5 }}
          >
            <span className="hh-slide-tag-dot" />
            <i className={`fa-solid ${slide.icon}`} />
            <span>{slide.tag}</span>
          </motion.div>
        </AnimatePresence>

        {/* Trust badge */}
        <motion.div
          key={`trust-${lang}`}
          className="hh-trust-badge"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        >
          <span className="hh-stars" aria-hidden="true">★ ★ ★ ★ ★</span>
          <span className="hh-trust-text">
            <strong>4.9</strong>
            <span className="hh-trust-sep">·</span>
            <span>{t.trust}</span>
          </span>
        </motion.div>

        {/* Headline with word swap */}
        <motion.h1
          key={`hl-${lang}`}
          className="hh-headline"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hh-headline-line">{t.explore}</span>{' '}
          <span className="hh-word-swap" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span
                key={SWAP_WORDS[wordIdx]}
                className="hh-word"
                initial={{ opacity: 0, y: 26, rotateX: -75 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -26, rotateX: 75 }}
                transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {SWAP_WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
          <br />
          <span className="hh-headline-line hh-headline-secondary">{t.withUs}</span>
        </motion.h1>

        {/* Feature pills */}
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
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
              }}
            >
              <i className={`fa-solid ${p.i}`} aria-hidden="true" />
              <span>{p.t}</span>
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          key={`cta-${lang}`}
          className="hh-cta-row"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a href="#book" onClick={scrollToBooking} className="hh-cta hh-cta-primary">
            <span>{t.bookNow}</span>
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </a>
          <a href="#/packages" className="hh-cta hh-cta-ghost">
            <i className="fa-solid fa-compass" aria-hidden="true" />
            <span>{t.explorePkgs}</span>
          </a>
        </motion.div>

        {/* Pickup meta */}
        <motion.div
          key={`meta-${lang}`}
          className="hh-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          <i className="fa-solid fa-location-dot" aria-hidden="true" />
          <span>{t.pickup}</span>
        </motion.div>
      </div>

      {/* Slide indicator dots */}
      <div className="hh-dots" role="tablist" aria-label="Hero slides">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === slideIdx}
            aria-label={`Show ${s.tag}`}
            className={`hh-dot ${i === slideIdx ? 'is-active' : ''}`}
            onClick={() => setSlideIdx(i)}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <motion.div
        className="hh-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.8 },
          y: { delay: 1.8, duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
        }}
        aria-hidden="true"
      >
        <span>{t.scroll}</span>
        <i className="fa-solid fa-chevron-down" />
      </motion.div>
    </section>
  );
}

export default HillsHero;
