import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Guard: if env vars are missing (e.g. Vercel build without secrets set),
// export null and let CustomerStore fall back to localStorage gracefully.
if (!url || !key) {
  console.warn('[supabase] Env vars not set — Supabase disabled, using localStorage fallback.');
}

export const supabase = (url && key) ? createClient(url, key) : null;
