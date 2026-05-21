/* ==========================================
   HILLS TOUR & TRAVELS — NAVBAR COMPONENT
   ========================================== */

export const Navbar = {
  render() {
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
            <li><a href="#/route" class="nav-link" id="nav-route">Build a Route</a></li>
            <li><a href="#/booking" class="btn btn-primary btn-sm nav-cta">Book Taxi <i class="fa-solid fa-arrow-right"></i></a></li>
          </ul>

          <!-- Mobile Hamburger Trigger -->
          <button class="nav-hamburger" id="nav-hamburger-trigger" aria-label="Toggle Navigation">
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
          </button>
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
          <ul class="drawer-links">
            <li><a href="#/" class="drawer-link" id="drawer-home"><i class="fa-solid fa-house"></i> Home</a></li>
            <li><a href="#/packages" class="drawer-link" id="drawer-packages"><i class="fa-solid fa-route"></i> Tour Packages</a></li>
            <li><a href="#/route" class="drawer-link" id="drawer-route"><i class="fa-solid fa-map-location-dot"></i> Build a Route</a></li>
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
        document.getElementById("nav-packages")?.classList.add("active");
        document.getElementById("drawer-packages")?.classList.add("active");
      } else if (hash.startsWith("#/route") || hash.startsWith("#/discover")) {
        document.getElementById("nav-route")?.classList.add("active");
        document.getElementById("drawer-route")?.classList.add("active");
      }
    };

    window.addEventListener("hashchange", updateActiveState);
    updateActiveState();

    // Store listener references for cleanups
    this.scrollListener = handleScroll;
  },

  destroy() {
    if (this.scrollListener) {
      window.removeEventListener("scroll", this.scrollListener);
    }
  }
};
