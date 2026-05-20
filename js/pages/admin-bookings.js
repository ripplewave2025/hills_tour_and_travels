/* ==========================================
   HILLS TOUR & TRAVELS — ADMIN BOOKING LOG
   ==========================================
   Hidden viewer for locally-stored bookings.
   URL: #/admin/bookings
   ========================================== */

import { CustomerStore } from '../utils/customer-store.js';

function fmtDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

export const AdminBookings = {
  render() {
    const bookings = CustomerStore.list();

    const rows = bookings.length === 0 ? `
      <tr>
        <td colspan="8" style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <i class="fa-solid fa-inbox" style="font-size: 2.5rem; opacity: 0.3; display: block; margin-bottom: 12px;"></i>
          No bookings yet. Confirmed bookings will appear here.
        </td>
      </tr>
    ` : bookings.map(b => `
      <tr>
        <td style="font-family: var(--font-mono); color: var(--brand-color);">${b.bookingId}</td>
        <td>${b.name}</td>
        <td><a href="tel:${b.phone}" style="color: var(--text-secondary);">${b.phone}</a></td>
        <td>${b.pickup} → ${b.drop}</td>
        <td>${b.date} ${b.time}</td>
        <td>${b.vehicle}</td>
        <td style="font-family: var(--font-mono); color: var(--color-success);">₹${b.price}${b.isEstimated ? ' <span style="font-size: 0.7rem; color: var(--brand-color);">(est)</span>' : ''}</td>
        <td style="font-size: 0.75rem; color: var(--text-muted);">${fmtDate(b.createdAt)}</td>
      </tr>
    `).join('');

    return `
      <section class="section-padding" style="min-height: 85vh;">
        <div class="container">
          <div class="flex-between" style="margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
            <div>
              <span class="badge badge-brand mb-1"><i class="fa-solid fa-lock"></i> Operator Console</span>
              <h1 style="font-size: 2rem; margin-top: 8px;">Customer Bookings</h1>
              <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 4px;">
                Stored locally in this browser. ${bookings.length} record${bookings.length === 1 ? '' : 's'}.
              </p>
            </div>
            <div class="flex" style="gap: 12px;">
              <button id="admin-export-csv-btn" class="btn btn-secondary" ${bookings.length === 0 ? 'disabled' : ''}>
                <i class="fa-solid fa-file-csv"></i> Export CSV
              </button>
              <button id="admin-clear-btn" class="btn btn-secondary" ${bookings.length === 0 ? 'disabled' : ''} style="border-color: rgba(239, 68, 68, 0.4); color: #fca5a5;">
                <i class="fa-solid fa-trash"></i> Clear All
              </button>
            </div>
          </div>

          <div class="glass-panel" style="padding: 0; overflow: auto;">
            <table class="admin-bookings-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem;">
              <thead>
                <tr style="border-bottom: 1px solid var(--glass-border); text-align: left;">
                  <th style="padding: 14px 16px; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">Ref</th>
                  <th style="padding: 14px 16px; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">Name</th>
                  <th style="padding: 14px 16px; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">Phone</th>
                  <th style="padding: 14px 16px; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">Route</th>
                  <th style="padding: 14px 16px; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">Dispatch</th>
                  <th style="padding: 14px 16px; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">Vehicle</th>
                  <th style="padding: 14px 16px; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">Price</th>
                  <th style="padding: 14px 16px; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">Created</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>

          <p style="margin-top: 16px; font-size: 0.8rem; color: var(--text-muted);">
            <i class="fa-solid fa-circle-info"></i> Data lives in this browser's localStorage. Clearing browser data wipes the log. Swap <code>CustomerStore.saveBooking</code> for a fetch() POST to your backend when ready.
          </p>
        </div>
      </section>
    `;
  },

  init() {
    const exportBtn = document.getElementById('admin-export-csv-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const csv = CustomerStore.toCsv();
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
    }

    const clearBtn = document.getElementById('admin-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Delete all locally stored bookings? This cannot be undone.')) {
          CustomerStore.clear();
          // Re-render current page
          const evt = new HashChangeEvent('hashchange');
          window.dispatchEvent(evt);
          window.location.reload();
        }
      });
    }
  }
};
