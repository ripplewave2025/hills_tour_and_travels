/* ==========================================
   HILLS TOUR & TRAVELS — ABOUT US
   ==========================================
   Founder story + a gallery of real photographs taken by the owner.
   Photos are pulled from /app/photos via Vite's import.meta.glob so the
   gallery stays in sync automatically when new images are added.
   ========================================== */

import aboutHero from '../../images/darjeeling_at_nigh.jpg';

// Eagerly import every real photo in /app/photos as a URL string.
const photoModules = import.meta.glob(
  '../../photos/*.{jpeg,jpg,JPG,JPEG,png,PNG}',
  { eager: true, query: '?url', import: 'default' }
);
const galleryPhotos = Object.values(photoModules);

// Real video clips taken by the owner (app/images/*.mp4)
const videoModules = import.meta.glob(
  '../../images/*.{mp4,MP4}',
  { eager: true, query: '?url', import: 'default' }
);
const galleryVideos = Object.entries(videoModules).map(([path, url]) => {
  const file = (path.split('/').pop() || '').replace(/\.[^.]+$/, '');
  let label = file.replace(/_/g, ' ').split(/[.\u{1F300}-\u{1FAFF}#@📍📷]/u)[0].trim();
  label = label.charAt(0).toUpperCase() + label.slice(1);
  return { url, label: label || 'Hills clip' };
});

export const About = {
  render() {
    const photoTiles = galleryPhotos.map((src, i) => `
      <button type="button" class="gallery-tile" data-src="${src}" aria-label="Open photo ${i + 1}">
        <img src="${src}" alt="Real journey photo from Hills Tour & Travels — ${i + 1}" loading="lazy" />
      </button>
    `).join('');

    const videoTiles = galleryVideos.map((v) => `
      <figure class="video-tile">
        <video src="${v.url}" controls preload="metadata" playsinline></video>
        <figcaption>${v.label}</figcaption>
      </figure>
    `).join('');

    return `
      <!-- Story Hero -->
      <section class="about-hero" style="background-image: linear-gradient(rgba(6,9,19,0.55), rgba(6,9,19,0.92)), url('${aboutHero}');">
        <div class="container about-hero-inner">
          <span class="badge badge-brand"><i class="fa-solid fa-mountain-sun"></i> Our Story</span>
          <h1 class="about-title" data-i18n="about.heroTitle">A local's welcome to the hills</h1>
          <p class="about-sub">Hills Tour &amp; Travels was born from a simple feeling — the one you get when an old friend can't wait to show you around the place he grew up.</p>
        </div>
      </section>

      <!-- The Story -->
      <section class="section-padding">
        <div class="container about-story">
          <div class="about-story-text">
            <p>Our founder grew up here — in the mist, the tea gardens, and the slow toy-train mornings of <strong>Darjeeling</strong>. Like many from the hills, he left to build a life abroad, working across <strong>Kuwait, Dubai, Qatar, and Israel</strong>. He saw how the best places in the world make a visitor feel: looked after, never hustled, always at home.</p>

            <p>But the hills have a way of calling you back. He returned with one idea — that every traveler who steps off the train at NJP or lands at Bagdogra deserves to be welcomed the way you'd welcome a friend: <strong>honestly, warmly, and without the haggling and syndicate games</strong> the region is known for.</p>

            <p>So we built this. Fixed, transparent fares. Drivers who actually grew up on these roads and know where the clouds part for Kanchenjunga. Permits handled for you. Trips curated not to fill a day, but to make you fall in love with a place we already love.</p>

            <p class="about-pullquote">When you ride with us, you're not a fare. You're a guest — and we can't wait to show you our home.</p>
          </div>

          <div class="about-values">
            <div class="about-value glass-panel">
              <i class="fa-solid fa-indian-rupee-sign text-brand"></i>
              <h3>Transparent fares</h3>
              <p>The price you see is the price you pay — no syndicate mark-ups, no surprises.</p>
            </div>
            <div class="about-value glass-panel">
              <i class="fa-solid fa-id-badge text-brand"></i>
              <h3>Local drivers</h3>
              <p>Born-and-raised hill drivers who know every bend, viewpoint, and shortcut.</p>
            </div>
            <div class="about-value glass-panel">
              <i class="fa-solid fa-passport text-brand"></i>
              <h3>Permits handled</h3>
              <p>Sikkim PAP, border paperwork and entries — sorted before you arrive.</p>
            </div>
            <div class="about-value glass-panel">
              <i class="fa-solid fa-heart text-brand"></i>
              <h3>Hosted with care</h3>
              <p>Rated 4.9★ by travelers. We treat your trip like we're showing a friend around.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Real Photo Gallery -->
      <section class="section-padding bg-surface-alt">
        <div class="container">
          <div class="text-center" style="margin-bottom: 36px;">
            <span class="badge badge-brand"><i class="fa-solid fa-camera-retro"></i> Real Journeys</span>
            <h2 class="section-title" data-i18n="about.galleryTitle">Shot by us, on these roads</h2>
            <p class="section-subtitle">Every photo below was taken by the owner on real trips — no stock images.</p>
          </div>
          <div class="gallery-grid">
            ${photoTiles || '<p class="text-center" style="color: var(--text-muted);">Photos loading…</p>'}
          </div>
        </div>
      </section>

      ${galleryVideos.length ? `
      <!-- Real Video Clips -->
      <section class="section-padding">
        <div class="container">
          <div class="text-center" style="margin-bottom: 36px;">
            <span class="badge badge-brand"><i class="fa-solid fa-clapperboard"></i> Watch the Hills</span>
            <h2 class="section-title">Real clips from the road</h2>
            <p class="section-subtitle">Sunrises, ropeways and mountain drives — filmed by us on actual trips.</p>
          </div>
          <div class="video-grid">
            ${videoTiles}
          </div>
        </div>
      </section>
      ` : ''}

      <!-- CTA -->
      <section class="section-padding text-center">
        <div class="container">
          <h2 class="section-title" data-i18n="about.ctaTitle">Come see the hills with us</h2>
          <p class="section-subtitle" style="margin-bottom: 28px;">Book a ride or a curated tour in under a minute.</p>
          <div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap;">
            <a href="#/booking" class="btn btn-primary btn-lg"><i class="fa-solid fa-bolt"></i> Book Now</a>
            <a href="#/packages" class="btn btn-brand-outline btn-lg">Explore Packages <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </section>

      <!-- Lightbox -->
      <div id="gallery-lightbox" class="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
        <button type="button" class="gallery-lightbox-close" id="gallery-lightbox-close" aria-label="Close photo">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <img id="gallery-lightbox-img" src="" alt="Enlarged journey photo" />
      </div>
    `;
  },

  init() {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('gallery-lightbox-img');
    const closeBtn = document.getElementById('gallery-lightbox-close');
    if (!lightbox || !lightboxImg) return;

    const open = (src) => {
      lightboxImg.src = src;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      lightbox.classList.remove('is-open');
      lightboxImg.src = '';
      document.body.style.overflow = '';
    };

    document.querySelectorAll('.gallery-tile').forEach((tile) => {
      tile.addEventListener('click', () => open(tile.getAttribute('data-src')));
    });
    closeBtn?.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    this._escHandler = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', this._escHandler);
  },

  destroy() {
    if (this._escHandler) document.removeEventListener('keydown', this._escHandler);
    document.body.style.overflow = '';
  }
};
