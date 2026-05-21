/* ==========================================
   HILLS TOUR & TRAVELS — FOOTER COMPONENT
   ========================================== */

export const Footer = {
  render() {
    return `
      <div class="footer animate-fade-in">
        <div class="container footer-grid">
          <!-- Column 1: Brand Info -->
          <div class="footer-col brand-col">
            <a href="#/" class="nav-brand">
              <span class="logo-circle"><i class="fa-solid fa-mountain-sun"></i></span>
              <div class="brand-text">
                <span class="brand-title" style="color: var(--text-primary);">HILLS</span>
                <span class="brand-subtitle">TOUR & TRAVELS</span>
              </div>
            </a>
            <p class="brand-desc" style="margin-top: 16px;">
              The leading mountain mobility aggregator in the Eastern Himalayas. Delivering seamless, transparent, and syndicate-free travel experiences across Darjeeling, Sikkim, Nepal, and Bhutan.
            </p>
            <div class="social-icons" style="margin-top: 24px;">
              <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
              <a href="https://maps.app.goo.gl/dRQPBFm6hTsZzNE2A" target="_blank" aria-label="Google Maps"><i class="fa-brands fa-google"></i></a>
            </div>
          </div>

          <!-- Column 2: Popular Transit Routes -->
          <div class="footer-col">
            <h3 class="footer-heading">Popular Routes</h3>
            <ul class="footer-links">
              <li><a href="#/booking?from=bagdogra-airport&to=gangtok">Bagdogra to Gangtok private drop</a></li>
              <li><a href="#/booking?from=bagdogra-airport&to=darjeeling">Bagdogra to Darjeeling cab</a></li>
              <li><a href="#/booking?from=njp-station&to=darjeeling">NJP to Darjeeling sedan</a></li>
              <li><a href="#/booking?from=darjeeling&to=gangtok">Darjeeling to Gangtok SUV</a></li>
              <li><a href="#/booking?from=bagdogra-airport&to=thimphu">Bagdogra to Bhutan (Thimphu)</a></li>
              <li><a href="#/booking?from=bagdogra-airport&to=kathmandu">Siliguri to Nepal (Kathmandu)</a></li>
            </ul>
          </div>

          <!-- Column 3: Sightseeing Excursions -->
          <div class="footer-col">
            <h3 class="footer-heading">Sightseeing packages</h3>
            <ul class="footer-links">
              <li><a href="#/packages">Darjeeling 7-Point Tour</a></li>
              <li><a href="#/packages">Tiger Hill Sunrise Tour</a></li>
              <li><a href="#/packages">Tsomgo Lake & Baba Mandir</a></li>
              <li><a href="#/packages">Nathula Pass Border Expedition</a></li>
              <li><a href="#/packages">North Sikkim Lachen-Lachung</a></li>
              <li><a href="#/packages">Mirik & Pashupati Border Excursion</a></li>
            </ul>
          </div>

          <!-- Column 4: Contact & Operations -->
          <div class="footer-col contact-col">
            <h3 class="footer-heading">Operational Hub</h3>
            <ul class="footer-contact">
              <li>
                <i class="fa-solid fa-location-dot text-brand"></i>
                <span>Phulbari, Darjeeling, West Bengal 734101, India</span>
              </li>
              <li>
                <i class="fa-solid fa-phone text-brand"></i>
                <a href="tel:+919907219843">+91 99072 19843</a>
              </li>
              <li>
                <i class="fa-solid fa-envelope text-brand"></i>
                <a href="mailto:bookings@hillstourtravels.com">bookings@hillstourtravels.com</a>
              </li>
              <li>
                <i class="fa-solid fa-clock text-brand"></i>
                <span>Dispatch Office: 24/7 Operations</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="container flex-between" style="flex-wrap: wrap; gap: 16px;">
            <p class="copyright-text" style="font-size: 0.85rem; color: var(--text-muted);">
              &copy; 2026 Hills Tour & Travels. All Rights Reserved. Built for premium mountain transit.
            </p>
            <div class="legal-links" style="display: flex; gap: 24px; font-size: 0.85rem; color: var(--text-muted);">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Permit Guideline</a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    // Standard initialization if any
  },

  destroy() {
    // Cleanup if any
  }
};
