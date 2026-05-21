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

-- Row-Level Security: anyone (anon key) can INSERT their own booking.
-- Only service-role (your backend / Supabase dashboard) can SELECT all rows.
alter table public.bookings enable row level security;

-- Allow anonymous visitors to insert bookings
create policy "anon can insert bookings"
  on public.bookings
  for insert
  to anon
  with check (true);

-- Allow the admin page (also using anon key for now) to read all bookings.
-- Swap this for a tighter policy once you add auth.
create policy "anon can read bookings"
  on public.bookings
  for select
  to anon
  using (true);
