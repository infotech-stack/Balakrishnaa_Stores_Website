// Hero image carousel — used only on index.html (#hero-carousel section).
// Safe to include on other pages too: it no-ops if no .hero-slide elements exist.
(function () {
  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    if (!slides.length) return;
    const totalSlides = slides.length;
    currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;

    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
        slide.classList.add('opacity-100', 'active', 'z-10');
      } else {
        slide.classList.remove('opacity-100', 'active', 'z-10');
        slide.classList.add('opacity-0', 'pointer-events-none', 'z-0');
      }
    });

    indicators.forEach((indicator, i) => {
      if (i === currentSlide) {
        indicator.className = 'slide-indicator h-2 rounded-full transition-all w-8 bg-surface-container-lowest cursor-pointer';
      } else {
        indicator.className = 'slide-indicator h-2 rounded-full transition-all w-3 bg-surface-container-lowest/40 hover:bg-surface-container-lowest/80 cursor-pointer';
      }
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function setSlide(i) {
    showSlide(i);
    resetSlideTimer();
  }

  function startSlideTimer() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
  }

  function resetSlideTimer() {
    clearInterval(slideInterval);
    startSlideTimer();
  }

  function initCarousel() {
    if (!document.querySelector('.hero-slide')) return; // no carousel on this page
    showSlide(0);
    startSlideTimer();
  }

  // Expose the controls the inline onclick="" handlers in the markup need.
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.setSlide = setSlide;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }
  window.addEventListener('load', () => {
    if (!slideInterval) initCarousel();
  });
})();
