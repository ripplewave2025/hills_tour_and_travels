/* ==========================================
   HILLS TOUR & TRAVELS — HOME PAGE
   ========================================== */

import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
import { destinations } from '../data/destinations.js';
import { packages } from '../data/packages.js';
import { vehicles } from '../data/vehicles.js';
import { HillsHero } from '../components/react/HillsHero.jsx';

export const Home = {
  render() {
    // Curate popular packages for homepage display
    const popularPackages = packages.filter(p => ["darjeeling-7-point", "gangtok-tsomgo-circuit", "gangtok-nathula-pass", "darjeeling-tiger-hill"].includes(p.id));

    return `
      <!-- 1. Cinematic Hero — React + framer-motion -->
      <div id="hills-hero-mount"></div>

      <!-- Build-your-route promo intentionally removed from home; route page still lives at /#/route -->

      <!-- 2. Swipable Destination Deck -->
      <section class="section-padding overflow-hidden">
        <div class="container">
          <div class="section-header flex-between">
            <div>
              <span class="badge badge-brand"><i class="fa-solid fa-compass"></i> <span data-i18n="home.destBadge">Explore The Corridor</span></span>
              <h2 class="section-title" data-i18n="home.destTitle">Major Mountain Destinations</h2>
            </div>
            <div class="carousel-nav-arrows">
              <button class="carousel-arrow" id="carousel-prev" aria-label="Previous Destination"><i class="fa-solid fa-chevron-left"></i></button>
              <button class="carousel-arrow" id="carousel-next" aria-label="Next Destination"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
          </div>
          
          <!-- Carousel Viewport -->
          <div class="carousel-viewport" id="destinations-carousel">
            <div class="carousel-track">
              ${destinations.map(dest => `
                <div class="carousel-slide">
                  <div class="destination-card glass-panel glass-panel-hover">
                    <div class="dest-card-image" style="background-image: url('${dest.image}');">
                      ${dest.permitRequired ? `<span class="dest-permit-tag"><i class="fa-solid fa-id-card"></i> Permit Mandatory</span>` : ''}
                    </div>
                    <div class="dest-card-content">
                      <div class="flex-between">
                        <span class="dest-card-elevation"><i class="fa-solid fa-mountain"></i> ${dest.elevation}</span>
                        <span class="dest-card-season"><i class="fa-solid fa-calendar-days"></i> ${dest.bestSeason.split(',')[0]}</span>
                      </div>
                      <h3 class="dest-card-title">${dest.name}</h3>
                      <p class="dest-card-tagline">${dest.tagline}</p>
                      <a href="#/destinations/${dest.id}" class="btn btn-secondary btn-sm w-100" style="margin-top: 16px;">
                        <span>Explore Packages</span> <i class="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </section>

      <!-- 3. How It Works Section -->
      <section class="section-padding bg-surface-alt">
        <div class="container text-center">
          <span class="badge badge-brand"><i class="fa-solid fa-circle-info"></i> <span data-i18n="home.howBadge">Frictionless Mobility</span></span>
          <h2 class="section-title" data-i18n="home.howTitle">Book A Hill Ride In 30 Seconds</h2>
          <p class="section-subtitle" data-i18n="home.howSub">We have digitized mountain travel rules. No phone calling, no union bargaining.</p>

          <div class="grid grid-3" style="margin-top: 50px;">
            <div class="step-card glass-panel animate-scroll-reveal">
              <div class="step-badge">1</div>
              <i class="fa-solid fa-route step-icon"></i>
              <h3 data-i18n="home.step1">Choose Terminals</h3>
              <p>Type departures and drop-offs. Instant fuzzy autocomplete resolves spellings immediately.</p>
            </div>
            <div class="step-card glass-panel animate-scroll-reveal" style="animation-delay: 0.1s;">
              <div class="step-badge">2</div>
              <i class="fa-solid fa-car-rear step-icon"></i>
              <h3 data-i18n="home.step2">Select Mountain Fleet</h3>
              <p>Hatchbacks, luxury sedans, or rugged 4WD SUVs mandated for high altitude permit zones.</p>
            </div>
            <div class="step-card glass-panel animate-scroll-reveal" style="animation-delay: 0.2s;">
              <div class="step-badge">3</div>
              <i class="fa-solid fa-ticket step-icon"></i>
              <h3 data-i18n="home.step3">One-Click Checkout</h3>
              <p>Secure digital payment gateway. Permits are automatically generated by verified local partners.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Curated Sightseeing Packages -->
      <section class="section-padding">
        <div class="container">
          <div class="text-center" style="margin-bottom: 50px;">
            <span class="badge badge-brand"><i class="fa-solid fa-sparkles"></i> Curated Expeditions</span>
            <h2 class="section-title" data-i18n="home.pkgTitle">Popular Sightseeing Modules</h2>
            <p class="section-subtitle">Fixed prices. All permits, driver lodging allowances, and border entries fully bundled.</p>
          </div>

          <div class="grid grid-2">
            ${popularPackages.map(pkg => {
              const dest = destinations.find(d => d.id === pkg.destinationId);
              return `
                <div class="package-card glass-panel ${pkg.isComingSoon ? '' : 'glass-panel-hover'} flex animate-scroll-reveal">
                  <div class="pkg-card-details">
                    <div class="flex-between" style="margin-bottom: 8px;">
                      <span class="pkg-dest-badge"><i class="fa-solid fa-location-dot"></i> ${dest.name}</span>
                      <div style="display: flex; gap: 8px; align-items: center;">
                        <span class="pkg-duration-badge" style="font-size: 0.75rem; padding: 4px 10px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-sm);"><i class="fa-solid fa-map-pin"></i> ${pkg.attractions.length}-Point</span>
                        <span class="pkg-duration-badge" style="font-size: 0.75rem; padding: 4px 10px; background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: var(--radius-sm); color: var(--brand-color);"><i class="fa-solid fa-clock"></i> ${pkg.duration}</span>
                      </div>
                    </div>
                    <h3 class="pkg-title">${pkg.name}</h3>
                    <p class="pkg-desc">${pkg.description.slice(0, 100)}...</p>
                    
                    <div class="pkg-attractions">
                      <strong>Key Stops:</strong>
                      <ul>
                        ${pkg.attractions.slice(0, 3).map(att => `<li><i class="fa-solid fa-check"></i> ${att}</li>`).join("")}
                      </ul>
                    </div>

                    <div class="pkg-pricing-row flex-between">
                      ${pkg.isComingSoon ? `
                        <div class="pkg-price-col">
                          <span class="pkg-price-lbl">Pricing</span>
                          <div style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 700; color: var(--brand-color); display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-bell" style="font-size: 0.85rem;"></i> Enquire</div>
                        </div>
                        <a href="https://wa.me/919907219843?text=${encodeURIComponent('Hi! I\'m interested in the \"' + pkg.name + '\" package. Could you share pricing?')}" target="_blank" class="btn btn-primary" style="background: linear-gradient(135deg, #25d366, #128c7e);"><i class="fa-brands fa-whatsapp"></i> Enquire</a>
                      ` : `
                        <div class="pkg-price-col">
                          <span class="pkg-price-lbl">Starting From</span>
                          <div class="pkg-price-val">₹${pkg.priceSedan || pkg.priceSuv}</div>
                        </div>
                        <a href="#/booking?package=${pkg.id}" class="btn btn-primary">Book Package</a>
                      `}
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
          
          <div class="text-center" style="margin-top: 40px;">
            <a href="#/packages" class="btn btn-brand-outline"><span data-i18n="home.viewAll">View All Sightseeing Packages</span> <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </section>

      <!-- 5. Interactive Premium Fleet Showcase -->
      <section class="section-padding bg-surface-alt">
        <div class="container">
          <div class="text-center" style="margin-bottom: 50px;">
            <span class="badge badge-brand"><i class="fa-solid fa-shield-halved"></i> Premium Safety Standards</span>
            <h2 class="section-title" data-i18n="home.fleetTitle">Mountain Compliant Fleet</h2>
            <p class="section-subtitle">All vehicles are under 10 years old, regularly inspected, with certified hill drivers.</p>
          </div>

          <div class="fleet-grid">
            ${vehicles.map(vh => `
              <div class="fleet-card glass-panel glass-panel-hover animate-scroll-reveal">
                <div class="fleet-card-image" style="background-image: url('${vh.image}');"></div>
                <div class="fleet-card-content">
                  <span class="badge badge-brand mb-1">${vh.capacity} | ${vh.luggage.split(' ')[0]} Bags</span>
                  <h3 class="fleet-name">${vh.name}</h3>
                  <div class="fleet-models" style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">
                    Models: ${vh.models.join(", ")}
                  </div>
                  <ul class="fleet-features-list">
                    ${vh.features.slice(0, 3).map(feat => `<li><i class="fa-solid fa-circle-check text-brand"></i> ${feat}</li>`).join("")}
                  </ul>
                  ${vh.id.startsWith("suv") ? `<span class="fleet-suv-tag"><i class="fa-solid fa-snowflake"></i> North Sikkim Approved</span>` : ''}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- 6. Trust Badges & Performance Metrics -->
      <section class="section-padding">
        <div class="container">
          <div class="grid grid-4 text-center">
            <div class="stat-card glass-panel animate-scroll-reveal">
              <i class="fa-solid fa-users stat-icon text-brand"></i>
              <div class="stat-number" data-target="3500">0</div>
              <p class="stat-label">Happy Tourists</p>
            </div>
            <div class="stat-card glass-panel animate-scroll-reveal" style="animation-delay: 0.1s;">
              <i class="fa-solid fa-route stat-icon text-brand"></i>
              <div class="stat-number" data-target="120">0</div>
              <p class="stat-label">Mapped Terminals</p>
            </div>
            <div class="stat-card glass-panel animate-scroll-reveal" style="animation-delay: 0.2s;">
              <i class="fa-solid fa-star-half-stroke stat-icon text-brand"></i>
              <div class="stat-number" data-target="4.9" data-decimals="1">0</div>
              <p class="stat-label">Google Rating (24 Reviews)</p>
            </div>
            <div class="stat-card glass-panel animate-scroll-reveal" style="animation-delay: 0.3s;">
              <i class="fa-solid fa-award stat-icon text-brand"></i>
              <div class="stat-number" data-target="100">0</div>
              <p class="stat-label">% Legal Permitting</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. Customer Testimonials Slider -->
      <section class="section-padding bg-surface-alt">
        <div class="container text-center">
          <span class="badge badge-brand"><i class="fa-solid fa-comments"></i> Guest Journals</span>
          <h2 class="section-title" style="margin-bottom: 50px;" data-i18n="home.testiTitle">What Our Travelers Experience</h2>
          
          <div class="testimonial-slider glass-panel">
            <div class="testimonial-slide active">
              <i class="fa-solid fa-quote-left testimonial-quote-icon"></i>
              <p class="testimonial-text">"Booking a private SUV from Bagdogra to Gangtok was incredibly easy! The price was exactly as calculated online, and the permit handling for Tsomgo Lake was handled without any paperwork stress. Amazing service!"</p>
              <div class="testimonial-author">
                <strong>Ananya Sharma</strong>
                <span style="font-size: 0.8rem; color: var(--text-muted);">Travelled Oct 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    // 0. Mount the React + framer-motion hero
    const heroMount = document.getElementById('hills-hero-mount');
    if (heroMount) {
      try {
        this.heroRoot = createRoot(heroMount);
        this.heroRoot.render(createElement(HillsHero));
      } catch (err) {
        console.error('🚨 [Home] Failed to mount HillsHero:', err);
      }
    }

    // Booking widget moved to the dedicated /booking page — hero "Book Now" links there.

    // Swipable Destination Carousel Logic (Custom drag/touch handler)
    const track = document.querySelector(".carousel-track");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    
    if (track && prevBtn && nextBtn) {
      let isDragging = false;
      let startX = 0;
      let currentX = 0;
      let scrollLeft = 0;
      let scrollOffset = 0;

      // Click arrow buttons
      const getSlideWidth = () => {
        const slide = track.querySelector(".carousel-slide");
        return slide ? slide.getBoundingClientRect().width + 24 : 320; // width + gap
      };

      prevBtn.addEventListener("click", () => {
        track.scrollBy({ left: -getSlideWidth(), behavior: "smooth" });
      });

      nextBtn.addEventListener("click", () => {
        track.scrollBy({ left: getSlideWidth(), behavior: "smooth" });
      });

      // Mouse drag logic
      track.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        track.style.cursor = "grabbing";
      });

      track.addEventListener("mouseleave", () => {
        isDragging = false;
        track.style.cursor = "grab";
      });

      track.addEventListener("mouseup", () => {
        isDragging = false;
        track.style.cursor = "grab";
      });

      track.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5; // multiplier
        track.scrollLeft = scrollLeft - walk;
      });

      // Touch drag logic
      track.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
      });

      track.addEventListener("touchend", () => {
        isDragging = false;
      });

      track.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;
        track.scrollLeft = scrollLeft - walk;
      });
    }

    // 4. Numbers Count-Up Animation
    const stats = document.querySelectorAll(".stat-number");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute("data-target"));
          const decimals = parseInt(el.getAttribute("data-decimals") || "0");
          let current = 0;
          const increment = target / 30; // 30 steps
          
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.innerText = target.toFixed(decimals) + (target === 100 ? "%" : "+");
              clearInterval(interval);
            } else {
              el.innerText = current.toFixed(decimals) + (target === 100 ? "%" : "+");
            }
          }, 30);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(st => observer.observe(st));
  },

  destroy() {
    if (this.heroRoot) {
      try { this.heroRoot.unmount(); } catch (e) { /* noop */ }
      this.heroRoot = null;
    }
  }
};
