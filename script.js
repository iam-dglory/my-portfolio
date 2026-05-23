(function(){
'use strict';

/* ═══════════════════════════════════════════════
   BOOT SEQUENCE
═══════════════════════════════════════════════ */
const STEPS = [
  {tag:'[INIT]', cls:'',     msg:'Loading GOPIKA.exe — multi-agent human system...'},
  {tag:'[OK]',   cls:'ok',   msg:'Master of Artificial Intelligence — RMIT University active'},
  {tag:'[OK]',   cls:'ok',   msg:'Co-Founder credentials verified — AI Chroney'},
  {tag:'[OK]',   cls:'ok',   msg:'NVIDIA autonomous vehicle data pipelines connected'},
  {tag:'[OK]',   cls:'ok',   msg:'Prompt Engineering agent — Raamya.ai loaded'},
  {tag:'[OK]',   cls:'ok',   msg:'Robotics & Embedded module armed — Coamedkares'},
  {tag:'[OK]',   cls:'ok',   msg:'Marketing & Growth stack — AI Chroney operational'},
  {tag:'[WARN]', cls:'warn', msg:'8 agent modules detected — exceeds standard single hire'},
  {tag:'[SYS]',  cls:'ok',   msg:'All systems nominal. Deploying interface...'},
];
const bootLog = document.getElementById('boot-log');
const bootBar = document.getElementById('boot-bar');
const bootPct = document.getElementById('boot-pct');
const bootOverlay = document.getElementById('boot-overlay');
const nav = document.getElementById('nav');
let si = 0;

function bootStep(){
  if(si >= STEPS.length){
    setTimeout(()=>{
      bootOverlay.classList.add('hide');
      nav.classList.add('visible');
      setTimeout(()=>{ bootOverlay.style.display='none'; }, 950);
      startHeroCanvas();
      startBgCanvas();
      initTerminal();
      initParallax();
    }, 350);
    return;
  }
  const s = STEPS[si];
  const line = document.createElement('div');
  line.className = 'boot-log-line';
  line.innerHTML = `<span class="blog-tag ${s.cls}">${s.tag}</span><span>${s.msg}</span>`;
  bootLog.appendChild(line);
  requestAnimationFrame(()=> line.classList.add('show'));
  const pct = Math.round(((si+1)/STEPS.length)*100);
  bootBar.style.width = pct+'%';
  bootPct.textContent = pct+'%';
  si++;
  setTimeout(bootStep, si===1 ? 220 : 260 + Math.random()*80);
}
setTimeout(bootStep, 300);

/* ═══════════════════════════════════════════════
   SCROLL-DRIVEN NEBULA BACKGROUND
═══════════════════════════════════════════════ */
function startBgCanvas(){
  const c = document.getElementById('bg-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let W, H, scrollY = 0;
  function resize(){ W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', ()=>{ scrollY = window.scrollY; }, {passive:true});

  const blobs = [
    {x:.12, y:.18, r:.42, hue:185, speed:.00016, phase:0},
    {x:.88, y:.1,  r:.32, hue:195, speed:.00021, phase:1.6},
    {x:.5,  y:.52, r:.44, hue:270, speed:.00014, phase:3.1},
    {x:.05, y:.82, r:.30, hue:185, speed:.00019, phase:4.7},
    {x:.92, y:.78, r:.26, hue:150, speed:.00017, phase:2.2},
  ];
  let t = 0;
  function draw(){
    t++;
    ctx.clearRect(0,0,W,H);
    const maxScroll = Math.max(1, document.body.scrollHeight - H);
    const sf = scrollY / maxScroll;
    const hShift = sf * 90;
    blobs.forEach(b=>{
      const ox = Math.sin(t*b.speed + b.phase)*0.08;
      const oy = Math.cos(t*b.speed*1.3 + b.phase)*0.06;
      const cx = (b.x+ox)*W;
      const cy = (b.y+oy)*H - scrollY*0.03;
      const rad = b.r * Math.max(W,H);
      const hue = (b.hue + hShift) % 360;
      const g = ctx.createRadialGradient(cx,cy,0,cx,cy,rad);
      g.addColorStop(0, `hsla(${hue},100%,55%,0.06)`);
      g.addColorStop(.5,`hsla(${hue},90%,50%,0.028)`);
      g.addColorStop(1, `hsla(${hue},80%,40%,0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx,cy,rad,0,Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ═══════════════════════════════════════════════
   HERO PARTICLE CANVAS
═══════════════════════════════════════════════ */
function startHeroCanvas(){
  const c = document.getElementById('hero-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let W, H;
  function resize(){ W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
  const COLS = ['#00e5ff','#00ff94','#ffb300','#ae52f4'];
  const pts = Array.from({length:70},()=>({
    x:Math.random()*1920, y:Math.random()*1080,
    vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.22,
    r:Math.random()*1.1+.3, a:Math.random()*.4+.07,
    c:COLS[Math.floor(Math.random()*COLS.length)]
  }));
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.c; ctx.globalAlpha=p.a; ctx.fill();
    });
    ctx.globalAlpha=1;
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<120){
        ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
        ctx.strokeStyle='#00e5ff'; ctx.globalAlpha=(1-d/120)*.06;
        ctx.lineWidth=.5; ctx.stroke();
      }
    }
    ctx.globalAlpha=1;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ═══════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════ */
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled', window.scrollY > 40);
},{passive:true});
const toggle = document.getElementById('nav-toggle');
if(toggle) toggle.addEventListener('click',()=> nav.classList.toggle('mobile-open'));
document.querySelectorAll('.nav-links a').forEach(a=> a.addEventListener('click',()=> nav.classList.remove('mobile-open')));

/* ═══════════════════════════════════════════════
   COUNTERS
═══════════════════════════════════════════════ */
function animCounters(){
  document.querySelectorAll('.counter[data-target]').forEach(el=>{
    const target = parseInt(el.dataset.target,10);
    const start = performance.now(), dur = 1400;
    function step(now){
      const p = Math.min((now-start)/dur,1);
      el.textContent = Math.floor((1-Math.pow(1-p,3))*target);
      if(p<1) requestAnimationFrame(step); else el.textContent=target;
    }
    requestAnimationFrame(step);
  });
}
const cObs = new IntersectionObserver(e=>{ e.forEach(en=>{ if(en.isIntersecting){ animCounters(); cObs.disconnect(); }}); },{threshold:.5});
const hm = document.querySelector('.hero-metrics');
if(hm) cObs.observe(hm);

/* ═══════════════════════════════════════════════
   TERMINAL TYPEWRITER
═══════════════════════════════════════════════ */
function initTerminal(){
  const body = document.getElementById('terminal-body');
  if(!body) return;
  body.innerHTML='';
  const LINES = [
    {type:'prompt', cmd:'query --profile gopika.aravind --format json'},
    {type:'out', html:'{'},
    {type:'out', html:`  <span class="t-key">"name"</span>: <span class="t-str">"Gopika Aravind"</span>,`},
    {type:'out', html:`  <span class="t-key">"base"</span>: <span class="t-str">"Melbourne, Australia"</span>,`},
    {type:'out', html:`  <span class="t-key">"education"</span>: <span class="t-str">"M.AI @ RMIT | B.E Electronics CGPA 4.15/5"</span>,`},
    {type:'out', html:`  <span class="t-key">"companies_co_founded"</span>: <span class="t-val">["AI Chroney"]</span>,`},
    {type:'out', html:`  <span class="t-key">"worked_at"</span>: <span class="t-val">["NVIDIA","Raamya.ai","Superprof","Coamedkares"]</span>,`},
    {type:'out', html:`  <span class="t-key">"agent_modules"</span>: <span class="t-val">8</span>,`},
    {type:'out', html:`  <span class="t-key">"team_managed"</span>: <span class="t-val">"50+ members"</span>,`},
    {type:'out', html:`  <span class="t-key">"status"</span>: <span class="t-str">"AVAILABLE FOR DEPLOYMENT"</span>`},
    {type:'out', html:'}'},
    {type:'blank'},
    {type:'prompt', cmd:'query --why-different'},
    {type:'out', html:`<span class="t-str">"You don't hire five people. You deploy one system.</span>`},
    {type:'out', html:`<span class="t-str"> PM + AI Engineer + Growth + Ops + Design + Sales.</span>`},
    {type:'out', html:`<span class="t-str"> I am not a candidate. I am a team compressed into one human."</span>`},
    {type:'cursor'},
  ];
  let i=0;
  function next(){
    if(i>=LINES.length) return;
    const l=LINES[i++];
    const div=document.createElement('div'); div.className='t-line';
    if(l.type==='prompt'){
      div.innerHTML=`<span class="t-prompt">$</span> <span class="t-cmd"></span><span class="t-caret"></span>`;
      body.appendChild(div);
      const ce=div.querySelector('.t-cmd'), cr=div.querySelector('.t-caret');
      let j=0;
      function tick(){ if(j<l.cmd.length){ ce.textContent+=l.cmd[j++]; setTimeout(tick,26+Math.random()*14); } else{ cr.classList.add('hidden'); setTimeout(next,100); } }
      tick();
    } else if(l.type==='out'){
      div.innerHTML=`<span class="t-out">${l.html}</span>`;
      body.appendChild(div); body.scrollTop=body.scrollHeight; setTimeout(next,55);
    } else if(l.type==='blank'){
      body.appendChild(div); setTimeout(next,180);
    } else {
      div.innerHTML=`<span class="t-prompt">$</span> <span class="t-caret"></span>`;
      body.appendChild(div);
    }
    body.scrollTop=body.scrollHeight;
  }
  next();
}

/* ═══════════════════════════════════════════════
   PARALLAX — hero photo + section headings
═══════════════════════════════════════════════ */
function initParallax(){
  const photoPanel = document.querySelector('.hero-photo-panel');
  window.addEventListener('scroll',()=>{
    const sy = window.scrollY;
    if(photoPanel) photoPanel.style.transform = `translateY(${sy*0.12}px)`;
  },{passive:true});
}

/* ═══════════════════════════════════════════════
   MAGNETIC BUTTONS
═══════════════════════════════════════════════ */
document.querySelectorAll('.btn-primary,.btn-ghost,.nav-cta').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top  - r.height/2;
    btn.style.transform = `translate(${x*.18}px,${y*.18}px)`;
  });
  btn.addEventListener('mouseleave',()=>{ btn.style.transform=''; });
});

/* ═══════════════════════════════════════════════
   SCROLL REVEAL — staggered with slide directions
═══════════════════════════════════════════════ */
const srObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      setTimeout(()=> e.target.classList.add('in'), parseInt(e.target.dataset.delay||0));
      srObs.unobserve(e.target);
    }
  });
},{threshold:.08, rootMargin:'0px 0px -20px 0px'});

