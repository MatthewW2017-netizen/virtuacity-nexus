# VirtuaCity Nexus - Deployment & Usage Guide

**Version:** 1.0  
**Last Updated:** January 31, 2026  
**Status:** Production Ready ✅

---

## 🚀 Quick Start

### Local Development
```bash
cd "c:\Users\Matth\Documents\trae_projects\VirtuaCity Nexus"
python -m http.server 8000
```

Then visit: **http://localhost:8000**

### Features Overview
- ✅ 4 theme presets (Dark, Light, Aicorn, Solar)
- ✅ High-contrast accessibility mode
- ✅ Sound system with volume & theme control
- ✅ Persistent settings (localStorage)
- ✅ Professional forms with validation
- ✅ Mobile-responsive design
- ✅ Keyboard shortcuts
- ✅ Smooth animations & transitions

---

## 🎮 User Guide

### Theme Management
**In Settings → General Tab:**
1. Select a theme preset from dropdown
2. Or use header **Theme** button to cycle through presets
3. Keyboard shortcut: **Ctrl+Shift+T**

**Available Themes:**
- 🌌 **Dark** - Default, high contrast
- 🌤️ **Light** - Bright, clean interface
- 🦄 **Aicorn** - Cyberpunk neon aesthetic
- 🌅 **Solar** - Warm, high-contrast palette

### Sound Settings
**In Settings → Sound Tab:**
1. Toggle "Enable Sounds"
2. Adjust volume slider
3. Test sounds with preview buttons
4. Keyboard shortcut: Open Settings with **Ctrl+Shift+S**

**In Settings → General Tab:**
- Select sound theme (Digital, Organic, Retro, Ambient)

### Accessibility

**High Contrast Mode:**
- Click **Contrast** button in header
- Or toggle in Settings → General Tab
- Keyboard shortcut: **Ctrl+Shift+C**

**Keyboard Shortcuts:**
| Shortcut | Action |
|----------|--------|
| Ctrl+Shift+S | Open Settings |
| Ctrl+Shift+T | Cycle Themes |
| Ctrl+Shift+C | Toggle Contrast |
| Tab | Navigate form fields |
| Enter | Submit forms |

### Form Interaction
- Required fields marked with `*`
- Real-time validation feedback
- Error state shown in red
- Clear focus outlines
- Smooth scroll to focused fields

---

## 📱 Mobile Experience

### Responsive Layout
- Settings panel adapts to screen size
- Touch-friendly button sizes (48px minimum)
- Larger font sizes on mobile (16px)
- Scrollable tabs on small screens
- Optimized for landscape & portrait

### Mobile-Specific Features
- Faster touch response
- Larger form inputs (accessibility)
- Smooth scroll-to behavior
- Full-screen settings on small devices

---

## 🔧 Technical Details

### Browser Support
- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 88+)

### Dependencies
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Python 3.11+ (for local server)
- **Build Tool:** Vite 5.4.21 (optional, for webapp)
- **Package Manager:** npm 11.6.2 (for webapp builds)

### Technology Stack
```
VirtuaCity Nexus/
├── index.html                 # Home page
├── css/
│   ├── styles.css            # Main styles + theme system
│   ├── pages.css             # Page-specific styles
│   └── sound-metrics.css     # Sound system styles
├── js/
│   ├── app.js                # Main app entry
│   ├── site-ui.js            # Settings, theme, keyboard shortcuts
│   ├── sound-system.js       # Web Audio API integration
│   ├── enhancements.js       # Page enhancements
│   └── metrics.js            # Analytics/metrics
├── assets/                   # Images, logos
├── systems/                  # System documentation pages
├── webapp/                   # Vite-built React app (optional)
└── onboarding.html          # Onboarding flow
```

---

## 💾 Data Storage

### localStorage Keys
```javascript
// Theme & UI
"nexus-theme"              // Current theme (dark|light|aicorn|solar)
"nexus-contrast"           // High contrast mode (0|1)

// Sound
"nexus_sounds"             // Sounds enabled (enabled|disabled)
"nexus_volume"             // Volume level (0-1)
"nexus_sound_theme"        // Sound theme (digital|organic|retro|ambient)

// Notifications
"nexus_notify_messages"    // Messages toggle (true|false)
"nexus_notify_system"      // System events toggle
"nexus_notify_achievements" // Achievements toggle
"nexus_notify_errors"      // Errors only toggle

// Complex Settings
"nexus:settings"           // JSON object with:
                           //   - reduceAnimations
                           //   - defaultLanding
                           //   - customColors
                           //   - glow
```

