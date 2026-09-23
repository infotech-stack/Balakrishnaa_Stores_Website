// Injects the shared site footer into every page.
// Edit this ONE file to update the footer across the entire website.
(function () {
  var FOOTER_HTML = `<footer class="relative w-full text-white pt-space-xl pb-space-lg border-t border-white/10 shadow-2xl overflow-hidden" style="background-image: linear-gradient(rgba(11, 15, 25, 0.92) 0%, rgba(11, 15, 25, 0.82) 50%, rgba(11, 15, 25, 0.94) 100%), url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuDidFfwLxJZTockDMdiHqxvyLq3pqXq34ZbBusFCGhyNpQvhpFXSk0F4lQ7zXI5LoJl_siW3FAeDbcqIDAXcxfAOOR6kYUTOyATNdTa_p6NU9gV_yJSslD7RDIpKnD9vcBcSrm_Fb6p_lNLC0KLNUYsgeTQB1X40YVYBzh28QF5djcdw44zqcrXpcL72_Dss2r4dCSiltsVvRrC5-XHLjnG8XcO3H2ooVx_QZwNw3LS3MyDM0xG3Xu5hQ&quot;); background-size: cover; background-position: center center; position: relative; overflow: hidden; min-height: 420px;"><!-- Top Concierge / Highlight Banner -->
<div class="w-full max-w-7xl mx-auto px-gutter-mobile lg:px-margin mb-space-xl">
  <div class="flex flex-wrap items-center justify-between gap-space-md pb-space-md border-b border-white/10">
    <div class="flex items-center gap-space-sm">
      <div class="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-fixed">
        <span class="material-symbols-outlined text-[20px]">verified</span>
      </div>
      <div class="flex flex-col">
        <span class="font-headline-sm text-headline-sm font-semibold tracking-tight text-white">Balakrishnaa Stores</span>
        <span class="font-label-caps text-label-caps uppercase tracking-widest text-white/60">Dressing Chennai Families for Generations • Exclusive In-Store Showcase</span>
      </div>
    </div>
    <div class="flex flex-wrap items-center gap-space-sm">
      <div class="inline-flex items-center gap-space-xs font-label-caps text-label-caps uppercase tracking-wider bg-white/5 border border-white/10 px-space-md py-1.5 rounded-full text-white/80">
        <span class="material-symbols-outlined text-[16px] text-tertiary-fixed">schedule</span>
        <span class="">9:30 AM – 10:00 PM Daily</span>
      </div>
      <a class="inline-flex items-center gap-space-xs font-label-caps text-label-caps uppercase tracking-wider bg-primary hover:bg-primary-container text-white px-space-md py-1.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer" href="https://wa.me/919840012345" rel="noopener" target="_blank">
        <span class="material-symbols-outlined text-[16px]">chat</span>
        <span class="">Store Concierge</span>
      </a>
    </div>
  </div>
</div>

<!-- 4-Column Grid -->
<div class="w-full max-w-7xl mx-auto px-gutter-mobile lg:px-margin grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl mb-space-xl">
  <!-- Column 1: Brand & Identity (lg:col-span-4) -->
  <div class="lg:col-span-4 flex flex-col gap-space-md">
    <div class="flex items-center gap-space-sm">
      <div class="p-1.5 bg-white rounded-xl shadow-md flex items-center justify-center shrink-0">
        <img alt="Balakrishnaa Textiles Logo" class="h-12 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASbAEJFYkc0v4tN0qaN7o0OabEzTzEfB2eqk4xcZUz52M8OAHQbck5O4OmxC4T7RZoY_F8qx9oyjpjFm-DcXisuh6mjzP64GJz-ZFwgKO-xyXU2mZdgQ3KqtvPPQrdLbpKiowBkhlHwaa9crZ4fpyzIw54EaEX5L60S0LqUXbbVjNKp-9bXh9ZSTAIF8aRJz7hAlYaVJ-g4SO5zUioEjlqNN-6S1z9-2jMixPmalpEf-vJv_WdGmptpw">
      </div>
      <div class="flex flex-col">
        <span class="font-headline-sm text-headline-sm font-bold tracking-tight text-white leading-tight">Balakrishnaa Stores</span>
        <span class="font-label-caps text-label-caps text-primary-fixed uppercase tracking-widest font-bold">Selaiyur &amp; Tambaram</span>
      </div>
    </div>
    <p class="font-body-sm text-body-sm text-white/70 leading-relaxed max-w-sm">
      Tradition, elegance, and modern style for the entire family. Visit our expansive retail destinations in Selaiyur and Tambaram to touch, feel, and experience our handpicked seasonal collections.
    </p>
    <div class="flex flex-wrap items-center gap-space-xs pt-space-xs">
      <span class="inline-flex items-center gap-space-xs text-white/80 bg-white/5 border border-white/10 px-space-sm py-1 rounded-full font-label-caps text-label-caps uppercase tracking-wider">
        <span class="material-symbols-outlined text-[15px] text-tertiary-fixed">check_circle</span>
        <span class="">Family Fitting Suites</span>
      </span>
      <span class="inline-flex items-center gap-space-xs text-white/80 bg-white/5 border border-white/10 px-space-sm py-1 rounded-full font-label-caps text-label-caps uppercase tracking-wider">
        <span class="material-symbols-outlined text-[15px] text-primary-fixed">styler</span>
        <span class="">Personal Styling</span>
      </span>
    </div>
  </div>

  <!-- Column 2: Explore Collections (lg:col-span-2) -->
  <div class="lg:col-span-2 flex flex-col gap-space-sm">
    <span class="font-label-caps text-label-caps uppercase tracking-widest text-primary-fixed font-bold pb-space-xs border-b border-white/10">
      Collections
    </span>
    <nav class="flex flex-col gap-space-xs pt-1">
      <a class="font-body-sm text-body-sm text-white/75 hover:text-white transition-colors py-1 cursor-pointer flex items-center justify-between group" href="womens_collection.html">
        <span class="">Designer Georgette Sarees</span>
        <span class="material-symbols-outlined text-[14px] text-white/30 group-hover:text-primary-fixed transition-colors">arrow_forward</span>
      </a>
      <a class="font-body-sm text-body-sm text-white/75 hover:text-white transition-colors py-1 cursor-pointer flex items-center justify-between group" href="womens_collection.html">
        <span class="">Embroidered Chudidhars</span>
        <span class="material-symbols-outlined text-[14px] text-white/30 group-hover:text-primary-fixed transition-colors">arrow_forward</span>
      </a>
      <a class="font-body-sm text-body-sm text-white/75 hover:text-white transition-colors py-1 cursor-pointer flex items-center justify-between group" href="mens.html">
        <span class="">Men's Linen &amp; Formals</span>
        <span class="material-symbols-outlined text-[14px] text-white/30 group-hover:text-primary-fixed transition-colors">arrow_forward</span>
      </a>
      <a class="font-body-sm text-body-sm text-white/75 hover:text-white transition-colors py-1 cursor-pointer flex items-center justify-between group" href="kids.html">
        <span class="">Kids &amp; Teens Ethnic</span>
        <span class="material-symbols-outlined text-[14px] text-white/30 group-hover:text-primary-fixed transition-colors">arrow_forward</span>
      </a>
      <a class="font-body-sm text-body-sm text-white/75 hover:text-white transition-colors py-1 cursor-pointer flex items-center justify-between group" href="collections.html">
        <span class="">Occasion &amp; Festive Wear</span>
        <span class="material-symbols-outlined text-[14px] text-white/30 group-hover:text-primary-fixed transition-colors">arrow_forward</span>
      </a>
      <a class="font-body-sm text-body-sm text-white/75 hover:text-white transition-colors py-1 cursor-pointer flex items-center justify-between group" href="new_arrival.html">
        <span class="">New Arrivals Catalogue</span>
        <span class="material-symbols-outlined text-[14px] text-white/30 group-hover:text-primary-fixed transition-colors">arrow_forward</span>
      </a>
    </nav>
  </div>

  <!-- Column 3: Experience & Service (lg:col-span-2) -->
  <div class="lg:col-span-2 flex flex-col gap-space-sm">
    <span class="font-label-caps text-label-caps uppercase tracking-widest text-primary-fixed font-bold pb-space-xs border-b border-white/10">
      Experience
    </span>
    <nav class="flex flex-col gap-space-xs pt-1">
      <a class="font-body-sm text-body-sm text-white/75 hover:text-white transition-colors py-1 cursor-pointer flex items-center justify-between group" href="about_us.html">
        <span class="">About Our Heritage</span>
        <span class="material-symbols-outlined text-[14px] text-white/30 group-hover:text-primary-fixed transition-colors">arrow_forward</span>
      </a>
      <a class="font-body-sm text-body-sm text-white/75 hover:text-white transition-colors py-1 cursor-pointer flex items-center justify-between group" href="contact.html">
        <span class="">3 Multi-Floor Showrooms</span>
        <span class="material-symbols-outlined text-[14px] text-white/30 group-hover:text-primary-fixed transition-colors">arrow_forward</span>
      </a>
      <a class="font-body-sm text-body-sm text-white/75 hover:text-white transition-colors py-1 cursor-pointer flex items-center justify-between group" href="contact.html">
        <span class="">Private Fitting Suites</span>
        <span class="material-symbols-outlined text-[14px] text-white/30 group-hover:text-primary-fixed transition-colors">arrow_forward</span>
      </a>
      <a class="font-body-sm text-body-sm text-white/75 hover:text-white transition-colors py-1 cursor-pointer flex items-center justify-between group" href="https://wa.me/919840012345" rel="noopener" target="_blank">
        <span class="">In-Store Personal Stylist</span>
        <span class="material-symbols-outlined text-[14px] text-white/30 group-hover:text-primary-fixed transition-colors">arrow_forward</span>
      </a>
      <a class="font-body-sm text-body-sm text-white/75 hover:text-white transition-colors py-1 cursor-pointer flex items-center justify-between group" href="contact.html">
        <span class="">Store Gallery</span>
        <span class="material-symbols-outlined text-[14px] text-white/30 group-hover:text-primary-fixed transition-colors">arrow_forward</span>
      </a>
      <a class="font-body-sm text-body-sm text-white/75 hover:text-white transition-colors py-1 cursor-pointer flex items-center justify-between group" href="contact.html">
        <span class="">Contact &amp; Route Map</span>
        <span class="material-symbols-outlined text-[14px] text-white/30 group-hover:text-primary-fixed transition-colors">arrow_forward</span>
      </a>
    </nav>
  </div>

  <!-- Column 4: 3 Chennai Showrooms (lg:col-span-4) -->
  <div class="lg:col-span-4 flex flex-col gap-space-sm">
    <div class="flex items-center justify-between pb-space-xs border-b border-white/10">
      <span class="font-label-caps text-label-caps uppercase tracking-widest text-primary-fixed font-bold">
        Our 3 Chennai Showrooms
      </span>
      <span class="font-label-caps text-label-caps text-tertiary-fixed uppercase font-semibold">
        Open Daily
      </span>
    </div>
    <div class="flex flex-col gap-space-xs pt-1">
      <!-- Branch 1 -->
      <div class="p-space-sm rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 transition-colors flex flex-col gap-0.5">
        <div class="flex items-center justify-between">
          <span class="font-label-md text-label-md font-bold text-white">BS Nx — Selaiyur</span>
          <span class="font-label-caps text-label-caps text-primary-fixed uppercase tracking-wider font-bold">Flagship</span>
        </div>
        <p class="font-body-sm text-body-sm text-white/60">Velachery Main Road, Chennai • Multi-Floor</p>
        <div class="flex items-center justify-between pt-1">
          <a class="inline-flex items-center gap-space-xs font-label-md text-label-md text-primary-fixed hover:text-white transition-colors font-bold cursor-pointer" href="tel:+919384086770">
            <span class="material-symbols-outlined text-[16px]">call</span>
            <span class="">+91 93840 86770</span>
          </a>
          <span class="font-label-caps text-label-caps text-white/40 uppercase">Valet Parking</span>
        </div>
      </div>

      <!-- Branch 2 -->
      <div class="p-space-sm rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 transition-colors flex flex-col gap-0.5">
        <div class="flex items-center justify-between">
          <span class="font-label-md text-label-md font-bold text-white">BS II — Selaiyur</span>
          <span class="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider font-bold">Family Branch</span>
        </div>
        <p class="font-body-sm text-body-sm text-white/60">Velachery Main Road, Selaiyur, Chennai</p>
        <div class="flex items-center justify-between pt-1">
          <a class="inline-flex items-center gap-space-xs font-label-md text-label-md text-primary-fixed hover:text-white transition-colors font-bold cursor-pointer" href="tel:+919361086770">
            <span class="material-symbols-outlined text-[16px]">call</span>
            <span class="">+91 93610 86770</span>
          </a>
          <span class="font-label-caps text-label-caps text-white/40 uppercase">Dedicated Parking</span>
        </div>
      </div>

      <!-- Branch 3 -->
      <div class="p-space-sm rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 transition-colors flex flex-col gap-0.5">
        <div class="flex items-center justify-between">
          <span class="font-label-md text-label-md font-bold text-white">BS I — Tambaram</span>
          <span class="font-label-caps text-label-caps text-tertiary-fixed uppercase tracking-wider font-bold">Heritage Branch</span>
        </div>
        <p class="font-body-sm text-body-sm text-white/60">Tambaram Central, Chennai</p>
        <div class="flex items-center justify-between pt-1">
          <a class="inline-flex items-center gap-space-xs font-label-md text-label-md text-primary-fixed hover:text-white transition-colors font-bold cursor-pointer" href="tel:+919444244545">
            <span class="material-symbols-outlined text-[16px]">call</span>
            <span class="">+91 94442 44545</span>
          </a>
          <span class="font-label-caps text-label-caps text-white/40 uppercase">Central Access</span>
        </div>
      </div>
    </div>

    <!-- Quick CTAs -->
    <div class="flex items-center gap-space-xs pt-space-xs">
      <a class="flex-1 inline-flex items-center justify-center gap-space-xs bg-white/10 hover:bg-white/20 text-white font-label-md text-label-md py-space-xs px-space-sm rounded-lg transition-colors cursor-pointer" href="https://maps.google.com" rel="noopener" target="_blank">
        <span class="material-symbols-outlined text-[16px]">map</span>
        <span class="">Get Directions</span>
      </a>
      <a class="flex-1 inline-flex items-center justify-center gap-space-xs bg-tertiary hover:bg-tertiary-container text-white font-label-md text-label-md py-space-xs px-space-sm rounded-lg transition-colors cursor-pointer" href="https://wa.me/919840012345" rel="noopener" target="_blank">
        <span class="material-symbols-outlined text-[16px]">chat</span>
        <span class="">WhatsApp Desk</span>
      </a>
    </div>
  </div>
</div>

<!-- Bottom Copyright Bar -->
<div class="w-full max-w-7xl mx-auto px-gutter-mobile lg:px-margin pt-space-md border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-space-sm text-white/70 font-body-sm text-body-sm">
  <p class="font-medium text-white/80">© 2026 Balakrishnaa Stores. All Rights Reserved.</p>
  <div class="flex flex-wrap items-center gap-space-md text-label-caps font-label-caps uppercase tracking-wider text-white/60">
    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-tertiary-fixed">check</span> 100% In-Store Trial</span>
    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-tertiary-fixed">check</span> Handcrafted Quality</span>
    <span class="flex items-center gap-1 text-primary-fixed"><span class="material-symbols-outlined text-[14px]">verified</span> Zero Silk Policy</span>
  </div>
</div></footer>`;

  function mountFooter() {
    var target = document.getElementById('site-footer');
    if (!target) return;
    target.outerHTML = FOOTER_HTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountFooter);
  } else {
    mountFooter();
  }
})();
