/* ==========================================
   HILLS TOUR & TRAVELS — CUSTOMER BOOKING STORE
   Writes to Supabase `bookings` table.
   Falls back to localStorage if Supabase is unreachable.
   ========================================== */

import { supabase } from './supabase.js';

const LS_KEY = 'htt_bookings_v1';

function lsRead() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function lsAppend(record) {
  try {
    const all = lsRead();
    all.unshift(record);
    localStorage.setItem(LS_KEY, JSON.stringify(all));
  } catch (e) {
    console.warn('[customer-store] localStorage write failed:', e);
  }
}

export const CustomerStore = {
  async saveBooking(booking) {
    const record = {
      booking_id:   booking.bookingId,
      name:         booking.name        || '',
      phone:        booking.phone       || '',
      email:        booking.email       || '',
      pickup:       booking.pickup      || '',
      drop:         booking.drop        || '',
      travel_date:  booking.date        || null,
      travel_time:  booking.time        || null,
      vehicle:      booking.vehicle     || '',
      passengers:   booking.passengers  || 0,
      days:         booking.days        || 1,
      price:        booking.price       || 0,
      is_estimated: !!booking.isEstimated,
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert([record])
      .select()
      .single();

    if (error) {
      console.warn('[customer-store] Supabase insert failed, falling back to localStorage:', error.message);
      lsAppend({ ...record, createdAt: new Date().toISOString() });
      return { ...record, createdAt: new Date().toISOString(), _source: 'local' };
    }

    return { ...data, _source: 'supabase' };
  },

  async list() {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[customer-store] Supabase fetch failed, reading localStorage:', error.message);
      return lsRead();
    }

    return data || [];
  },

  async deleteById(id) {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('booking_id', id);

    if (error) console.warn('[customer-store] delete failed:', error.message);
  },

  async toCsv() {
    const all = await this.list();
    if (all.length === 0) return '';
    const headers = ['booking_id','created_at','name','phone','email','pickup','drop','travel_date','travel_time','vehicle','passengers','days','price','is_estimated'];
    const escape = (v) => {
      const s = String(v ?? '');
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const rows = all.map(r => headers.map(h => escape(r[h])).join(','));
    return [headers.join(','), ...rows].join('\n');
  }
};
