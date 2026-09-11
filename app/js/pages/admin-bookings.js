/* ==========================================
   HILLS TOUR & TRAVELS — ADMIN BOOKING LOG
   Reads live from Supabase. URL: #/admin/bookings
   ==========================================
   SECURITY: this page shows customer PII (name / phone / email / itinerary),
   so it is gated behind Supabase Auth. The operator signs in with an email +
   password created under Authentication → Users in the Supabase dashboard;
   only an authenticated session can SELECT/DELETE rows (see
   supabase/001_create_bookings.sql). The anon key alone can no longer read
   bookings. All Supabase-sourced fields are HTML-escaped before innerHTML to
   prevent stored XSS from a malicious booking submission.
   ========================================== */

import { CustomerStore } from '../utils/customer-store.js';
import { supabase } from '../utils/supabase.js';
import { escapeHtml, escapeAttr } from '../utils/escape.js';

function fmtDate(iso) {
  if (!iso) return '';
  try { return new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }); }
  catch { return iso; }
}

// tel: hrefs must only contain phone-safe characters — strip anything that
// could break out of the attribute or inject markup.
function sanitizePhone(p) {
  return String(p ?? '').replace(/[^\d+\s-]/g, '');
}

function rowsHtml(bookings) {
  if (bookings.length === 0) return `
    <tr>
      <td colspan="8" style="text-align:center;padding:60px 20px;color:var(--text-muted);">
        <i class="fa-solid fa-inbox" style="font-size:2.5rem;opacity:0.3;display:block;margin-bottom:12px;"></i>
        No bookings yet. Confirmed bookings will appear here.
      </td>
    </tr>`;

  return bookings.map(b => {
    const phone = b.phone || '';
    const estTag = (b.is_estimated || b.isEstimated)
      ? ' <span style="font-size:0.7rem;color:var(--brand-color);">(est)</span>' : '';
    return `
    <tr style="border-bottom:1px solid var(--glass-border);">
      <td style="padding:12px 16px;font-family:var(--font-mono);color:var(--brand-color);">${escapeHtml(b.booking_id || b.bookingId || '')}</td>
      <td style="padding:12px 16px;">${escapeHtml(b.name || '')}</td>
      <td style="padding:12px 16px;"><a href="tel:${escapeAttr(sanitizePhone(phone))}" style="color:var(--text-secondary);">${escapeHtml(phone)}</a></td>
      <td style="padding:12px 16px;">${escapeHtml(b.pickup || '')} → ${escapeHtml(b.drop || '')}</td>
      <td style="padding:12px 16px;">${escapeHtml(b.travel_date || b.date || '')} ${escapeHtml(b.travel_time || b.time || '')}</td>
      <td style="padding:12px 16px;">${escapeHtml(b.vehicle || '')}</td>
      <td style="padding:12px 16px;font-family:var(--font-mono);color:var(--color-success);">
        ₹${escapeHtml(String(b.price || 0))}${estTag}
      </td>
      <td style="padding:12px 16px;font-size:0.75rem;color:var(--text-muted);">${escapeHtml(fmtDate(b.created_at || b.createdAt))}</td>
    </tr>`;
  }).join('');
}

export const AdminBookings = {
  render() {
    // Shell only; init() decides whether to show the sign-in gate, a dev
    // notice, or the live dashboard once it knows the auth state.
    return `
      <section class="section-padding" style="min-height:85vh;">
        <div class="container" id="admin-bookings-inner">
          <div style="display:flex;justify-content:center;padding:80px 0;">
            <div class="loader-ring"></div>
          </div>
        </div>
      </section>`;
  },

  async init() {
    this._inner = document.getElementById('admin-bookings-inner');
    if (!this._inner) return;

    // No Supabase configured (e.g. local dev without env vars): there is no
    // server-side PII to protect, so show the localStorage fallback directly.
    if (!supabase) {
      this._renderDashboard({ devLocal: true });
      return;
    }

    try {
      const { data } = await supabase.auth.getSession();
      if (data && data.session) this._renderDashboard({});
      else this._renderLogin();
    } catch (e) {
      this._renderLogin('Could not reach the authentication service.');
    }
  },

  _renderLogin(errMsg) {
    this._inner.innerHTML = `
      <div style="max-width:420px;margin:40px auto;">
        <div class="glass-panel" style="padding:32px;text-align:center;">
          <i class="fa-solid fa-user-shield text-brand" style="font-size:2rem;margin-bottom:14px;"></i>
          <h1 style="font-size:1.5rem;margin-bottom:8px;">Operator Sign-in</h1>
          <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:20px;">Customer bookings are protected. Sign in with your operator account.</p>
          <input type="email" id="admin-email" class="input-glass" placeholder="Email" autocomplete="username" style="width:100%;margin-bottom:12px;" />
          <input type="password" id="admin-password" class="input-glass" placeholder="Password" autocomplete="current-password" style="width:100%;margin-bottom:12px;" />
          <button id="admin-signin-btn" class="btn btn-primary w-100"><i class="fa-solid fa-right-to-bracket"></i> Sign in</button>
          <p id="admin-auth-err" style="color:var(--color-danger,#f87171);font-size:0.85rem;margin-top:12px;${errMsg ? '' : 'display:none;'}">${escapeHtml(errMsg || '')}</p>
        </div>
      </div>`;

    const emailEl = document.getElementById('admin-email');
    const passEl = document.getElementById('admin-password');
    const errEl = document.getElementById('admin-auth-err');
    const btn = document.getElementById('admin-signin-btn');

    const showErr = (msg) => { if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; } };

    const submit = async () => {
      const email = (emailEl?.value || '').trim();
      const password = passEl?.value || '';
      if (!email || !password) return showErr('Enter your email and password.');
      btn.disabled = true;
      btn.innerHTML = '<div class="loader-ring" style="width:18px;height:18px;border-width:2px;display:inline-block;"></div> Signing in…';
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Sign in';
        return showErr(error.message || 'Sign-in failed.');
      }
      this._renderDashboard({});
    };

    btn?.addEventListener('click', submit);
    passEl?.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  },

  _renderDashboard(opts) {
    const devLocal = !!opts.devLocal;
    this._inner.innerHTML = `
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
          ${devLocal ? '' : `<button id="admin-signout-btn" class="btn btn-brand-outline"><i class="fa-solid fa-right-from-bracket"></i> Sign out</button>`}
        </div>
      </div>

      ${devLocal ? `
        <div style="background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.4);color:#fbbf24;padding:10px 14px;border-radius:10px;margin-bottom:16px;font-size:0.85rem;">
          <i class="fa-solid fa-triangle-exclamation"></i> Supabase is not configured — showing locally-cached bookings from this browser only.
        </div>` : ''}

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

      <p id="admin-source-note" style="margin-top:16px;font-size:0.8rem;color:var(--text-muted);"></p>`;

    this._load();

    document.getElementById('admin-refresh-btn')?.addEventListener('click', () => this._load());

    document.getElementById('admin-signout-btn')?.addEventListener('click', async () => {
      if (supabase) await supabase.auth.signOut();
      this._renderLogin();
    });

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

    if (subtitle) subtitle.textContent = `${bookings.length} record${bookings.length === 1 ? '' : 's'}`;
    if (exportBtn) exportBtn.disabled = bookings.length === 0;
    if (tbody) tbody.innerHTML = rowsHtml(bookings);
    if (sourceNote) sourceNote.innerHTML = `<i class="fa-solid fa-database"></i> Data stored in Supabase. Use Refresh to reload.`;
  }
};
