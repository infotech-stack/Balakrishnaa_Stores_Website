/*
  ============================================================================
  SEASONAL FALLING EFFECT  (Diwali sparkles, snow, confetti, flowers ...)
  ============================================================================
  A light canvas overlay that gently drifts shapes down the screen.
  It never blocks clicks, and it pauses automatically in hidden tabs.

  HOW TO CHANGE THE SEASON (the only thing you normally need to edit):
    1. Change  theme: 'diwali'  in SETTINGS below to any name from THEMES:
         'diwali'  'christmas'  'newyear'  'pongal'  'holi'  'none'
    2. Save, upload, hard-refresh. Done.

  TURN IT OFF:      enabled: false      (or theme: 'none')
  AUTO-SWITCH:      useSchedule: true   and edit the SCHEDULE dates below.
  ADD YOUR OWN:     copy any block in THEMES, give it a new name, edit values.

  Try a theme live without editing files: open the browser console and type
      SeasonalEffect.setTheme('christmas')
  ============================================================================
*/
(function () {
  'use strict';

  /* ======================= 1. SETTINGS (edit me) ======================= */
  var SETTINGS = {
    enabled: true,               /* true = show effect, false = hide it       */
    theme: 'diwali',             /* which theme from THEMES to use            */
    useSchedule: false,          /* true = pick theme automatically by date   */
    respectReducedMotion: false, /* true = hide for visitors who turned off
                                    animations in their device settings       */
    intensity: 1,                /* 1 = normal, 0.5 = half as many, 1.5 = more*/
    opacity: 1,                  /* 0 to 1, overall strength of the effect    */
    speed: 1                     /* 1 = normal, 0.5 = slower, 2 = faster      */
  };

  /* ================= 2. SCHEDULE (used if useSchedule: true) ==============
     Dates are MM-DD. First matching row wins. Outside all rows, SETTINGS.theme
     is used. Ranges that cross new year (e.g. 12-20 to 01-05) are fine.
     Diwali / Pongal / Holi dates change every year, so adjust them yearly.   */
  var SCHEDULE = [
    { theme: 'diwali',    from: '10-20', to: '11-12' },
    { theme: 'christmas', from: '12-15', to: '12-31' },
    { theme: 'newyear',   from: '01-01', to: '01-03' },
    { theme: 'pongal',    from: '01-12', to: '01-17' },
    { theme: 'holi',      from: '03-01', to: '03-06' }
  ];

  /* ============================ 3. THEMES ==================================
     count    how many shapes are on screen (desktop)
     shapes   any of: 'sparkle' '4-point twinkle star'  'star' '5-point star'
                      'glow' 'soft glowing light'  'circle'  'confetti'
                      'emoji' (uses the emojis list)
     colors   hex colours, picked at random for each shape
     emojis   only for 'emoji' shape, e.g. ['🪔','🌼']
     size     [min, max] in pixels
     speed    [min, max] fall speed, pixels per second
     sway     side-to-side drift in pixels (0 = straight down)
     twinkle  true = shapes fade in and out like sparkles
     spin     true = shapes slowly rotate
     direction 'down' (falls) or 'up' (rises like lanterns/fireflies)         */
  var THEMES = {
    diwali: {
      count: 46,
      shapes: ['sparkle', 'sparkle', 'star', 'glow', 'glow'],
      colors: ['#ffd700', '#ffb300', '#ff9800', '#ffe082', '#f5329f', '#fff3c4'],
      size: [8, 20], speed: [35, 90], sway: 26, twinkle: true, spin: true,
      direction: 'down'
    },
    christmas: {
      count: 60,
      shapes: ['glow', 'glow', 'glow', 'star'],
      colors: ['#ffffff', '#e8f4ff', '#dbeafe', '#ff4d4d', '#7bd88f'],
      size: [6, 16], speed: [30, 80], sway: 30, twinkle: false, spin: false,
      direction: 'down'
    },
    newyear: {
      count: 70,
      shapes: ['confetti', 'confetti', 'circle', 'star'],
      colors: ['#ffd700', '#f5329f', '#023499', '#00c2ff', '#7cff6b', '#ffffff'],
      size: [7, 14], speed: [60, 130], sway: 20, twinkle: false, spin: true,
      direction: 'down'
    },
    pongal: {
      count: 28,
      shapes: ['emoji', 'emoji', 'glow'],
      emojis: ['🌼', '🌾', '🌻'],
      colors: ['#ffd54f', '#ffb300'],
      size: [16, 26], speed: [30, 70], sway: 34, twinkle: false, spin: true,
      direction: 'down'
    },
    holi: {
      count: 55,
      shapes: ['circle', 'glow', 'glow', 'confetti'],
      colors: ['#ff1744', '#ff9100', '#ffea00', '#00e676', '#00b0ff', '#d500f9', '#f5329f'],
      size: [8, 22], speed: [40, 100], sway: 24, twinkle: false, spin: true,
      direction: 'down'
    },
    none: null
  };

  /* ================== 4. ENGINE (no need to edit below) ================== */
  var canvas, ctx, dpr = 1, W = 0, H = 0;
  var particles = [], theme = null, spriteCache = {};
  var running = false, last = null, rafId = 0;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function pickThemeName() {
    if (!SETTINGS.useSchedule) return SETTINGS.theme;
    var d = new Date(), md = pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    for (var i = 0; i < SCHEDULE.length; i++) {
      var s = SCHEDULE[i];
      var inside = s.from <= s.to ? (md >= s.from && md <= s.to) : (md >= s.from || md <= s.to);
      if (inside) return s.theme;
    }
    return SETTINGS.theme;
  }

  /* ---- pre-drawn sprites: fast, because shapes are drawn once and reused ---- */
  function makeSprite(shape, color, emoji) {
    var key = shape + '|' + color + '|' + (emoji || '');
    if (spriteCache[key]) return spriteCache[key];
    var S = 64, c = document.createElement('canvas');
    c.width = c.height = S;
    var g = c.getContext('2d'), m = S / 2, grad;

    if (shape === 'glow') {
      grad = g.createRadialGradient(m, m, 0, m, m, m);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.18, color);
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grad; g.fillRect(0, 0, S, S);
    } else if (shape === 'circle') {
      g.fillStyle = color; g.beginPath(); g.arc(m, m, m * 0.7, 0, Math.PI * 2); g.fill();
    } else if (shape === 'confetti') {
      g.fillStyle = color; g.fillRect(m - 20, m - 11, 40, 22);
    } else if (shape === 'star') {
      g.fillStyle = color; g.beginPath();
      for (var i = 0; i < 10; i++) {
        var r = i % 2 ? m * 0.42 : m * 0.92, a = -Math.PI / 2 + i * Math.PI / 5;
        g[i ? 'lineTo' : 'moveTo'](m + Math.cos(a) * r, m + Math.sin(a) * r);
      }
      g.closePath(); g.fill();
    } else if (shape === 'sparkle') {
      grad = g.createRadialGradient(m, m, 0, m, m, m);
      grad.addColorStop(0, 'rgba(255,255,255,.55)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grad; g.fillRect(0, 0, S, S);
      g.fillStyle = color; g.beginPath();
      g.moveTo(m, 2);
      g.quadraticCurveTo(m, m, S - 2, m);
      g.quadraticCurveTo(m, m, m, S - 2);
      g.quadraticCurveTo(m, m, 2, m);
      g.quadraticCurveTo(m, m, m, 2);
      g.fill();
    } else if (shape === 'emoji') {
      g.font = '46px serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(emoji, m, m + 3);
    }
    spriteCache[key] = c;
    return c;
  }

  function makeParticle(spread) {
    var shape = pick(theme.shapes), color = pick(theme.colors);
    var up = theme.direction === 'up';
    var size = rand(theme.size[0], theme.size[1]);
    return {
      x: rand(0, W), y: spread ? rand(0, H) : (up ? H + size : -size),
      size: size,
      vy: rand(theme.speed[0], theme.speed[1]) * (up ? -1 : 1),
      amp: theme.sway ? rand(theme.sway * 0.4, theme.sway) : 0,
      freq: rand(0.4, 1.2), phase: rand(0, Math.PI * 2),
      rot: rand(0, Math.PI * 2), vr: theme.spin ? rand(-0.8, 0.8) : 0,
      tw: theme.twinkle ? rand(1.2, 3.2) : 0, twp: rand(0, Math.PI * 2),
      a: rand(0.55, 1), sprite: makeSprite(shape, color, shape === 'emoji' ? pick(theme.emojis || ['✨']) : '')
    };
  }

  function targetCount() {
    var scale = Math.max(0.45, Math.min(1, W / 1200));      /* fewer on phones */
    return Math.round(theme.count * scale * SETTINGS.intensity);
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    if (theme) {
      var n = targetCount();
      while (particles.length < n) particles.push(makeParticle(true));
      if (particles.length > n) particles.length = n;
    }
  }

  function frame(t) {
    if (!running) return;
    if (last === null) last = t;
    var dt = Math.min((t - last) / 1000, 0.05); last = t;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var up = theme.direction === 'up';

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.y += p.vy * SETTINGS.speed * dt;
      p.phase += p.freq * dt; p.rot += p.vr * dt; p.twp += p.tw * dt;
      if (up ? p.y < -p.size : p.y > H + p.size) { particles[i] = p = makeParticle(false); }

      var x = p.x + Math.sin(p.phase) * p.amp;
      var alpha = p.a * SETTINGS.opacity;
      if (p.tw) alpha *= 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(p.twp));
      var cs = Math.cos(p.rot) * dpr, sn = Math.sin(p.rot) * dpr;
      ctx.globalAlpha = alpha;
      ctx.setTransform(cs, sn, -sn, cs, x * dpr, p.y * dpr);
      ctx.drawImage(p.sprite, -p.size / 2, -p.size / 2, p.size, p.size);
    }
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    running = false; cancelAnimationFrame(rafId); last = null;
    if (ctx) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height); }
    if (canvas) canvas.style.display = 'none';
  }

  function start() {
    if (!SETTINGS.enabled || !theme) { stop(); return; }
    if (SETTINGS.respectReducedMotion && window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) { stop(); return; }
    canvas.style.display = 'block';
    particles = []; resize();
    if (!running) { running = true; last = null; rafId = requestAnimationFrame(frame); }
  }

  function setTheme(name) {
    SETTINGS.theme = name; SETTINGS.useSchedule = false;
    theme = THEMES[name] || null;
    start();
  }

  function init() {
    if (canvas) return;
    canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9000;display:none';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    theme = THEMES[pickThemeName()] || null;
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', function () { last = null; });
    start();
  }

  window.SeasonalEffect = { setTheme: setTheme, start: start, stop: stop, settings: SETTINGS, themes: THEMES };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
