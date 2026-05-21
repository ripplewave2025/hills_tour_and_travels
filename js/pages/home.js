/* ==========================================
   HILLS TOUR & TRAVELS — HOME PAGE
   ========================================== */

import { destinations } from '../data/destinations.js';
import { packages } from '../data/packages.js';
import { vehicles } from '../data/vehicles.js';
import { SearchBar } from '../components/search-bar.js';

export const Home = {
  render() {
    // Curate popular packages for homepage display
    const popularPackages = packages.filter(p => ["darjeeling-7-point", "gangtok-tsomgo-circuit", "gangtok-nathula-pass", "darjeeling-tiger-hill"].includes(p.id));
    
    // Autocomplete Search Components (HTML hooks)
    this.fromSearch = new SearchBar("home-from-input", "home-from-dropdown", "from");
    this.toSearch = new SearchBar("home-to-input", "home-to-dropdown", "to");

    return `
      <!-- 1. Cinematic Hero Section -->
      <section class="hero-section">
        <div class="hero-background animate-fade-in" style="background-image: linear-gradient(rgba(6, 9, 19, 0.4), #060913), url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=75&w=${window.innerWidth <= 768 ? 800 : 1600}');"></div>
        <div class="container hero-container">
          <div class="hero-content text-center animate-fade-up">
            <span class="badge badge-brand mb-1"><i class="fa-solid fa-mountain"></i> Elevating Mountain Travel</span>
            <h1 class="hero-title">Your Ultimate Himalayan Mobility Partner</h1>
            <p class="hero-subtitle">Experience instant, transparent, and syndicate-free taxi services across Darjeeling, Sikkim, Nepal, and Bhutan.</p>
          </div>

          <!-- Quick Booking Glass Panel -->
          <div class="quick-booking-bar glass-panel animate-fade-up" style="animation-delay: 0.2s;">
            <div class="booking-grid">
              <div class="booking-field-col">
                <label class="form-label"><i class="fa-solid fa-circle-dot text-brand"></i> Pick-up Location (Ride From)</label>
                ${this.fromSearch.render()}
              </div>
              <div class="booking-divider">
                <i class="fa-solid fa-arrow-right-left"></i>
              </div>
              <div class="booking-field-col">
                <label class="form-label"><i class="fa-solid fa-map-location-dot text-brand"></i> Drop-off Location (Destination)</label>
                ${this.toSearch.render()}
              </div>
              <div class="booking-field-col">
                <label class="form-label"><i class="fa-solid fa-users text-brand"></i> Travelers</label>
                <select id="home-passengers-select" class="input-glass" style="padding: 14px 18px; height: 52px; background: rgba(255, 255, 255, 0.04); border: 1.5px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); font-family: var(--font-body); font-size: 0.95rem; cursor: pointer; outline: none; transition: all var(--transition-normal);">
                  <option value="1" style="background: var(--bg-surface); color: var(--text-primary);">1 Person</option>
                  <option value="2" selected style="background: var(--bg-surface); color: var(--text-primary);">2 People</option>
                  <option value="3" style="background: var(--bg-surface); color: var(--text-primary);">3 People</option>
                  <option value="4" style="background: var(--bg-surface); color: var(--text-primary);">4 People</option>
                  <option value="5" style="background: var(--bg-surface); color: var(--text-primary);">5 People</option>
                  <option value="6" style="background: var(--bg-surface); color: var(--text-primary);">6 People</option>
                  <option value="7" style="background: var(--bg-surface); color: var(--text-primary);">7 People</option>
                </select>
              </div>
              <div class="booking-action-col">
                <button id="home-booking-search-btn" class="btn btn-primary btn-lg booking-search-btn">
                  <span>Search Ride</span> <i class="fa-solid fa-taxi"></i>
                </button>
              </div>
            </div>
            <div id="quick-booking-warning" class="quick-booking-warning-msg"></div>
          </div>
        </div>
      </section>

      <!-- 1b. Map-first "Build your route" promo (from Compass design) -->
      <section class="section-padding" style="padding-top: 60px; padding-bottom: 20px;">
        <div class="container">
          <a href="#/route" class="route-builder-promo glass-panel glass-panel-hover">
            <div class="route-builder-promo-text">
              <span class="badge badge-brand mb-1"><i class="fa-solid fa-map-location-dot"></i> New · Map-first</span>
              <h2 class="route-builder-promo-title">Build your own Darjeeling route</h2>
              <p class="route-builder-promo-sub">Tap pins on a live map — Tiger Hill, Batasia, Ghoom, Happy Valley, Peace Pagoda — to assemble a custom day-trip. See stops, distance and price update as you go.</p>
              <span class="route-builder-promo-cta">Open the route builder <i class="fa-solid fa-arrow-right"></i></span>
            </div>
            <div class="route-builder-promo-mini" aria-hidden="true">
              <svg viewBox="0 0 200 220" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
                <defs>
                  <linearGradient id="hrb-trail" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#E6A729"/>
                    <stop offset="100%" stop-color="rgba(230,167,41,0.2)"/>
                  </linearGradient>
                </defs>
                <path d="M 178,30 Q 150,70 110,90 Q 70,108 60,150 Q 55,180 100,200" fill="none" stroke="url(#hrb-trail)" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 5"/>
                <g fill="#E6A729" stroke="#060913" stroke-width="2">
                  <circle cx="178" cy="30" r="7"/>
                  <circle cx="110" cy="90" r="7"/>
                  <circle cx="60" cy="150" r="7"/>
                  <circle cx="100" cy="200" r="7"/>
                </g>
              </svg>
            </div>
          </a>
        </div>
      </section>

      <!-- 2. Swipable Destination Deck -->
      <section class="section-padding overflow-hidden">
        <div class="container">
          <div class="section-header flex-between">
            <div>
              <span class="badge badge-brand"><i class="fa-solid fa-compass"></i> Explore The Corridor</span>
              <h2 class="section-title">Major Mountain Destinations</h2>
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
          <span class="badge badge-brand"><i class="fa-solid fa-circle-info"></i> Frictionless Mobility</span>
          <h2 class="section-title">Book A Hill Ride In 30 Seconds</h2>
          <p class="section-subtitle">We have digitized mountain travel rules. No phone calling, no union bargaining.</p>

          <div class="grid grid-3" style="margin-top: 50px;">
            <div class="step-card glass-panel animate-scroll-reveal">
              <div class="step-badge">1</div>
              <i class="fa-solid fa-route step-icon"></i>
              <h3>Choose Terminals</h3>
              <p>Type departures and drop-offs. Instant fuzzy autocomplete resolves spellings immediately.</p>
            </div>
            <div class="step-card glass-panel animate-scroll-reveal" style="animation-delay: 0.1s;">
              <div class="step-badge">2</div>
              <i class="fa-solid fa-car-rear step-icon"></i>
              <h3>Select Mountain Fleet</h3>
              <p>Hatchbacks, luxury sedans, or rugged 4WD SUVs mandated for high altitude permit zones.</p>
            </div>
            <div class="step-card glass-panel animate-scroll-reveal" style="animation-delay: 0.2s;">
              <div class="step-badge">3</div>
              <i class="fa-solid fa-ticket step-icon"></i>
              <h3>One-Click Checkout</h3>
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
            <h2 class="section-title">Popular Sightseeing Modules</h2>
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
            <a href="#/packages" class="btn btn-brand-outline">View All Sightseeing Packages <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </section>

      <!-- 5. Interactive Premium Fleet Showcase -->
      <section class="section-padding bg-surface-alt">
        <div class="container">
          <div class="text-center" style="margin-bottom: 50px;">
            <span class="badge badge-brand"><i class="fa-solid fa-shield-halved"></i> Premium Safety Standards</span>
            <h2 class="section-title">Mountain Compliant Fleet</h2>
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
          <h2 class="section-title" style="margin-bottom: 50px;">What Our Travelers Experience</h2>
          
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
    // 1. Initialize Autocompletes
    this.fromSearch.init((item) => {
      // Callback if needed
    });
    this.toSearch.init((item) => {
      // Callback if needed
    });

    // 2. Booking button handler
    const searchBtn = document.getElementById("home-booking-search-btn");
    const errorMsg = document.getElementById("quick-booking-warning");

    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        try {
          console.log("🏔️ [Home Search] Search Ride button clicked! Initiating terminal resolution...");
          
          // Debugging input bindings
          if (!this.fromSearch || !this.toSearch) {
            throw new Error("Autocomplete search bar instances are not initialized on the Home page object.");
          }

          const fromId = this.fromSearch.resolveInput();
          const toId = this.toSearch.resolveInput();
          
          console.log(`🏔️ [Home Search] Terminal Resolution Results: fromId="${fromId}", toId="${toId}"`);

          const passengersSelect = document.getElementById("home-passengers-select");
          const passengers = passengersSelect ? passengersSelect.value : "2";

          if (!fromId || !toId) {
            console.warn("🏔️ [Home Search] Failed to resolve one or both terminal selections.", { fromId, toId });
            if (errorMsg) {
              errorMsg.innerText = "Please specify a valid Pick-up Location and Drop-off Location from the dropdown or matching terms.";
              errorMsg.classList.add("visible");
            }
            return;
          }

          if (fromId === toId) {
            console.warn("🏔️ [Home Search] Duplicate terminals selected:", fromId);
            if (errorMsg) {
              errorMsg.innerText = "Pick-up Location and Drop-off Location cannot be the same.";
              errorMsg.classList.add("visible");
            }
            return;
          }

          if (errorMsg) {
            errorMsg.classList.remove("visible");
            errorMsg.innerText = "";
          }

          const destinationHash = `#/booking?from=${fromId}&to=${toId}&passengers=${passengers}`;
          console.log(`🏔️ [Home Search] Routing successfully to: ${destinationHash}`);
          
          // Execute SPA navigation
          window.location.hash = destinationHash;
        } catch (err) {
          console.error("🚨 [Home Search] Error caught in search ride click event:", err);
          if (errorMsg) {
            errorMsg.innerText = `An unexpected routing issue occurred: ${err.message}. Please check browser console.`;
            errorMsg.classList.add("visible");
          }
        }
      });
    }

    // 3. Swipable Destination Carousel Logic (Custom drag/touch handler)
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
    // Cleanups
  }
};
