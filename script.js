(function(){
'use strict';

/* ══ BOOT ══ */
const STEPS = [
  {tag:'[INIT]', cls:'',     msg:'Loading GOPIKA.exe — multi-agent human system...'},
  {tag:'[OK]',   cls:'ok',   msg:'M.AI @ RMIT University — active'},
  {tag:'[OK]',   cls:'ok',   msg:'Co-Founder credentials verified — AI Chroney'},
  {tag:'[OK]',   cls:'ok',   msg:'NVIDIA autonomous vehicle pipelines connected'},
  {tag:'[OK]',   cls:'ok',   msg:'Prompt Engineering agent — Raamya.ai loaded'},
  {tag:'[OK]',   cls:'ok',   msg:'Robotics module armed — Coamedkares'},
  {tag:'[OK]',   cls:'ok',   msg:'Marketing & Growth stack operational'},
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
      initGlitch();
      initCursorTrail();
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
  setTimeout(bootStep, si===1 ? 200 : 240 + Math.random()*80);
}
setTimeout(bootStep, 300);

/* ══ SCROLL BACKGROUND ══ */
function startBgCanvas(){
  const c = document.getElementById('bg-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let W, H, scrollY = 0;
  function resize(){ W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', ()=>{ scrollY = window.scrollY; },{passive:true});
  const blobs = [
    {x:.12,y:.18,r:.42,hue:185,speed:.00016,phase:0},
    {x:.88,y:.1, r:.32,hue:195,speed:.00021,phase:1.6},
    {x:.5, y:.52,r:.44,hue:270,speed:.00014,phase:3.1},
    {x:.05,y:.82,r:.30,hue:185,speed:.00019,phase:4.7},
    {x:.92,y:.78,r:.26,hue:150,speed:.00017,phase:2.2},
  ];
  let t = 0;
  function draw(){
    t++;
    ctx.clearRect(0,0,W,H);
    const sf = scrollY / Math.max(1, document.body.scrollHeight - H);
    const hShift = sf * 90;
    blobs.forEach(b=>{
      const ox = Math.sin(t*b.speed + b.phase)*0.08;
      const oy = Math.cos(t*b.speed*1.3 + b.phase)*0.06;
      const cx = (b.x+ox)*W;
      const cy = (b.y+oy)*H - scrollY*0.03;
      const rad = b.r * Math.max(W,H);
      const hue = (b.hue + hShift) % 360;
      const g = ctx.createRadialGradient(cx,cy,0,cx,cy,rad);
      g.addColorStop(0,`hsla(${hue},100%,55%,0.06)`);
      g.addColorStop(.5,`hsla(${hue},90%,50%,0.028)`);
      g.addColorStop(1,`hsla(${hue},80%,40%,0)`);
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,rad,0,Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ══ HERO PARTICLES ══ */
function startHeroCanvas(){
  const c = document.getElementById('hero-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let W, H;
  function resize(){ W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; }
  resize(); window.addEventListener('resize', resize);
  const COLS=['#00e5ff','#00ff94','#ffb300','#ae52f4'];
  const pts = Array.from({length:65},()=>({
    x:Math.random()*1920,y:Math.random()*1080,
    vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,
    r:Math.random()*1.1+.3,a:Math.random()*.38+.07,
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
      const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
      if(d<120){
        ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
        ctx.strokeStyle='#00e5ff'; ctx.globalAlpha=(1-d/120)*.06;
        ctx.lineWidth=.5; ctx.stroke();
      }
    }
    ctx.globalAlpha=1; requestAnimationFrame(draw);
  }
  draw();
}

/* ══ NAV ══ */
window.addEventListener('scroll',()=>{ nav.classList.toggle('scrolled',window.scrollY>40); },{passive:true});
const toggle=document.getElementById('nav-toggle');
if(toggle) toggle.addEventListener('click',()=>nav.classList.toggle('mobile-open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('mobile-open')));

/* ══ PAGE PROGRESS BAR ══ */
const pb=document.createElement('div');
pb.style.cssText='position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--cyan),var(--green));z-index:600;width:0%;box-shadow:0 0 8px rgba(0,229,255,.6);transition:width .1s;pointer-events:none';
document.body.appendChild(pb);
window.addEventListener('scroll',()=>{
  pb.style.width=(window.scrollY/Math.max(1,document.body.scrollHeight-window.innerHeight)*100)+'%';
},{passive:true});

/* ══ COUNTERS ══ */
function animCounters(){
  document.querySelectorAll('.counter[data-target]').forEach(el=>{
    const target=parseInt(el.dataset.target,10), dur=1400, start=performance.now();
    function step(now){ const p=Math.min((now-start)/dur,1); el.textContent=Math.floor((1-Math.pow(1-p,3))*target); if(p<1) requestAnimationFrame(step); else el.textContent=target; }
    requestAnimationFrame(step);
  });
}
const cObs=new IntersectionObserver(e=>{ e.forEach(en=>{ if(en.isIntersecting){ animCounters(); cObs.disconnect(); } }); },{threshold:.5});
const hm=document.querySelector('.hero-metrics'); if(hm) cObs.observe(hm);

/* ══ TERMINAL ══ */
function initTerminal(){
  const body=document.getElementById('terminal-body');
  if(!body) return;
  body.innerHTML='';
  const LINES=[
    {type:'prompt',cmd:'query --profile gopika.aravind'},
    {type:'out',html:'{'},
    {type:'out',html:`  <span class="t-key">"name"</span>: <span class="t-str">"Gopika Aravind"</span>,`},
    {type:'out',html:`  <span class="t-key">"base"</span>: <span class="t-str">"Melbourne, Australia"</span>,`},
    {type:'out',html:`  <span class="t-key">"education"</span>: <span class="t-str">"M.AI @ RMIT | B.E Electronics 4.15/5"</span>,`},
    {type:'out',html:`  <span class="t-key">"companies"</span>: <span class="t-val">["AI Chroney"]</span>,`},
    {type:'out',html:`  <span class="t-key">"worked_at"</span>: <span class="t-val">["NVIDIA","Raamya.ai","Superprof","Coamedkares"]</span>,`},
    {type:'out',html:`  <span class="t-key">"agents"</span>: <span class="t-val">8</span>,`},
    {type:'out',html:`  <span class="t-key">"status"</span>: <span class="t-str">"AVAILABLE"</span>`},
    {type:'out',html:'}'},
    {type:'blank'},
    {type:'prompt',cmd:'query --why-hire'},
    {type:'out',html:`<span class="t-str">"One headcount. Eight roles. You hire a system,</span>`},
    {type:'out',html:`<span class="t-str"> not just a person."</span>`},
    {type:'cursor'},
  ];
  let i=0;
  function next(){
    if(i>=LINES.length) return;
    const l=LINES[i++], div=document.createElement('div'); div.className='t-line';
    if(l.type==='prompt'){
      div.innerHTML=`<span class="t-prompt">$</span> <span class="t-cmd"></span><span class="t-caret"></span>`;
      body.appendChild(div);
      const ce=div.querySelector('.t-cmd'), cr=div.querySelector('.t-caret');
      let j=0;
      function tick(){ if(j<l.cmd.length){ ce.textContent+=l.cmd[j++]; setTimeout(tick,26+Math.random()*14); }else{ cr.classList.add('hidden'); setTimeout(next,100); } }
      tick();
    } else if(l.type==='out'){
      div.innerHTML=`<span class="t-out">${l.html}</span>`;
      body.appendChild(div); body.scrollTop=body.scrollHeight; setTimeout(next,52);
    } else if(l.type==='blank'){
      body.appendChild(div); setTimeout(next,160);
    } else {
      div.innerHTML=`<span class="t-prompt">$</span> <span class="t-caret"></span>`;
      body.appendChild(div);
    }
    body.scrollTop=body.scrollHeight;
  }
  next();
}
const tcObs=new IntersectionObserver(e=>{ e.forEach(en=>{ if(en.isIntersecting){ const tc=en.target.querySelector('.terminal-container'); if(tc) tc.classList.add('visible'); tcObs.disconnect(); } }); },{threshold:.3});
const ts=document.querySelector('.tc-terminal'); if(ts) tcObs.observe(ts);

/* ══ PARALLAX ══ */
function initParallax(){
  const panel=document.querySelector('.hero-photo-panel');
  window.addEventListener('scroll',()=>{ if(panel) panel.style.transform=`translateY(${window.scrollY*.1}px)`; },{passive:true});
}

/* ══ GLITCH ══ */
function initGlitch(){
  const name=document.querySelector('.hero-name'); if(!name) return;
  function glitch(){ name.classList.add('glitching'); setTimeout(()=>name.classList.remove('glitching'),200); setTimeout(glitch,3500+Math.random()*5000); }
  setTimeout(glitch,5500);
}

/* ══ CURSOR TRAIL ══ */
function initCursorTrail(){
  if(window.innerWidth<768) return;
  const trail=[], N=7;
  for(let i=0;i<N;i++){
    const d=document.createElement('div');
    d.style.cssText='position:fixed;pointer-events:none;z-index:9999;border-radius:50%';
    document.body.appendChild(d); trail.push({el:d,x:0,y:0});
  }
  let mx=0,my=0;
  document.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; });
  function animate(){
    trail.forEach((t,i)=>{
      const prev=i===0?{x:mx,y:my}:trail[i-1];
      t.x+=(prev.x-t.x)*(0.32-i*0.02); t.y+=(prev.y-t.y)*(0.32-i*0.02);
      const size=Math.max(2,8-i); const alpha=(1-i/N)*0.45;
      t.el.style.cssText=`position:fixed;pointer-events:none;z-index:9999;border-radius:50%;left:${t.x-size/2}px;top:${t.y-size/2}px;width:${size}px;height:${size}px;background:rgba(0,229,255,${alpha});box-shadow:0 0 ${size*2}px rgba(0,229,255,${alpha*.5})`;
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ══ MAGNETIC BUTTONS ══ */
document.querySelectorAll('.btn-primary,.btn-ghost,.nav-cta').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.16}px,${(e.clientY-r.top-r.height/2)*.16}px)`;
  });
  btn.addEventListener('mouseleave',()=>{ btn.style.transform=''; });
});

/* ══ AGENT CARD TILT ══ */
document.querySelectorAll('.ac-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(500px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave',()=>{ card.style.transform=''; });
});

/* ══ SCROLL REVEAL ══ */
const srObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('in'), parseInt(e.target.dataset.delay||0));
      srObs.unobserve(e.target);
    }
  });
},{threshold:.08,rootMargin:'0px 0px -20px 0px'});

document.querySelectorAll('.sr').forEach((el,i)=>{
  if(!el.dataset.delay){
    // auto-stagger siblings
    const parent=el.parentElement;
    const siblings=[...parent.querySelectorAll(':scope > .sr')];
    const idx=siblings.indexOf(el);
    if(idx>0 && !el.dataset.delay) el.dataset.delay=idx*70;
  }
  srObs.observe(el);
});

/* ══ EXP NODE PING ══ */
const nodeObs=new IntersectionObserver(e=>{
  e.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('node-ping'); nodeObs.unobserve(en.target); } });
},{threshold:.8});
document.querySelectorAll('.exc-node').forEach(n=>nodeObs.observe(n));

})();
