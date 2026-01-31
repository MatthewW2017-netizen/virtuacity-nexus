// site-ui.js — entrance reveals, skip-link fallback, general accessibility helpers
(function(){
  document.addEventListener('DOMContentLoaded', ()=>{
    // ensure there's a skip link (some pages already have one)
    if(!document.querySelector('.skip-link')){
      const a = document.createElement('a');
      a.className = 'skip-link'; a.href = '#main'; a.textContent = 'Skip to content';
      document.body.insertBefore(a, document.body.firstChild);
    }

    // ensure main landmark exists
    const main = document.querySelector('main');
    if(main && !main.id) main.id = 'main';
    if(main && !main.hasAttribute('role')) main.setAttribute('role','main');

    // ensure logo images have explicit width/height to reduce CLS
    document.querySelectorAll('img.logo').forEach(img=>{
      try{
        if(!img.hasAttribute('width')) img.setAttribute('width','180');
        if(!img.hasAttribute('height')) img.setAttribute('height','36');
      }catch(e){/* ignore */}
    });

    // Intersection observer for reveal animations
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!prefersReduced){
      const obs = new IntersectionObserver((entries, o)=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            e.target.classList.add('show');
            o.unobserve(e.target);
          }
        })
      },{threshold:0.12});
      document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
    } else {
      document.querySelectorAll('.reveal').forEach(el=>el.classList.add('show'));
    }

    // focus outlines for mouse users — prefer visible outlines for keyboard only
    function handleFirstTab(e){
      if(e.key === 'Tab'){
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
      }
    }
    window.addEventListener('keydown', handleFirstTab);

    // Theme and contrast toggles (persisted)
    const THEME_KEY = 'nexus-theme';
    const CONTRAST_KEY = 'nexus-contrast';

    const PRESETS = ['dark','light','aicorn','solar'];
    const PRESET_ICONS = {
      dark: '🌌',
      light: '🌤️',
      aicorn: '🦄',
      solar: '🌅'
    };

    function applyTheme(name){
      document.documentElement.classList.remove('theme-light','theme-dark','theme-aicorn','theme-solar');
      if(!name) name = 'dark';
      const cls = 'theme-' + name;
      document.documentElement.classList.add(cls);
    }

    function applyContrast(enabled){
      if(enabled) document.documentElement.classList.add('high-contrast');
      else document.documentElement.classList.remove('high-contrast');
    }

    // read preferences
    let theme = localStorage.getItem(THEME_KEY) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    if(!PRESETS.includes(theme)) theme = 'dark';
    let contrast = localStorage.getItem(CONTRAST_KEY) === '1';
    applyTheme(theme); applyContrast(contrast);

    // helper to update button UI
    function renderThemeButton(btn){
      if(!btn) return;
      const icon = PRESET_ICONS[theme] || '🎨';
      btn.innerHTML = `<span class="theme-icon">${icon}</span><span class="theme-label">${theme.charAt(0).toUpperCase()+theme.slice(1)}</span>`;
      btn.setAttribute('aria-pressed', 'true');
    }

    // wire up buttons if present
    const themeBtn = document.querySelector('.theme-toggle');
    const contrastBtn = document.querySelector('.contrast-toggle');
    if(themeBtn){
      renderThemeButton(themeBtn);
      themeBtn.addEventListener('click', ()=>{
        // cycle presets
        const idx = PRESETS.indexOf(theme);
        theme = PRESETS[(idx + 1) % PRESETS.length];
        localStorage.setItem(THEME_KEY, theme);
        applyTheme(theme);
        renderThemeButton(themeBtn);
        // sound feedback (whoosh then ping)
        try{ window.nexus && window.nexus.play && window.nexus.play('whoosh'); }catch(e){}
        setTimeout(()=>{ try{ window.nexus && window.nexus.play && window.nexus.play('ping'); }catch(e){} }, 140);
      });
    }
    if(contrastBtn){
      contrastBtn.setAttribute('aria-pressed', contrast ? 'true' : 'false');
      contrastBtn.addEventListener('click', ()=>{
        contrast = !contrast;
        localStorage.setItem(CONTRAST_KEY, contrast ? '1' : '0');
        applyContrast(contrast);
        contrastBtn.setAttribute('aria-pressed', contrast ? 'true' : 'false');
        try{ if(contrast) window.nexus && window.nexus.play && window.nexus.play('success'); else window.nexus && window.nexus.play && window.nexus.play('click'); }catch(e){}
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e)=>{
      // Ctrl+Shift+S to open Settings
      if(e.ctrlKey && e.shiftKey && e.code === 'KeyS'){
        e.preventDefault();
        const settingsBtn = document.getElementById('settings-btn');
        if(settingsBtn) settingsBtn.click();
      }
      // Ctrl+Shift+T to cycle themes
      if(e.ctrlKey && e.shiftKey && e.code === 'KeyT'){
        e.preventDefault();
        if(themeBtn) themeBtn.click();
      }
      // Ctrl+Shift+C to toggle contrast
      if(e.ctrlKey && e.shiftKey && e.code === 'KeyC'){
        e.preventDefault();
        if(contrastBtn) contrastBtn.click();
      }
    });

    // Add a Customize button into header (if header exists)
    const header = document.querySelector('.topbar');
    if(header && !document.getElementById('theme-customize-btn')){
      const customize = document.createElement('button');
      customize.id = 'theme-customize-btn';
      customize.className = 'theme-toggle';
      customize.title = 'Customize theme';
      customize.type = 'button';
      customize.innerHTML = '🎨 Customize';
      customize.addEventListener('click', openCustomizer);
      // Insert before first .top-actions element's last child
      const nav = header.querySelector('.top-actions');
      if(nav) nav.appendChild(customize);
    }

    // Theme customizer modal
    function openCustomizer(){
      if(document.getElementById('theme-customizer')) return showCustomizer();
      const panel = document.createElement('div');
      panel.id = 'theme-customizer';
      panel.className = 'theme-customizer';
      const settings = JSON.parse(localStorage.getItem('nexus:settings') || '{}');
      panel.innerHTML = `
        <div class="customizer-inner">
          <header><h3>Theme Customizer</h3><button class="close">✕</button></header>
          <div class="field"><label>Accent Cyan</label><input type="color" id="accent-cyan" value="${settings.accentCyan||getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim()||'#00f0ff'}"></div>
          <div class="field"><label>Accent Magenta</label><input type="color" id="accent-magenta" value="${settings.accentMagenta||getComputedStyle(document.documentElement).getPropertyValue('--accent-magenta').trim()||'#ff2bd6'}"></div>
          <div class="field"><label>Glow Intensity</label><input type="range" id="glow-intensity" min="0" max="100" value="${settings.glow||30}"></div>
          <div class="field"><label><input type="checkbox" id="reduce-anim"> Reduce animations</label></div>
          <div class="actions"><button id="save-theme" class="btn primary">Save</button><button id="export-theme" class="btn outlined">Export</button><input type="file" id="import-file" style="display:none"></div>
        </div>`;
      document.body.appendChild(panel);
      panel.querySelector('.close').addEventListener('click', ()=>panel.remove());
      panel.querySelector('#save-theme').addEventListener('click', ()=>{
        const ac = panel.querySelector('#accent-cyan').value;
        const am = panel.querySelector('#accent-magenta').value;
        const glow = panel.querySelector('#glow-intensity').value;
        const reduce = panel.querySelector('#reduce-anim').checked;
        const obj = { accentCyan: ac, accentMagenta: am, glow: glow, reduceAnimations: reduce };
        localStorage.setItem('nexus:settings', JSON.stringify(obj));
        applyCustomSettings(obj);
        try{ window.nexus && window.nexus.play && window.nexus.play('success'); }catch(e){}
        panel.remove();
      });
      panel.querySelector('#export-theme').addEventListener('click', ()=>{
        const data = localStorage.getItem('nexus:settings') || '{}';
        const blob = new Blob([data], {type:'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href=url; a.download='nexus-theme.json'; document.body.appendChild(a); a.click(); a.remove();
      });
      const importFile = panel.querySelector('#import-file');
      importFile.addEventListener('change', (e)=>{
        const f = e.target.files[0]; if(!f) return;
        const r = new FileReader(); r.onload = ()=>{
          try{ const obj = JSON.parse(r.result); localStorage.setItem('nexus:settings', JSON.stringify(obj)); applyCustomSettings(obj); panel.remove(); }catch(e){ alert('Invalid file'); }
        }; r.readAsText(f);
      });
      // click import via export button (toggle import)
    }

    function showCustomizer(){
      const p = document.getElementById('theme-customizer'); if(p) p.classList.add('visible');
    }

    function applyCustomSettings(obj){
      if(!obj) return;
      if(obj.accentCyan) document.documentElement.style.setProperty('--accent-cyan', obj.accentCyan);
      if(obj.accentMagenta) document.documentElement.style.setProperty('--accent-magenta', obj.accentMagenta);
      if(obj.glow) document.documentElement.style.setProperty('--glow-intensity', obj.glow);
      if(obj.reduceAnimations) document.documentElement.classList.add('prefers-reduced-motion');
      else document.documentElement.classList.remove('prefers-reduced-motion');
    }

    // apply saved custom settings on load
    try{ applyCustomSettings(JSON.parse(localStorage.getItem('nexus:settings')||'{}')); }catch(e){}

    // SETTINGS PANEL: persistent settings tab with multiple pages
    if(header && !document.getElementById('settings-btn')){
      const settingsBtn = document.createElement('button');
      settingsBtn.id = 'settings-btn';
      settingsBtn.className = 'theme-toggle';
      settingsBtn.type = 'button';
      settingsBtn.title = 'Open settings';
      settingsBtn.innerHTML = '⚙️ Settings';
      settingsBtn.addEventListener('click', openSettings);
      const nav = header.querySelector('.top-actions');
      if(nav) nav.appendChild(settingsBtn);
    }

    function openSettings(){
      if(document.getElementById('settings-panel')) return showSettings();
      const panel = document.createElement('div');
      panel.id = 'settings-panel';
      panel.className = 'settings-panel visible';
      const prefs = JSON.parse(localStorage.getItem('nexus:settings') || '{}');
      panel.innerHTML = `
        <header>
          <h3>Settings</h3>
          <button class="close-settings" aria-label="Close settings">✕</button>
        </header>
        <div class="settings-tabs" role="tablist">
          <button data-tab="general" class="active">General</button>
          <button data-tab="theme">Theme</button>
          <button data-tab="sound">Sound</button>
          <button data-tab="notifications">Notifications</button>
          <button data-tab="export">Export</button>
        </div>
        <div class="settings-body">
          <div data-panel="general" class="tab-panel">
            <div class="settings-field"><label><input type="checkbox" id="reduce-animations-settings"> Reduce animations</label></div>
            <div class="settings-field"><label><input type="checkbox" id="contrast-settings" aria-label="High contrast mode"> High contrast mode</label></div>
            <div class="settings-field"><label>Default Landing</label><select id="default-landing"><option value="index">Home</option><option value="studio">Studio</option><option value="onboarding">Onboarding</option></select></div>
            <div class="settings-field"><label>Sound Theme</label><select id="sound-theme-settings"><option value="digital">Digital</option><option value="organic">Organic</option><option value="retro">Retro</option><option value="ambient">Ambient</option></select></div>
          </div>

          <div data-panel="theme" class="tab-panel" style="display:none">
            <div class="settings-field"><label>Theme Preset</label><select id="preset-select"></select></div>
            <div class="settings-field"><button id="open-customizer" class="btn outlined">Open Customizer</button></div>
            <div class="settings-note">You can customize and export themes from the Customizer.</div>
          </div>

          <div data-panel="sound" class="tab-panel" style="display:none">
            <div class="settings-field"><label><input type="checkbox" id="sounds-enabled"> Enable Sounds</label></div>
            <div class="settings-field"><label>Volume</label><input type="range" id="settings-volume" min="0" max="100" value="50"></div>
            <div class="settings-field"><label>Test Sound</label><div style="display:flex;gap:4px;flex-wrap:wrap"><button class="preview-sound" data-sound="click" style="padding:4px 8px;font-size:0.85rem">Click</button><button class="preview-sound" data-sound="ping" style="padding:4px 8px;font-size:0.85rem">Ping</button><button class="preview-sound" data-sound="success" style="padding:4px 8px;font-size:0.85rem">Success</button><button class="preview-sound" data-sound="error" style="padding:4px 8px;font-size:0.85rem">Error</button></div></div>
            <div class="settings-note">Sound theme can be changed in General settings.</div>
          </div>

          <div data-panel="notifications" class="tab-panel" style="display:none">
            <div class="settings-field"><label><input type="checkbox" class="notify-pref" data-type="messages" checked> Messages</label></div>
            <div class="settings-field"><label><input type="checkbox" class="notify-pref" data-type="system" checked> System Events</label></div>
            <div class="settings-field"><label><input type="checkbox" class="notify-pref" data-type="achievements" checked> Achievements</label></div>
            <div class="settings-field"><label><input type="checkbox" class="notify-pref" data-type="errors"> Errors Only</label></div>
            <div class="settings-note">Choose which events trigger sound and visual notifications.</div>
          </div>

          <div data-panel="export" class="tab-panel" style="display:none">
            <div class="settings-field"><button id="export-settings" class="btn outlined">Export Settings</button></div>
            <div class="settings-field"><input type="file" id="import-settings" accept="application/json"></div>
            <div class="settings-note">Import a previously exported `nexus:settings` JSON file to restore preferences.</div>
            <div style="margin-top:16px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.1)">
              <div class="settings-note" style="margin-top:0;font-weight:600">Keyboard Shortcuts:</div>
              <div class="settings-note">Ctrl+Shift+S — Open Settings</div>
              <div class="settings-note">Ctrl+Shift+T — Cycle Themes</div>
              <div class="settings-note">Ctrl+Shift+C — Toggle Contrast</div>
            </div>
          </div>
        </div>
        <div class="settings-actions"><button id="save-settings" class="btn primary">Save</button><button id="close-settings" class="btn outlined">Close</button></div>
      `;

      document.body.appendChild(panel);
      panel.querySelector('.close-settings').addEventListener('click', ()=>panel.remove());
      panel.querySelector('#close-settings').addEventListener('click', ()=>panel.remove());

      // populate preset select
      const presetSelect = panel.querySelector('#preset-select');
      PRESETS.forEach(p=>{
        const o = document.createElement('option'); o.value = p; o.textContent = p.charAt(0).toUpperCase()+p.slice(1); if(p===theme) o.selected=true; presetSelect.appendChild(o);
      });

      // populate fields from prefs/localStorage
      panel.querySelector('#reduce-animations-settings').checked = prefs.reduceAnimations || false;
      panel.querySelector('#contrast-settings').checked = document.documentElement.classList.contains('high-contrast');
      panel.querySelector('#default-landing').value = prefs.defaultLanding || 'index';
      panel.querySelector('#sound-theme-settings').value = localStorage.getItem('nexus_sound_theme') || 'digital';
      panel.querySelector('#sounds-enabled').checked = (localStorage.getItem('nexus_sounds')||'enabled') !== 'disabled';
      const vol = Math.round((parseFloat(localStorage.getItem('nexus_volume'))||0.5)*100);
      panel.querySelector('#settings-volume').value = vol;

      // preview sound buttons
      panel.querySelectorAll('.preview-sound').forEach(btn=>{
        btn.className = 'preview-sound btn outlined';
        btn.addEventListener('click', ()=>{
          const soundName = btn.dataset.sound;
          try{ if(window.soundSystem && window.soundSystem.sounds[soundName]) window.soundSystem.sounds[soundName](); }catch(e){}
        });
      });

      // notification prefs
      panel.querySelectorAll('.notify-pref').forEach(cb=>{
        const k = `nexus_notify_${cb.dataset.type}`;
        cb.checked = localStorage.getItem(k) !== 'false';
      });

      // tab switching
      panel.querySelectorAll('.settings-tabs button').forEach(btn=>{
        btn.addEventListener('click', ()=>{
          panel.querySelectorAll('.settings-tabs button').forEach(b=>b.classList.remove('active'));
          btn.classList.add('active');
          const tab = btn.dataset.tab;
          panel.querySelectorAll('.tab-panel').forEach(tp=>tp.style.display = tp.dataset.panel === tab ? '' : 'none');
        });
      });

      // open customizer
      panel.querySelector('#open-customizer').addEventListener('click', ()=>openCustomizer());

      // export/import
      panel.querySelector('#export-settings').addEventListener('click', ()=>{
        const data = localStorage.getItem('nexus:settings') || '{}';
        const blob = new Blob([data], {type:'application/json'}); const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href=url; a.download='nexus-settings.json'; document.body.appendChild(a); a.click(); a.remove();
      });
      panel.querySelector('#import-settings').addEventListener('change', (e)=>{
        const f = e.target.files[0]; if(!f) return; const r = new FileReader(); r.onload = ()=>{ try{ const obj = JSON.parse(r.result); localStorage.setItem('nexus:settings', JSON.stringify(obj)); applyCustomSettings(obj); alert('Settings imported'); panel.remove(); }catch(e){ alert('Invalid file'); } }; r.readAsText(f);
      });

      // save handler
      panel.querySelector('#save-settings').addEventListener('click', ()=>{
        const obj = JSON.parse(localStorage.getItem('nexus:settings')||'{}');
        obj.reduceAnimations = !!panel.querySelector('#reduce-animations-settings').checked;
        obj.defaultLanding = panel.querySelector('#default-landing').value;
        localStorage.setItem('nexus:settings', JSON.stringify(obj));

        // contrast
        const contrastEnabled = !!panel.querySelector('#contrast-settings').checked;
        localStorage.setItem('nexus-contrast', contrastEnabled ? 'enabled' : 'disabled');
        document.documentElement.classList.toggle('high-contrast', contrastEnabled);
        if(contrastBtn) renderContrastButton(contrastBtn);

        // theme
        const selected = panel.querySelector('#preset-select').value;
        localStorage.setItem(THEME_KEY, selected); applyTheme(selected); if(themeBtn) renderThemeButton(themeBtn);

        // sound
        const soundsEnabled = !!panel.querySelector('#sounds-enabled').checked;
        localStorage.setItem('nexus_sounds', soundsEnabled ? 'enabled' : 'disabled');
        localStorage.setItem('nexus_volume', (panel.querySelector('#settings-volume').value/100).toString());
        localStorage.setItem('nexus_sound_theme', panel.querySelector('#sound-theme-settings').value);

        // notifications
        panel.querySelectorAll('.notify-pref').forEach(cb=>{ const k=`nexus_notify_${cb.dataset.type}`; localStorage.setItem(k, cb.checked ? 'true' : 'false'); });

        try{ window.nexus && window.nexus.play && window.nexus.play('success'); }catch(e){}
        panel.remove();
      });

      // initial focus
      panel.querySelector('header h3').focus();
    }

    function showSettings(){ const p=document.getElementById('settings-panel'); if(p) p.classList.add('visible'); }

    // Form validation feedback
    document.querySelectorAll('form input[required], form textarea[required], form select[required]').forEach(field=>{
      field.addEventListener('invalid', (e)=>{
        e.preventDefault();
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
      });
      field.addEventListener('input', ()=>{
        if(field.validity.valid){
          field.classList.remove('error');
          field.setAttribute('aria-invalid', 'false');
        }
      });
    });

    // Smooth scroll to anchors
    document.querySelectorAll('a[href^="#"]').forEach(link=>{
      link.addEventListener('click', (e)=>{
        const target = document.querySelector(link.getAttribute('href'));
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
          target.focus();
        }
      });
    });

    // Add subtle feedback on interactive elements
    document.querySelectorAll('.btn, button').forEach(btn=>{
      btn.addEventListener('click', function(e){
        if(!this.disabled && window.nexus && window.nexus.play){
          try{ window.nexus.play('click'); }catch(err){}
        }
      });
    });
  });
})();
