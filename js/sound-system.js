/**
 * Nexus OS Sound System
 * Immersive audio experience with customizable notifications, ambient sounds, and interaction feedback
 */

class NexusSoundSystem {
  constructor() {
    this.audioContext = null;
    this.enabled = localStorage.getItem('nexus_sounds') !== 'disabled';
    this.volume = parseFloat(localStorage.getItem('nexus_volume')) || 0.5;
    this.theme = localStorage.getItem('nexus_sound_theme') || 'digital';
    this.sounds = {};
    this.ambientPlayer = null;
    this.init();
  }

  init() {
    // Initialize Web Audio API
    if (!window.AudioContext && !window.webkitAudioContext) {
      console.warn('Web Audio API not supported');
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContextClass();

    // Create sound library
    this.createSounds();
    
    // Auto-play ambient sound on user interaction
    this.setupAutoPlay();
    
    // Setup settings panel
    this.createSettingsPanel();
  }

  createSounds() {
    // Notification sounds
    this.sounds.notification = () => this.playChime();
    this.sounds.success = () => this.playSuccess();
    this.sounds.error = () => this.playError();
    this.sounds.click = () => this.playClick();
    this.sounds.whoosh = () => this.playWhoosh();
    this.sounds.ping = () => this.playPing();
    this.sounds.startup = () => this.playStartup();
    this.sounds.ambient = () => this.playAmbient();
  }

  setupAutoPlay() {
    document.addEventListener('click', () => {
      if (this.audioContext?.state === 'suspended') {
        this.audioContext.resume();
      }
    }, { once: true });
  }

  // ===== SOUND GENERATORS =====

  playChime() {
    if (!this.enabled || !this.audioContext) return;
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const envelope = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.3);
    
    envelope.gain.setValueAtTime(this.volume, now);
    envelope.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    oscillator.connect(envelope);
    envelope.connect(ctx.destination);
    
    oscillator.start(now);
    oscillator.stop(now + 0.3);
  }

