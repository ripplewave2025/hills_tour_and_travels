-- Hills Tour & Travels — Initial Schema
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query)

create table if not exists public.bookings (
  id           bigserial primary key,
  booking_id   text        not null unique,
  name         text        not null default '',
  phone        text        not null default '',
  email        text                 default '',
  pickup       text                 default '',
  drop         text                 default '',
  travel_date  date,
  travel_time  text,
  vehicle      text                 default '',
  passengers   smallint             default 1,
  days         smallint             default 1,
  price        integer              default 0,
  is_estimated boolean              default false,
  created_at   timestamptz not null default now()
);


-- Index for admin dashboard queries (most recent first)
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);

-- =====================================================================
-- Row-Level Security
-- =====================================================================
-- Model:
--   * anon  (public site visitors)  -> may INSERT a booking, nothing else.
--   * authenticated (the operator, signed in via Supabase Auth on
--     #/admin/bookings) -> may SELECT and DELETE all bookings.
--
-- The bookings table holds customer PII (name / phone / email / itinerary),
-- so anon MUST NOT be able to SELECT. The anon key ships in the public JS
-- bundle, so a `to anon using (true)` SELECT policy would expose every
-- customer's contact details to anyone on the internet.
--
-- DEPLOY NOTE: re-run this whole file (the drops below make it idempotent),
-- then create the operator login under Authentication → Users in the
-- Supabase dashboard. Until a user exists and signs in on the admin page,
-- the dashboard will simply show no rows — public booking inserts keep working.
-- =====================================================================
alter table public.bookings enable row level security;

-- Clean up any earlier permissive policies so this script can be re-run safely.
drop policy if exists "anon can insert bookings" on public.bookings;
drop policy if exists "anon can read bookings"   on public.bookings;
drop policy if exists "authed can read bookings"   on public.bookings;
drop policy if exists "authed can delete bookings" on public.bookings;

-- Public visitors may submit a booking (INSERT only — no read-back).
create policy "anon can insert bookings"
  on public.bookings
  for insert
  to anon
  with check (true);

-- The signed-in operator may read every booking.
create policy "authed can read bookings"
  on public.bookings
  for select
  to authenticated
  using (true);

-- The signed-in operator may delete bookings.
create policy "authed can delete bookings"
  on public.bookings
  for delete
  to authenticated
  using (true);
