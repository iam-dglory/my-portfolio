(function(){
'use strict';

/* ─────────────────────── BOOT ─────────────────────── */
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

/* ─────────────────────── SCROLL BG CANVAS ─────────────────────── */
// A scene of slowly-rotating nebula-like colour blobs that shift hue as you scroll
function startBgCanvas(){
  const c = document.getElementById('bg-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let W, H, scrollY = 0;

  function resize(){ W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', ()=>{ scrollY = window.scrollY; }, {passive:true});

  // Blobs that travel/morph
  const blobs = [
    {x:.15,y:.2,  r:.38, hue:185, speed:.00018, phase:0},
    {x:.85,y:.1,  r:.30, hue:195, speed:.00022, phase:1.5},
    {x:.5, y:.55, r:.42, hue:270, speed:.00015, phase:3},
    {x:.05,y:.8,  r:.28, hue:185, speed:.00020, phase:4.5},
    {x:.9, y:.75, r:.25, hue:150, speed:.00017, phase:2},
  ];

  let t = 0;
  function draw(){
    t++;
    ctx.clearRect(0,0,W,H);

    // scroll-driven hue shift: 0–360 as user scrolls full page
    const maxScroll = document.body.scrollHeight - H;
    const scrollFrac = maxScroll > 0 ? scrollY / maxScroll : 0;
    const hueShift = scrollFrac * 80; // shifts up to 80deg across page

    blobs.forEach(b=>{
      const ox = Math.sin(t * b.speed + b.phase) * 0.07;
      const oy = Math.cos(t * b.speed * 1.3 + b.phase) * 0.06;
      const cx = (b.x + ox) * W;
      const cy = (b.y + oy) * H - scrollY * 0.04;
      const rad = b.r * Math.max(W, H);
      const hue = (b.hue + hueShift) % 360;

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      g.addColorStop(0, `hsla(${hue},100%,55%,0.055)`);
      g.addColorStop(0.5,`hsla(${hue},90%,50%,0.025)`);
      g.addColorStop(1, `hsla(${hue},80%,40%,0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI*2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* ─────────────────────── HERO CANVAS ─────────────────────── */
function startHeroCanvas(){
  const c = document.getElementById('hero-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let W, H;
  function resize(){ W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);

  const COLS = ['#00e5ff','#00ff94','#ffb300','#ae52f4'];
  const pts = Array.from({length:65},()=>({
    x: Math.random()*1920, y: Math.random()*1080,
    vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.22,
    r: Math.random()*1.1+.3, a: Math.random()*.4+.07,
    c: COLS[Math.floor(Math.random()*COLS.length)]
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
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){
          ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
          ctx.strokeStyle='#00e5ff'; ctx.globalAlpha=(1-d/120)*.06;
          ctx.lineWidth=.5; ctx.stroke();
        }
      }
    }
    ctx.globalAlpha=1;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ─────────────────────── NAV SCROLL ─────────────────────── */
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, {passive:true});
const toggle = document.getElementById('nav-toggle');
if(toggle) toggle.addEventListener('click',()=> nav.classList.toggle('mobile-open'));
document.querySelectorAll('.nav-links a').forEach(a=> a.addEventListener('click',()=> nav.classList.remove('mobile-open')));

/* ─────────────────────── COUNTERS ─────────────────────── */
function animCounters(){
  document.querySelectorAll('.counter[data-target]').forEach(el=>{
    const target = parseInt(el.dataset.target,10);
    const start = performance.now();
    const dur = 1200;
    function step(now){
      const p = Math.min((now-start)/dur,1);
      const e = 1-Math.pow(1-p,3);
      el.textContent = Math.floor(e*target);
      if(p<1) requestAnimationFrame(step);
      else el.textContent = target+(el.dataset.suffix||'');
    }
    requestAnimationFrame(step);
  });
}
const cObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ animCounters(); cObs.disconnect(); }});
},{threshold:.5});
const hm = document.querySelector('.hero-metrics');
if(hm) cObs.observe(hm);

/* ─────────────────────── TERMINAL ─────────────────────── */
function initTerminal(){
  const body = document.getElementById('terminal-body');
  if(!body) return;
  body.innerHTML = '';
  const LINES = [
    {type:'prompt', cmd:'query --profile gopika.aravind --format json'},
    {type:'out', html:'{'},
    {type:'out', html:`  <span class="t-key">"name"</span>: <span class="t-str">"Gopika Aravind"</span>,`},
    {type:'out', html:`  <span class="t-key">"base"</span>: <span class="t-str">"Melbourne, Australia"</span>,`},
    {type:'out', html:`  <span class="t-key">"education"</span>: <span class="t-str">"M.AI @ RMIT | B.E Electronics CGPA 4.15/5"</span>,`},
    {type:'out', html:`  <span class="t-key">"companies_co_founded"</span>: <span class="t-val">["AI Chroney"]</span>,`},
    {type:'out', html:`  <span class="t-key">"worked_at"</span>: <span class="t-val">["NVIDIA", "Raamya.ai", "Superprof", "Coamedkares"]</span>,`},
    {type:'out', html:`  <span class="t-key">"roles"</span>: <span class="t-val">["Product", "AI Engineer", "Growth", "Ops", "Prompt Eng", "Robotics", "Design", "Sales"]</span>,`},
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
    const div=document.createElement('div');
    div.className='t-line';
    if(l.type==='prompt'){
      div.innerHTML=`<span class="t-prompt">$</span> <span class="t-cmd"></span><span class="t-caret"></span>`;
      body.appendChild(div);
      const ce=div.querySelector('.t-cmd'), cr=div.querySelector('.t-caret');
      let j=0;
      function tick(){ if(j<l.cmd.length){ ce.textContent+=l.cmd[j++]; setTimeout(tick,26+Math.random()*14); }else{ cr.classList.add('hidden'); setTimeout(next,100); } }
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

/* ─────────────────────── SCROLL REVEAL ─────────────────────── */
const srObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const delay = e.target.dataset.delay||0;
      setTimeout(()=> e.target.classList.add('in'), parseInt(delay));
      srObs.unobserve(e.target);
    }
  });
},{threshold:.08, rootMargin:'0px 0px -30px 0px'});

function register(){
  document.querySelectorAll('.agent-card').forEach((el,i)=>{ el.classList.add('sr'); el.dataset.delay=i*60; srObs.observe(el); });
  document.querySelectorAll('.exp-item').forEach((el,i)=>{ el.classList.add('sr'); el.dataset.delay=i*90; srObs.observe(el); });
  document.querySelectorAll('.proj-card').forEach((el,i)=>{ el.classList.add('sr'); el.dataset.delay=i*75; srObs.observe(el); });
  document.querySelectorAll('.skill-row').forEach((el,i)=>{ el.classList.add('sr'); el.dataset.delay=i*28; srObs.observe(el); });
  document.querySelectorAll('.section-intro,.contact-left,.contact-right,.skill-cat').forEach(el=>{ el.classList.add('sr'); srObs.observe(el); });
}
register();

})();
