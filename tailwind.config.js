/**
 * Tailwind CLI config (build-time).
 * Theme values are kept identical to js/config/tailwind.config.js
 * (the old runtime CDN config) so the compiled CSS matches 1:1.
 * If you change the theme, update BOTH files, or better: delete
 * js/config/tailwind.config.js's usage from the HTML files entirely
 * since it's no longer needed once the CDN <script> is removed.
 */
module.exports = {
  darkMode: "class",
  // Every file that can contain Tailwind class names must be listed here,
  // including the .js files that inject markup via template strings
  // (header.js, footer.js, carousel.js, etc.) — otherwise those classes
  // get purged out of the compiled CSS and elements render unstyled.
  content: [
    "./*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      "colors": {
        "on-surface-variant": "#594049",
        "on-error": "#ffffff",
        "surface-container": "#eeedf2",
        "secondary-fixed": "#dbe1ff",
        "error-container": "#ffdad6",
        "tertiary-fixed": "#7afbb1",
        "on-secondary": "#ffffff",
        "tertiary": "#006a3e",
        "surface-variant": "#e2e2e6",
        "inverse-on-surface": "#f0f0f4",
        "surface-container-lowest": "#ffffff",
        "secondary": "#445c9d",
        "surface-tint": "#b70072",
        "error": "#ba1a1a",
        "inverse-surface": "#2f3034",
        "outline-variant": "#e0bec9",
        "background": "#f9f9fd",
        "inverse-primary": "#ffb0cf",
        "on-primary": "#ffffff",
        "on-primary-fixed-variant": "#8c0056",
        "on-tertiary-fixed-variant": "#00522f",
        "surface-container-highest": "#e2e2e6",
        "primary": "#b2006f",
        "surface-container-low": "#f3f3f7",
        "on-tertiary": "#ffffff",
        "on-secondary-fixed-variant": "#2b4384",
        "outline": "#8c6f7a",
        "surface-container-high": "#e8e8ec",
        "on-surface": "#1a1c1f",
        "on-tertiary-fixed": "#002110",
        "surface-dim": "#d9dade",
        "on-background": "#1a1c1f",
        "on-error-container": "#93000a",
        "secondary-container": "#9fb7ff",
        "tertiary-fixed-dim": "#5cde97",
        "primary-fixed-dim": "#ffb0cf",
        "secondary-fixed-dim": "#b3c5ff",
        "primary-container": "#dc148c",
        "primary-fixed": "#ffd8e5",
        "surface": "#f9f9fd",
        "tertiary-container": "#008650",
        "on-primary-fixed": "#3d0023",
        "on-secondary-fixed": "#00184a",
        "on-secondary-container": "#2d4686",
        "surface-bright": "#f9f9fd",
        "on-primary-container": "#fffbff",
        "on-tertiary-container": "#f6fff5"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "gutter-mobile": "0.75rem",
        "space-xl": "3rem",
        "space-md": "1rem",
        "gutter": "1.5rem",
        "space-lg": "1.75rem",
        "space-xs": "0.25rem",
        "margin-mobile": "1.25rem",
        "margin": "3rem",
        "space-sm": "0.5rem"
      },
      "fontFamily": {
        "body-md": ["Inter"],
        "display-hero-mobile": ["Inter"],
        "headline-sm": ["Inter"],
        "headline-md": ["Inter"],
        "headline-xl": ["Inter"],
        "label-md": ["Inter"],
        "body-sm": ["Inter"],
        "body-lg": ["Inter"],
        "label-caps": ["Inter"],
        "headline-lg": ["Inter"],
        "display-hero": ["Inter"],
        "headline-xl-mobile": ["Inter"]
      },
      "fontSize": {
        "body-md": ["15px", {"lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400"}],
        "display-hero-mobile": ["36px", {"lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "headline-sm": ["20px", {"lineHeight": "28px", "letterSpacing": "-0.005em", "fontWeight": "600"}],
        "headline-md": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
        "headline-xl": ["40px", {"lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
        "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600"}],
        "body-sm": ["13px", {"lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "400"}],
        "body-lg": ["18px", {"lineHeight": "28px", "letterSpacing": "0em", "fontWeight": "400"}],
        "label-caps": ["11px", {"lineHeight": "16px", "letterSpacing": "0.12em", "fontWeight": "700"}],
        "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.015em", "fontWeight": "600"}],
        "display-hero": ["56px", {"lineHeight": "64px", "letterSpacing": "-0.03em", "fontWeight": "700"}],
        "headline-xl-mobile": ["28px", {"lineHeight": "36px", "letterSpacing": "-0.01em", "fontWeight": "600"}]
      }
    }
  }
}
