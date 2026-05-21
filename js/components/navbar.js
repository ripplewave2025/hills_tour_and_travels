/* ==========================================
   HILLS TOUR & TRAVELS — NAVBAR COMPONENT
   ========================================== */

const LANGS = [
  { code: 'en', label: 'English',  short: 'EN', flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी',     short: 'HI', flag: '🇮🇳' },
  { code: 'bn', label: 'বাংলা',     short: 'BN', flag: '🇧🇩' },
  { code: 'ne', label: 'नेपाली',    short: 'NE', flag: '🇳🇵' },
  { code: 'zh', label: '中文',       short: 'ZH', flag: '🇨🇳' },
  { code: 'th', label: 'ไทย',        short: 'TH', flag: '🇹🇭' }
];

function getInitialLang() {
  if (typeof window === 'undefined') return 'en';
  return window.localStorage.getItem('hh.lang') || 'en';
}

export const Navbar = {
  render() {
    const cur = LANGS.find(l => l.code === getInitialLang()) || LANGS[0];
    return `
      <nav class="navbar animate-fade-in">
        <div class="container navbar-container">
          <!-- Premium Logo Brand -->
          <a href="#/" class="nav-brand">
            <span class="logo-circle">
              <i class="fa-solid fa-mountain-sun"></i>
            </span>
            <div class="brand-text">
              <span class="brand-title">HILLS</span>
              <span class="brand-subtitle">TOUR & TRAVELS</span>
            </div>
          </a>

          <!-- Desktop Navigation Links -->
          <ul class="nav-links">
            <li><a href="#/" class="nav-link" id="nav-home">Home</a></li>
            <li><a href="#/packages" class="nav-link" id="nav-packages">Tour Packages</a></li>
            <li><a href="#/packages?tab=destinations" class="nav-link" id="nav-destinations">Destinations</a></li>
            <li><a href="#/packages?tab=experiences" class="nav-link" id="nav-experiences">Experiences</a></li>
            <li><a href="#/route" class="nav-link" id="nav-route">Build a Route</a></li>
            <li><a href="#/booking" class="btn btn-primary btn-sm nav-cta">Book Taxi <i class="fa-solid fa-arrow-right"></i></a></li>
          </ul>

          <!-- Right cluster: WhatsApp + language toggle + hamburger -->
          <div class="navbar-right">
            <a href="https://wa.me/919907219843" target="_blank" rel="noopener noreferrer" class="navbar-whatsapp-btn" title="Contact support on WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
              <span class="navbar-whatsapp-number">+91 99072 19843</span>
            </a>

            <div class="navbar-lang" id="navbar-lang">
              <button type="button" class="navbar-lang-btn" id="navbar-lang-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="Change language">
                <i class="fa-solid fa-globe"></i>
                <span class="navbar-lang-code" id="navbar-lang-code">${cur.short}</span>
                <i class="fa-solid fa-chevron-down navbar-lang-caret"></i>
              </button>
              <ul class="navbar-lang-menu" id="navbar-lang-menu" role="listbox">
                ${LANGS.map(l => `
                  <li>
                    <button type="button" role="option" data-lang="${l.code}" class="navbar-lang-item ${l.code === cur.code ? 'is-active' : ''}" aria-selected="${l.code === cur.code}">
                      <span class="navbar-lang-flag" aria-hidden="true">${l.flag}</span>
                      <span class="navbar-lang-name">${l.label}</span>
                      ${l.code === cur.code ? '<i class="fa-solid fa-check navbar-lang-check" aria-hidden="true"></i>' : ''}
                    </button>
                  </li>
                `).join('')}
              </ul>
            </div>

            <button class="nav-hamburger" id="nav-hamburger-trigger" aria-label="Toggle Navigation">
              <i class="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>

        <!-- Mobile Slide-In Navigation Drawer -->
        <div class="mobile-drawer" id="mobile-drawer">
          <div class="drawer-header">
            <a href="#/" class="nav-brand">
              <span class="logo-circle"><i class="fa-solid fa-mountain-sun"></i></span>
              <span class="brand-title">HILLS</span>
            </a>
            <button class="drawer-close" id="drawer-close-trigger"><i class="fa-solid fa-xmark"></i></button>
          </div>
          
          <div class="drawer-whatsapp-box">
            <a href="https://wa.me/919907219843" target="_blank" rel="noopener noreferrer" class="drawer-whatsapp-link">
              <i class="fa-brands fa-whatsapp"></i> Chat Live Support
              <span class="drawer-whatsapp-num">+91 99072 19843</span>
            </a>
          </div>

          <ul class="drawer-links">
            <li><a href="#/" class="drawer-link" id="drawer-home"><i class="fa-solid fa-house"></i> Home</a></li>
            <li><a href="#/packages" class="drawer-link" id="drawer-packages"><i class="fa-solid fa-boxes-packing"></i> Tour Packages</a></li>
            <li><a href="#/packages?tab=destinations" class="drawer-link" id="drawer-destinations"><i class="fa-solid fa-map-location-dot"></i> Destinations</a></li>
            <li><a href="#/packages?tab=experiences" class="drawer-link" id="drawer-experiences"><i class="fa-solid fa-sparkles"></i> Experiences</a></li>
            <li><a href="#/route" class="drawer-link" id="drawer-route"><i class="fa-solid fa-compass-drafting"></i> Build a Route</a></li>
            <li style="margin-top: 20px;">
              <a href="#/booking" class="btn btn-primary nav-cta-mobile"><i class="fa-solid fa-taxi"></i> Book Ride Now</a>
            </li>
          </ul>
        </div>
        <div class="drawer-overlay" id="drawer-overlay"></div>
      </nav>
    `;
  },

  init() {
    const navbar = document.querySelector(".navbar");
    const hamburger = document.getElementById("nav-hamburger-trigger");
    const drawer = document.getElementById("mobile-drawer");
    const closeBtn = document.getElementById("drawer-close-trigger");
    const overlay = document.getElementById("drawer-overlay");
    const links = document.querySelectorAll(".drawer-link, .nav-cta-mobile");

    // Scroll Effect: Glassmorphism header adjustment
    const handleScroll = () => {
      if (window.scrollY > 30) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial state

    // Toggle Drawer Open / Close
    const toggleDrawer = (isOpen) => {
      drawer.classList.toggle("drawer-open", isOpen);
      overlay.classList.toggle("overlay-visible", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    };

    hamburger.addEventListener("click", () => toggleDrawer(true));
    closeBtn.addEventListener("click", () => toggleDrawer(false));
    overlay.addEventListener("click", () => toggleDrawer(false));

    // Handle Route Navigation Close
    links.forEach(link => {
      link.addEventListener("click", () => toggleDrawer(false));
    });

    // Update active state based on hash
    const updateActiveState = () => {
      const hash = window.location.hash || "#/";
      
      // Reset active states
      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      document.querySelectorAll(".drawer-link").forEach(l => l.classList.remove("active"));

      if (hash === "#/") {
        document.getElementById("nav-home")?.classList.add("active");
        document.getElementById("drawer-home")?.classList.add("active");
      } else if (hash.startsWith("#/packages")) {
        if (hash.includes("tab=destinations")) {
          document.getElementById("nav-destinations")?.classList.add("active");
          document.getElementById("drawer-destinations")?.classList.add("active");
        } else if (hash.includes("tab=experiences")) {
          document.getElementById("nav-experiences")?.classList.add("active");
          document.getElementById("drawer-experiences")?.classList.add("active");
        } else {
          document.getElementById("nav-packages")?.classList.add("active");
          document.getElementById("drawer-packages")?.classList.add("active");
        }
      } else if (hash.startsWith("#/route") || hash.startsWith("#/discover")) {
        document.getElementById("nav-route")?.classList.add("active");
        document.getElementById("drawer-route")?.classList.add("active");
      }
    };

    window.addEventListener("hashchange", updateActiveState);
    updateActiveState();

    // ----- Language toggle -----
    const langWrap = document.getElementById("navbar-lang");
    const langBtn = document.getElementById("navbar-lang-btn");
    const langMenu = document.getElementById("navbar-lang-menu");
    const langCode = document.getElementById("navbar-lang-code");

    const setLang = (code) => {
      const l = LANGS.find(x => x.code === code) || LANGS[0];
      window.localStorage.setItem("hh.lang", l.code);
      document.documentElement.setAttribute("lang", l.code);
      if (langCode) langCode.textContent = l.short;
      langMenu.querySelectorAll(".navbar-lang-item").forEach(item => {
        const active = item.getAttribute("data-lang") === l.code;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", active ? "true" : "false");
        const existingCheck = item.querySelector(".navbar-lang-check");
        if (active && !existingCheck) {
          item.insertAdjacentHTML("beforeend", '<i class="fa-solid fa-check navbar-lang-check" aria-hidden="true"></i>');
        } else if (!active && existingCheck) {
          existingCheck.remove();
        }
      });
      window.dispatchEvent(new CustomEvent("hh:langchange", { detail: { lang: l.code } }));
    };

    const closeLangMenu = () => {
      langWrap?.classList.remove("is-open");
      langBtn?.setAttribute("aria-expanded", "false");
    };

    if (langBtn && langMenu && langWrap) {
      langBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = langWrap.classList.toggle("is-open");
        langBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      langMenu.querySelectorAll(".navbar-lang-item").forEach(item => {
        item.addEventListener("click", () => {
          const code = item.getAttribute("data-lang");
          if (code) setLang(code);
          closeLangMenu();
        });
      });

      // Close on outside click
      document.addEventListener("click", (e) => {
        if (!langWrap.contains(e.target)) closeLangMenu();
      });

      // Close on Escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeLangMenu();
      });
    }

    // Sync UI if some other surface (e.g., legacy hero) flips the language
    window.addEventListener("hh:langchange", (e) => {
      const code = e.detail?.lang;
      if (!code || !langCode) return;
      const l = LANGS.find(x => x.code === code);
      if (l) langCode.textContent = l.short;
    });

    // Store listener references for cleanups
    this.scrollListener = handleScroll;
  },

  destroy() {
    if (this.scrollListener) {
      window.removeEventListener("scroll", this.scrollListener);
    }
  }
};
