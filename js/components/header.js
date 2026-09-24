// Injects the shared site header into every page.
// Edit this ONE file to update the header/navigation across the entire website.
(function () {
  var HEADER_HTML = `<header class="sticky top-0 w-full z-40 bg-surface-container-lowest shadow-md">
<!-- Top Utility Bar -->
<div class="w-full border-b border-white/20 py-1.5 px-gutter-mobile lg:px-margin font-label-caps text-label-caps flex flex-wrap items-center justify-between gap-space-xs text-white" style="background-color: rgb(245, 50, 159);">
<div class="flex items-center gap-space-md">
<div class="flex items-center gap-space-xs text-white"><span class="material-symbols-outlined text-[16px] text-white">storefront</span><span class="text-white font-medium">3 Showrooms in Chennai: Selaiyur &amp; Tambaram</span></div>
<span class="text-white/60 hidden sm:inline">•</span>
<div class="hidden sm:flex items-center gap-space-xs text-white">
<span class="material-symbols-outlined text-[16px] text-white">schedule</span>
<span class="text-white/95">9:30 AM – 10:00 PM (Daily)</span>
</div>
</div>
<div class="flex items-center gap-space-md">
<a class="flex items-center gap-space-xs text-white hover:text-white/80 transition-colors" href="tel:+919840012345">
<span class="material-symbols-outlined text-[16px] text-white">call</span>
<span class="font-bold text-white">+91 98400 12345</span>
</a>
<span class="text-white/60">•</span>
<a class="flex items-center gap-space-xs text-white hover:text-white/80 transition-colors" href="https://wa.me/919840012345" rel="noopener" target="_blank">
<span class="material-symbols-outlined text-[16px] text-white">chat</span>
<span class="font-bold uppercase tracking-wider text-white">WhatsApp Assistance</span>
</a>
</div>
</div>
<!-- Main Navigation Bar -->
<div class="w-full px-gutter-mobile lg:px-margin flex items-center justify-between gap-space-md py-space-sm">
<!-- Logo and Brand -->
<a class="flex items-center gap-space-sm shrink-0" href="index.html">
<img alt="Balakrishnaa Textiles Logo" class="h-10 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf1dlwE4fQu-yfwH4gowmZNjn-Pl242PXggrINt3jvIoH3HE-UYcBW-30_PjnDKitN93VuJHHM7gTCvOQIMkKfCB1MeE_K8nFjLC7ZutYEzyPNpcUFkK-7Z0x2aD5R8OAy9SNZT20qR9L4M9KspEU9HXqxhT8yYK3Ni5W5D8gTL6sqHCPKT_lKH30isS6NGOoxNzjLvyB_-pwvMfjcBznitffQY2MsTzX_dBjfaUU-d0i9xkoT3uphiaBPKcJ4iF7goSc"/>
<div class="flex flex-col">
<span class="font-headline-sm text-headline-sm font-bold tracking-tight leading-none" style="color: #F5329F;">Balakrishnaa</span>
<span class="font-label-caps text-label-caps tracking-widest uppercase font-bold" style="color: #023499; font-weight: 800">Stores</span>
</div>
</a>
<!-- Main Navigation Links -->
<nav class="hidden lg:flex items-center gap-space-md" data-active-classes="text-primary font-headline-sm border-b-2 border-primary">
<a class="font-label-md text-label-md text-on-surface hover:text-primary transition-colors py-1 cursor-pointer" data-path="home" href="index.html">Home</a>
<a class="font-label-md text-label-md text-on-surface hover:text-primary transition-colors py-1 cursor-pointer" data-path="collections" href="collections.html">Collections</a>
<a class="font-label-md text-label-md text-on-surface hover:text-primary transition-colors py-1 cursor-pointer" data-path="women" href="womens_collection.html">Women</a>
<a class="font-label-md text-label-md text-on-surface hover:text-primary transition-colors py-1 cursor-pointer" data-path="men" href="mens.html">Men</a>
<a class="font-label-md text-label-md text-on-surface hover:text-primary transition-colors py-1 cursor-pointer" data-path="kids" href="kids.html">Kids</a>
<a class="font-label-md text-label-md text-on-surface hover:text-primary transition-colors py-1 cursor-pointer" data-path="new-arrivals" href="new_arrival.html">New Arrivals</a>
<a class="font-label-md text-label-md text-on-surface hover:text-primary transition-colors py-1 cursor-pointer" data-path="about-us" href="about_us.html">About Us</a>
<a class="font-label-md text-label-md text-on-surface hover:text-primary transition-colors py-1 cursor-pointer" data-path="contact" href="contact.html">Contact</a>
</nav>
<!-- Action Tools & CTAs -->
<div class="flex items-center gap-space-sm shrink-0">
<button aria-label="Search the website" class="p-space-sm text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center rounded-lg hover:bg-surface-container cursor-pointer" id="global-search-trigger" type="button">
<span class="material-symbols-outlined text-[22px]">search</span>
</button>
<a class="hidden sm:inline-flex items-center justify-center gap-space-xs border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary font-label-md text-label-md px-space-md py-space-sm rounded-lg transition-colors cursor-pointer" href="contact.html">
<span class="material-symbols-outlined text-[18px]">storefront</span>
<span class="">Visit Store</span>
</a>
<a class="hidden sm:inline-flex items-center justify-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-md py-space-sm rounded-lg transition-colors shadow-sm hover:shadow-md cursor-pointer" href="https://wa.me/919840012345?text=Hello%20Balakrishnaa%20Stores%20Nx%2C%20I%20would%20like%20to%20enquire%20about%20your%20collections" rel="noopener" target="_blank">
<span class="material-symbols-outlined text-[18px]">chat</span>
<span class="">Enquire</span>
</a>
<button aria-controls="mobile-nav-menu" aria-expanded="false" aria-label="Open menu" class="lg:hidden flex items-center justify-center p-space-sm text-on-surface hover:text-primary hover:bg-surface-container rounded-lg transition-colors cursor-pointer" id="mobile-menu-toggle" type="button">
<span class="material-symbols-outlined text-[26px]" id="mobile-menu-icon">menu</span>
</button>
</div>
</div>
<!-- Mobile Navigation Menu -->
<div class="lg:hidden hidden border-t border-outline-variant bg-surface-container-lowest" id="mobile-nav-menu">
<nav class="flex flex-col px-gutter-mobile py-space-sm" data-active-classes="text-primary font-bold bg-surface-container">
<a class="font-label-md text-label-md text-on-surface hover:text-primary hover:bg-surface-container transition-colors px-space-sm py-space-md rounded-lg cursor-pointer" data-path="home" href="index.html">Home</a>
<a class="font-label-md text-label-md text-on-surface hover:text-primary hover:bg-surface-container transition-colors px-space-sm py-space-md rounded-lg cursor-pointer" data-path="collections" href="collections.html">Collections</a>
<a class="font-label-md text-label-md text-on-surface hover:text-primary hover:bg-surface-container transition-colors px-space-sm py-space-md rounded-lg cursor-pointer" data-path="women" href="womens_collection.html">Women</a>
<a class="font-label-md text-label-md text-on-surface hover:text-primary hover:bg-surface-container transition-colors px-space-sm py-space-md rounded-lg cursor-pointer" data-path="men" href="mens.html">Men</a>
<a class="font-label-md text-label-md text-on-surface hover:text-primary hover:bg-surface-container transition-colors px-space-sm py-space-md rounded-lg cursor-pointer" data-path="kids" href="kids.html">Kids</a>
<a class="font-label-md text-label-md text-on-surface hover:text-primary hover:bg-surface-container transition-colors px-space-sm py-space-md rounded-lg cursor-pointer" data-path="new-arrivals" href="new_arrival.html">New Arrivals</a>
<a class="font-label-md text-label-md text-on-surface hover:text-primary hover:bg-surface-container transition-colors px-space-sm py-space-md rounded-lg cursor-pointer" data-path="about-us" href="about_us.html">About Us</a>
<a class="font-label-md text-label-md text-on-surface hover:text-primary hover:bg-surface-container transition-colors px-space-sm py-space-md rounded-lg cursor-pointer" data-path="contact" href="contact.html">Contact</a>
<a class="sm:hidden flex items-center justify-center gap-space-xs border border-secondary text-secondary font-label-md text-label-md px-space-md py-space-sm rounded-lg mt-space-sm cursor-pointer" href="contact.html">
<span class="material-symbols-outlined text-[18px]">storefront</span>
<span>Visit Store</span>
</a>
<a class="sm:hidden flex items-center justify-center gap-space-xs bg-primary text-on-primary font-label-md text-label-md px-space-md py-space-sm rounded-lg mt-space-xs cursor-pointer" href="https://wa.me/919840012345?text=Hello%20Balakrishnaa%20Stores%20Nx%2C%20I%20would%20like%20to%20enquire%20about%20your%20collections" rel="noopener" target="_blank">
<span class="material-symbols-outlined text-[18px]">chat</span>
<span>Enquire</span>
</a>
</nav>
</div>
</header>`;

  function mountHeader() {
    var target = document.getElementById('site-header');
    if (!target) return;
    target.outerHTML = HEADER_HTML;
    highlightActiveNavLink();
    setupMobileMenu();
  }

  // Wires up the hamburger button: toggles the mobile nav panel,
  // swaps the menu/close icon, and closes on link click, outside
  // click, Escape, or resize back to desktop width.
  function setupMobileMenu() {
    var toggle = document.getElementById('mobile-menu-toggle');
    var menu = document.getElementById('mobile-nav-menu');
    var icon = document.getElementById('mobile-menu-icon');
    if (!toggle || !menu || !icon) return;

    function closeMenu() {
      menu.classList.add('hidden');
      icon.textContent = 'menu';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }

    function openMenu() {
      menu.classList.remove('hidden');
      icon.textContent = 'close';
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = !menu.classList.contains('hidden');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) closeMenu();
    });
  }

  // Marks the nav/footer link that matches the current page as active,
  // using the `data-page` attribute set on <body> and `data-path` on links.
  function highlightActiveNavLink() {
    var currentPage = document.body.getAttribute('data-page');
    if (!currentPage) return;
    var links = document.querySelectorAll('header nav a[data-path]');
    links.forEach(function (link) {
      var isActive = link.getAttribute('data-path') === currentPage;
      link.classList.toggle('text-primary', isActive);
      link.classList.toggle('font-bold', isActive);
      link.classList.toggle('border-b-2', isActive);
      link.classList.toggle('border-primary', isActive);
      link.classList.toggle('text-on-surface', !isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountHeader);
  } else {
    mountHeader();
  }
})();
