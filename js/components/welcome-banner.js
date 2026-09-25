// First-visit "Welcome / Offer" banner popup.
// Shows once per visitor (tracked via localStorage) with the image below, then never again
// until the person clears their browser storage.
//
// ============================================================================
//  TO CHANGE THE BANNER IN FUTURE: just replace the image file at
//  images/banners/welcome-banner.webp with your new banner (same file name).
//  No code changes needed. If you want visitors who already saw the old
//  banner to see the new one too, bump BANNER_VERSION below by 1.
// ============================================================================
(function () {
  var BANNER_IMAGE_SRC = 'assets/images/banners/welcome-banner.webp';
  var BANNER_ALT_TEXT = 'Balakrishnaa Stores - Deepavali Sales Have Started! Exciting Offers & Special Festive Discounts';
  var BANNER_VERSION = 1; // bump this number to re-show the popup to everyone after a banner change
  var SHOW_DELAY_MS = 500; // small delay after page load feels less jarring than instant popup

  var STORAGE_KEY = 'bsWelcomeBannerSeen_v' + BANNER_VERSION;

  // Confetti burst shown from both edges of the screen when the close button is clicked.
  var CONFETTI_COLORS = ['#FFD700', '#EC4899', '#8B1538', '#0F5132', '#FFFFFF', '#F97316'];
  var CONFETTI_PARTICLES_PER_SIDE = 16;

  function fireConfettiBurst() {
    var vh = window.innerHeight;
    var vw = window.innerWidth;
    var sides = [
      { originX: -10, dir: 1 },        // left edge, bursts rightward into the screen
      { originX: vw + 10, dir: -1 }    // right edge, bursts leftward into the screen
    ];

    sides.forEach(function (side) {
      for (var i = 0; i < CONFETTI_PARTICLES_PER_SIDE; i++) {
        spawnConfettiParticle(side.originX, vh / 2, side.dir);
      }
    });
  }

  function spawnConfettiParticle(originX, originY, dirSign) {
    var isCircle = Math.random() < 0.5;
    var size = 6 + Math.random() * 8;
    var color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];

    var el = document.createElement('span');
    el.style.position = 'fixed';
    el.style.left = originX + 'px';
    el.style.top = originY + (Math.random() * 80 - 40) + 'px';
    el.style.width = size + 'px';
    el.style.height = (isCircle ? size : size * 0.4) + 'px';
    el.style.backgroundColor = color;
    el.style.borderRadius = isCircle ? '50%' : '2px';
    el.style.zIndex = '80';
    el.style.pointerEvents = 'none';
    el.style.willChange = 'transform, opacity';
    document.body.appendChild(el);

    var horizontalReach = (180 + Math.random() * 260) * dirSign;
    var verticalSpread = Math.random() * 420 - 210;
    var arcLift = 50 + Math.random() * 110;
    var gravityFall = 160 + Math.random() * 220;
    var rotation = (360 + Math.random() * 720) * (Math.random() < 0.5 ? -1 : 1);
    var duration = 900 + Math.random() * 700;

    var animation = el.animate([
      { transform: 'translate(0px, 0px) rotate(0deg) scale(1)', opacity: 1 },
      {
        transform: 'translate(' + (horizontalReach * 0.55) + 'px, ' + (verticalSpread * 0.55 - arcLift) + 'px) rotate(' + (rotation * 0.6) + 'deg) scale(1)',
        opacity: 1,
        offset: 0.55
      },
      {
        transform: 'translate(' + horizontalReach + 'px, ' + (verticalSpread + gravityFall) + 'px) rotate(' + rotation + 'deg) scale(0.6)',
        opacity: 0
      }
    ], {
      duration: duration,
      easing: 'cubic-bezier(0.16, 0.84, 0.44, 1)',
      fill: 'forwards'
    });

    animation.onfinish = function () {
      el.remove();
    };
  }

  var MODAL_HTML =
    '<div class="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-500 p-4 sm:p-6 hidden" id="welcome-banner-modal">' +
      '<div class="relative w-full max-w-2xl transform scale-90 opacity-0 transition-all duration-500 ease-out" id="welcome-banner-box">' +
        '<button aria-label="Close" class="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 rounded-full bg-white text-gray-800 shadow-xl ring-1 ring-black/5 flex items-center justify-center hover:bg-gray-100 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer z-10" id="welcome-banner-close" type="button">' +
          '<span class="material-symbols-outlined text-[22px]">close</span>' +
        '</button>' +
        '<div class="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 max-h-[90vh] overflow-y-auto">' +
          '<img alt="' + BANNER_ALT_TEXT + '" class="w-full h-auto block" id="welcome-banner-img" src="' + BANNER_IMAGE_SRC + '"/>' +
        '</div>' +
      '</div>' +
    '</div>';

  function alreadySeen() {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      return false; // if storage is blocked, just show it every time rather than crash
    }
  }

  function markSeen() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch (e) { /* ignore */ }
  }

  function openBanner() {
    var modal = document.getElementById('welcome-banner-modal');
    var box = document.getElementById('welcome-banner-box');
    if (!modal || !box) return;

    document.body.classList.add('overflow-hidden');
    modal.classList.remove('hidden');
    requestAnimationFrame(function () {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100', 'pointer-events-auto');
      box.classList.remove('scale-90', 'opacity-0');
      box.classList.add('scale-100', 'opacity-100');
    });
  }

  function closeBanner() {
    var modal = document.getElementById('welcome-banner-modal');
    var box = document.getElementById('welcome-banner-box');
    if (!modal || !box) return;

    markSeen();
    document.body.classList.remove('overflow-hidden');
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
    box.classList.remove('scale-100', 'opacity-100');
    box.classList.add('scale-90', 'opacity-0');
    setTimeout(function () {
      modal.classList.add('hidden');
    }, 500);
  }

  function mountAndMaybeShow() {
    if (alreadySeen()) return;
    if (document.getElementById('welcome-banner-modal')) return; // already mounted

    document.body.insertAdjacentHTML('beforeend', MODAL_HTML);

    var modal = document.getElementById('welcome-banner-modal');
    var closeBtn = document.getElementById('welcome-banner-close');

    closeBtn.addEventListener('click', function () {
      fireConfettiBurst();
      closeBanner();
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeBanner();
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeBanner();
    });

    setTimeout(openBanner, SHOW_DELAY_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAndMaybeShow);
  } else {
    mountAndMaybeShow();
  }
})();