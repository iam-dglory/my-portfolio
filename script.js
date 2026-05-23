/* script.js — GOPIKA.EXE portfolio */
(function () {
  'use strict';

  /* ── BOOT SEQUENCE ─────────────────────────────────────── */
  const BOOT_STEPS = [
    { tag: '[INIT]',  cls: '',     msg: 'Loading GOPIKA.exe — multi-agent human system...' },
    { tag: '[OK]',    cls: 'ok',   msg: 'Master of Artificial Intelligence module — RMIT active' },
    { tag: '[OK]',    cls: 'ok',   msg: 'Co-Founder credentials verified — AI Chroney' },
    { tag: '[OK]',    cls: 'ok',   msg: 'NVIDIA autonomous vehicle data pipelines connected' },
    { tag: '[OK]',    cls: 'ok',   msg: 'Prompt Engineering agent — Raamya.ai loaded' },
    { tag: '[OK]',    cls: 'ok',   msg: 'Robotics & Embedded module — Coamedkares armed' },
    { tag: '[OK]',    cls: 'ok',   msg: 'Marketing & Growth stack — AI Chroney operational' },
    { tag: '[WARN]',  cls: 'warn', msg: '8 agent modules detected — exceeds standard single hire' },
    { tag: '[SYS]',   cls: 'ok',   msg: 'All systems nominal. Deploying interface...' },
  ];

  const bootLog = document.getElementById('boot-log');
  const bootBar = document.getElementById('boot-bar');
  const bootPct = document.getElementById('boot-pct');
  const bootOverlay = document.getElementById('boot-overlay');
  const nav = document.getElementById('nav');

  let stepIndex = 0;
  function runBootStep() {
    if (stepIndex >= BOOT_STEPS.length) {
      // all steps done — dismiss
      setTimeout(() => {
        bootOverlay.classList.add('hide');
        nav.classList.add('visible');
        setTimeout(() => { bootOverlay.style.display = 'none'; }, 950);
        startParticles();
        initTerminal();
      }, 400);
      return;
    }
    const s = BOOT_STEPS[stepIndex];
    const line = document.createElement('div');
    line.className = 'boot-log-line';
    line.innerHTML = `<span class="blog-tag ${s.cls}">${s.tag}</span><span>${s.msg}</span>`;
    bootLog.appendChild(line);
    requestAnimationFrame(() => line.classList.add('show'));

    const pct = Math.round(((stepIndex + 1) / BOOT_STEPS.length) * 100);
    bootBar.style.width = pct + '%';
    bootPct.textContent = pct + '%';

    stepIndex++;
    setTimeout(runBootStep, stepIndex === 1 ? 250 : 280 + Math.random() * 80);
  }

  // Boot canvas — scanline + glitch lines
  (function initBootCanvas() {
    const bc = document.getElementById('boot-canvas');
    const bctx = bc.getContext('2d');
    bc.width = window.innerWidth;
    bc.height = window.innerHeight;

    function drawBootBg() {
      bctx.clearRect(0, 0, bc.width, bc.height);
      // subtle grid
      bctx.strokeStyle = 'rgba(0,229,255,0.03)';
      bctx.lineWidth = 1;
      const gs = 60;
      for (let x = 0; x < bc.width; x += gs) {
        bctx.beginPath(); bctx.moveTo(x, 0); bctx.lineTo(x, bc.height); bctx.stroke();
      }
      for (let y = 0; y < bc.height; y += gs) {
        bctx.beginPath(); bctx.moveTo(0, y); bctx.lineTo(bc.width, y); bctx.stroke();
      }
      requestAnimationFrame(drawBootBg);
    }
    drawBootBg();
  })();

  setTimeout(runBootStep, 300);

  /* ── NAV SCROLL ────────────────────────────────────────── */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => nav.classList.toggle('mobile-open'));
  }
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('mobile-open'));
  });

  /* ── HERO CANVAS PARTICLES ─────────────────────────────── */
  function startParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H;
    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['#00e5ff', '#00ff94', '#ffb300', '#ae52f4'];
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.4,
      a: Math.random() * 0.45 + 0.08,
      c: COLORS[Math.floor(Math.random() * COLORS.length)]
    }));

    // Large accent orbs
    const orbs = [
      { x: W * 0.8, y: -100, r: 350, c: 'rgba(0,229,255,0.035)', dx: 0.08, dy: 0.04 },
      { x: W * 0.1, y: H * 0.7, r: 260, c: 'rgba(174,82,244,0.025)', dx: -0.05, dy: -0.03 },
    ];

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // orbs
      orbs.forEach(o => {
        o.x += o.dx; o.y += o.dy;
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        grad.addColorStop(0, o.c);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // particles
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.a;
        ctx.fill();
      });

      // connections
      ctx.globalAlpha = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = '#00e5ff';
            ctx.globalAlpha = (1 - dist / 130) * 0.06;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ── COUNTER ANIMATION ─────────────────────────────────── */
  function animateCounters() {
    document.querySelectorAll('.counter[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1200;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + (el.dataset.suffix || '');
      }
      requestAnimationFrame(step);
    });
  }

  /* ── TERMINAL TYPEWRITER ───────────────────────────────── */
  function initTerminal() {
    const body = document.getElementById('terminal-body');
    if (!body) return;

    const LINES = [
      { type: 'prompt', cmd: 'query --profile gopika.aravind --format json' },
      { type: 'out', html: '{' },
      { type: 'out', html: '  <span class="t-key">"name"</span>: <span class="t-str">"Gopika Aravind"</span>,' },
      { type: 'out', html: '  <span class="t-key">"location"</span>: <span class="t-str">"Melbourne, Australia"</span>,' },
      { type: 'out', html: '  <span class="t-key">"education"</span>: <span class="t-str">"M.AI @ RMIT | B.E Electronics CGPA 4.15/5"</span>,' },
      { type: 'out', html: '  <span class="t-key">"companies_founded"</span>: <span class="t-val">["AI Chroney"]</span>,' },
      { type: 'out', html: '  <span class="t-key">"worked_at"</span>: <span class="t-val">["NVIDIA", "Raamya.ai", "Superprof", "Coamedkares"]</span>,' },
      { type: 'out', html: '  <span class="t-key">"agent_modules"</span>: <span class="t-val">8</span>,' },
      { type: 'out', html: '  <span class="t-key">"team_managed"</span>: <span class="t-val">"50+ members"</span>,' },
      { type: 'out', html: '  <span class="t-key">"status"</span>: <span class="t-str">"AVAILABLE FOR DEPLOYMENT"</span>' },
      { type: 'out', html: '}' },
      { type: 'blank' },
      { type: 'prompt', cmd: 'query --why-hire' },
      { type: 'out', html: '<span class="t-str">"You don\'t need five hires. You need one system.</span>' },
      { type: 'out', html: '<span class="t-str"> PM + AI Engineer + Growth + Ops + Design + Sales.</span>' },
      { type: 'out', html: '<span class="t-str"> I am not a candidate. I am a team compressed into one human."</span>' },
      { type: 'cursor' },
    ];

    // Clear default line
    body.innerHTML = '';

    let i = 0;
    function nextLine() {
      if (i >= LINES.length) return;
      const l = LINES[i++];
      const div = document.createElement('div');
      div.className = 't-line';

      if (l.type === 'prompt') {
        div.innerHTML = `<span class="t-prompt">$</span> <span class="t-cmd"></span><span class="t-caret"></span>`;
        body.appendChild(div);
        const cmdEl = div.querySelector('.t-cmd');
        const caretEl = div.querySelector('.t-caret');
        typeCommand(l.cmd, cmdEl, caretEl, () => {
          caretEl.classList.add('hidden');
          setTimeout(nextLine, 120);
        });
      } else if (l.type === 'out') {
        div.innerHTML = `<span class="t-out">${l.html}</span>`;
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
        setTimeout(nextLine, 60);
      } else if (l.type === 'blank') {
        body.appendChild(div);
        setTimeout(nextLine, 200);
      } else if (l.type === 'cursor') {
        div.innerHTML = `<span class="t-prompt">$</span> <span class="t-caret"></span>`;
        body.appendChild(div);
      }
      body.scrollTop = body.scrollHeight;
    }

    function typeCommand(text, el, caret, done) {
      let j = 0;
      function tick() {
        if (j < text.length) {
          el.textContent += text[j++];
          setTimeout(tick, 28 + Math.random() * 15);
        } else {
          done();
        }
      }
      tick();
    }

    nextLine();
  }

  /* ── SCROLL REVEAL ─────────────────────────────────────── */
  const srObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('in'), parseInt(delay));
        srObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  function registerRevealTargets() {
    // Agent cards
    document.querySelectorAll('.agent-card').forEach((el, i) => {
      el.classList.add('sr');
      el.dataset.delay = i * 65;
      srObserver.observe(el);
    });
    // Exp items
    document.querySelectorAll('.exp-item').forEach((el, i) => {
      el.classList.add('sr');
      el.dataset.delay = i * 100;
      srObserver.observe(el);
    });
    // Project cards
    document.querySelectorAll('.proj-card').forEach((el, i) => {
      el.classList.add('sr');
      el.dataset.delay = i * 80;
      srObserver.observe(el);
    });
    // Skill rows
    document.querySelectorAll('.skill-row').forEach((el, i) => {
      el.classList.add('sr');
      el.dataset.delay = i * 30;
      srObserver.observe(el);
    });
    // Section intros
    document.querySelectorAll('.section-intro, .contact-left, .contact-right').forEach(el => {
      el.classList.add('sr');
      el.dataset.delay = 0;
      srObserver.observe(el);
    });
  }

  // Counter triggers when hero-metrics enters view
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounters(); counterObs.disconnect(); }
    });
  }, { threshold: 0.5 });
  const heroMetrics = document.querySelector('.hero-metrics');
  if (heroMetrics) counterObs.observe(heroMetrics);

  registerRevealTargets();

})();