function register(){
  // Agent cards — slide up with stagger
  document.querySelectorAll('.agent-card').forEach((el,i)=>{
    el.classList.add('sr','sr-up'); el.dataset.delay=i*65; srObs.observe(el);
  });
  // Exp items — slide from left
  document.querySelectorAll('.exp-item').forEach((el,i)=>{
    el.classList.add('sr','sr-left'); el.dataset.delay=i*80; srObs.observe(el);
  });
  // Project cards — alternating slide
  document.querySelectorAll('.proj-card').forEach((el,i)=>{
    el.classList.add('sr', i%2===0?'sr-up':'sr-right'); el.dataset.delay=i*70; srObs.observe(el);
  });
  // Skill rows — slide from right
  document.querySelectorAll('.skill-row').forEach((el,i)=>{
    el.classList.add('sr','sr-right'); el.dataset.delay=i*25; srObs.observe(el);
  });
  // Section intros — fade + scale
  document.querySelectorAll('.section-intro,.contact-left,.contact-right').forEach(el=>{
    el.classList.add('sr','sr-scale'); srObs.observe(el);
  });
  // Skill cats — slide up
  document.querySelectorAll('.skill-cat').forEach((el,i)=>{
    el.classList.add('sr','sr-up'); el.dataset.delay=i*100; srObs.observe(el);
  });
  // Contact rows
  document.querySelectorAll('.contact-row').forEach((el,i)=>{
    el.classList.add('sr','sr-left'); el.dataset.delay=i*80; srObs.observe(el);
  });
  // Marquee — fade in
  const mq = document.querySelector('.marquee-strip');
  if(mq){ mq.classList.add('sr','sr-up'); srObs.observe(mq); }
}
register();

