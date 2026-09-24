// Global site search: click the header search icon (or press "/") to open a
// live search overlay across every page, category and product name on the
// site (data comes from js/data/search-index.js).
//
// Clicking a result jumps to that page/section; if the item lives further
// down the page, it's smooth-scrolled into view and briefly highlighted
// once it lands (works both for same-page results and after navigating
// from another page).
//
// TO KEEP SEARCH ACCURATE: whenever you add/rename a product, category or
// page, regenerate js/data/search-index.js (see the note in that file).
(function () {
  var MAX_RESULTS = 8;
  var PENDING_KEY = 'bsSearchPendingTarget';

  var MODAL_HTML =
    '<div class="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300 p-4 sm:pt-24 hidden" id="site-search-modal">' +
      '<div class="w-full max-w-xl transform scale-95 opacity-0 transition-all duration-300 ease-out" id="site-search-box">' +
        '<div class="bg-surface-container-lowest rounded-2xl shadow-2xl ring-1 ring-black/10 overflow-hidden flex flex-col max-h-[75vh]">' +
          '<div class="flex items-center gap-space-sm px-space-md py-space-sm border-b border-outline-variant shrink-0">' +
            '<span class="material-symbols-outlined text-on-surface-variant text-[22px]">search</span>' +
            '<input aria-label="Search the website" autocomplete="off" class="flex-1 bg-transparent outline-none font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant py-space-sm" id="site-search-input" placeholder="Search sarees, kurtis, shirts, kids wear, stores…" type="text"/>' +
            '<button aria-label="Close search" class="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer shrink-0" id="site-search-close" type="button">' +
              '<span class="material-symbols-outlined text-[20px]">close</span>' +
            '</button>' +
          '</div>' +
          '<div class="overflow-y-auto" id="site-search-results"></div>' +
        '</div>' +
        '<p class="text-center font-label-caps text-label-caps text-white/70 mt-space-sm">Press <kbd class="px-1.5 py-0.5 rounded bg-white/15 text-white">Esc</kbd> to close</p>' +
      '</div>' +
    '</div>';

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function highlightMatch(text, query) {
    var idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return escapeHtml(text);
    return (
      escapeHtml(text.slice(0, idx)) +
      '<mark class="bg-primary/20 text-primary rounded-sm px-0.5">' + escapeHtml(text.slice(idx, idx + query.length)) + '</mark>' +
      escapeHtml(text.slice(idx + query.length))
    );
  }

  function scoreEntry(entry, query) {
    var q = query.toLowerCase();
    var title = entry.title.toLowerCase();
    var desc = (entry.desc || '').toLowerCase();
    if (title === q) return 100;
    if (title.indexOf(q) === 0) return 90;
    if (title.indexOf(q) !== -1) return 70;
    if (desc.indexOf(q) !== -1) return 40;
    if ((entry.sectionLabel || '').toLowerCase().indexOf(q) !== -1) return 20;
    return 0;
  }

  function runSearch(query) {
    var index = window.BS_SEARCH_INDEX || [];
    if (!query.trim()) return [];
    var scored = index
      .map(function (entry) { return { entry: entry, score: scoreEntry(entry, query) }; })
      .filter(function (s) { return s.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, MAX_RESULTS);
    return scored.map(function (s) { return s.entry; });
  }

  function renderResults(query) {
    var container = document.getElementById('site-search-results');
    if (!container) return;

    if (!query.trim()) {
      container.innerHTML =
        '<div class="px-space-md py-space-lg text-center text-on-surface-variant font-body-sm text-body-sm">' +
        'Start typing to search sarees, kurtis, shirts, kids wear, showrooms &amp; more…</div>';
      return;
    }

    var results = runSearch(query);

    if (results.length === 0) {
      container.innerHTML =
        '<div class="px-space-md py-space-lg text-center text-on-surface-variant font-body-sm text-body-sm">' +
        'No matches for “' + escapeHtml(query) + '”. Try a different word.</div>';
      return;
    }

    container.innerHTML = results.map(function (entry, i) {
      var thumb = entry.image
        ? '<img alt="" class="w-12 h-12 rounded-lg object-cover shrink-0 bg-surface-container" src="' + entry.image + '"/>'
        : '<div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-on-surface-variant"><span class="material-symbols-outlined text-[20px]">image</span></div>';

      return (
        '<button class="site-search-result w-full flex items-center gap-space-sm px-space-md py-space-sm text-left hover:bg-surface-container transition-colors cursor-pointer border-b border-outline-variant last:border-b-0" data-index="' + i + '" type="button">' +
          thumb +
          '<span class="flex flex-col min-w-0">' +
            '<span class="font-label-md text-label-md text-on-surface font-semibold truncate">' + highlightMatch(entry.title, query) + '</span>' +
            '<span class="font-body-sm text-body-sm text-on-surface-variant truncate">' + escapeHtml(entry.sectionLabel) + (entry.desc ? ' · ' + escapeHtml(entry.desc) : '') + '</span>' +
          '</span>' +
          '<span class="material-symbols-outlined text-[18px] text-on-surface-variant ml-auto shrink-0">north_east</span>' +
        '</button>'
      );
    }).join('');

    container.querySelectorAll('.site-search-result').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var entry = results[parseInt(btn.getAttribute('data-index'), 10)];
        goToResult(entry);
      });
    });
  }

  function goToResult(entry) {
    closeSearch();
    var currentPage = (window.location.pathname.split('/').pop() || 'index.html');
    if (currentPage === entry.page) {
      jumpToEntry(entry);
    } else {
      try {
        sessionStorage.setItem(PENDING_KEY, JSON.stringify(entry));
      } catch (e) { /* ignore */ }
      window.location.href = entry.page + (entry.section ? '#' + entry.section : '');
    }
  }

  function jumpToEntry(entry) {
    var target = null;
    if (entry.section) {
      target = document.getElementById(entry.section);
    }
    // Try to find the exact heading so we can highlight the precise card, not just the section
    var headings = document.querySelectorAll('h3');
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].textContent.replace(/\s+/g, ' ').trim() === entry.title) {
        target = headings[i].closest('[class*="rounded-"]') || headings[i].parentElement;
        break;
      }
    }
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.classList.add('bs-search-highlight');
    setTimeout(function () {
      target.classList.remove('bs-search-highlight');
    }, 1800);
  }

  function checkPendingTarget() {
    var raw;
    try {
      raw = sessionStorage.getItem(PENDING_KEY);
    } catch (e) { return; }
    if (!raw) return;
    try {
      sessionStorage.removeItem(PENDING_KEY);
    } catch (e) { /* ignore */ }
    var entry = JSON.parse(raw);
    var currentPage = (window.location.pathname.split('/').pop() || 'index.html');
    if (currentPage !== entry.page) return;
    setTimeout(function () { jumpToEntry(entry); }, 400);
  }

  function ensureHighlightStyle() {
    if (document.getElementById('bs-search-highlight-style')) return;
    var style = document.createElement('style');
    style.id = 'bs-search-highlight-style';
    style.textContent =
      '.bs-search-highlight{outline:3px solid #F5329F;outline-offset:4px;border-radius:12px;' +
      'animation:bsSearchPulse 1.8s ease-out;}' +
      '@keyframes bsSearchPulse{0%{outline-color:rgba(245,50,159,0.9);box-shadow:0 0 0 0 rgba(245,50,159,0.35);}' +
      '60%{outline-color:rgba(245,50,159,0.6);box-shadow:0 0 0 14px rgba(245,50,159,0);}' +
      '100%{outline-color:rgba(245,50,159,0);box-shadow:0 0 0 0 rgba(245,50,159,0);}}';
    document.head.appendChild(style);
  }

  function openSearch() {
    var modal = document.getElementById('site-search-modal');
    var box = document.getElementById('site-search-box');
    var input = document.getElementById('site-search-input');
    if (!modal || !box) return;

    document.body.classList.add('overflow-hidden');
    modal.classList.remove('hidden');
    requestAnimationFrame(function () {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100', 'pointer-events-auto');
      box.classList.remove('scale-95', 'opacity-0');
      box.classList.add('scale-100', 'opacity-100');
    });
    renderResults('');
    setTimeout(function () { if (input) input.focus(); }, 100);
  }

  function closeSearch() {
    var modal = document.getElementById('site-search-modal');
    var box = document.getElementById('site-search-box');
    var input = document.getElementById('site-search-input');
    if (!modal || !box) return;

    document.body.classList.remove('overflow-hidden');
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
    box.classList.remove('scale-100', 'opacity-100');
    box.classList.add('scale-95', 'opacity-0');
    if (input) input.value = '';
    setTimeout(function () {
      modal.classList.add('hidden');
    }, 300);
  }

  function isSearchOpen() {
    var modal = document.getElementById('site-search-modal');
    return modal && !modal.classList.contains('hidden');
  }

  function mount() {
    ensureHighlightStyle();
    document.body.insertAdjacentHTML('beforeend', MODAL_HTML);

    var modal = document.getElementById('site-search-modal');
    var input = document.getElementById('site-search-input');
    var closeBtn = document.getElementById('site-search-close');

    var debounceTimer = null;
    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      var value = input.value;
      debounceTimer = setTimeout(function () { renderResults(value); }, 120);
    });

    closeBtn.addEventListener('click', closeSearch);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeSearch();
    });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isSearchOpen()) {
        closeSearch();
        return;
      }
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      var typing = tag === 'INPUT' || tag === 'TEXTAREA';
      if (e.key === '/' && !typing && !isSearchOpen()) {
        e.preventDefault();
        openSearch();
      }
    });

    // Wire up the header search trigger (button injected by header.js)
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('#global-search-trigger');
      if (trigger) {
        e.preventDefault();
        openSearch();
      }
    });

    checkPendingTarget();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
