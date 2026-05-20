/* ==========================================
   HILLS TOUR & TRAVELS — DESTINATION DETAIL PAGE
   ========================================== */

import { destinations } from '../data/destinations.js';
import { packages } from '../data/packages.js';
import { routes } from '../data/routes.js';

export const DestinationDetail = {
  render(params, query) {
    const destId = params.id;
    const dest = destinations.find(d => d.id === destId);

    if (!dest) {
      return `
        <div class="container text-center animate-fade-in" style="padding: 120px 0;">
          <i class="fa-solid fa-mountain-sun text-brand mb-4" style="font-size: 4rem; opacity: 0.5;"></i>
          <h2 style="font-size: 2.25rem;">Ridge Uncharted</h2>
          <p style="color: var(--text-secondary); margin: 15px auto 30px auto; max-width: 500px;">
            The destination identifier <strong>"${destId}"</strong> could not be resolved on our mountain corridors. It may be temporarily snowed-in or in a restricted military territory.
          </p>
          <a href="#/" class="btn btn-primary">Return to Base Camp</a>
        </div>
      `;
    }

    // Filter packages matching this destination
    const destPackages = packages.filter(p => p.destinationId === destId);

    // Filter direct airport/railway transit routes to this destination
    const destRoutes = routes.filter(r => r.to === destId);

    return `
      <!-- Hero Banner Section -->
      <section class="dest-detail-hero" style="position: relative; min-height: 55vh; display: flex; align-items: flex-end; padding-bottom: 50px; overflow: hidden;">
        <div class="dest-hero-bg animate-fade-in" style="position: absolute; inset: 0; background-image: linear-gradient(to bottom, rgba(6, 9, 19, 0.3), #060913), url('${dest.image}'); background-size: cover; background-position: center; z-index: 1;"></div>
        <div class="container" style="position: relative; z-index: 2; width: 100%;">
          <a href="#/" class="btn btn-secondary btn-sm mb-4 animate-fade-up" style="padding: 8px 16px; background: rgba(6, 9, 19, 0.5); backdrop-filter: blur(8px);">
            <i class="fa-solid fa-arrow-left"></i> Back to Exploration
          </a>
          <div class="animate-fade-up" style="animation-delay: 0.1s;">
            <div class="flex" style="gap: 12px; align-items: center; margin-bottom: 12px; flex-wrap: wrap;">
              <span class="badge badge-brand"><i class="fa-solid fa-mountain"></i> ${dest.elevation} Elevation</span>
              ${dest.permitRequired ? `<span class="badge badge-danger"><i class="fa-solid fa-id-card"></i> Government Permit Area</span>` : `<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Standard Access Zone</span>`}
            </div>
            <h1 style="font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 800; line-height: 1.1; margin-bottom: 8px;">${dest.name}</h1>
            <p class="text-brand" style="font-family: var(--font-heading); font-size: clamp(1.1rem, 2vw, 1.4rem); font-weight: 600; letter-spacing: 0.05em; opacity: 0.9;">${dest.tagline}</p>
          </div>
        </div>
      </section>

      <!-- Main Content Layout -->
      <section class="section-padding" style="padding-top: 40px;">
        <div class="container">
          <div class="grid" style="grid-template-columns: 1.8fr 1.2fr; gap: 40px; align-items: start;">
            
            <!-- Left Column: Description & Packages -->
            <div class="flex-col" style="gap: 40px;">
              
              <!-- Destination Story -->
              <div class="glass-panel animate-scroll-reveal" style="padding: 32px;">
                <h2 style="font-size: 1.5rem; margin-bottom: 16px;"><i class="fa-solid fa-feather text-brand"></i> Travel Chronicles</h2>
                <p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 24px; color: var(--text-primary);">${dest.description}</p>
                
                <h3 style="font-size: 1.15rem; margin-bottom: 16px; color: var(--text-secondary);">Corridor Highlights</h3>
                <div class="flex" style="gap: 10px; flex-wrap: wrap;">
                  ${dest.highlights.map(hl => `
                    <span style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.2); padding: 8px 16px; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 600; color: var(--brand-color); display: flex; align-items: center; gap: 6px;">
                      <i class="fa-solid fa-location-crosshairs" style="font-size: 0.75rem;"></i> ${hl}
                    </span>
                  `).join("")}
                </div>
              </div>

              <!-- Sikkim/Bhutan/Nepal Specific Warning Banner -->
              ${dest.alert ? `
                <div class="glass-panel animate-scroll-reveal" style="padding: 24px 30px; border-left: 4px solid var(--color-danger); background: rgba(239, 68, 68, 0.05);">
                  <div class="flex" style="gap: 16px; align-items: flex-start;">
                    <i class="fa-solid fa-triangle-exclamation text-danger" style="font-size: 1.5rem; margin-top: 2px;"></i>
                    <div>
                      <h3 style="font-size: 1.1rem; color: #fca5a5; margin-bottom: 6px;">Important Corridor Notice</h3>
                      <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">${dest.alert}</p>
                    </div>
                  </div>
                </div>
              ` : ''}

              <!-- Curated Sightseeing Packages -->
              <div>
                <div style="margin-bottom: 24px;">
                  <span class="badge badge-brand"><i class="fa-solid fa-sparkles"></i> Guided Sightseeing</span>
                  <h2 style="font-size: 1.75rem; margin-top: 6px;">Sightseeing Excursions for ${dest.name}</h2>
                  <p style="color: var(--text-secondary); font-size: 0.9rem;">Pre-vetted local operators. No syndicate commission or hidden driver allowances.</p>
                </div>

                ${destPackages.length === 0 ? `
                  <div class="glass-panel text-center" style="padding: 40px; color: var(--text-muted);">
                    <i class="fa-regular fa-compass" style="font-size: 2.5rem; margin-bottom: 12px; opacity: 0.4;"></i>
                    <h3 style="font-size: 1.1rem; color: var(--text-secondary);">Custom Expedition Route</h3>
                    <p style="font-size: 0.85rem; margin-top: 6px;">We do not have pre-packaged sightseeing layouts for this village. You can reserve custom daily SUV hire through our booking desk.</p>
                    <a href="#/booking?to=${dest.id}" class="btn btn-secondary btn-sm" style="margin-top: 16px;">Custom Daily Hire</a>
                  </div>
                ` : `
                  <div class="flex-col" style="gap: 24px;">
                    ${destPackages.map(pkg => `
                      <div class="glass-panel ${pkg.isComingSoon ? '' : 'glass-panel-hover'} animate-scroll-reveal" style="overflow: hidden; display: flex; flex-direction: column; ${pkg.isComingSoon ? 'position: relative;' : ''}">
                        
                        ${pkg.isComingSoon ? `
                          <div style="position: absolute; top: 16px; right: 16px; z-index: 5; background: linear-gradient(135deg, #f59e0b, #d97706); color: #000; font-weight: 700; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; padding: 6px 14px; border-radius: var(--radius-full); display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4); animation: pulse-badge 2s ease-in-out infinite;">
                            <i class="fa-solid fa-hourglass-half"></i> Coming Soon
                          </div>
                        ` : ''}

                        <!-- Package Header Bar -->
                        <div style="background: rgba(255, 255, 255, 0.02); border-bottom: 1px solid var(--glass-border); padding: 20px 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                          <div>
                            <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary);">${pkg.name}</h3>
                            <div class="flex" style="gap: 8px; margin-top: 6px; align-items: center;">
                              <span class="pkg-duration-badge" style="font-size: 0.75rem; padding: 4px 10px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-sm);"><i class="fa-solid fa-map-pin"></i> ${pkg.attractions.length}-Point</span>
                              <span class="pkg-duration-badge" style="font-size: 0.75rem; padding: 4px 10px; background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: var(--radius-sm); color: var(--brand-color);"><i class="fa-solid fa-clock"></i> ${pkg.duration}</span>
                            </div>
                          </div>
                          ${pkg.suvOnly ? `
                            <span class="badge badge-danger" style="font-size: 0.75rem; padding: 6px 12px;"><i class="fa-solid fa-snowflake"></i> SUVs Only</span>
                          ` : `
                            <span class="badge badge-brand" style="font-size: 0.75rem; padding: 6px 12px;"><i class="fa-solid fa-car"></i> Sedan/SUV Available</span>
                          `}
                        </div>

                        <!-- Package Body -->
                        <div style="padding: 28px; display: flex; flex-direction: column; gap: 20px; flex-grow: 1; ${pkg.isComingSoon ? 'opacity: 0.85;' : ''}">
                          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary);">${pkg.description}</p>
                          
                          <div>
                            <strong style="font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; display: block; margin-bottom: 10px;">Planned Stops & Landmarks</strong>
                            <div class="grid grid-2" style="gap: 10px;">
                              ${pkg.attractions.map(att => `
                                <div style="font-size: 0.9rem; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                                  <i class="fa-regular fa-circle-dot text-brand" style="font-size: 0.75rem; flex-shrink: 0;"></i>
                                  <span>${att}</span>
                                </div>
                              `).join("")}
                            </div>
                          </div>

                          ${pkg.restrictions.length > 0 ? `
                            <div style="background: rgba(239, 68, 68, 0.05); border: 1px dashed rgba(239, 68, 68, 0.2); border-radius: var(--radius-sm); padding: 12px 16px; font-size: 0.8rem; color: #fca5a5; line-height: 1.4;">
                              <strong style="color: #f87171; display: block; margin-bottom: 4px;"><i class="fa-solid fa-circle-exclamation"></i> Ride Advisory</strong>
                              <ul style="padding-left: 16px; margin: 0;">
                                ${pkg.restrictions.map(r => `<li>${r}</li>`).join("")}
                              </ul>
                            </div>
                          ` : ''}

                          <div style="border-top: 1px solid var(--glass-border); padding-top: 20px; margin-top: auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                            ${pkg.isComingSoon ? `
                              <div>
                                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; display: block;">Pricing</span>
                                <span style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 700; color: var(--brand-color); display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-bell" style="font-size: 0.85rem;"></i> Enquire for Details</span>
                              </div>
                              <a href="https://wa.me/919876543210?text=${encodeURIComponent('Hi! I\'m interested in the upcoming \"' + pkg.name + '\" tour for ' + dest.name + '. Could you share pricing and availability?')}" target="_blank" class="btn btn-primary" style="padding: 10px 24px; background: linear-gradient(135deg, #25d366, #128c7e);">
                                <i class="fa-brands fa-whatsapp" style="font-size: 1rem;"></i> Enquire Now
                              </a>
                            ` : `
                              <div style="display: flex; gap: 24px;">
                                ${pkg.priceSedan ? `
                                  <div>
                                    <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; display: block;">Sedan Ride</span>
                                    <span style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700; color: var(--color-success);">₹${pkg.priceSedan}</span>
                                  </div>
                                ` : ''}
                                <div>
                                  <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; display: block;">Premium SUV</span>
                                  <span style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700; color: var(--color-success);">₹${pkg.priceSuv}</span>
                                </div>
                              </div>
                              <a href="#/booking?package=${pkg.id}" class="btn btn-primary" style="padding: 10px 24px;">Book Sightseeing</a>
                            `}
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}
              </div>

            </div>

            <!-- Right Column: Quick Facts & Transit Cards -->
            <div class="flex-col" style="gap: 32px; position: sticky; top: 110px;">
              
              <!-- Quick Mountain Facts -->
              <div class="glass-panel animate-scroll-reveal" style="padding: 28px;">
                <h3 style="font-size: 1.2rem; margin-bottom: 20px; border-bottom: 1px solid var(--glass-border); padding-bottom: 12px;">Mountain Metrics</h3>
                
                <div class="flex-col" style="gap: 16px;">
                  <div class="flex-between">
                    <span style="font-size: 0.85rem; color: var(--text-secondary);"><i class="fa-solid fa-mountain-sun text-brand w-20"></i> Peak Altitude:</span>
                    <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary);">${dest.elevation}</span>
                  </div>
                  <div class="flex-between">
                    <span style="font-size: 0.85rem; color: var(--text-secondary);"><i class="fa-solid fa-calendar-days text-brand w-20"></i> Best Season:</span>
                    <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary); text-align: right; max-width: 170px;">${dest.bestSeason}</span>
                  </div>
                  <div class="flex-between">
                    <span style="font-size: 0.85rem; color: var(--text-secondary);"><i class="fa-solid fa-route text-brand w-20"></i> Hub Distance:</span>
                    <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary);">${dest.distanceFromBagdogra} (Bagdogra)</span>
                  </div>
                  <div class="flex-between">
                    <span style="font-size: 0.85rem; color: var(--text-secondary);"><i class="fa-solid fa-hourglass-half text-brand w-20"></i> Transit Time:</span>
                    <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary);">${dest.travelTimeFromBagdogra}</span>
                  </div>
                </div>
              </div>

              <!-- Private Airport / Station Transit Hub -->
              <div class="glass-panel animate-scroll-reveal" style="padding: 28px; background: linear-gradient(135deg, rgba(245, 158, 11, 0.03), rgba(6, 9, 19, 0.6)); border: 1px solid rgba(245, 158, 11, 0.15);">
                <h3 style="font-size: 1.2rem; margin-bottom: 6px;"><i class="fa-solid fa-taxi text-brand"></i> Book Private Transfer</h3>
                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 20px;">Book a direct private point-to-point drop from major regional airport/railway hubs.</p>
                
                ${destRoutes.length === 0 ? `
                  <a href="#/booking?to=${dest.id}" class="btn btn-primary w-100">Open Booking Wizard</a>
                ` : `
                  <div class="flex-col" style="gap: 16px;">
                    ${destRoutes.map(rt => `
                      <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); padding: 16px;">
                        <span style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); display: block; font-weight: 600;">Departing From</span>
                        <span style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); display: block; margin-top: 2px;">${rt.fromName.split(" (")[0]}</span>
                        
                        <div class="flex-between" style="margin-top: 12px; font-size: 0.8rem; border-top: 1px solid var(--glass-border); padding-top: 10px;">
                          <div>
                            <span style="color: var(--text-muted); font-size: 0.7rem; display: block;">Sedan Base</span>
                            <span style="font-family: var(--font-mono); font-weight: 700; color: var(--color-success);">${rt.basePriceSedan ? `₹${rt.basePriceSedan}` : 'N/A'}</span>
                          </div>
                          <div>
                            <span style="color: var(--text-muted); font-size: 0.7rem; display: block;">SUV Base</span>
                            <span style="font-family: var(--font-mono); font-weight: 700; color: var(--color-success);">₹${rt.basePriceSuv}</span>
                          </div>
                        </div>
                        
                        <a href="#/booking?from=${rt.from}&to=${rt.to}" class="btn btn-secondary btn-sm w-100" style="margin-top: 12px; font-size: 0.8rem; padding: 8px;">
                          Book Private Drop <i class="fa-solid fa-arrow-right" style="font-size: 0.75rem;"></i>
                        </a>
                      </div>
                    `).join("")}
                  </div>
                `}
              </div>

            </div>

          </div>
        </div>
      </section>
    `;
  },

  init() {
    // Post-render attachments (e.g. scroll reveal activations)
    const animateElements = document.querySelectorAll(".animate-scroll-reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animateElements.forEach(el => observer.observe(el));
  },

  destroy() {
    // Cleanup routines if needed
  }
};