/* ═══════════════════════════════════════════════
   AGENT CARD TILT
═══════════════════════════════════════════════ */
document.querySelectorAll('.agent-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform = '';
  });
});

/* ═══════════════════════════════════════════════
   SECTION HEADING SPLIT-TEXT REVEAL
═══════════════════════════════════════════════ */
function splitHeadings(){
  document.querySelectorAll('.section-heading').forEach(h=>{
    const html = h.innerHTML;
    // wrap each word in a span
    h.innerHTML = html.replace(/(<br\s*\/?>)|(\S+)/g, (match, br, word)=>{
      if(br) return br;
      return `<span class="word-wrap"><span class="word-inner">${word}</span></span>`;
    });
  });
  // observe each heading
  const hObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.querySelectorAll('.word-inner').forEach((w,i)=>{
          w.style.transitionDelay = (i*0.08)+'s';
          w.classList.add('word-revealed');
        });
        hObs.unobserve(e.target);
      }
    });
  },{threshold:.3});
  document.querySelectorAll('.section-heading').forEach(h=> hObs.observe(h));
}
splitHeadings();

/* ═══════════════════════════════════════════════
   GLITCH on hero name — random micro-glitch
═══════════════════════════════════════════════ */
function initGlitch(){
  const name = document.querySelector('.hero-name');
  if(!name) return;
  function glitch(){
    name.classList.add('glitching');
    setTimeout(()=> name.classList.remove('glitching'), 200);
    setTimeout(glitch, 3000 + Math.random()*5000);
  }
  setTimeout(glitch, 5000);
}
// run after boot
setTimeout(initGlitch, 5000);