---

## 🎨 Customization

### Change Default Theme
Edit `js/site-ui.js` line ~72:
```javascript
let theme = localStorage.getItem(THEME_KEY) || 'dark'; // Change 'dark' to 'light', 'aicorn', or 'solar'
```

### Modify Theme Colors
1. Open Settings → General Tab
2. Click Theme Tab → "Open Customizer"
3. Use color pickers
4. Click "Save" or "Export"

### Add New Page
1. Create `new-page.html`
2. Copy header/footer from existing page
3. Include: `<script src="js/app.js"></script>`
4. Include: `<script src="js/site-ui.js"></script>`

---

## 🐛 Troubleshooting

### Settings Not Persisting
- Check browser localStorage is enabled
- Clear cache and reload page
- Check DevTools → Application → Storage → localStorage

### Sounds Not Playing
- Verify "Enable Sounds" is toggled in Settings
- Check browser volume isn't muted
- Test with "Test Sound" buttons in Settings → Sound Tab
- Check browser console for errors (F12)

### Theme Not Changing
- Hard refresh (Ctrl+F5)
- Clear localStorage in DevTools
- Check if high-contrast mode is conflicting
- Try keyboard shortcut (Ctrl+Shift+T)

### Forms Not Submitting
- Ensure all required fields are filled
- Check for validation errors (red borders)
- Look for console errors (F12)
- Try different browser

### Mobile Layout Issues
- Force refresh (Ctrl+Shift+R on desktop, pull-to-refresh on mobile)
- Check viewport meta tag in <head>
- Test in Chrome DevTools mobile view
- Clear app cache if using PWA

---

## 📊 Performance

### Optimization Features
- ✅ Lazy-loaded intersection observer
- ✅ CSS custom properties (no runtime calculation)
- ✅ Minimal JavaScript (vanilla, no frameworks)
- ✅ Smooth 60fps animations
- ✅ Optimized images with width/height
- ✅ Reduced-motion support

### Lighthouse Targets
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

---

## 🚢 Deployment

### Static Hosting (Recommended)
Deploy to: Netlify, Vercel, GitHub Pages, Firebase

```bash
# Build webapp (optional)
cd webapp
npm run build
# Output: webapp/dist/

# Deploy entire folder to static host
```

### Server Deployment
```bash
# Option 1: Python
python -m http.server 8000 --directory .

# Option 2: Node.js
npx http-server .

# Option 3: Docker
docker run -p 8000:80 -v $(pwd):/usr/share/nginx/html nginx
```

### Environment Setup
- No environment variables needed
- All settings stored in browser localStorage
- No database required
- No API endpoints required (standalone)

---

## 📧 Support & Resources

### File References
- **Settings Logic:** [js/site-ui.js](js/site-ui.js#L224)
- **Theme System:** [js/site-ui.js](js/site-ui.js#L50)
- **Sound System:** [js/sound-system.js](js/sound-system.js)
- **Styles:** [css/styles.css](css/styles.css)

### Common Tweaks
1. **Change landing page:** Settings → General → Default Landing
2. **Adjust animations:** Settings → General → Reduce animations
3. **Custom colors:** Settings → Theme → Open Customizer
4. **Sound volume:** Settings → Sound → Volume slider

---

## 📝 Changelog

### v1.0 (Jan 31, 2026)
- ✅ Complete theme system with 4 presets
- ✅ Sound integration with Web Audio API
- ✅ Comprehensive Settings panel (5 tabs)
- ✅ High-contrast accessibility mode
- ✅ Professional forms with validation
- ✅ Keyboard shortcuts (Ctrl+Shift+*)
- ✅ Mobile-responsive design
- ✅ Smooth animations & transitions
- ✅ localStorage persistence
- ✅ Onboarding page
- ✅ Export/import settings

---

## ✅ Verification Checklist

Before deployment, verify:
- [ ] Server running without errors
- [ ] All pages load (http://localhost:8000)
- [ ] Settings panel opens (⚙️ button)
- [ ] Theme changing works
- [ ] Sound toggle works
- [ ] Contrast mode works
- [ ] Forms submit properly
- [ ] Mobile view responsive
- [ ] Keyboard shortcuts work (Ctrl+Shift+S/T/C)
- [ ] Settings persist after refresh

---

**Happy deploying! 🚀**