  playSuccess() {
    if (!this.enabled || !this.audioContext) return;
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    
    // Play two notes for success
    [800, 1000].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      env.gain.setValueAtTime(this.volume * 0.7, now);
      env.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      
      osc.connect(env);
      env.connect(ctx.destination);
      
      osc.start(now + i * 0.1);
      osc.stop(now + 0.2 + i * 0.1);
    });
  }

  playError() {
    if (!this.enabled || !this.audioContext) return;
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
    
    env.gain.setValueAtTime(this.volume * 0.6, now);
    env.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    osc.connect(env);
    env.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.2);
  }

  playClick() {
    if (!this.enabled || !this.audioContext) return;
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.value = 400;
    
    env.gain.setValueAtTime(this.volume * 0.4, now);
    env.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    
    osc.connect(env);
    env.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.05);
  }

  playWhoosh() {
    if (!this.enabled || !this.audioContext) return;
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
    
    env.gain.setValueAtTime(this.volume * 0.3, now);
    env.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    osc.connect(env);
    env.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playPing() {
    if (!this.enabled || !this.audioContext) return;
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = 1000;
    
    env.gain.setValueAtTime(this.volume * 0.5, now);
    env.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    osc.connect(env);
    env.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playStartup() {
    if (!this.enabled || !this.audioContext) return;
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    
    // Startup chord: three notes
    [400, 550, 700].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      env.gain.setValueAtTime(this.volume * 0.6, now);
      env.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      
      osc.connect(env);
      env.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.4);
    });
  }

  playAmbient() {
    if (!this.enabled || !this.audioContext) return;
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    
    // Ambient background tone
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = 55; // Low frequency for ambient
    
    env.gain.setValueAtTime(this.volume * 0.15, now);
    env.gain.linearRampToValueAtTime(this.volume * 0.05, now + 3);
    
    osc.connect(env);
    env.connect(ctx.destination);
    
    osc.start(now);
    setTimeout(() => osc.stop(ctx.currentTime), 3000);
  }

  // ===== SOUND TRIGGERS =====

  triggerNotification() {
    this.playChime();
  }

  triggerSuccess() {
    this.playSuccess();
  }

  triggerError() {
    this.playError();
  }

  triggerClick() {
    this.playClick();
  }

  triggerWhoosh() {
    this.playWhoosh();
  }

  // ===== SETTINGS PANEL =====

  createSettingsPanel() {
    const panel = document.createElement('div');
    panel.id = 'sound-settings-panel';
    panel.className = 'sound-settings-panel';
    panel.innerHTML = `
      <div class="sound-settings-content">
        <div class="sound-header">
          <h3>🔊 Sound Settings</h3>
          <button class="close-btn" aria-label="Close sound settings">✕</button>
        </div>
        
        <div class="sound-control">
          <label for="sound-toggle">
            <input type="checkbox" id="sound-toggle" ${this.enabled ? 'checked' : ''}>
            <span>Enable Sounds</span>
          </label>
        </div>

        <div class="sound-control">
          <label for="volume-slider">Volume</label>
          <input type="range" id="volume-slider" min="0" max="100" value="${Math.round(this.volume * 100)}" class="volume-slider">
          <span class="volume-value">${Math.round(this.volume * 100)}%</span>
        </div>

        <div class="sound-themes">
          <label>Sound Theme</label>
          <div class="theme-buttons">
            <button class="theme-btn ${this.theme === 'digital' ? 'active' : ''}" data-theme="digital">Digital</button>
            <button class="theme-btn ${this.theme === 'organic' ? 'active' : ''}" data-theme="organic">Organic</button>
            <button class="theme-btn ${this.theme === 'retro' ? 'active' : ''}" data-theme="retro">Retro</button>
            <button class="theme-btn ${this.theme === 'ambient' ? 'active' : ''}" data-theme="ambient">Ambient</button>
          </div>
        </div>

        <div class="sound-preview">
          <label>Test Sounds</label>
          <div class="preview-buttons">
            <button class="preview-btn" data-sound="click">Click</button>
            <button class="preview-btn" data-sound="ping">Ping</button>
            <button class="preview-btn" data-sound="success">Success</button>
            <button class="preview-btn" data-sound="error">Error</button>
            <button class="preview-btn" data-sound="whoosh">Whoosh</button>
            <button class="preview-btn" data-sound="startup">Startup</button>
          </div>
        </div>

        <div class="sound-notifications">
          <label>Enable Notifications For</label>
          <div class="notification-checkboxes">
            <label><input type="checkbox" class="notify-check" data-type="messages" checked> Messages</label>
            <label><input type="checkbox" class="notify-check" data-type="system" checked> System Events</label>
            <label><input type="checkbox" class="notify-check" data-type="achievements" checked> Achievements</label>
            <label><input type="checkbox" class="notify-check" data-type="errors"> Errors Only</label>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(panel);
    this.attachSettingsListeners(panel);
  }

  attachSettingsListeners(panel) {
    // Toggle button
    const toggleBtn = document.getElementById('sound-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('change', (e) => {
        this.enabled = e.target.checked;
        localStorage.setItem('nexus_sounds', this.enabled ? 'enabled' : 'disabled');
        if (this.enabled) this.playSuccess();
      });
    }

    // Volume slider
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValue = panel.querySelector('.volume-value');
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        this.volume = e.target.value / 100;
        volumeValue.textContent = e.target.value + '%';
        localStorage.setItem('nexus_volume', this.volume);
        this.playPing();
      });
    }

    // Theme buttons
    panel.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        panel.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.theme = e.target.dataset.theme;
        localStorage.setItem('nexus_sound_theme', this.theme);
        this.playChime();
      });
    });

    // Preview buttons
    panel.querySelectorAll('.preview-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sound = e.target.dataset.sound;
        if (this.sounds[sound]) {
          this.sounds[sound]();
        }
      });
    });

    // Close button
    const closeBtn = panel.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        panel.classList.remove('visible');
      });
    }

    // Notification checkboxes
    panel.querySelectorAll('.notify-check').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const type = e.target.dataset.type;
        localStorage.setItem(`nexus_notify_${type}`, e.target.checked ? 'true' : 'false');
      });
    });
  }

  showSettings() {
    const panel = document.getElementById('sound-settings-panel');
    if (panel) {
      panel.classList.add('visible');
    }
  }

  hideSettings() {
    const panel = document.getElementById('sound-settings-panel');
    if (panel) {
      panel.classList.remove('visible');
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.soundSystem = new NexusSoundSystem();

  // Add sound settings button to header
  const header = document.querySelector('.topbar');
  if (header && !document.getElementById('sound-toggle-btn')) {
    const soundBtn = document.createElement('button');
    soundBtn.id = 'sound-toggle-btn';
    soundBtn.className = 'btn outlined sound-btn';
    soundBtn.textContent = '🔊 Sound';
    soundBtn.setAttribute('aria-label', 'Open sound settings');
    soundBtn.addEventListener('click', () => window.soundSystem.showSettings());
    
    // Insert before Enter Nexus button
    const enterBtn = document.getElementById('enter-btn');
    if (enterBtn) {
      enterBtn.parentNode.insertBefore(soundBtn, enterBtn);
    }
  }

  // Trigger startup sound
  setTimeout(() => {
    if (window.soundSystem.enabled) {
      window.soundSystem.playStartup();
    }
  }, 500);
});

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NexusSoundSystem;
}
