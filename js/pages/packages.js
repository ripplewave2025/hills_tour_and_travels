/* ==========================================
   HILLS TOUR & TRAVELS — SIGHTSEEING PACKAGES GRID
   ========================================== */

import { packages } from '../data/packages.js';
import { destinations } from '../data/destinations.js';

export const Packages = {
  render() {
    return `
      <!-- Header Banner Section -->
      <section class="section-padding" style="padding-bottom: 20px; background: linear-gradient(180deg, rgba(6, 9, 19, 0.2), #060913);">
        <div class="container text-center" style="margin-top: 40px;">
          <span class="badge badge-brand"><i class="fa-solid fa-sparkles"></i> Curated Corridors</span>
          <h1 style="font-size: clamp(2.25rem, 5vw, 3.5rem); font-weight: 800; margin-top: 10px; margin-bottom: 12px; background: linear-gradient(135deg, white, var(--brand-color)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Sightseeing Expeditions</h1>
          <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto; font-size: 1.05rem;">
            Explore our pre-priced, regulatory-approved regional sightseeing tour modules. Complete with automatic permit bookings and driver allowances.
          </p>
        </div>
      </section>

      <!-- Advanced Filters Section -->
      <section style="margin-bottom: 40px;">
        <div class="container">
          <div class="glass-panel" style="padding: 24px; border-radius: var(--radius-md);">
            <div class="grid" style="grid-template-columns: 2fr 1fr 1fr; gap: 20px; align-items: end;">
              
              <!-- Search Bar Input -->
              <div class="form-group">
                <label class="form-label" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);"><i class="fa-solid fa-magnifying-glass"></i> Search Landmarks or Packages</label>
                <input type="text" id="pkg-search-inp" class="input-glass" placeholder="Type Tiger Hill, Tsomgo, Peace Pagoda..." style="padding: 12px 18px;" />
              </div>

              <!-- Destination Filter Dropdown -->
              <div class="form-group">
                <label class="form-label" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);"><i class="fa-solid fa-map-pin"></i> Corridor Zone</label>
                <select id="pkg-dest-select" class="input-glass" style="padding: 12px 18px;">
                  <option value="all">All Corridors</option>
                  ${destinations.filter(d => packages.some(p => p.destinationId === d.id)).map(d => `
                    <option value="${d.id}">${d.name}</option>
                  `).join("")}
                </select>
              </div>

              <!-- Sorting Dropdown -->
              <div class="form-group">
                <label class="form-label" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);"><i class="fa-solid fa-arrow-down-wide-short"></i> Arrange By</label>
                <select id="pkg-sort-select" class="input-glass" style="padding: 12px 18px;">
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="duration">Duration: Short to Long</option>
                </select>
              </div>

            </div>
          </div>
        </div>
      </section>

      <!-- Packages Grid Mount -->
      <section class="section-padding" style="padding-top: 0; min-height: 40vh;">
        <div class="container">
          <div class="grid grid-2" id="packages-cards-mount" style="gap: 32px;">
            <!-- Dynamic cards inject here -->
          </div>
          <div id="packages-empty-state" class="text-center" style="display: none; padding: 60px 0; color: var(--text-muted);">
            <i class="fa-solid fa-mountain-slash" style="font-size: 3rem; opacity: 0.4; margin-bottom: 16px;"></i>
            <h3>No Sightseeing Packages Found</h3>
            <p style="margin-top: 8px;">Try adjusting your keyword filter or switching corridor zones.</p>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    this.searchInp = document.getElementById("pkg-search-inp");
    this.destSelect = document.getElementById("pkg-dest-select");
    this.sortSelect = document.getElementById("pkg-sort-select");
    this.cardsMount = document.getElementById("packages-cards-mount");
    this.emptyState = document.getElementById("packages-empty-state");

    // Hook listeners
    this.searchInp.addEventListener("input", () => this.filterAndRender());
    this.destSelect.addEventListener("change", () => this.filterAndRender());
    this.sortSelect.addEventListener("change", () => this.filterAndRender());

    // Initial render
    this.filterAndRender();
  },

  filterAndRender() {
    const query = this.searchInp.value.toLowerCase().trim();
    const selectedDest = this.destSelect.value;
    const sortBy = this.sortSelect.value;

    // 1. Filtering logic
    let filtered = packages.filter(pkg => {
      // Destination filter
      if (selectedDest !== "all" && pkg.destinationId !== selectedDest) {
        return false;
      }
      
      // Text search match (package name, description, or landmark attraction stops)
      if (query) {
        const matchesName = pkg.name.toLowerCase().includes(query);
        const matchesDesc = pkg.description.toLowerCase().includes(query);
        const matchesStops = pkg.attractions.some(stop => stop.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesStops;
      }

      return true;
    });

    // 2. Sorting logic
    filtered.sort((a, b) => {
      const getPrice = (p) => p.priceSedan || p.priceSuv || 0;
      
      if (sortBy === "price-asc") {
        return getPrice(a) - getPrice(b);
      } else if (sortBy === "price-desc") {
        return getPrice(b) - getPrice(a);
      } else if (sortBy === "duration") {
        // Crude hours extractor: e.g. "3 Hours" -> 3, "Full Day (8 Hours)" -> 8
        const getHours = (str) => {
          const matched = str.match(/(\d+)\s*Hour/i);
          if (matched) return parseInt(matched[1]);
          if (str.toLowerCase().includes("day")) return 8;
          return 5;
        };
        return getHours(a.duration) - getHours(b.duration);
      } else {
        // Popularity: fallback matching default array sequence
        return 0;
      }
    });

    // 3. Render HTML output
    if (filtered.length === 0) {
      this.cardsMount.innerHTML = "";
      this.emptyState.style.display = "block";
      return;
    }

    this.emptyState.style.display = "none";
    this.cardsMount.innerHTML = filtered.map(pkg => {
      const dest = destinations.find(d => d.id === pkg.destinationId);
      return `
        <div class="package-card glass-panel ${pkg.isComingSoon ? '' : 'glass-panel-hover'} flex animate-scroll-reveal" style="display: flex; flex-direction: column; overflow: hidden; opacity: 0; transform: translateY(20px); transition: all var(--transition-normal); ${pkg.isComingSoon ? 'position: relative;' : ''}">
          
          ${pkg.isComingSoon ? `
            <div style="position: absolute; top: 16px; right: 16px; z-index: 5; background: linear-gradient(135deg, #f59e0b, #d97706); color: #000; font-weight: 700; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; padding: 6px 14px; border-radius: var(--radius-full); display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4); animation: pulse-badge 2s ease-in-out infinite;">
              <i class="fa-solid fa-hourglass-half"></i> Coming Soon
            </div>
          ` : ''}

          <div class="pkg-card-details" style="padding: 30px; display: flex; flex-direction: column; flex-grow: 1; height: 100%; ${pkg.isComingSoon ? 'opacity: 0.85;' : ''}">
            
            <div class="flex-between" style="margin-bottom: 12px;">
              <span class="pkg-dest-badge"><i class="fa-solid fa-location-dot"></i> ${dest?.name || "Corridor"}</span>
              <div style="display: flex; gap: 8px; align-items: center;">
                <span class="pkg-duration-badge" style="font-size: 0.75rem; padding: 4px 10px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-sm);"><i class="fa-solid fa-map-pin"></i> ${pkg.attractions.length}-Point</span>
                <span class="pkg-duration-badge" style="font-size: 0.75rem; padding: 4px 10px; background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: var(--radius-sm); color: var(--brand-color);"><i class="fa-solid fa-clock"></i> ${pkg.duration}</span>
              </div>
            </div>

            <h3 class="pkg-title" style="font-size: 1.35rem; margin-bottom: 8px; font-weight: 700; line-height: 1.2;">${pkg.name}</h3>
            <p class="pkg-desc" style="font-size: 0.9rem; line-height: 1.5; color: var(--text-secondary); margin-bottom: 20px;">${pkg.description}</p>
            
            <div class="pkg-attractions" style="margin-bottom: 24px;">
              <strong style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; display: block; margin-bottom: 8px;">Key Sightseeing Stops</strong>
              <div class="grid grid-2" style="gap: 8px 16px;">
                ${pkg.attractions.map(att => `
                  <div style="font-size: 0.85rem; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-check text-brand" style="font-size: 0.75rem;"></i> <span>${att}</span>
                  </div>
                `).join("")}
              </div>
            </div>

            ${pkg.suvOnly ? `
              <div style="margin-bottom: 20px; font-size: 0.8rem; background: rgba(239, 68, 68, 0.06); border: 1px dashed rgba(239, 68, 68, 0.2); border-radius: var(--radius-sm); padding: 10px 14px; color: #fca5a5; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-snowflake text-danger"></i>
                <span>Strictly SUV-only destination due to high altitude permits rules.</span>
              </div>
            ` : ''}

            <!-- Price & Action Row -->
            <div class="pkg-pricing-row flex-between" style="border-top: 1px solid var(--glass-border); padding-top: 20px; margin-top: auto; display: flex; align-items: center; justify-content: space-between;">
              ${pkg.isComingSoon ? `
                <div class="pkg-price-col">
                  <span class="pkg-price-lbl" style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Pricing</span>
                  <div style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 700; color: var(--brand-color); display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-bell" style="font-size: 0.85rem;"></i> Enquire for Pricing</div>
                </div>
                <a href="https://wa.me/919907219843?text=${encodeURIComponent('Hi! I\'m interested in the upcoming "' + pkg.name + '" sightseeing package. Could you share pricing and availability details?')}" target="_blank" class="btn btn-primary" style="padding: 10px 24px; background: linear-gradient(135deg, #25d366, #128c7e);">
                  <i class="fa-brands fa-whatsapp" style="font-size: 1rem;"></i> Enquire Now
                </a>
              ` : `
                <div class="pkg-price-col">
                  <span class="pkg-price-lbl" style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Estimated Cost</span>
                  <div class="pkg-price-val" style="font-family: var(--font-mono); font-size: 1.5rem; font-weight: 800; color: var(--color-success);">₹${pkg.priceSedan || pkg.priceSuv}</div>
                </div>
                <a href="#/booking?package=${pkg.id}" class="btn btn-primary" style="padding: 10px 24px;">Book Tour <i class="fa-solid fa-arrow-right" style="font-size: 0.75rem;"></i></a>
              `}
            </div>

          </div>

        </div>
      `;

    }).join("");

    // Staggered entry animation triggers
    const cards = this.cardsMount.querySelectorAll(".package-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 80);
    });
  },

  destroy() {
    // Cleanup if needed
  }
};
