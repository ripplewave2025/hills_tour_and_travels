/* ==========================================
   HILLS TOUR & TRAVELS — i18n (lightweight)
   ==========================================
   A dependency-free translation layer for the vanilla-JS shell.

   How it works:
   - Strings live in DICT keyed by a dotted key, with one entry per language.
   - Mark any element with  data-i18n="key"  and its text is translated.
   - applyTranslations(root) walks those elements and swaps text for the
     current language (from localStorage 'hh.lang').
   - It auto-runs on load and whenever the navbar fires 'hh:langchange',
     so the whole shell re-translates instantly when the toggle changes.

   To extend coverage, add keys to DICT and data-i18n attributes in markup.
   For long-form content (package descriptions, etc.) a translation API or
   professional translator is recommended over hand-authoring 6 languages.
   ========================================== */

export const SUPPORTED_LANGS = ['en', 'hi', 'bn', 'ne', 'zh', 'th'];

const DICT = {
  'nav.home':        { en: 'Home',          hi: 'होम',              bn: 'হোম',            ne: 'गृह',                 zh: '首页',     th: 'หน้าแรก' },
  'nav.packages':    { en: 'Tour Packages', hi: 'टूर पैकेज',         bn: 'ট্যুর প্যাকেজ',    ne: 'टुर प्याकेज',          zh: '旅游套餐', th: 'แพ็กเกจทัวร์' },
  'nav.destinations':{ en: 'Destinations',  hi: 'गंतव्य',           bn: 'গন্তব্য',         ne: 'गन्तव्य',             zh: '目的地',   th: 'จุดหมายปลายทาง' },
  'nav.experiences': { en: 'Experiences',   hi: 'अनुभव',            bn: 'অভিজ্ঞতা',       ne: 'अनुभवहरू',           zh: '体验',     th: 'ประสบการณ์' },
  'nav.about':       { en: 'About',         hi: 'हमारे बारे में',     bn: 'আমাদের সম্পর্কে', ne: 'हाम्रोबारे',          zh: '关于我们', th: 'เกี่ยวกับเรา' },
  'nav.route':       { en: 'Build a Route', hi: 'रूट बनाएं',         bn: 'রুট তৈরি করুন',   ne: 'रुट बनाउनुहोस्',      zh: '定制路线', th: 'สร้างเส้นทาง' },
  'nav.bookTaxi':    { en: 'Book Taxi',     hi: 'टैक्सी बुक करें',    bn: 'ট্যাক্সি বুক করুন', ne: 'ट्याक्सी बुक गर्नुहोस्', zh: '预订出租车', th: 'จองแท็กซี่' },
  'nav.bookRide':    { en: 'Book Ride Now', hi: 'अभी राइड बुक करें', bn: 'এখনই রাইড বুক করুন', ne: 'अहिले बुक गर्नुहोस्', zh: '立即预订', th: 'จองเลย' },
  'cta.bookNow':     { en: 'Book Now',      hi: 'अभी बुक करें',      bn: 'এখনই বুক করুন',   ne: 'अहिले बुक गर्नुहोस्',  zh: '立即预订', th: 'จองเลย' },
  'footer.contact':  { en: 'Contact & Operations', hi: 'संपर्क और संचालन', bn: 'যোগাযোগ ও পরিচালনা', ne: 'सम्पर्क र सञ्चालन', zh: '联系与运营', th: 'ติดต่อและการดำเนินงาน' },

  /* ---- Home page ---- */
  'home.destBadge':  { en: 'Explore The Corridor', hi: 'गलियारा देखें', bn: 'করিডোর ঘুরে দেখুন', ne: 'कोरिडोर अन्वेषण', zh: '探索走廊', th: 'สำรวจเส้นทาง' },
  'home.destTitle':  { en: 'Major Mountain Destinations', hi: 'प्रमुख पर्वतीय गंतव्य', bn: 'প্রধান পার্বত্য গন্তব্য', ne: 'प्रमुख पहाडी गन्तव्य', zh: '主要山区目的地', th: 'จุดหมายปลายทางบนภูเขาหลัก' },
  'home.howBadge':   { en: 'Frictionless Mobility', hi: 'आसान यात्रा', bn: 'ঝামেলাহীন যাত্রা', ne: 'सहज यात्रा', zh: '无忧出行', th: 'การเดินทางที่ราบรื่น' },
  'home.howTitle':   { en: 'Book A Hill Ride In 30 Seconds', hi: '30 सेकंड में राइड बुक करें', bn: '৩০ সেকেন্ডে রাইড বুক করুন', ne: '३० सेकेन्डमा राइड बुक गर्नुहोस्', zh: '30秒预订山区出行', th: 'จองรถขึ้นเขาใน 30 วินาที' },
  'home.howSub':     { en: 'No phone calls, no union bargaining — just book and go.', hi: 'न फोन कॉल, न मोलभाव — बस बुक करें और चलें।', bn: 'ফোন কল নেই, দরাদরি নেই — শুধু বুক করুন আর চলুন।', ne: 'फोन कल छैन, मोलमोलाइ छैन — बुक गर्नुहोस् र जानुहोस्।', zh: '无需电话，无需讨价还价——预订即走。', th: 'ไม่ต้องโทร ไม่ต้องต่อรอง — แค่จองแล้วไป' },
  'home.step1':      { en: 'Choose Terminals', hi: 'टर्मिनल चुनें', bn: 'টার্মিনাল বাছুন', ne: 'टर्मिनल छान्नुहोस्', zh: '选择上下车点', th: 'เลือกจุดรับ-ส่ง' },
  'home.step2':      { en: 'Select Mountain Fleet', hi: 'वाहन चुनें', bn: 'গাড়ি বেছে নিন', ne: 'गाडी छान्नुहोस्', zh: '选择车型', th: 'เลือกรถ' },
  'home.step3':      { en: 'One-Click Checkout', hi: 'एक-क्लिक भुगतान', bn: 'এক-ক্লিক চেকআউট', ne: 'एक-क्लिक भुक्तानी', zh: '一键结账', th: 'ชำระเงินคลิกเดียว' },
  'home.pkgTitle':   { en: 'Popular Sightseeing Modules', hi: 'लोकप्रिय दर्शनीय पैकेज', bn: 'জনপ্রিয় দর্শনীয় প্যাকেজ', ne: 'लोकप्रिय घुमघाम प्याकेज', zh: '热门观光行程', th: 'แพ็กเกจชมเมืองยอดนิยม' },
  'home.fleetTitle': { en: 'Mountain Compliant Fleet', hi: 'पर्वत-अनुरूप वाहन बेड़ा', bn: 'পাহাড়-উপযোগী গাড়িবহর', ne: 'पहाड-उपयुक्त गाडी', zh: '山区合规车队', th: 'ฟลีตรถสำหรับภูเขา' },
  'home.viewAll':    { en: 'View All Sightseeing Packages', hi: 'सभी पैकेज देखें', bn: 'সব প্যাকেজ দেখুন', ne: 'सबै प्याकेज हेर्नुहोस्', zh: '查看所有行程', th: 'ดูแพ็กเกจทั้งหมด' },
  'home.testiTitle': { en: 'What Our Travelers Experience', hi: 'हमारे यात्रियों के अनुभव', bn: 'আমাদের যাত্রীদের অভিজ্ঞতা', ne: 'हाम्रा यात्रुहरूको अनुभव', zh: '旅客的真实体验', th: 'ประสบการณ์ของผู้เดินทาง' },

  /* ---- About page ---- */
  'about.heroTitle': { en: "A local's welcome to the hills", hi: 'पहाड़ों में एक स्थानीय का स्वागत', bn: 'পাহাড়ে এক স্থানীয়র স্বাগত', ne: 'पहाडमा एक स्थानीयको स्वागत', zh: '当地人对群山的欢迎', th: 'การต้อนรับสู่ขุนเขาโดยคนท้องถิ่น' },
  'about.galleryTitle': { en: 'Shot by us, on these roads', hi: 'इन्हीं रास्तों पर, हमारे द्वारा ली गई', bn: 'এই পথেই, আমাদের তোলা', ne: 'यिनै बाटोमा, हामीले खिचेका', zh: '我们在这些路上拍摄', th: 'ถ่ายโดยเราบนเส้นทางเหล่านี้' },
  'about.ctaTitle':  { en: 'Come see the hills with us', hi: 'हमारे साथ पहाड़ देखें', bn: 'আমাদের সাথে পাহাড় দেখুন', ne: 'हामीसँग पहाड हेर्न आउनुहोस्', zh: '与我们一起看群山', th: 'มาเที่ยวภูเขากับเรา' }
};

export function getLang() {
  if (typeof window === 'undefined') return 'en';
  const l = window.localStorage.getItem('hh.lang') || 'en';
  return SUPPORTED_LANGS.includes(l) ? l : 'en';
}

export function t(key, lang = getLang()) {
  const entry = DICT[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
}

// Translate every [data-i18n] element under `root` (default: whole document).
export function applyTranslations(root = document) {
  const lang = getLang();
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = t(key, lang);
    if (val) el.textContent = val;
  });
}

// Wire global re-translation on language change. Safe to call multiple times.
let _wired = false;
export function initI18n() {
  applyTranslations();
  if (_wired) return;
  _wired = true;
  window.addEventListener('hh:langchange', () => applyTranslations());
}
