// Hero image carousel — used only on index.html (#hero-carousel section).
(function () {
  let currentSlide = 0;
  let slideInterval = null;
  let isAnimating = false;
  const slideDelay = 3000;

  function showSlide(index, direction) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    const carousel = document.getElementById('hero-carousel');
    if (!slides.length || isAnimating) return;
    const nextIndex = ((index % slides.length) + slides.length) % slides.length;
    if (nextIndex === currentSlide) return;

    isAnimating = true;
    const outgoing = slides[currentSlide];
    const incoming = slides[nextIndex];
    const movingBack = direction === 'prev';
    carousel.classList.toggle('is-moving-prev', movingBack);
    outgoing.classList.remove('is-current');
    outgoing.classList.add(movingBack ? 'is-leaving-prev' : 'is-leaving-next');
    outgoing.setAttribute('aria-hidden', 'true');
    incoming.classList.add('is-entering');
    incoming.style.zIndex = '20';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      incoming.classList.remove('is-entering');
      incoming.classList.add('is-current');
      incoming.setAttribute('aria-hidden', 'false');
    }));

    currentSlide = nextIndex;
    indicators.forEach((indicator, i) => {
      indicator.className = i === currentSlide
        ? 'slide-indicator h-2 rounded-full transition-all w-8 bg-surface-container-lowest cursor-pointer'
        : 'slide-indicator h-2 rounded-full transition-all w-3 bg-surface-container-lowest/40 hover:bg-surface-container-lowest/80 cursor-pointer';
    });
    window.setTimeout(() => {
      outgoing.classList.remove('is-leaving-next', 'is-leaving-prev');
      incoming.style.zIndex = '';
      carousel.classList.remove('is-moving-prev');
      isAnimating = false;
    }, 1100);
  }

  function nextSlide() { showSlide(currentSlide + 1, 'next'); resetSlideTimer(); }
  function prevSlide() { showSlide(currentSlide - 1, 'prev'); resetSlideTimer(); }
  function setSlide(index) { showSlide(index, index < currentSlide ? 'prev' : 'next'); resetSlideTimer(); }
  function startSlideTimer() { clearInterval(slideInterval); slideInterval = setInterval(() => showSlide(currentSlide + 1, 'next'), slideDelay); }
  function resetSlideTimer() { startSlideTimer(); }

  function initCarousel() {
    const carousel = document.getElementById('hero-carousel');
    if (!carousel || !document.querySelector('.hero-slide')) return;
    document.querySelectorAll('.hero-slide').forEach((slide, index) => {
      slide.classList.toggle('is-current', index === 0);
      slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
    });
    startSlideTimer();
    carousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') nextSlide();
      if (event.key === 'ArrowLeft') prevSlide();
    });
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', (event) => {
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 45) distance < 0 ? nextSlide() : prevSlide();
    }, { passive: true });
    document.addEventListener('visibilitychange', () => document.hidden ? clearInterval(slideInterval) : startSlideTimer());
  }

  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.setSlide = setSlide;
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', initCarousel) : initCarousel();
})();