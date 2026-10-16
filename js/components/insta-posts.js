/*
  Instagram posts strip: duplicates the posts once, then slides the track left
  with requestAnimationFrame so the loop is seamless. Pauses on hover/touch.
  Clicking a post opens it full size in a popup with close, previous and next
  buttons (arrow keys and swipe also work).
*/
(function () {
  function init() {
    var viewport = document.getElementById('insta-viewport');
    if (!viewport || viewport.classList.contains('is-animated')) return;
    var track = viewport.querySelector('.insta-track');
    var cards = Array.prototype.slice.call(track.children);
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      var clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.removeAttribute('role');
      clone.removeAttribute('tabindex');
      var img = clone.querySelector('img');
      if (img) { img.setAttribute('alt', ''); img.setAttribute('loading', 'eager'); }
      track.appendChild(clone);
    });
    viewport.classList.add('is-animated');

    var SPEED = 60;            /* pixels per second, change to go faster/slower */
    var offset = 0, last = null, loopWidth = 0;
    var hovering = false, touching = false, popupOpen = false;

    function measure() {
      loopWidth = track.children[cards.length].offsetLeft - track.children[0].offsetLeft;
    }
    function frame(t) {
      if (last === null) last = t;
      var dt = Math.min((t - last) / 1000, 0.1);
      last = t;
      if (!hovering && !touching && !popupOpen && loopWidth > 0) {
        offset = (offset + SPEED * dt) % loopWidth;
        track.style.transform = 'translate3d(' + (-offset) + 'px,0,0)';
      }
      requestAnimationFrame(frame);
    }

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);

    viewport.addEventListener('mouseenter', function () { hovering = true; });
    viewport.addEventListener('mouseleave', function () { hovering = false; });
    viewport.addEventListener('touchstart', function () { touching = true; }, { passive: true });
    viewport.addEventListener('touchend', function () {
      setTimeout(function () { touching = false; }, 1500);
    }, { passive: true });

    /* ---------- Popup ---------- */
    var box = document.createElement('div');
    box.className = 'insta-lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Instagram post');
    box.innerHTML =
      '<button type="button" class="insta-lightbox-close" aria-label="Close">&times;</button>' +
      '<button type="button" class="insta-lightbox-nav insta-lightbox-prev" aria-label="Previous post">&#8249;</button>' +
      '<img alt="" />' +
      '<button type="button" class="insta-lightbox-nav insta-lightbox-next" aria-label="Next post">&#8250;</button>' +
      '<div class="insta-lightbox-count" aria-live="polite"></div>';
    document.body.appendChild(box);
    var bigImg = box.querySelector('img');
    var closeBtn = box.querySelector('.insta-lightbox-close');
    var prevBtn = box.querySelector('.insta-lightbox-prev');
    var nextBtn = box.querySelector('.insta-lightbox-next');
    var counter = box.querySelector('.insta-lightbox-count');
    var opener = null;
    var current = 0;
    var total = cards.length;

    function show(i) {
      current = (i + total) % total;
      var img = cards[current].querySelector('img');
      bigImg.src = img.currentSrc || img.src;
      bigImg.alt = img.getAttribute('alt') || 'Instagram post ' + (current + 1);
      counter.textContent = (current + 1) + ' / ' + total;
    }

    function openPopup(card) {
      var idx = Array.prototype.indexOf.call(track.children, card) % total;
      if (idx < 0) return;
      show(idx);
      popupOpen = true;
      opener = card.hasAttribute('tabindex') ? card : null;
      document.body.style.overflow = 'hidden';
      box.classList.add('is-open');
      closeBtn.focus();
    }
    function closePopup() {
      if (!popupOpen) return;
      popupOpen = false;
      box.classList.remove('is-open');
      document.body.style.overflow = '';
      if (opener) opener.focus({ preventScroll: true });
    }

    viewport.addEventListener('click', function (e) {
      var card = e.target.closest('.insta-card');
      if (card) openPopup(card);
    });
    viewport.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('insta-card')) {
        e.preventDefault();
        openPopup(e.target);
      }
    });
    closeBtn.addEventListener('click', closePopup);
    box.addEventListener('click', function (e) { if (e.target === box) closePopup(); });
    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
    document.addEventListener('keydown', function (e) {
      if (!popupOpen) return;
      if (e.key === 'Escape') closePopup();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });

    /* Swipe left/right on touch screens */
    var startX = null;
    box.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    }, { passive: true });

    requestAnimationFrame(frame);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();