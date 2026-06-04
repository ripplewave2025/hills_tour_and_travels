/* ==========================================
   HILLS TOUR & TRAVELS — BOOKING WIZARD PAGE
   ========================================== */

import { routes } from '../data/routes.js';
import { vehicles } from '../data/vehicles.js';
import { packages } from '../data/packages.js';
import { SearchBar } from '../components/search-bar.js';
import { PriceCalculator } from '../components/price-calculator.js';
import { CustomerStore } from '../utils/customer-store.js';

// Helper: Resolve any terminal ID to its display name by searching
// both 'from' and 'to' columns across all routes
function getTerminalName(id) {
  if (!id) return 'Unknown';
  for (const r of routes) {
    if (r.from === id) return r.fromName;
    if (r.to === id) return r.toName;
  }
  return id; // fallback to raw ID
}

// Helper: Find a route matching either forward or reverse direction
function findRouteSymmetric(fromId, toId) {
  return routes.find(r => r.from === fromId && r.to === toId)
      || routes.find(r => r.from === toId && r.to === fromId);
}

export const Booking = {
  render(params, query) {
    this.currentStep = 1;
    this.state = {
      from: query.from || "",
      to: query.to || "",
      packageId: query.package || "",
      date: "",
      time: "08:00",
      passengers: parseInt(query.passengers) || 2,
      days: 1,
      vehicleId: "suv-rugged",
      addons: { guide: false, extraBags: false },
      userDetails: { name: "", phone: "", email: "" },
      documents: { photo: null, idScan: null }
    };

    // Tracks whether the traveller picked a vehicle by hand. Until they do,
    // we keep auto-matching the vehicle to the passenger count.
    this.vehicleManuallyChosen = false;

    // Instantiate Search Components
    this.fromSearch = new SearchBar("booking-from-input", "booking-from-dropdown", "from");
    this.toSearch = new SearchBar("booking-to-input", "booking-to-dropdown", "to");

    return `
      <section class="section-padding booking-section">
        <div class="container">
          <!-- Step Indicator Bar -->
          <div class="booking-steps-nav">
            <div class="step-nav-item active" id="step-nav-1" data-step="1">
              <span class="step-nav-circle">1</span>
              <span class="step-nav-text">Route Details</span>
            </div>
            <div class="step-nav-line"></div>
            <div class="step-nav-item" id="step-nav-2" data-step="2">
              <span class="step-nav-circle">2</span>
              <span class="step-nav-text">Fleet Choice</span>
            </div>
            <div class="step-nav-line"></div>
            <div class="step-nav-item" id="step-nav-3" data-step="3">
              <span class="step-nav-circle">3</span>
              <span class="step-nav-text">Add-ons</span>
            </div>
            <div class="step-nav-line"></div>
            <div class="step-nav-item" id="step-nav-4" data-step="4">
              <span class="step-nav-circle">4</span>
              <span class="step-nav-text">Verify & Vault</span>
            </div>
          </div>

          <!-- Wizard Container -->
          <div class="booking-wizard-wrapper">

            <!-- Left Panel: Active Step Content -->
            <div class="booking-left-content glass-panel" id="booking-step-panel">
              <!-- Dynamic Steps will inject here -->
            </div>

            <!-- Right Panel: Trip Summary Card -->
            <div class="booking-right-summary glass-panel" id="booking-summary-panel">
              <!-- Dynamic Price Summary will inject here -->
            </div>

          </div>
        </div>
      </section>
    `;
  },

  init(params, query) {
    // 1. Initialize input components
    this.fromSearch.init((item) => {
      this.state.from = item.id;
      this.state.packageId = ""; // Clear conflicting package drops
      this.updateSummary();
      this.updateStepView();
    });

    this.toSearch.init((item) => {
      this.state.to = item.id;
      this.state.packageId = "";
      this.updateSummary();
      this.updateStepView();
    });

    // Handle package pre-loads
    if (this.state.packageId) {
      const pkg = packages.find(p => p.id === this.state.packageId);
      if (pkg) {
        this.state.to = pkg.destinationId;
        this.state.from = "bagdogra-airport"; // default entry point for tour
      }
    }

    // Set default names in autocomplete inputs if query parameters existed
    if (this.state.from) {
      this.fromSearch.setValue(this.state.from, getTerminalName(this.state.from));
    }
    if (this.state.to) {
      this.toSearch.setValue(this.state.to, getTerminalName(this.state.to));
    }

    // Set the best-fit vehicle for the current group size before first render
    this.applyVehicleRecommendation();

    // Initialize display panels
    this.updateStepView();
    this.updateSummary();
  },

  // Update step navigation UI states
  updateStepIndicator() {
    for (let i = 1; i <= 4; i++) {
      const navItem = document.getElementById(`step-nav-${i}`);
      if (navItem) {
        navItem.classList.toggle("active", i === this.currentStep);
        navItem.classList.toggle("completed", i < this.currentStep);
      }
    }
  },

  updateStepView() {
    this.updateStepIndicator();
    const panel = document.getElementById("booking-step-panel");
    if (!panel) return;

    if (this.currentStep === 1) {
      this.renderStep1(panel);
    } else if (this.currentStep === 2) {
      this.renderStep2(panel);
    } else if (this.currentStep === 3) {
      this.renderStep3(panel);
    } else if (this.currentStep === 4) {
      this.renderStep4(panel);
    } else if (this.currentStep === 5) {
      this.renderStep5(panel);
    }
  },

  // Is this route inside a high-altitude permit zone (SUV-only)?
  isPermitRoute() {
    const matchedRoute = findRouteSymmetric(this.state.from, this.state.to);
    return !!(matchedRoute?.permitRequired
      || (this.state.packageId && (this.state.packageId.includes("tsomgo")
        || this.state.packageId.includes("nathula")
        || this.state.packageId.includes("north-expedition"))));
  },

  // Recommend the smallest comfortable vehicle for the group size.
  // Permit zones legally require a rugged SUV regardless of group size.
  recommendVehicleId(passengers, isPermitRequired) {
    if (isPermitRequired) return "suv-rugged";
    const p = passengers || 1;
    if (p <= 4) return "sedan";
    if (p <= 6) return "muv-mid";
    return "suv-rugged";
  },

  // Apply the auto-recommendation unless the traveller chose a vehicle by hand.
  applyVehicleRecommendation() {
    const isPermit = this.isPermitRoute();
    // Safety: permit zones are SUV-only — correct even a manual non-SUV pick.
    if (isPermit && !String(this.state.vehicleId).startsWith("suv")) {
      this.state.vehicleId = "suv-rugged";
      return;
    }
    if (this.vehicleManuallyChosen) return;
    this.state.vehicleId = this.recommendVehicleId(this.state.passengers, isPermit);
  },

  // Shared step-1 validation used by both "Book Now" and "Customize".
  validateStep1() {
    const err = document.getElementById("step1-error");
    const fail = (msg) => { if (err) { err.innerText = msg; err.style.display = "block"; } return false; };
    if (!this.state.from || !this.state.to) return fail("Please specify a valid Pick-up Location and Drop-off Location.");
    if (this.state.from === this.state.to) return fail("Pick-up Location and Drop-off Location cannot be the same.");
    if (!this.state.date) return fail("Please specify a valid departure date.");
    if (err) err.style.display = "none";
    return true;
  },

  // STEP 1: ROUTE SETUP HTML & BINDINGS
  renderStep1(panel) {
    const isPackage = !!this.state.packageId;
    const pkg = isPackage ? packages.find(p => p.id === this.state.packageId) : null;

    panel.innerHTML = `
      <div class="animate-fade-in">
        <h2 style="font-size: 1.75rem; margin-bottom: 8px;"><i class="fa-solid fa-route text-brand"></i> Mountain Terminal & Schedule</h2>
        <p style="color: var(--text-secondary); margin-bottom: 30px;">Input your starting and ending points, dates, and passengers to compute dynamic fares.</p>
        
        ${isPackage ? `
          <div class="badge badge-brand mb-2" style="padding: 10px 16px; font-size: 0.85rem;">
            <i class="fa-solid fa-sparkles"></i> Guided Package Selected: <strong>${pkg.name}</strong>
          </div>
        ` : ''}

        <div class="grid grid-2" style="margin-bottom: 24px;">
          <div class="form-group">
            <label class="form-label">Pick-up Location (Ride From)</label>
            <div id="booking-from-container">
              ${this.fromSearch.render()}
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Drop-off Location (Destination)</label>
            <div id="booking-to-container">
              ${this.toSearch.render()}
            </div>
          </div>
        </div>

        <div class="grid grid-2" style="margin-bottom: 24px;">
          <div class="form-group">
            <label class="form-label">Transit Date</label>
            <input type="date" id="step1-date" class="input-glass" value="${this.state.date}" min="${new Date().toISOString().split('T')[0]}" />
          </div>
          <div class="form-group">
            <label class="form-label">Dispatch Time</label>
            <input type="time" id="step1-time" class="input-glass" value="${this.state.time}" />
          </div>
        </div>

        <div class="grid grid-2" style="margin-bottom: 30px;">
          <div class="form-group">
            <label class="form-label">Travelers count</label>
            <select id="step1-passengers" class="input-glass">
              ${[1,2,3,4,5,6,7].map(n => `<option value="${n}" ${this.state.passengers === n ? 'selected' : ''}>${n} Person${n > 1 ? 's' : ''}</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Total Duration Days</label>
            <select id="step1-days" class="input-glass">
              ${[1,2,3,4,5,7,10].map(n => `<option value="${n}" ${this.state.days === n ? 'selected' : ''}>${n} Day${n > 1 ? 's' : ''}</option>`).join("")}
            </select>
          </div>
        </div>

        <div id="step1-error" style="color: var(--color-danger); font-size: 0.9rem; margin-bottom: 20px; display: none;"></div>

        <div style="border-top: 1px solid var(--glass-border); padding-top: 24px;">
          <button class="btn btn-primary btn-lg w-100" id="step1-booknow-btn" style="font-size: 1.1rem; padding: 16px; box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3);">
            <i class="fa-solid fa-bolt"></i> <span>Book Now</span> <i class="fa-solid fa-arrow-right"></i>
          </button>
          <p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin: 12px 0 16px 0;">
            We'll auto-match the right vehicle for <strong id="booknow-pax-count">${this.state.passengers}</strong> traveler${this.state.passengers > 1 ? 's' : ''} — you can still change it on the next step.
          </p>
          <button class="btn btn-secondary w-100" id="step1-next-btn">
            <i class="fa-solid fa-sliders"></i> <span>Customize vehicle &amp; add-ons</span>
          </button>
        </div>
      </div>
    `;

    // Initialize Autocompletes within this view block
    this.fromSearch.init((item) => {
      this.state.from = item.id;
      this.updateSummary();
    });
    this.toSearch.init((item) => {
      this.state.to = item.id;
      this.updateSummary();
    });

    if (this.state.from) {
      this.fromSearch.setValue(this.state.from, getTerminalName(this.state.from));
    }
    if (this.state.to) {
      this.toSearch.setValue(this.state.to, getTerminalName(this.state.to));
    }

    // Input binders
    document.getElementById("step1-date").addEventListener("change", (e) => {
      this.state.date = e.target.value;
      this.updateSummary();
    });
    document.getElementById("step1-time").addEventListener("change", (e) => {
      this.state.time = e.target.value;
      this.updateSummary();
    });
    document.getElementById("step1-passengers").addEventListener("change", (e) => {
      this.state.passengers = parseInt(e.target.value);
      // Re-match the vehicle to the new group size (unless chosen by hand)
      this.applyVehicleRecommendation();
      const paxLabel = document.getElementById("booknow-pax-count");
      if (paxLabel) paxLabel.innerText = this.state.passengers;
      this.updateSummary();
    });
    document.getElementById("step1-days").addEventListener("change", (e) => {
      this.state.days = parseInt(e.target.value);
      this.updateSummary();
    });

    // PRIORITY CTA — "Book Now": auto-match vehicle, jump straight to checkout.
    document.getElementById("step1-booknow-btn").addEventListener("click", () => {
      if (!this.validateStep1()) return;
      this.applyVehicleRecommendation(); // ensure best-fit vehicle is set
      this.currentStep = 4;              // skip fleet + add-ons for speed
      this.updateStepView();
    });

    // Secondary path — "Customize": step through fleet + add-ons.
    document.getElementById("step1-next-btn").addEventListener("click", () => {
      if (!this.validateStep1()) return;
      this.currentStep = 2;
      this.updateStepView();
    });
  },

  // STEP 2: FLEET SELECTION WITH PERMIT TERRAIN BLOCKING
  renderStep2(panel) {
    const routeKey = this.state.from + "->" + this.state.to;
    const matchedRoute = findRouteSymmetric(this.state.from, this.state.to);
    
    // Check if Sikkim High Altitude PAP permit is required
    const isPermitRequired = matchedRoute?.permitRequired || this.state.packageId?.includes("tsomgo") || this.state.packageId?.includes("nathula") || this.state.packageId?.includes("north-expedition");

    // Filter vehicle lists based on high-altitude regulations (SUVs only!)
    const eligibleVehicles = vehicles.map(vh => {
      const isDisallowed = isPermitRequired && !vh.id.startsWith("suv");
      return { ...vh, isDisallowed };
    });

    // Best-fit vehicle for the current group size (highlighted, not forced)
    const recommendedId = this.recommendVehicleId(this.state.passengers, isPermitRequired);

    panel.innerHTML = `
      <div class="animate-fade-in">
        <h2 style="font-size: 1.75rem; margin-bottom: 8px;"><i class="fa-solid fa-car-rear text-brand"></i> Mountain Fleet Selection</h2>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">Select a vehicle suited to your travel size and mountain destination.</p>

        ${isPermitRequired ? `
          <div class="badge badge-danger mb-3 animate-bounce-slow" style="display: flex; gap: 10px; padding: 12px 18px; border-radius: var(--radius-md); text-align: left; text-transform: none; font-size: 0.85rem; line-height: 1.4; color: white;">
            <i class="fa-solid fa-triangle-exclamation" style="font-size: 1.25rem;"></i>
            <span><strong>High-Altitude Regulatory Warning:</strong> Goverment border checkpoints legally restrict hatchbacks, sedans, and light MUVs from entering Sikkim permit areas. <strong>Only rugged 4WD SUVs are dispatched.</strong></span>
          </div>
        ` : ''}

        <div class="fleet-selection-list grid" style="gap: 20px;">
          ${eligibleVehicles.map(vh => `
            <div class="fleet-select-card glass-panel ${this.state.vehicleId === vh.id ? 'selected' : ''} ${vh.isDisallowed ? 'disallowed-terrain' : 'glass-panel-hover'}" data-id="${vh.id}">
              <div class="fleet-select-image" style="background-image: url('${vh.image}');"></div>
              <div class="fleet-select-details">
                <div class="flex-between">
                  <h3 style="font-size: 1.2rem;">${vh.name} ${(vh.id === recommendedId && !vh.isDisallowed) ? `<span style="display:inline-block; vertical-align:middle; margin-left:6px; font-size:0.65rem; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; color:#060913; background:var(--brand-color); padding:3px 8px; border-radius:999px;"><i class="fa-solid fa-star"></i> Recommended</span>` : ''}</h3>
                  <span class="fleet-select-multiplier">₹${Math.round(vh.baseRatePerKm)}/km</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Models: ${vh.models.join(", ")}</p>
                ${(vh.id === recommendedId && !vh.isDisallowed) ? `<p style="font-size: 0.8rem; color: var(--brand-color); margin-top: 4px;"><i class="fa-solid fa-circle-check"></i> Best fit for ${this.state.passengers} traveler${this.state.passengers > 1 ? 's' : ''} — pick a larger vehicle if you have extra luggage.</p>` : ''}
                <div class="fleet-select-meta flex" style="margin-top: 12px; gap: 16px; font-size: 0.8rem; color: var(--text-secondary);">
                  <span><i class="fa-solid fa-users text-brand"></i> ${vh.capacity}</span>
                  <span><i class="fa-solid fa-suitcase text-brand"></i> ${vh.luggage}</span>
                </div>
                
                ${vh.isDisallowed ? `
                  <div class="fleet-disallowed-tag"><i class="fa-solid fa-ban"></i> Banned for High Altitudes</div>
                ` : ''}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="flex-between" style="border-top: 1px solid var(--glass-border); padding-top: 24px; margin-top: 30px;">
          <button class="btn btn-secondary" id="step2-prev-btn"><i class="fa-solid fa-chevron-left"></i> Previous</button>
          <button class="btn btn-primary" id="step2-next-btn"><span>Configure Add-ons</span> <i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
    `;

    // Click selector binders
    panel.querySelectorAll(".fleet-select-card:not(.disallowed-terrain)").forEach(el => {
      el.addEventListener("click", () => {
        panel.querySelectorAll(".fleet-select-card").forEach(c => c.classList.remove("selected"));
        el.classList.add("selected");
        this.state.vehicleId = el.getAttribute("data-id");
        this.vehicleManuallyChosen = true; // stop auto-matching once user picks
        this.updateSummary();
      });
    });

    document.getElementById("step2-prev-btn").addEventListener("click", () => {
      this.currentStep = 1;
      this.updateStepView();
    });

    document.getElementById("step2-next-btn").addEventListener("click", () => {
      this.currentStep = 3;
      this.updateStepView();
    });
  },

  // STEP 3: CUSTOM ADD-ONS (Permit, Tour Guide, Luggage Carriers)
  renderStep3(panel) {
    panel.innerHTML = `
      <div class="animate-fade-in">
        <h2 style="font-size: 1.75rem; margin-bottom: 8px;"><i class="fa-solid fa-box-open text-brand"></i> Custom Ride Enhancements</h2>
        <p style="color: var(--text-secondary); margin-bottom: 30px;">Upgrade your mountain journey with verified sightseeing additions.</p>

        <div class="addons-list grid" style="gap: 20px;">
          <div class="addon-card glass-panel flex-between" style="padding: 24px; cursor: pointer;" id="addon-guide-card">
            <div class="addon-details flex" style="gap: 20px;">
              <div class="addon-icon-circle"><i class="fa-solid fa-user-tie"></i></div>
              <div>
                <h3 style="font-size: 1.15rem;">Bilingual Local Tour Guide</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">Accompany a government-licensed guide fluent in English, Hindi, and Nepali.</p>
              </div>
            </div>
            <div class="flex-col-end" style="gap: 8px;">
              <span class="addon-price">₹1,500/Day</span>
              <input type="checkbox" id="addon-guide-chk" style="width: 20px; height: 20px;" ${this.state.addons.guide ? 'checked' : ''} />
            </div>
          </div>

          <div class="addon-card glass-panel flex-between" style="padding: 24px; cursor: pointer;" id="addon-bags-card">
            <div class="addon-details flex" style="gap: 20px;">
              <div class="addon-icon-circle"><i class="fa-solid fa-suitcase-rolling"></i></div>
              <div>
                <h3 style="font-size: 1.15rem;">Heavy-Duty Roof luggage carrier</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">Install a structural cargo frame + waterproof tarp overlays on the roof.</p>
              </div>
            </div>
            <div class="flex-col-end" style="gap: 8px;">
              <span class="addon-price">₹499 (Fixed)</span>
              <input type="checkbox" id="addon-bags-chk" style="width: 20px; height: 20px;" ${this.state.addons.extraBags ? 'checked' : ''} />
            </div>
          </div>
        </div>

        <div class="flex-between" style="border-top: 1px solid var(--glass-border); padding-top: 24px; margin-top: 40px;">
          <button class="btn btn-secondary" id="step3-prev-btn"><i class="fa-solid fa-chevron-left"></i> Previous</button>
          <button class="btn btn-primary" id="step3-next-btn"><span>Verify & Upload Docs</span> <i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
    `;

    // Click binders for checkbox toggling
    const toggleAddon = (key, chkEl) => {
      this.state.addons[key] = !this.state.addons[key];
      chkEl.checked = this.state.addons[key];
      this.updateSummary();
    };

    const guideCard = document.getElementById("addon-guide-card");
    const guideChk = document.getElementById("addon-guide-chk");
    guideCard.addEventListener("click", () => toggleAddon("guide", guideChk));

    const bagsCard = document.getElementById("addon-bags-card");
    const bagsChk = document.getElementById("addon-bags-chk");
    bagsCard.addEventListener("click", () => toggleAddon("extraBags", bagsChk));

    document.getElementById("step3-prev-btn").addEventListener("click", () => {
      this.currentStep = 2;
      this.updateStepView();
    });

    document.getElementById("step3-next-btn").addEventListener("click", () => {
      this.currentStep = 4;
      this.updateStepView();
    });
  },

  // STEP 4: DOC VAULT WITH PULSATING AADHAAR BANNERS
  renderStep4(panel) {
    const matchedRoute = findRouteSymmetric(this.state.from, this.state.to);
    const isPermitRequired = matchedRoute?.permitRequired || this.state.packageId?.includes("tsomgo") || this.state.packageId?.includes("nathula") || this.state.packageId?.includes("north-expedition");

    panel.innerHTML = `
      <div class="animate-fade-in">
        <h2 style="font-size: 1.75rem; margin-bottom: 8px;"><i class="fa-solid fa-id-card text-brand"></i> Customer Details & Document Vault</h2>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">Please input passenger details and required credentials for permit processing.</p>

        <!-- User Information Form -->
        <div class="grid grid-2" style="margin-bottom: 30px;">
          <div class="form-group">
            <label class="form-label">Full Name (Matching ID)</label>
            <input type="text" id="step4-name" class="input-glass" value="${this.state.userDetails.name}" placeholder="John Doe" />
          </div>
          <div class="form-group">
            <label class="form-label">Contact Phone (WhatsApp Active)</label>
            <input type="tel" id="step4-phone" class="input-glass" value="${this.state.userDetails.phone}" placeholder="+91 XXXXX XXXXX" />
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 30px;">
          <label class="form-label">Email Address (For Booking Vouchers)</label>
          <input type="email" id="step4-email" class="input-glass" value="${this.state.userDetails.email}" placeholder="john@example.com" />
        </div>

        ${isPermitRequired ? `
          <!-- ⚠️ CRITICAL BANNER: NO AADHAAR AND NO PAN CARDS ALLOWED FOR PERMITS -->
          <div class="aadhaar-warning-pulsate mb-4" style="padding: 16px 20px; border-radius: var(--radius-md); background: rgba(239, 68, 68, 0.15); border: 2px dashed #ef4444; color: #fca5a5; line-height: 1.5; font-size: 0.85rem;">
            <div class="flex" style="gap: 12px;">
              <i class="fa-solid fa-circle-exclamation" style="font-size: 1.5rem; color: #ef4444; margin-top: 2px;"></i>
              <div>
                <strong>Military Permit Regulation:</strong> Sikkim border check-posts and military checkpoints strictly REJECT <strong>Aadhaar cards and PAN cards</strong> as proof of nationality. <strong>You must upload Voter ID card or Indian Passport ONLY.</strong>
              </div>
            </div>
          </div>

          <!-- Document Upload Fields -->
          <div class="grid grid-2" style="margin-bottom: 30px;">
            <div class="form-group">
              <label class="form-label">Passport-Size Photo (JPEG/PNG)</label>
              <div class="upload-zone-glass">
                <i class="fa-solid fa-camera upload-icon"></i>
                <input type="file" id="step4-photo" style="display: none;" accept="image/*" />
                <span id="photo-lbl" style="font-size: 0.85rem; color: var(--text-secondary);">Click to Snap or Upload</span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Government ID Scan (Voter ID or Passport)</label>
              <div class="upload-zone-glass">
                <i class="fa-solid fa-passport upload-icon"></i>
                <input type="file" id="step4-id" style="display: none;" accept="image/*,application/pdf" />
                <span id="id-lbl" style="font-size: 0.85rem; color: var(--text-secondary);">Click to Upload PDF or JPG</span>
              </div>
            </div>
          </div>
        ` : ''}

        <div id="step4-error" style="color: var(--color-danger); font-size: 0.9rem; margin-bottom: 20px; display: none;"></div>

        <div class="flex-between" style="border-top: 1px solid var(--glass-border); padding-top: 24px;">
          <button class="btn btn-secondary" id="step4-prev-btn"><i class="fa-solid fa-chevron-left"></i> Previous</button>
          <button class="btn btn-primary" id="step4-submit-btn"><span>Simulate 50% Advance & Confirm</span> <i class="fa-solid fa-credit-card"></i></button>
        </div>
      </div>
    `;

    // Data Binders
    document.getElementById("step4-name").addEventListener("input", (e) => this.state.userDetails.name = e.target.value);
    document.getElementById("step4-phone").addEventListener("input", (e) => this.state.userDetails.phone = e.target.value);
    document.getElementById("step4-email").addEventListener("input", (e) => this.state.userDetails.email = e.target.value);

    // Dynamic Upload triggers
    if (isPermitRequired) {
      const photoInp = document.getElementById("step4-photo");
      const photoLbl = document.getElementById("photo-lbl");
      photoInp.parentElement.addEventListener("click", () => photoInp.click());
      photoInp.addEventListener("change", (e) => {
        if (e.target.files[0]) {
          photoLbl.innerText = `Uploaded: ${e.target.files[0].name.slice(0, 18)}...`;
          photoLbl.style.color = "var(--color-success)";
          this.state.documents.photo = e.target.files[0];
        }
      });

      const idInp = document.getElementById("step4-id");
      const idLbl = document.getElementById("id-lbl");
      idInp.parentElement.addEventListener("click", () => idInp.click());
      idInp.addEventListener("change", (e) => {
        if (e.target.files[0]) {
          idLbl.innerText = `Uploaded: ${e.target.files[0].name.slice(0, 18)}...`;
          idLbl.style.color = "var(--color-success)";
          this.state.documents.idScan = e.target.files[0];
        }
      });
    }

    document.getElementById("step4-prev-btn").addEventListener("click", () => {
      this.currentStep = 3;
      this.updateStepView();
    });

    document.getElementById("step4-submit-btn").addEventListener("click", () => {
      const err = document.getElementById("step4-error");
      const phoneRegex = /^\+?[\d\s-]{10,14}$/;

      if (!this.state.userDetails.name.trim()) {
        err.innerText = "Please specify customer full name.";
        err.style.display = "block";
        return;
      }
      if (!phoneRegex.test(this.state.userDetails.phone)) {
        err.innerText = "Please specify a valid mobile contact number.";
        err.style.display = "block";
        return;
      }
      if (isPermitRequired && (!this.state.documents.photo || !this.state.documents.idScan)) {
        err.innerText = "Military permit routes strictly require photo and Voter ID/Passport uploads.";
        err.style.display = "block";
        return;
      }

      err.style.display = "none";
      this.currentStep = 5;
      this.updateStepView();
    });
  },

  // STEP 5: SIMULATED PAYMENT SUCCESS & RECEIPT
  renderStep5(panel) {
    const bookingId = "HT" + Math.floor(100000 + Math.random() * 900000);
    const summary = this.getPricingSummary();
    const advanceAmount = this.getAdvanceAmount(summary.total);
    const balanceAmount = Math.max(0, Math.round(summary.total || 0) - advanceAmount);
    const vehicleName = vehicles.find(v => v.id === this.state.vehicleId)?.name || this.state.vehicleId;
    const permitStatus = summary.permitRequired ? "Pending operator approval" : "Not required";

    // Fire-and-forget: save to Supabase (falls back to localStorage if offline)
    CustomerStore.saveBooking({
      bookingId,
      name: this.state.userDetails.name,
      phone: this.state.userDetails.phone,
      email: this.state.userDetails.email,
      pickup: getTerminalName(this.state.from),
      drop: getTerminalName(this.state.to),
      date: this.state.date,
      time: this.state.time,
      vehicle: vehicleName,
      passengers: this.state.passengers,
      days: this.state.days,
      price: summary.total,
      isEstimated: !!summary.isEstimated
    }).catch(err => console.warn('[Booking] save failed:', err));
    
    // Hide Right Summary Panel entirely during confirmation stage
    const summaryRightPanel = document.getElementById("booking-summary-panel");
    if (summaryRightPanel) summaryRightPanel.style.display = "none";

    const stepsNav = document.querySelector(".booking-steps-nav");
    if (stepsNav) stepsNav.style.display = "none";
    
    // Convert parent wrapper to full width
    const parentWrapper = document.querySelector(".booking-wizard-wrapper");
    if (parentWrapper) {
      parentWrapper.style.gridTemplateColumns = "1fr";
      parentWrapper.style.maxWidth = "750px";
      parentWrapper.style.margin = "40px auto 0 auto";
    }
    window.scrollTo({ top: 0, behavior: "auto" });

    panel.innerHTML = `
      <div class="animate-fade-in text-center" style="padding: 44px 0 20px;">
        <!-- Success Check Icon with glowing ring -->
        <div class="success-glowing-ring flex-center mb-4">
          <i class="fa-solid fa-circle-check" style="font-size: 4.5rem; color: var(--color-success);"></i>
        </div>

        <h2 style="font-size: 2.25rem; font-weight: 800; background: linear-gradient(135deg, white, var(--color-success)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Booking Confirmed!</h2>
        <p style="color: var(--text-secondary); max-width: 560px; margin: 10px auto 30px auto;">Your 50% advance payment has been simulated successfully. Final fare verification and dispatch parameters have been routed to operations.</p>

        <!-- Premium Ticket Receipt -->
        <div class="ticket-receipt glass-panel mb-5" style="text-align: left; overflow: hidden; position: relative;">
          <!-- Top Border Checker -->
          <div style="height: 6px; background: var(--gradient-brand);"></div>
          
          <div style="padding: 32px;">
            <div class="flex-between" style="border-bottom: 1px dashed var(--glass-border); padding-bottom: 20px; margin-bottom: 20px;">
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Reference Code</span>
                <div style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700; color: var(--brand-color);">${bookingId}</div>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Status</span>
                <div><span class="badge badge-success"><i class="fa-solid fa-check"></i> advance paid</span></div>
              </div>
            </div>

            <!-- Receipt Metadata Grid -->
            <div class="grid grid-2" style="gap: 20px 40px; margin-bottom: 24px;">
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Traveler</span>
                <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-top: 4px;">${this.state.userDetails.name}</div>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Phone / Active WhatsApp</span>
                <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-top: 4px;">${this.state.userDetails.phone}</div>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Route Corridor</span>
                <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-top: 4px;">${getTerminalName(this.state.from).split(" (")[0]} to ${getTerminalName(this.state.to)}</div>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Dispatch Schedule</span>
                <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-top: 4px;">${this.state.date} @ ${this.state.time}</div>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Travellers / Duration</span>
                <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-top: 4px;">${this.state.passengers} traveller${this.state.passengers > 1 ? 's' : ''} · ${this.state.days} day${this.state.days > 1 ? 's' : ''}</div>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Permit Status</span>
                <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-top: 4px;">${permitStatus}</div>
              </div>
            </div>

            <div style="border-top: 1px dashed var(--glass-border); padding-top: 20px; margin-bottom: 20px;">
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 12px;">Estimated Fare Items</span>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                ${summary.breakdown.map(b => `
                  <div class="flex-between" style="font-size: 0.84rem; gap: 16px;">
                    <span style="color: var(--text-secondary);">${b.label}</span>
                    <span style="font-family: var(--font-mono); color: var(--text-primary);">${this.formatCurrency(b.amount)}</span>
                  </div>
                `).join("")}
              </div>
            </div>

            <div style="border-top: 1px dashed var(--glass-border); padding-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px;">
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Vehicle Assigned</span>
                <div style="font-size: 0.95rem; font-weight: 600; color: var(--brand-color); margin-top: 4px;">${vehicleName}</div>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Estimated Total</span>
                <div style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin-top: 4px;">${this.formatCurrency(summary.total)}</div>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Advance Paid (50%)</span>
                <div style="font-family: var(--font-mono); font-size: 1.35rem; font-weight: 800; color: var(--color-success); margin-top: 4px;">${this.formatCurrency(advanceAmount)}</div>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Balance Due</span>
                <div style="font-family: var(--font-mono); font-size: 1.35rem; font-weight: 800; color: var(--brand-color); margin-top: 4px;">${this.formatCurrency(balanceAmount)}</div>
              </div>
            </div>
          </div>
          
          <!-- Bottom Ticket Tear Checker -->
          <div class="ticket-tear-effect"></div>
        </div>

        <div class="flex-center" style="gap: 16px; flex-wrap: wrap;">
          <button id="confirmed-whatsapp-share-btn" class="btn btn-primary">
            <i class="fa-brands fa-whatsapp"></i> Send Voucher to WhatsApp
          </button>
          <button id="download-receipt-btn" class="btn btn-secondary">
            <i class="fa-solid fa-file-arrow-down"></i> Download Mock Receipt
          </button>
          <a href="#/" class="btn btn-secondary">
            <i class="fa-solid fa-house"></i> Back to Homepage
          </a>
        </div>
      </div>
    `;

    // Bind WhatsApp voucher dispatch actions
    document.getElementById("confirmed-whatsapp-share-btn").addEventListener("click", () => {
      const fromName = getTerminalName(this.state.from).split(" (")[0];
      const toName = getTerminalName(this.state.to);
      const msg = [
        "*HILLS TOUR & TRAVELS VOUCHER*",
        "------------------------------",
        `*Reference ID:* ${bookingId}`,
        `*Customer:* ${this.state.userDetails.name}`,
        `*Route:* ${fromName} to ${toName}`,
        `*Date/Time:* ${this.state.date} @ ${this.state.time}`,
        `*Vehicle:* ${vehicleName}`,
        `*Estimated Total:* INR ${Math.round(summary.total || 0)}/-`,
        `*Advance Paid (50%):* INR ${advanceAmount}/-`,
        `*Balance Due:* INR ${balanceAmount}/-`,
        `*Fare Status:* Estimated, final fare pending operator confirmation`,
        "------------------------------",
        `*Permit Status:* ${permitStatus}`
      ].join("\n");
      
      const url = `https://wa.me/919907219843?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");
    });

    document.getElementById("download-receipt-btn").addEventListener("click", () => {
      this.downloadReceipt(bookingId, summary);
    });
  },

  // Dynamic calculations wrapper
  getPricingSummary() {
    const routeId = this.state.from + "->" + this.state.to;
    let summary = PriceCalculator.calculate({
      routeId,
      vehicleId: this.state.vehicleId,
      time: this.state.time,
      date: this.state.date,
      passengers: this.state.passengers,
      days: this.state.days
    });

    if (!summary) return { total: 0, breakdown: [], distance: "", duration: "" };

    // Append custom selected add-ons manually
    let addonSum = 0;
    if (this.state.addons.guide) {
      const guideFee = 1500 * this.state.days;
      addonSum += guideFee;
      summary.breakdown.splice(summary.breakdown.length - 1, 0, { label: `Bilingual Mountain Guide - ${this.state.days} Days`, amount: guideFee });
    }
    if (this.state.addons.extraBags) {
      const cargoFee = 499;
      addonSum += cargoFee;
      summary.breakdown.splice(summary.breakdown.length - 1, 0, { label: "Roof Cargo luggage carrier", amount: cargoFee });
    }

    if (addonSum > 0) {
      // Re-apply GST to add-ons
      const gstAddition = addonSum * 0.05;
      summary.total += (addonSum + gstAddition);
      
      // Update GST index value in breakdown
      const gstIndex = summary.breakdown.findIndex(b => b.label.includes("GST"));
      if (gstIndex >= 0) {
        summary.breakdown[gstIndex].amount += Math.round(gstAddition);
      }
    }

    return summary;
  },

  formatCurrency(amount) {
    return `₹${Math.round(Number(amount) || 0).toLocaleString("en-IN")}`;
  },

  getAdvanceAmount(total) {
    return Math.round((Number(total) || 0) / 2);
  },

  downloadReceipt(bookingId, summary) {
    const advanceAmount = this.getAdvanceAmount(summary.total);
    const balanceAmount = Math.max(0, Math.round(summary.total || 0) - advanceAmount);
    const vehicleName = vehicles.find(v => v.id === this.state.vehicleId)?.name || this.state.vehicleId;
    const permitStatus = summary.permitRequired ? "Pending operator approval" : "Not required";
    const lines = [
      "HILLS TOUR & TRAVELS - MOCK RECEIPT",
      "This is a simulated receipt for prototype checkout testing.",
      "",
      `Reference: ${bookingId}`,
      `Traveler: ${this.state.userDetails.name}`,
      `Phone: ${this.state.userDetails.phone}`,
      `Email: ${this.state.userDetails.email || "N/A"}`,
      `Route: ${getTerminalName(this.state.from).split(" (")[0]} to ${getTerminalName(this.state.to)}`,
      `Date/Time: ${this.state.date} @ ${this.state.time}`,
      `Travellers: ${this.state.passengers}`,
      `Duration: ${this.state.days} day${this.state.days > 1 ? "s" : ""}`,
      `Vehicle: ${vehicleName}`,
      `Permit Status: ${permitStatus}`,
      "",
      "Fare items:",
      ...summary.breakdown.map(b => `- ${b.label}: ${this.formatCurrency(b.amount)}`),
      "",
      `Estimated Total: ${this.formatCurrency(summary.total)}`,
      `Advance Paid (50%): ${this.formatCurrency(advanceAmount)}`,
      `Balance Due: ${this.formatCurrency(balanceAmount)}`,
      "",
      "Final fare is pending operator confirmation."
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${bookingId}-mock-receipt.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  },

  // STEP SUMMARY RENDER PANEL
  updateSummary() {
    const summaryPanel = document.getElementById("booking-summary-panel");
    if (!summaryPanel || this.currentStep === 5) return;

    const summary = this.getPricingSummary();
    const isPackage = !!this.state.packageId;
    const advanceAmount = this.getAdvanceAmount(summary.total);
    const balanceAmount = Math.max(0, Math.round(summary.total || 0) - advanceAmount);

    if (summary.total === 0) {
      summaryPanel.innerHTML = `
        <div class="summary-empty-state">
          <i class="fa-solid fa-taxi"></i>
          <h3 class="summary-empty-title">Incomplete Itinerary</h3>
          <p class="summary-empty-desc">Pricing breakdowns generate instantly upon route mapping.</p>
        </div>
      `;
      return;
    }

    summaryPanel.innerHTML = `
      <h3 class="summary-header">
        <span>Trip Summary</span>
        ${summary.isEstimated ? `
          <span class="summary-estimated-badge">
            <i class="fa-solid fa-circle-info"></i> Estimated
          </span>
        ` : ''}
      </h3>

      <div class="summary-details-list">
        <div class="summary-details-item">
          <span class="summary-details-label"><i class="fa-solid fa-road"></i> Transit Distance</span>
          <span class="summary-details-value">${summary.distance}</span>
        </div>
        <div class="summary-details-item">
          <span class="summary-details-label"><i class="fa-solid fa-clock"></i> Est. Drive Time</span>
          <span class="summary-details-value">${summary.duration}</span>
        </div>
        <div class="summary-details-item">
          <span class="summary-details-label"><i class="fa-solid fa-car"></i> Vehicle Category</span>
          <span class="summary-details-value highlight">${vehicles.find(v => v.id === this.state.vehicleId)?.name || 'Standard'}</span>
        </div>
      </div>

      <div class="summary-breakdown-section">
        <h4 class="summary-breakdown-title">Fare Breakdown</h4>
        <div class="summary-breakdown-list">
          ${summary.breakdown.map(b => `
            <div class="summary-breakdown-row">
              <span class="summary-breakdown-label">${b.label}</span>
              <span class="summary-breakdown-price">${this.formatCurrency(b.amount)}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="summary-total-row">
        <span class="summary-total-label">Total Amount (All Inclusive)</span>
        <span class="summary-total-price">${this.formatCurrency(summary.total)}</span>
      </div>

      <div class="summary-advance-card">
        <div class="summary-advance-row">
          <span class="summary-advance-label">Pay Advance Now (50%)</span>
          <span class="summary-advance-price">${this.formatCurrency(advanceAmount)}</span>
        </div>
        <div class="summary-balance-row">
          <span class="summary-balance-label">Balance after operator confirmation</span>
          <span class="summary-balance-price">${this.formatCurrency(balanceAmount)}</span>
        </div>
      </div>

      <div class="summary-estimate-warning">
        <i class="fa-solid fa-shield-halved"></i>
        <span>Estimated fare. 50% advance only; final price is confirmed by operations.</span>
      </div>
    `;
  }
};
