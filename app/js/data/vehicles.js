/* ==========================================
   HILLS TOUR & TRAVELS — VEHICLE FLEET DATA
   ========================================== */

export const vehicles = [
  {
    id: "hatchback",
    name: "Budget Hatchback",
    models: ["Maruti Suzuki WagonR", "Tata Tiago"],
    capacity: "4 Passengers",
    luggage: "2 Standard Bags",
    multiplier: 1.0,
    baseRatePerKm: 18,
    features: ["AC / Heater", "Music System", "Experienced Mountain Driver", "Best for Budget Couples"],
    restrictions: [
      "Not allowed for high-altitude routes (Tsomgo Lake, Nathula Pass, North Sikkim)",
      "Max weight capacity applies on steep inclines"
    ],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "sedan",
    name: "Comfort Sedan",
    models: ["Maruti Suzuki Swift Dzire", "Hyundai Aura"],
    capacity: "4 Passengers",
    luggage: "3 Standard Bags (Dedicated Boot)",
    multiplier: 1.15,
    baseRatePerKm: 22,
    features: ["Spacious Legroom", "AC / Heater", "Premium Bluetooth Sound", "Excellent Suspension for Mountain Drops"],
    restrictions: [
      "Not allowed for high-altitude routes (Tsomgo Lake, Nathula Pass, North Sikkim)"
    ],
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "muv-mid",
    name: "Mid-Size Family MUV",
    models: ["Maruti Suzuki Ertiga", "Kia Carens"],
    capacity: "6 Passengers",
    luggage: "4 Standard Bags",
    multiplier: 1.4,
    baseRatePerKm: 28,
    features: ["3-Row Flexible Seating", "Double AC / Heater vents", "Rear USB Charger ports", "Smooth ride comfort"],
    restrictions: [
      "Permitted to Gangtok/Pelling drop-offs but not allowed for North Sikkim/Nathula high-altitude zones"
    ],
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "suv-rugged",
    name: "Rugged Mountain SUV",
    models: ["Mahindra Scorpio", "Tata Sumo Gold", "Mahindra Bolero"],
    capacity: "7 Passengers",
    luggage: "5 Standard Bags (Roof Carrier)",
    multiplier: 1.5,
    baseRatePerKm: 32,
    features: ["4-Wheel Drive / High Ground Clearance", "Robust build for rough terrain", "Roof Carrier for excessive luggage", "Mandatory Class for High Altitudes"],
    restrictions: [],
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "suv-premium",
    name: "Luxury Premium SUV",
    models: ["Toyota Innova Crysta"],
    capacity: "6–7 Passengers",
    luggage: "5 Standard Bags (Dedicated Roof Carrier)",
    multiplier: 1.8,
    baseRatePerKm: 42,
    features: ["Ultra-premium plush leather captain seats", "Triple-zone climate control", "Vibration-free mountain cruising", "Superior safety and stability"],
    restrictions: [],
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=600"
  }
];
