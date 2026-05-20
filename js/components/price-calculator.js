/* ==========================================
   HILLS TOUR & TRAVELS — PRICING ENGINE
   ========================================== */

import { routes } from '../data/routes.js';
import { vehicles } from '../data/vehicles.js';

// Build a {terminalId -> approx km from Bagdogra} map from the existing routes
// table so we can estimate fares for hill-to-hill pairs that aren't mapped
// explicitly (e.g. Mirik → Darjeeling, Pelling → Gangtok).
function buildTerminalDistanceMap() {
  const m = new Map();
  m.set('bagdogra-airport', 0);
  m.set('njp-station', 12); // NJP sits ~12 km from Bagdogra
  for (const r of routes) {
    const distNum = parseFloat(r.distance.replace(/[^\d.]/g, '')) || 0;
    if (r.from === 'bagdogra-airport' && !m.has(r.to)) m.set(r.to, distNum);
    if (r.to === 'bagdogra-airport' && !m.has(r.from)) m.set(r.from, distNum);
  }
  return m;
}

function synthesizeEstimateRoute(fromId, toId) {
  const distMap = buildTerminalDistanceMap();
  const a = distMap.get(fromId);
  const b = distMap.get(toId);
  if (a == null || b == null) return null;
  // Midpoint of the two Bagdogra-distances — rough but reasonable for a
  // first-pass MVP estimate. Floor of 30 km for short hill hops.
  const estDistKm = Math.max(30, Math.round((a + b) / 2));
  const estHours = Math.max(1, Math.round(estDistKm / 25)); // ~25 km/h mountain avg
  return {
    from: fromId,
    to: toId,
    distance: `~${estDistKm} km (est.)`,
    duration: `~${estHours} hr${estHours > 1 ? 's' : ''}`,
    basePriceSedan: null,
    basePriceSuv: null,
    isCrossBorder: false,
    permitRequired: false,
    _isEstimated: true,
    _estDistKm: estDistKm
  };
}

export const PriceCalculator = {
  calculate({ routeId, vehicleId, time, date, passengers, days = 1 }) {
    const [fromId, toId] = routeId.split("->");

    // 1. Find matching route — try forward first, then reverse (return drop),
    //    finally fall back to a synthesized estimate so unmapped pairs still
    //    show a price instead of "Incomplete Itinerary".
    let route = routes.find(r => r.from === fromId && r.to === toId);
    if (!route) route = routes.find(r => r.from === toId && r.to === fromId);
    if (!route) route = synthesizeEstimateRoute(fromId, toId);
    if (!route) return null;

    // 2. Find matching vehicle
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return null;

    // Determine baseline price (handle null prices for disallowed vehicle classes on routes)
    let basePrice = 0;
    if (vehicle.id.startsWith("suv")) {
      basePrice = route.basePriceSuv;
    } else {
      basePrice = route.basePriceSedan;
    }

    // Fallback if price is not mapped directly (calculate based on distance and vehicle km rate)
    if (!basePrice) {
      const distanceNumber = parseFloat(route.distance.replace(/[^\d.]/g, "")) || 50;
      basePrice = distanceNumber * vehicle.baseRatePerKm * 1.5; // mountain difficulty adjustment
    }

    // 3. Apply Vehicle Multiplier
    let computedFare = basePrice * vehicle.multiplier;

    const breakdown = [];
    breakdown.push({ label: "Base Corridor Fare", amount: Math.round(basePrice) });
    
    if (vehicle.multiplier !== 1.0) {
      const vehicleSurcharge = computedFare - basePrice;
      breakdown.push({ label: `Vehicle Tier Upgrade (${vehicle.name})`, amount: Math.round(vehicleSurcharge) });
    }

    // 4. Night Surcharge (Post 6:00 PM / 18:00)
    let nightSurcharge = 0;
    if (time) {
      const [hour] = time.split(":").map(Number);
      if (hour >= 18 || hour < 5) {
        nightSurcharge = computedFare * 0.15; // 15% surcharge for night mountain driving
        computedFare += nightSurcharge;
        breakdown.push({ label: "Night Dispatch Surcharge (15%)", amount: Math.round(nightSurcharge) });
      }
    }

    // 5. Seasonal Peak Surge (March-June, October-December)
    let seasonalSurge = 0;
    if (date) {
      const month = new Date(date).getMonth(); // 0-indexed (0 = Jan, 2 = Mar, 5 = Jun, 9 = Oct, 11 = Dec)
      const isPeak = (month >= 2 && month <= 5) || (month >= 9 && month <= 11);
      
      if (isPeak) {
        seasonalSurge = computedFare * 0.20; // 20% peak tourist season surge
        computedFare += seasonalSurge;
        breakdown.push({ label: "Seasonal Peak Demand Surge (20%)", amount: Math.round(seasonalSurge) });
      }
    }

    // 6. Cross-Border Taxes and Sovereign Fees
    let crossBorderFees = 0;
    if (route.isCrossBorder) {
      if (route.country === "nepal") {
        // Nepal Bhansar custom tax (₹500 / day)
        const bhansarFee = 500 * days;
        crossBorderFees += bhansarFee;
        computedFare += bhansarFee;
        breakdown.push({ label: `Nepal Border Custom Tax (Bhansar) - ${days} Days`, amount: bhansarFee });
      } else if (route.country === "bhutan") {
        // Bhutan daily Green Tax for Indian vehicles (₹4,500 / day)
        const greenTax = 4500 * days;
        // Bhutan Sustainable Development Fee (SDF) per passenger per night (₹1,200 / night / person)
        const sdfFee = 1200 * passengers * (days - 1 > 0 ? days - 1 : 1);

        crossBorderFees += (greenTax + sdfFee);
        computedFare += (greenTax + sdfFee);
        
        breakdown.push({ label: `Bhutan Daily Vehicle Green Tax - ${days} Days`, amount: greenTax });
        breakdown.push({ label: `Bhutan Sustainable Development Fee (SDF) - ${passengers} Pax`, amount: sdfFee });
      }
    }

    // 7. Protected Area Permits (Sikkim high-altitudes Nathula/North Sikkim)
    let permitFee = 0;
    if (route.permitRequired && !route.isCrossBorder) {
      // Sikkim high-altitude PAP permit handling charge
      permitFee = 250 * passengers;
      computedFare += permitFee;
      breakdown.push({ label: `Sikkim Protected Area Permit (PAP) - ${passengers} Pax`, amount: permitFee });
    }

    // 8. Dynamic GST (5% for standard mountain aggregators)
    const gstAmount = computedFare * 0.05;
    const totalFare = computedFare + gstAmount;
    breakdown.push({ label: "GST Compliance Tax (5%)", amount: Math.round(gstAmount) });

    return {
      basePrice: Math.round(basePrice),
      total: Math.round(totalFare),
      breakdown: breakdown.map(b => ({ ...b, amount: Math.round(b.amount) })),
      distance: route.distance,
      duration: route.duration,
      isCrossBorder: route.isCrossBorder,
      country: route.country || null,
      permitRequired: route.permitRequired,
      isEstimated: !!route._isEstimated
    };
  }
};
