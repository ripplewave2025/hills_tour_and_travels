/* ==========================================
   HILLS TOUR & TRAVELS — MAIN APPLICATION SPA ENTRY
   ========================================== */

import { Router } from './utils/router.js';
import { Navbar } from './components/navbar.js';
import { Footer } from './components/footer.js';
import { WhatsAppFab } from './components/whatsapp-fab.js';

// Page Components
import { Home } from './pages/home.js';
import { About } from './pages/about.js';
import { DestinationDetail } from './pages/destination.js';
import { Packages } from './pages/packages.js';
import { Booking } from './pages/booking.js';
import { AdminBookings } from './pages/admin-bookings.js';
import { AdminPackages } from './pages/admin-packages.js';
import { reactRoute } from './utils/react-mount.js';
import { Discover } from './pages/react/Discover.jsx';
import { RouteBuilder } from './pages/react/RouteBuilder.jsx';
import { RouteQuote } from './pages/react/RouteQuote.jsx';
import { SwipePackages } from './pages/react/SwipePackages.jsx';

const DiscoverPage = reactRoute(Discover);
const RouteBuilderPage = reactRoute(RouteBuilder);
const RouteQuotePage = reactRoute(RouteQuote);
const SwipePackagesPage = reactRoute(SwipePackages);

// Animation Utilities
import { initScrollReveal, initParallaxMouseMove } from './utils/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mount Global Shell Elements
  const navbarMount = document.getElementById('navbar-mount');
  const footerMount = document.getElementById('footer-mount');
  const fabMount = document.getElementById('fab-mount');

  // Each shell mount is isolated so a single failure can't kill the whole
  // page (which would otherwise make every link/button feel "dead").
  const safeMount = (label, mount, comp) => {
    if (!mount) return;
    try {
      mount.innerHTML = comp.render();
      if (comp.init) comp.init();
    } catch (err) {
      console.error(`[shell] Failed to mount ${label}:`, err);
    }
  };

  safeMount('navbar', navbarMount, Navbar);
  safeMount('footer', footerMount, Footer);
  safeMount('fab', fabMount, WhatsAppFab);

  // 2. Define SPA Router Mapping
  const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/destinations/:id', component: DestinationDetail },
    { path: '/packages', component: SwipePackagesPage },
    { path: '/packages/grid', component: Packages },
    { path: '/booking', component: Booking },
    { path: '/admin/bookings', component: AdminBookings },
    { path: '/admin/packages', component: AdminPackages },
    { path: '/discover', component: DiscoverPage },
    { path: '/route', component: RouteBuilderPage },
    { path: '/route/quote', component: RouteQuotePage }
  ];

  // Initialize Router (self-initializes on construction and hashchange)
  const router = new Router(routes, 'content-mount');
  void router;

  // 3. Global Interactive Animations & Parallax binds
  let parallaxDestroyer = null;

  const runGlobalPageAnimations = () => {
    // Destroy previous page's parallax mouse listener if active
    if (parallaxDestroyer) {
      parallaxDestroyer();
      parallaxDestroyer = null;
    }

    // Trigger standard scroll reveal observer on newly rendered DOM elements
    setTimeout(() => {
      initScrollReveal();

      // Bind cinematic mouse parallax on Homepage Hero background
      const hash = window.location.hash || '#/';
      if (hash === '#/') {
        parallaxDestroyer = initParallaxMouseMove('.hero-section', '.hero-background', 25);
      }
    }, 150); // Tiny defer to let the router insert DOM content
  };

  // Bind to load and hash change transitions
  window.addEventListener('hashchange', runGlobalPageAnimations);
  runGlobalPageAnimations();

  console.log('🏔️ Hills Tour & Travels SPA Initialized Successfully!');
});
