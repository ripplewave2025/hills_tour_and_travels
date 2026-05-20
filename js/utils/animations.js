/* ==========================================
   HILLS TOUR & TRAVELS — ANIMATION UTILITIES
   ========================================== */

/**
 * Initializes IntersectionObserver for scroll reveal animations
 * Elements with the class `.animate-scroll-reveal` will receive the class `.revealed`
 * when they enter the viewport.
 */
export function initScrollReveal() {
  const elements = document.querySelectorAll('.animate-scroll-reveal');
  
  if (elements.length === 0) return;

  const observerOptions = {
    root: null, // Viewport
    rootMargin: '0px 0px -8% 0px', // Trigger slightly before element enters view
    threshold: 0.1 // 10% visible
  };

  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add class to trigger CSS transition
        entry.target.classList.add('revealed');
        // Stop observing once animated
        self.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));
}

/**
 * Triggers a premium parallax movement on background elements on mouse move
 * @param {string} containerSelector - Main layout container
 * @param {string} targetSelector - Parallax element (e.g. background mountain image)
 * @param {number} factor - Strength of movement (default: 30)
 */
export function initParallaxMouseMove(containerSelector = '.hero-section', targetSelector = '.hero-background', factor = 30) {
  const container = document.querySelector(containerSelector);
  const target = document.querySelector(targetSelector);

  if (!container || !target) return;

  const handleMouseMove = (e) => {
    const { width, height } = container.getBoundingClientRect();
    const xVal = (e.clientX / width - 0.5) * factor;
    const yVal = (e.clientY / height - 0.5) * factor;

    target.style.transform = `translate3d(${xVal}px, ${yVal}px, 0) scale(1.05)`;
  };

  container.addEventListener('mousemove', handleMouseMove);

  // Return destroy function for router integration
  return () => {
    container.removeEventListener('mousemove', handleMouseMove);
  };
}

/**
 * Runs a premium count-up visual numbers animation for key stat items
 * @param {HTMLElement} element - Target HTML element with number
 * @param {number} duration - Animation duration in ms (default: 1500)
 */
export function animateCountUp(element, duration = 1500) {
  if (!element) return;
  
  const target = parseFloat(element.getAttribute('data-target'));
  const decimals = parseInt(element.getAttribute('data-decimals') || '0');
  const hasPercent = element.getAttribute('data-target') === '100';
  
  if (isNaN(target)) return;

  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    
    // Easing curve: easeOutQuad
    const easedProgress = progress * (2 - progress);
    const currentValue = easedProgress * target;
    
    element.innerText = currentValue.toFixed(decimals) + (hasPercent ? '%' : '+');
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.innerText = target.toFixed(decimals) + (hasPercent ? '%' : '+');
    }
  };
  
  window.requestAnimationFrame(step);
}
