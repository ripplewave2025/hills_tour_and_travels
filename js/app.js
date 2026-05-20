/* ==========================================
   HILLS TOUR & TRAVELS — MAIN APPLICATION SPA ENTRY
   ========================================== */

import { Router } from './utils/router.js';
import { Navbar } from './components/navbar.js';
import { Footer } from './components/footer.js';
import { WhatsAppFab } from './components/whatsapp-fab.js';

// Page Components
import { Home } from './pages/home.js';
import { DestinationDetail } from './pages/destination.js';
import { Packages } from './pages/packages.js';
import { Booking } from './pages/booking.js';
import { AdminBookings } from './pages/admin-bookings.js';
import { reactRoute } from './utils/react-mount.js';
import { Discover } from './pages/react/Discover.jsx';

const DiscoverPage = reactRoute(Discover);

// Animation Utilities
import { initScrollReveal, initParallaxMouseMove } from './utils/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mount Global Shell Elements
  const navbarMount = document.getElementById('navbar-mount');
  const footerMount = document.getElementById('footer-mount');
  const fabMount = document.getElementById('fab-mount');

  if (navbarMount) {
    navbarMount.innerHTML = Navbar.render();
    Navbar.init();
  }

  if (footerMount) {
    footerMount.innerHTML = Footer.render();
    Footer.init();
  }

  if (fabMount) {
    fabMount.innerHTML = WhatsAppFab.render();
    WhatsAppFab.init();
  }

  // 2. Define SPA Router Mapping
  const routes = [
    { path: '/', component: Home },
    { path: '/destinations/:id', component: DestinationDetail },
    { path: '/packages', component: Packages },
    { path: '/booking', component: Booking },
    { path: '/admin/bookings', component: AdminBookings },
    { path: '/discover', component: DiscoverPage }
  ];

  // Initialize Router
  const router = new Router(routes, 'content-mount');

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
