// Shared "Catalogue Enquiry" modal + its open/close logic.
// Used by product/category cards across the site via onclick="openEnquiryModal('Item Name')".
(function () {
  var MODAL_HTML = `<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300 p-gutter-mobile hidden" id="enquiry-modal">
<div class="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-space-lg shadow-2xl flex flex-col gap-space-md transform scale-95 transition-transform duration-300 relative z-50" id="modal-box">
<div class="flex items-start justify-between">
<div class="flex flex-col">
<span class="font-label-caps text-label-caps text-primary uppercase font-bold">Catalogue In-Store Enquiry</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface font-bold" id="modal-item-title">Item Enquiry</h3>
</div>
<button aria-label="Close modal" class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" onclick="closeEnquiryModal()" type="button">
<span class="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
  Interested in this garment? Connect directly with our Selaiyur showroom team to check sizes in stock or schedule a fitting visit.
</p>
<div class="flex flex-col gap-space-sm pt-space-xs">
<a class="inline-flex items-center justify-center gap-space-xs bg-tertiary hover:bg-tertiary-container text-on-tertiary font-label-md text-label-md py-space-md px-space-lg rounded-lg shadow-md transition-colors w-full cursor-pointer" href="#" id="modal-whatsapp-link" rel="noopener" target="_blank">
<span class="material-symbols-outlined text-[20px]">chat</span>
<span class="">Enquire via WhatsApp</span>
</a>
<a class="inline-flex items-center justify-center gap-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md py-space-md px-space-lg rounded-lg transition-colors w-full cursor-pointer" href="tel:+919840012345">
<span class="material-symbols-outlined text-[20px]">call</span>
<span class="">Call Store (+91 98400 12345)</span>
</a>
<a class="inline-flex items-center justify-center gap-space-xs text-secondary hover:text-primary font-label-md text-label-md py-space-xs transition-colors cursor-pointer" href="https://maps.google.com" rel="noopener" target="_blank">
<span class="material-symbols-outlined text-[18px]">location_on</span>
<span class="">Get Directions to Store</span>
</a>
</div>
</div>
</div>`;

  function mountModal() {
    if (document.getElementById('enquiry-modal')) return; // already present
    document.body.insertAdjacentHTML('beforeend', MODAL_HTML);
    bindModalEvents();
  }

  function bindModalEvents() {
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeEnquiryModal();
    });

    var modalEl = document.getElementById('enquiry-modal');
    if (modalEl) {
      modalEl.addEventListener('click', function (e) {
        if (e.target === modalEl) closeEnquiryModal();
      });
    }
  }

  window.openEnquiryModal = function (itemName) {
    var modal = document.getElementById('enquiry-modal');
    var box = document.getElementById('modal-box');
    var title = document.getElementById('modal-item-title');
    var waLink = document.getElementById('modal-whatsapp-link');

    if (!modal || !box) return;
    if (title) title.textContent = itemName;
    if (waLink) {
      var textMsg = encodeURIComponent('Hello Balakrishnaa Stores Nx, I would like to enquire about: ' + itemName + ' at your Selaiyur showroom.');
      waLink.href = 'https://wa.me/919840012345?text=' + textMsg;
    }

    modal.classList.remove('hidden');
    requestAnimationFrame(function () {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100', 'pointer-events-auto');
      box.classList.remove('scale-95');
      box.classList.add('scale-100');
    });
  };

  window.closeEnquiryModal = function () {
    var modal = document.getElementById('enquiry-modal');
    var box = document.getElementById('modal-box');
    if (!modal || !box) return;

    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
    box.classList.remove('scale-100');
    box.classList.add('scale-95');
    setTimeout(function () {
      modal.classList.add('hidden');
    }, 300);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountModal);
  } else {
    mountModal();
  }
})();
