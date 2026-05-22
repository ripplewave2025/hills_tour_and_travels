/* ==========================================
   HILLS TOUR & TRAVELS — ADMIN: MANAGE PACKAGES
   ==========================================
   A simple, self-contained editor so the owner can add / edit / delete
   tour packages without touching code. Changes are saved to the browser
   (localStorage) as a working copy, and can be exported as a ready-to-commit
   packages.js file.

   SECURITY NOTE: the passcode below is a client-side gate only — it keeps
   casual visitors out, but it is NOT real security (anyone can read the JS).
   For true protection, the next step is to move packages into Supabase with
   server-side auth (see AEO/README notes). Change ADMIN_PASSCODE before use.
   ========================================== */

import { packages as DEFAULT_PACKAGES, CATEGORY_ORDER, CATEGORY_LABELS } from '../data/packages.js';

const ADMIN_PASSCODE = 'hills2026';       // TODO: change this
const STORAGE_KEY = 'hh.packages.override';
const SESSION_KEY = 'hh.admin.ok';

function loadWorking() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) { /* fall through */ }
  // Deep clone the defaults so edits don't mutate the imported array
  return JSON.parse(JSON.stringify(DEFAULT_PACKAGES));
}

function saveWorking(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export const AdminPackages = {
  render() {
    const authed = sessionStorage.getItem(SESSION_KEY) === '1';
    if (!authed) {
      return `
        <section class="section-padding" style="min-height:70vh;display:flex;align-items:center;">
          <div class="container" style="max-width:420px;">
            <div class="glass-panel" style="padding:32px;text-align:center;">
              <i class="fa-solid fa-lock text-brand" style="font-size:2rem;margin-bottom:14px;"></i>
              <h1 style="font-size:1.5rem;margin-bottom:8px;">Admin · Manage Packages</h1>
              <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:20px;">Enter the admin passcode to continue.</p>
              <input type="password" id="admin-pass" class="input-glass" placeholder="Passcode" style="width:100%;margin-bottom:12px;" />
              <button id="admin-login-btn" class="btn btn-primary w-100">Unlock</button>
              <p id="admin-pass-err" style="color:var(--color-danger,#f87171);font-size:0.85rem;margin-top:10px;display:none;">Incorrect passcode.</p>
            </div>
          </div>
        </section>
      `;
    }

    const list = loadWorking();
    const rows = list.map((p, i) => this.cardHtml(p, i)).join('');

    return `
      <section class="section-padding" style="padding-top:96px;">
        <div class="container" style="max-width:900px;">
          <div class="flex-between" style="flex-wrap:wrap;gap:12px;margin-bottom:20px;">
            <div>
              <span class="badge badge-brand"><i class="fa-solid fa-screwdriver-wrench"></i> Admin</span>
              <h1 style="font-size:1.8rem;margin-top:6px;">Manage Packages</h1>
              <p style="color:var(--text-secondary);font-size:0.9rem;">${list.length} packages · changes save to this browser.</p>
            </div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              <button id="admin-add-btn" class="btn btn-secondary"><i class="fa-solid fa-plus"></i> Add Package</button>
              <button id="admin-export-btn" class="btn btn-primary"><i class="fa-solid fa-file-export"></i> Export packages.js</button>
              <button id="admin-reset-btn" class="btn btn-brand-outline"><i class="fa-solid fa-rotate-left"></i> Reset</button>
            </div>
          </div>

          <div id="admin-status" style="display:none;background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.4);color:#86efac;padding:10px 14px;border-radius:10px;margin-bottom:16px;font-size:0.88rem;"></div>

          <div id="admin-pkg-list" style="display:flex;flex-direction:column;gap:14px;">
            ${rows}
          </div>
        </div>
      </section>
    `;
  },

  cardHtml(p, i) {
    const catOptions = CATEGORY_ORDER.map((c) =>
      `<option value="${c}" ${p.category === c ? 'selected' : ''}>${CATEGORY_LABELS[c]}</option>`
    ).join('');
    return `
      <div class="glass-panel admin-card" data-index="${i}" style="padding:18px;">
        <div class="flex-between" style="margin-bottom:12px;">
          <strong style="color:var(--text-muted);font-size:0.8rem;">#${i + 1} · ${p.id || 'new'}</strong>
          <button class="admin-del-btn btn btn-sm" data-index="${i}" style="color:#f87171;background:transparent;border:1px solid rgba(248,113,113,0.4);"><i class="fa-solid fa-trash"></i> Delete</button>
        </div>
        <div class="grid grid-2" style="gap:12px;">
          <label class="admin-field"><span>Name</span><input class="input-glass admin-in" data-field="name" value="${escapeAttr(p.name)}" /></label>
          <label class="admin-field"><span>Destination ID</span><input class="input-glass admin-in" data-field="destinationId" value="${escapeAttr(p.destinationId)}" /></label>
          <label class="admin-field"><span>Category</span><select class="input-glass admin-in" data-field="category">${catOptions}</select></label>
          <label class="admin-field"><span>Duration</span><input class="input-glass admin-in" data-field="duration" value="${escapeAttr(p.duration)}" /></label>
          <label class="admin-field"><span>Price — Sedan (₹)</span><input class="input-glass admin-in" data-field="priceSedan" type="number" value="${p.priceSedan ?? ''}" /></label>
          <label class="admin-field"><span>Price — SUV (₹)</span><input class="input-glass admin-in" data-field="priceSuv" type="number" value="${p.priceSuv ?? ''}" /></label>
        </div>
        <label class="admin-field" style="margin-top:12px;display:block;"><span>Description</span><textarea class="input-glass admin-in" data-field="description" rows="2" style="width:100%;">${escapeHtml(p.description || '')}</textarea></label>
        <label class="admin-field" style="margin-top:12px;display:block;"><span>Attractions (one per line)</span><textarea class="input-glass admin-in" data-field="attractions" rows="3" style="width:100%;">${escapeHtml((p.attractions || []).join('\n'))}</textarea></label>
      </div>
    `;
  },

  init() {
    const authed = sessionStorage.getItem(SESSION_KEY) === '1';
    if (!authed) {
      const btn = document.getElementById('admin-login-btn');
      const input = document.getElementById('admin-pass');
      const err = document.getElementById('admin-pass-err');
      const tryLogin = () => {
        if (input.value === ADMIN_PASSCODE) {
          sessionStorage.setItem(SESSION_KEY, '1');
          this.refresh();
        } else if (err) { err.style.display = 'block'; }
      };
      btn?.addEventListener('click', tryLogin);
      input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryLogin(); });
      return;
    }
    this.bindEditor();
  },

  // Re-render the page panel in place (used after login / reset / add)
  refresh() {
    const mount = document.getElementById('content-mount');
    if (!mount) return;
    mount.innerHTML = this.render();
    this.bindEditor();
    window.scrollTo({ top: 0 });
  },

  bindEditor() {
    const list = loadWorking();

    // Live edit -> save
    document.querySelectorAll('.admin-card').forEach((card) => {
      const idx = parseInt(card.getAttribute('data-index'));
      card.querySelectorAll('.admin-in').forEach((input) => {
        input.addEventListener('change', () => {
          const field = input.getAttribute('data-field');
          let val = input.value;
          if (field === 'priceSedan' || field === 'priceSuv') {
            val = val === '' ? null : Number(val);
          } else if (field === 'attractions') {
            val = val.split('\n').map((s) => s.trim()).filter(Boolean);
          }
          list[idx][field] = val;
          saveWorking(list);
          this.flash('Saved.');
        });
      });
    });

    document.querySelectorAll('.admin-del-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'));
        if (!confirm(`Delete "${list[idx]?.name}"?`)) return;
        list.splice(idx, 1);
        saveWorking(list);
        this.refresh();
      });
    });

    document.getElementById('admin-add-btn')?.addEventListener('click', () => {
      list.push({
        id: 'new-package-' + Date.now(),
        destinationId: 'darjeeling',
        name: 'New Package',
        category: 'full-day',
        duration: 'Full Day · 8 hrs',
        priceSedan: 2000,
        priceSuv: 3000,
        attractions: [],
        description: '',
        suvOnly: false,
        restrictions: []
      });
      saveWorking(list);
      this.refresh();
    });

    document.getElementById('admin-reset-btn')?.addEventListener('click', () => {
      if (!confirm('Discard all local changes and reload the original packages?')) return;
      localStorage.removeItem(STORAGE_KEY);
      this.refresh();
    });

    document.getElementById('admin-export-btn')?.addEventListener('click', () => {
      this.exportFile(list);
    });
  },

  exportFile(list) {
    const header = `/* ==========================================
   HILLS TOUR & TRAVELS — SIGHTSEEING PACKAGES (exported from Admin)
   ========================================== */

export const CATEGORY_LABELS = ${JSON.stringify(CATEGORY_LABELS, null, 2)};

export const CATEGORY_ORDER = ${JSON.stringify(CATEGORY_ORDER)};

export const packages = ${JSON.stringify(list, null, 2)};
`;
    const blob = new Blob([header], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'packages.js';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    this.flash('Exported packages.js — replace app/js/data/packages.js and commit to publish.');
  },

  flash(msg) {
    const s = document.getElementById('admin-status');
    if (!s) return;
    s.textContent = msg;
    s.style.display = 'block';
    clearTimeout(this._flashTimer);
    this._flashTimer = setTimeout(() => { s.style.display = 'none'; }, 4000);
  }
};

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escapeAttr(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
