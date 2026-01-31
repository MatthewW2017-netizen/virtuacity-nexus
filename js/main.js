(function(){
  // Compatibility shim: ensure core UI scripts load when pages expect `js/main.js`.
  function loadScript(src){
    if(document.querySelector(`script[src="${src}"]`)) return Promise.resolve();
    return new Promise((resolve,reject)=>{
      const s=document.createElement('script'); s.src=src; s.async=false;
      s.onload=resolve; s.onerror=reject; document.head.appendChild(s);
    });
  }

  // Load site UI, sound system, app micro-js and metrics (if present)
  document.addEventListener('DOMContentLoaded', ()=>{
    const base = window.location.origin || '';
    Promise.resolve()
      .then(()=>loadScript('/js/site-ui.js'))
      .then(()=>loadScript('/js/sound-system.js'))
      .then(()=>loadScript('/js/app.js'))
      .then(()=>loadScript('/js/enhancements.js'))
      .then(()=>loadScript('/js/metrics.js'))
      .catch(()=>{ /* non-fatal */ });

    // Expose quick helpers for dev/testing
    window.nexus = window.nexus || {};
    window.nexus.play = function(name){ if(window.soundSystem && window.soundSystem.sounds[name]) window.soundSystem.sounds[name](); };
    window.nexus.settings = function(){ if(window.soundSystem) window.soundSystem.showSettings(); };
  });
})();
