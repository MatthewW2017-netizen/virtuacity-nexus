// Lightweight animations for hero background nodes and CTA micro-interactions
(function(){
  const bg = document.getElementById('bg-nodes');
  const width = window.innerWidth; const height = window.innerHeight;
  // create decorative glowing nodes
  for(let i=0;i<18;i++){
    const el = document.createElement('div');
    el.className = 'node';
    const x = Math.random()*100; const y = Math.random()*100; const s = 6+Math.random()*20;
    el.style.cssText = `position:fixed;left:${x}%;top:${y}%;width:${s}px;height:${s}px;border-radius:50%;background:radial-gradient(circle, rgba(0,240,255,0.9), rgba(0,0,0,0));box-shadow:0 0 ${6+Math.random()*30}px rgba(0,240,255,0.12);transform:translateZ(0);mix-blend-mode:screen;filter:blur(${Math.random()*2}px)`;
    bg.appendChild(el);
  }

  // CTA interactions
  const enter = document.getElementById('enter-cta');
  const build = document.getElementById('build-cta');

  function pulse(btn){
    btn.animate([{transform:'scale(1)'},{transform:'scale(1.04)'},{transform:'scale(1)'}],{duration:900,iterations:1});
  }
  enter && enter.addEventListener('mouseenter', ()=>pulse(enter));
  build && build.addEventListener('mouseenter', ()=>pulse(build));

  // Simple micro-modal for Enter / Build (placeholder)
  function showModal(text){
    const m = document.createElement('div'); m.className='micro-modal'; m.textContent = text;
    m.style.cssText='position:fixed;left:50%;top:18%;transform:translateX(-50%);background:linear-gradient(90deg,rgba(0,0,0,0.6),rgba(255,255,255,0.02));padding:18px;border-radius:12px;box-shadow:0 10px 36px rgba(2,6,23,0.6);z-index:9999;';
    document.body.appendChild(m);
    setTimeout(()=>m.remove(),1400);
  }
  enter && enter.addEventListener('click', ()=>showModal('Launching Nexus OS — web control center...'));
  build && build.addEventListener('click', ()=>showModal('Opening Builder Hub — developer onboarding...'));

  // OS dock: mode toggles and ambient panel behavior
  const dock = document.querySelectorAll('.dock-btn');
  function setMode(mode){
    document.body.setAttribute('data-mode', mode);
    dock.forEach(b=> b.setAttribute('aria-pressed', b.dataset.mode===mode));
    // subtle panel highlight
    document.querySelectorAll('.card, .panel').forEach(el=>{
      el.classList.remove('glow');
      void el.offsetWidth;
      el.classList.add('glow');
      setTimeout(()=>el.classList.remove('glow'),900);
    })
  }
  dock.forEach(b=> b.addEventListener('click', ()=> setMode(b.dataset.mode)));

  // Parallax for hero panels (mouse move)
  const hero = document.querySelector('.hero');
  function onMove(e){
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = hero.getBoundingClientRect();
    const cx = rect.left + rect.width/2; const cy = rect.top + rect.height/2;
    const dx = (e.clientX - cx)/rect.width*2; const dy = (e.clientY - cy)/rect.height*2;
    document.querySelectorAll('.hero-panels .panel').forEach((p,i)=>{
      const depth = (i+1)*6;
      p.style.transform = `translate3d(${dx*depth}px,${dy*depth}px,0) rotate(${dx*depth*0.3}deg)`;
    })
  }
  hero && hero.addEventListener('mousemove', onMove);
  hero && hero.addEventListener('mouseleave', ()=>document.querySelectorAll('.hero-panels .panel').forEach(p=>p.style.transform=''));
})();
