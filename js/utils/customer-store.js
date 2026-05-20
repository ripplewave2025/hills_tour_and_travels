/* ==========================================
   HILLS TOUR & TRAVELS — CUSTOMER LOG (LOCAL)
   ==========================================
   Persists confirmed bookings to browser localStorage.
   No backend yet — viewable at #/admin/bookings.
   Swap saveBooking() body for a fetch() POST when ready.
   ========================================== */

const STORAGE_KEY = 'htt_bookings_v1';

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('[customer-store] Could not parse stored bookings:', err);
    return [];
  }
}

function writeAll(arr) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch (err) {
    console.error('[customer-store] Failed to persist bookings:', err);
  }
}

export const CustomerStore = {
  saveBooking(booking) {
    const all = readAll();
    const record = {
      bookingId: booking.bookingId,
      name: booking.name || '',
      phone: booking.phone || '',
      email: booking.email || '',
      pickup: booking.pickup || '',
      drop: booking.drop || '',
      date: booking.date || '',
      time: booking.time || '',
      vehicle: booking.vehicle || '',
      passengers: booking.passengers || 0,
      days: booking.days || 1,
      price: booking.price || 0,
      isEstimated: !!booking.isEstimated,
      createdAt: new Date().toISOString()
    };
    all.unshift(record);
    writeAll(all);
    return record;
  },

  list() {
    return readAll();
  },

  clear() {
    writeAll([]);
  },

  toCsv() {
    const all = readAll();
    if (all.length === 0) return '';
    const headers = ['bookingId','createdAt','name','phone','email','pickup','drop','date','time','vehicle','passengers','days','price','isEstimated'];
    const escape = (v) => {
      const s = String(v ?? '');
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const rows = all.map(r => headers.map(h => escape(r[h])).join(','));
    return [headers.join(','), ...rows].join('\n');
  }
};
