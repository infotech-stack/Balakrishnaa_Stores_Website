/*
  ============================================================================
  SEASONAL FALLING EFFECT  (Diwali diyas + fireworks, Christmas snowflakes ...)
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
    useSchedule: true,          /* true = pick theme automatically by date   */
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
     count      how many falling shapes are on screen (desktop)
     shapes     list of shapes to mix. Repeat a name to make it more common.
                  'diya'      glowing clay lamp with a flame
                  'kandil'    hanging star lantern (uses colors)
                  'snowflake' crystal snowflake (uses colors)
                  'tree'      little Christmas tree
                  'snowman'   little snowman
                  'sparkle'   4-point twinkle star (uses colors)
                  'star'      5-point star (uses colors)
                  'glow'      soft glowing light (uses colors)
                  'circle'    solid dot (uses colors)
                  'confetti'  small rectangle (uses colors)
                  'emoji'     any emoji from the emojis list
     colors     hex colours for the shapes that use colours
     emojis     only for the 'emoji' shape, e.g. ['🪔','🌼']
     size       [min, max] in pixels for all shapes
     shapeSize  optional, different size for one shape: { tree: [26, 38] }
     speed      [min, max] fall speed in pixels per second
     sway       side-to-side drift in pixels (0 = straight down)
     twinkle    true = sparkle/glow shapes fade in and out
     spin       true = shapes slowly rotate (lamps, trees, snowmen stay upright)
     direction  'down' (falls) or 'up' (rises like lanterns)
     bursts     optional firework bursts that explode now and then:
                  gap [min,max] seconds between bursts, count [min,max] sparks,
                  colors, speed [min,max], life [min,max] seconds,
                  size [min,max], gravity (how fast sparks drop)            */
  var THEMES = {
    diwali: {
      count: 30,
      shapes: ['diya', 'diya', 'kandil', 'kandil', 'sparkle', 'sparkle', 'glow'],
      colors: ['#ff9800', '#ffb300', '#f5329f', '#ffd700', '#e53935', '#8e44ad'],
      size: [11, 20],
      shapeSize: { diya: [26, 35], kandil: [32, 46] },
      speed: [32, 75], sway: 30, twinkle: true, spin: true, direction: 'down',
      bursts: {
        gap: [1.2, 2.6], count: [30, 44],
        colors: ['#ff9800', '#ff6d00', '#f5329f', '#ffb300', '#ff1744', '#7c4dff', '#00a8e8'],
        speed: [130, 260], life: [1.0, 1.7], size: [9, 14], gravity: 90
      }
    },
    christmas: {
      count: 46,
      shapes: ['snowflake', 'snowflake', 'snowflake', 'snowflake', 'snowflake', 'tree', 'snowman'],
      colors: ['#4aa3df', '#7cc0f0', '#5b8fd9', '#8ec9f2'],
      size: [11, 25],
      shapeSize: { tree: [27, 38], snowman: [27, 36] },
      speed: [28, 70], sway: 32, twinkle: false, spin: true, direction: 'down'
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
  var particles = [], sparks = [], theme = null, spriteCache = {};
  var running = false, last = null, rafId = 0, clock = 0, nextBurst = 0;

  var FIXED = { diya: 1, tree: 1, snowman: 1 };            /* ignore colors   */
  var UPRIGHT = { diya: 1, tree: 1, snowman: 1, kandil: 1 }; /* sway, not spin  */
  var FLICKER = { diya: 1, kandil: 1 };                    /* gentle flame glow */

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function rgba(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }

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

  /* ----------------------------- drawing helpers ----------------------------- */
  function starPath(g, cx, cy, R, r, pts) {
    g.beginPath();
    for (var i = 0; i < pts * 2; i++) {
      var rad = i % 2 ? r : R, a = -Math.PI / 2 + i * Math.PI / pts;
      g[i ? 'lineTo' : 'moveTo'](cx + Math.cos(a) * rad, cy + Math.sin(a) * rad);
    }
    g.closePath();
  }
  function halo(g, cx, cy, rad, color) {
    var gr = g.createRadialGradient(cx, cy, 0, cx, cy, rad);
    gr.addColorStop(0, color); gr.addColorStop(1, 'rgba(255,200,80,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 96, 96);
  }

  function drawDiya(g) {
    halo(g, 48, 40, 46, 'rgba(255,190,70,.55)');
    /* clay bowl */
    var bowl = g.createLinearGradient(0, 56, 0, 86);
    bowl.addColorStop(0, '#e08a3c'); bowl.addColorStop(1, '#8f3a12');
    g.fillStyle = bowl; g.beginPath(); g.moveTo(12, 56);
    g.bezierCurveTo(14, 88, 82, 88, 84, 56);
    g.quadraticCurveTo(48, 70, 12, 56); g.closePath(); g.fill();
    g.strokeStyle = '#ffd54f'; g.lineWidth = 3; g.lineCap = 'round';
    g.beginPath(); g.moveTo(12, 56); g.quadraticCurveTo(48, 70, 84, 56); g.stroke();
    /* flame */
    var fl = g.createRadialGradient(48, 46, 2, 48, 40, 24);
    fl.addColorStop(0, '#fff7c2'); fl.addColorStop(0.45, '#ffc107'); fl.addColorStop(1, '#ff6d00');
    g.fillStyle = fl; g.beginPath(); g.moveTo(48, 14);
    g.bezierCurveTo(62, 30, 62, 46, 48, 58);
    g.bezierCurveTo(34, 46, 34, 30, 48, 14); g.fill();
    g.fillStyle = 'rgba(255,255,255,.85)'; g.beginPath(); g.moveTo(48, 34);
    g.bezierCurveTo(54, 42, 54, 50, 48, 56);
    g.bezierCurveTo(42, 50, 42, 42, 48, 34); g.fill();
  }

  function drawKandil(g, color) {
    halo(g, 48, 48, 46, 'rgba(255,214,102,.5)');
    g.lineCap = 'round';
    g.strokeStyle = '#8d6e63'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(48, 0); g.lineTo(48, 14); g.stroke();
    g.fillStyle = color; g.strokeStyle = 'rgba(0,0,0,.18)'; g.lineWidth = 1.5; g.lineJoin = 'round';
    starPath(g, 48, 46, 32, 14, 5); g.fill(); g.stroke();
    g.fillStyle = 'rgba(255,250,200,.9)';
    starPath(g, 48, 46, 17, 8, 5); g.fill();
    g.strokeStyle = '#ffc107'; g.lineWidth = 3;
    g.beginPath();
    g.moveTo(43, 64); g.lineTo(39, 92); g.moveTo(48, 64); g.lineTo(48, 94); g.moveTo(53, 64); g.lineTo(57, 92);
    g.stroke();
  }

  function drawSnowflake(g, color) {
    var m = 48, R = m * 0.86, k, t;
    halo(g, m, m, m, 'rgba(255,255,255,.35)');
    g.save(); g.translate(m, m);
    g.strokeStyle = color; g.fillStyle = color; g.lineCap = 'round'; g.lineWidth = 4.2;
    for (k = 0; k < 6; k++) {
      g.save(); g.rotate(k * Math.PI / 3); g.beginPath();
      g.moveTo(0, 0); g.lineTo(R, 0);
      [0.42, 0.68].forEach(function (f, idx) {
        var bx = R * f, bl = R * (idx ? 0.2 : 0.3);
        g.moveTo(bx, 0); g.lineTo(bx + bl * Math.cos(0.8), bl * Math.sin(0.8));
        g.moveTo(bx, 0); g.lineTo(bx + bl * Math.cos(0.8), -bl * Math.sin(0.8));
      });
      g.stroke(); g.restore();
    }
    g.beginPath(); g.arc(0, 0, 6, 0, Math.PI * 2); g.fill();
    g.restore();
  }

  function drawTree(g) {
    g.lineJoin = 'round';
    g.fillStyle = '#7b4a24'; g.fillRect(42, 80, 12, 14);
    g.fillStyle = '#2f9e5a'; g.strokeStyle = '#1f7a44'; g.lineWidth = 2.5;
    [[12, 44, 24], [26, 64, 32], [42, 86, 40]].forEach(function (L) {
      g.beginPath(); g.moveTo(48, L[0]); g.lineTo(48 + L[2], L[1]); g.lineTo(48 - L[2], L[1]);
      g.closePath(); g.fill(); g.stroke();
    });
    g.fillStyle = '#ffd54f'; g.strokeStyle = '#e0a800'; g.lineWidth = 1.5;
    starPath(g, 48, 11, 10, 4.5, 5); g.fill(); g.stroke();
    [[41, 38, '#e53935'], [57, 58, '#ffd54f'], [35, 70, '#4fc3f7'], [61, 78, '#e53935'], [46, 54, '#ffd54f']]
      .forEach(function (o) { g.fillStyle = o[2]; g.beginPath(); g.arc(o[0], o[1], 3.6, 0, Math.PI * 2); g.fill(); });
  }

  function drawSnowman(g) {
    g.lineCap = 'round'; g.lineJoin = 'round';
    g.strokeStyle = '#6d4c41'; g.lineWidth = 3;
    g.beginPath(); g.moveTo(28, 62); g.lineTo(10, 52); g.moveTo(68, 62); g.lineTo(86, 52); g.stroke();
    g.fillStyle = '#ffffff'; g.strokeStyle = '#8fc3e6'; g.lineWidth = 2.5;
    g.beginPath(); g.arc(48, 71, 24, 0, Math.PI * 2); g.fill(); g.stroke();
    g.beginPath(); g.arc(48, 37, 17, 0, Math.PI * 2); g.fill(); g.stroke();
    g.fillStyle = '#e53935';
    g.fillRect(31, 50, 34, 7); g.fillRect(56, 54, 7, 16);
    g.fillStyle = '#222';
    g.fillRect(32, 18, 32, 5); g.fillRect(38, 4, 20, 15);
    g.fillStyle = '#e53935'; g.fillRect(38, 12, 20, 4);
    g.fillStyle = '#222';
    g.beginPath(); g.arc(42, 34, 2.2, 0, Math.PI * 2); g.arc(54, 34, 2.2, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#ff8a3d'; g.beginPath(); g.moveTo(48, 37); g.lineTo(63, 41); g.lineTo(48, 43); g.closePath(); g.fill();
    g.fillStyle = '#333';
    g.beginPath(); g.arc(48, 67, 2.6, 0, Math.PI * 2); g.arc(48, 78, 2.6, 0, Math.PI * 2); g.fill();
  }

  /* ---- pre-drawn sprites: fast, because shapes are drawn once and reused ---- */
  function makeSprite(shape, color, emoji) {
    if (FIXED[shape]) color = '';
    var key = shape + '|' + color + '|' + (emoji || '');
    if (spriteCache[key]) return spriteCache[key];
    var S = 96, m = S / 2, c = document.createElement('canvas'), grad;
    c.width = c.height = S;
    var g = c.getContext('2d');

    if (shape === 'diya') drawDiya(g);
    else if (shape === 'kandil') drawKandil(g, color);
    else if (shape === 'snowflake') drawSnowflake(g, color);
    else if (shape === 'tree') drawTree(g);
    else if (shape === 'snowman') drawSnowman(g);
    else if (shape === 'glow') {
      grad = g.createRadialGradient(m, m, 0, m, m, m);
      grad.addColorStop(0, '#ffffff'); grad.addColorStop(0.18, color); grad.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grad; g.fillRect(0, 0, S, S);
    } else if (shape === 'spark') {
      grad = g.createRadialGradient(m, m, 0, m, m, m);
      grad.addColorStop(0, color); grad.addColorStop(0.4, color); grad.addColorStop(1, rgba(color, 0));
      g.fillStyle = grad; g.fillRect(0, 0, S, S);
    } else if (shape === 'circle') {
      g.fillStyle = color; g.beginPath(); g.arc(m, m, m * 0.7, 0, Math.PI * 2); g.fill();
    } else if (shape === 'confetti') {
      g.fillStyle = color; g.fillRect(m - 30, m - 16, 60, 32);
    } else if (shape === 'star') {
      g.fillStyle = color; starPath(g, m, m, m * 0.92, m * 0.42, 5); g.fill();
    } else if (shape === 'sparkle') {
      grad = g.createRadialGradient(m, m, 0, m, m, m);
      grad.addColorStop(0, 'rgba(255,255,255,.55)'); grad.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grad; g.fillRect(0, 0, S, S);
      g.fillStyle = color; g.beginPath(); g.moveTo(m, 3);
      g.quadraticCurveTo(m, m, S - 3, m); g.quadraticCurveTo(m, m, m, S - 3);
      g.quadraticCurveTo(m, m, 3, m); g.quadraticCurveTo(m, m, m, 3); g.fill();
    } else if (shape === 'emoji') {
      g.font = '68px serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(emoji, m, m + 4);
    }
    spriteCache[key] = c;
    return c;
  }

  /* ------------------------------ falling shapes ----------------------------- */
  function makeParticle(spread) {
    var shape = pick(theme.shapes), color = pick(theme.colors);
    var up = theme.direction === 'up';
    var sz = (theme.shapeSize && theme.shapeSize[shape]) || theme.size;
    var size = rand(sz[0], sz[1]);
    var upright = !!UPRIGHT[shape], tw = 0, depth = 0;
    if (FLICKER[shape]) { tw = rand(5, 9); depth = 0.22; }
    else if (theme.twinkle && (shape === 'sparkle' || shape === 'glow' || shape === 'star')) { tw = rand(1.2, 3.2); depth = 0.65; }
    return {
      x: rand(0, W), y: spread ? rand(0, H) : (up ? H + size : -size),
      size: size,
      vy: rand(theme.speed[0], theme.speed[1]) * (up ? -1 : 1),
      amp: theme.sway ? rand(theme.sway * 0.4, theme.sway) : 0,
      freq: rand(0.4, 1.2), phase: rand(0, Math.PI * 2),
      rot: upright ? 0 : rand(0, Math.PI * 2),
      vr: (theme.spin && !upright) ? rand(-0.8, 0.8) : 0,
      upright: upright, tw: tw, depth: depth, twp: rand(0, Math.PI * 2),
      a: rand(0.7, 1),
      sprite: makeSprite(shape, color, shape === 'emoji' ? pick(theme.emojis || ['✨']) : '')
    };
  }

  /* ------------------------------ firework bursts ---------------------------- */
  function spawnBurst() {
    var b = theme.bursts;
    var cx = rand(W * 0.12, W * 0.88), cy = rand(H * 0.1, H * 0.5);
    var n = Math.round(rand(b.count[0], b.count[1]) * Math.max(0.5, Math.min(1, W / 1200)) * SETTINGS.intensity);
    var c1 = pick(b.colors), c2 = pick(b.colors);
    sparks.push({ x: cx, y: cy, vx: 0, vy: 0, life: 0.4, max: 0.4, size: 120, a: 0.4,
                  sprite: makeSprite('glow', c1), trail: false });
    for (var i = 0; i < n; i++) {
      var ang = (Math.PI * 2 * i) / n + rand(-0.08, 0.08), sp = rand(b.speed[0], b.speed[1]);
      var life = rand(b.life[0], b.life[1]);
      sparks.push({ x: cx, y: cy, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp,
                    life: life, max: life, size: rand(b.size[0], b.size[1]), a: 1,
                    sprite: makeSprite('spark', i % 3 ? c1 : c2), trail: true });
    }
    if (sparks.length > 400) sparks.splice(0, sparks.length - 400);
  }

  function drawSprite(sp, x, y, size, alpha) {
    ctx.globalAlpha = alpha;
    ctx.setTransform(dpr, 0, 0, dpr, x * dpr, y * dpr);
    ctx.drawImage(sp, -size / 2, -size / 2, size, size);
  }

  function updateSparks(dt) {
    var b = theme.bursts, i, s;
    clock += dt;
    if (clock >= nextBurst) { spawnBurst(); nextBurst = clock + rand(b.gap[0], b.gap[1]); }
    var drag = Math.pow(0.35, dt);
    for (i = sparks.length - 1; i >= 0; i--) {
      s = sparks[i];
      s.life -= dt;
      if (s.life <= 0) { sparks.splice(i, 1); continue; }
      s.vx *= drag; s.vy = s.vy * drag + b.gravity * dt;
      s.x += s.vx * dt; s.y += s.vy * dt;
      var f = s.life / s.max, al = s.a * f * SETTINGS.opacity;
      drawSprite(s.sprite, s.x, s.y, s.size * (s.trail ? (0.55 + 0.45 * f) : (1.6 - 0.6 * f)), al);
      if (s.trail) {
        drawSprite(s.sprite, s.x - s.vx * 0.02, s.y - s.vy * 0.02, s.size * 0.7 * f, al * 0.5);
        drawSprite(s.sprite, s.x - s.vx * 0.04, s.y - s.vy * 0.04, s.size * 0.45 * f, al * 0.25);
      }
    }
  }

  /* --------------------------------- main loop -------------------------------- */
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
      if (p.tw) alpha *= (1 - p.depth) + p.depth * (0.5 + 0.5 * Math.sin(p.twp));
      var rot = p.upright ? Math.sin(p.phase) * 0.22 : p.rot;
      var cs = Math.cos(rot) * dpr, sn = Math.sin(rot) * dpr;
      ctx.globalAlpha = alpha;
      ctx.setTransform(cs, sn, -sn, cs, x * dpr, p.y * dpr);
      ctx.drawImage(p.sprite, -p.size / 2, -p.size / 2, p.size, p.size);
    }
    if (theme.bursts) updateSparks(dt);
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
    particles = []; sparks = []; clock = 0; nextBurst = 0.6;
    resize();
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