/* ═══════════════════════════════════════════════
   CURSOR TRAIL
═══════════════════════════════════════════════ */
function initCursorTrail(){
  if(window.innerWidth < 768) return;
  const trail = [];
  const N = 8;
  for(let i=0;i<N;i++){
    const d = document.createElement('div');
    d.className = 'cursor-trail';
    d.style.cssText = `position:fixed;pointer-events:none;z-index:9999;border-radius:50%;transition:opacity .3s;opacity:0`;
    document.body.appendChild(d);
    trail.push({el:d, x:0, y:0});
  }
  let mx=0, my=0;
  document.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; });
  function animate(){
    trail.forEach((t,i)=>{
      const prev = i===0 ? {x:mx,y:my} : trail[i-1];
      t.x += (prev.x - t.x) * (0.35 - i*0.025);
      t.y += (prev.y - t.y) * (0.35 - i*0.025);
      const size = Math.max(2, 8 - i*0.8);
      const alpha = (1 - i/N) * 0.5;
      t.el.style.cssText = `position:fixed;pointer-events:none;z-index:9999;border-radius:50%;` +
        `left:${t.x - size/2}px;top:${t.y - size/2}px;` +
        `width:${size}px;height:${size}px;` +
        `background:rgba(0,229,255,${alpha});` +
        `box-shadow:0 0 ${size*2}px rgba(0,229,255,${alpha*0.5})`;
    });
    requestAnimationFrame(animate);
  }
  animate();
}
initCursorTrail();

/* ═══════════════════════════════════════════════
   SECTION PROGRESS BAR
═══════════════════════════════════════════════ */
function initProgressBar(){
  const bar = document.createElement('div');
  bar.style.cssText='position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--cyan),var(--green));z-index:600;transition:width .1s;width:0%;box-shadow:0 0 8px rgba(0,229,255,.6)';
  document.body.appendChild(bar);
  window.addEventListener('scroll',()=>{
    const max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY/max*100)+'%';
  },{passive:true});
}
initProgressBar();

/* ═══════════════════════════════════════════════
   STAGGER NUMBER TICKER for exp dates
═══════════════════════════════════════════════ */
function initExpNodes(){
  const nodes = document.querySelectorAll('.exp-node');
  const nObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('node-ping');
        nObs.unobserve(e.target);
      }
    });
  },{threshold:.8});
  nodes.forEach(n=> nObs.observe(n));
}
initExpNodes();

})();

/* Terminal visibility trigger */
(function(){
  const tc = document.querySelector('.terminal-container');
  if(!tc) return;
  const o = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ tc.classList.add('visible'); o.disconnect(); } });
  },{threshold:.3});
  o.observe(tc);
})();
