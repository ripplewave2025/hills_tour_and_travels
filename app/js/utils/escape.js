/* ==========================================
   HILLS TOUR & TRAVELS — HTML ESCAPING HELPERS
   ==========================================
   Most pages build markup as template strings and assign it via innerHTML.
   Any value that originates from a visitor (booking form fields, ?from/?to
   query params) or from Supabase MUST be escaped before it lands in that
   markup, otherwise a value like `<img src=x onerror=...>` executes as HTML.

   - escapeHtml: safe for text node context  (>between tags<)
   - escapeAttr: safe for double-quoted attribute context  (href="...")
   ========================================== */

export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function escapeAttr(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
