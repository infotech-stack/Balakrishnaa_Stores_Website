# Balakrishnaa Textiles Website

## Folder structure

```
/
├── index.html                 Home page
├── collections.html
├── womens_collection.html
├── mens.html
├── kids.html
├── new_arrival.html
├── about_us.html
├── contact.html
│
├── css/
│   └── style.css              Small shared base stylesheet (loaded on every page)
│
├── js/
│   ├── config/
│   │   └── tailwind.config.js Shared Tailwind theme (colors, spacing, fonts, sizes)
│   └── components/
│       ├── header.js          Injects the ONE shared header/nav into every page
│       ├── footer.js          Injects the ONE shared footer into every page
│       ├── modal.js           "Catalogue Enquiry" WhatsApp popup used by product cards
│       └── carousel.js        Home page hero image slider (no-ops on other pages)
│
└── assets/
    └── images/
        └── home_page/         Put your existing images back here (unchanged paths)
```

## How the shared header/footer works

Every page has two empty placeholder tags in its `<body>`:

```html
<div id="site-header"></div>
...page content...
<div id="site-footer"></div>
```

`js/components/header.js` and `js/components/footer.js` run on page load and
replace those placeholders with the real header/footer markup, which lives
**only once**, inside those two JS files.

**To change the header or footer site-wide** (logo, nav links, contact
numbers, showroom addresses, social links, etc.), edit
`js/components/header.js` or `js/components/footer.js` — the change applies
to all 8 pages automatically. You never need to touch the individual HTML
files for header/footer changes again.

This approach was chosen instead of `fetch()`-based includes because it
works even when the site is opened directly from disk (`file://...`),
with no local server required, unlike `fetch()` which browsers block for
local files.

## Adding a new page

1. Copy any existing page (e.g. `about_us.html`) as a starting point.
2. Keep the `<head>` block, the `<div id="site-header"></div>` /
   `<div id="site-footer"></div>` placeholders, and the three `<script>`
   tags before `</body>` (`header.js`, `footer.js`, `modal.js`) exactly as
   they are.
3. Replace only the content between the two placeholder `div`s with your
   new page's content.
4. Give the `<body>` tag a unique `data-page="your-page-key"` value if you
   want the matching nav link to highlight as "active" automatically.
5. Add a link to the new page inside `js/components/header.js` (and
   `footer.js` if relevant) so it appears in the shared navigation.

## Adding a new product/category "Enquire via WhatsApp" card

Reuse the existing shared modal — no new markup needed. Just add a button
anywhere on any page:

```html
<button onclick="openEnquiryModal('Your Item Name Here')" type="button">
  Enquire via WhatsApp
</button>
```

`js/components/modal.js` handles opening the modal, pre-filling the
WhatsApp message, and closing on Escape/backdrop click.

## Styling / design system

All visual design still comes from Tailwind CSS utility classes directly in
the markup (unchanged from the original), plus the one shared color/spacing/
font theme in `js/config/tailwind.config.js`. Nothing about the visual design
was changed — this restructuring only removed duplicate header/footer/config
code and organized files into folders.

## Restoring your images

Copy your existing `assets/images` folder contents into the matching
`assets/images/...` paths here. Image paths in the HTML were left exactly
as they were, e.g. `assets/images/home_page/hero image slide1.png`.
