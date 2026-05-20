/* ==========================================
   HILLS TOUR & TRAVELS — ADMIN BOOKING LOG
   Reads live from Supabase. URL: #/admin/bookings
   ========================================== */

import { CustomerStore } from '../utils/customer-store.js';

function fmtDate(iso) {
  if (!iso) return '';
  try { return new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }); }
  catch { return iso; }
}

function rowsHtml(bookings) {
  if (bookings.length === 0) return `
    <tr>
      <td colspan="8" style="text-align:center;padding:60px 20px;color:var(--text-muted);">
        <i class="fa-solid fa-inbox" style="font-size:2.5rem;opacity:0.3;display:block;margin-bottom:12px;"></i>
        No bookings yet. Confirmed bookings will appear here.
      </td>
    </tr>`;

  return bookings.map(b => `
    <tr style="border-bottom:1px solid var(--glass-border);">
      <td style="padding:12px 16px;font-family:var(--font-mono);color:var(--brand-color);">${b.booking_id || b.bookingId || ''}</td>
      <td style="padding:12px 16px;">${b.name || ''}</td>
      <td style="padding:12px 16px;"><a href="tel:${b.phone}" style="color:var(--text-secondary);">${b.phone || ''}</a></td>
      <td style="padding:12px 16px;">${b.pickup || ''} → ${b.drop || ''}</td>
      <td style="padding:12px 16px;">${b.travel_date || b.date || ''} ${b.travel_time || b.time || ''}</td>
      <td style="padding:12px 16px;">${b.vehicle || ''}</td>
      <td style="padding:12px 16px;font-family:var(--font-mono);color:var(--color-success);">
        ₹${b.price || 0}${b.is_estimated || b.isEstimated ? ' <span style="font-size:0.7rem;color:var(--brand-color);">(est)</span>' : ''}
      </td>
      <td style="padding:12px 16px;font-size:0.75rem;color:var(--text-muted);">${fmtDate(b.created_at || b.createdAt)}</td>
    </tr>`).join('');
}

export const AdminBookings = {
  render() {
    // Returns a shell; init() populates it after fetching data
    return `
      <section class="section-padding" style="min-height:85vh;">
        <div class="container">
          <div class="flex-between" style="margin-bottom:24px;flex-wrap:wrap;gap:16px;">
            <div>
              <span class="badge badge-brand mb-1"><i class="fa-solid fa-lock"></i> Operator Console</span>
              <h1 style="font-size:2rem;margin-top:8px;">Customer Bookings</h1>
              <p id="admin-subtitle" style="color:var(--text-secondary);font-size:0.9rem;margin-top:4px;">Loading…</p>
            </div>
            <div class="flex" style="gap:12px;">
              <button id="admin-refresh-btn" class="btn btn-secondary">
                <i class="fa-solid fa-rotate-right"></i> Refresh
              </button>
              <button id="admin-export-csv-btn" class="btn btn-secondary" disabled>
                <i class="fa-solid fa-file-csv"></i> Export CSV
              </button>
            </div>
          </div>

          <div class="glass-panel" style="padding:0;overflow:auto;">
            <table style="width:100%;border-collapse:collapse;font-size:0.88rem;">
              <thead>
                <tr style="border-bottom:1px solid var(--glass-border);text-align:left;">
                  ${['Ref','Name','Phone','Route','Dispatch','Vehicle','Price','Created'].map(h =>
                    `<th style="padding:14px 16px;font-size:0.75rem;text-transform:uppercase;color:var(--text-muted);letter-spacing:0.05em;white-space:nowrap;">${h}</th>`
                  ).join('')}
                </tr>
              </thead>
              <tbody id="admin-bookings-tbody">
                <tr>
                  <td colspan="8" style="text-align:center;padding:60px 20px;">
                    <div class="loader-ring" style="margin:0 auto;"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p id="admin-source-note" style="margin-top:16px;font-size:0.8rem;color:var(--text-muted);"></p>
        </div>
      </section>`;
  },

  async init() {
    await this._load();

    document.getElementById('admin-refresh-btn')?.addEventListener('click', () => this._load());

    document.getElementById('admin-export-csv-btn')?.addEventListener('click', async () => {
      const csv = await CustomerStore.toCsv();
      if (!csv) return;
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `htt-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  },

  async _load() {
    const tbody = document.getElementById('admin-bookings-tbody');
    const subtitle = document.getElementById('admin-subtitle');
    const exportBtn = document.getElementById('admin-export-csv-btn');
    const sourceNote = document.getElementById('admin-source-note');

    if (tbody) tbody.innerHTML = `
      <tr><td colspan="8" style="text-align:center;padding:60px 20px;">
        <div class="loader-ring" style="margin:0 auto;"></div>
      </td></tr>`;

    const bookings = await CustomerStore.list();

    if (subtitle) subtitle.textContent = `${bookings.length} record${bookings.length === 1 ? '' : 's'} — live from Supabase`;
    if (exportBtn) exportBtn.disabled = bookings.length === 0;
    if (tbody) tbody.innerHTML = rowsHtml(bookings);
    if (sourceNote) sourceNote.innerHTML = `<i class="fa-solid fa-database"></i> Data stored in Supabase. Use Refresh to reload.`;
  }
};
