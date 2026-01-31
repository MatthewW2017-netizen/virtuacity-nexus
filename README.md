# Nexus OS — Website-First Prototype

This repository is an organized, website-first prototype for Virtua City Studio's Nexus OS. It presents Nexus as an OS-like public homepage with cinematic panels, modules, and a mirrored React/Vite "app-second" scaffold.

Repository structure (key files):
- `index.html` — homepage (website-first)
- `css/styles.css` — global site styles
- `js/app.js` — small interactive scripts for the site
- `assets/logo.svg` — brand wordmark
- `systems/` — 26 cinematic system detail pages
- `webapp/` — React + Vite app (app-second integration prototype)

Run the static site locally (quick):

```bash
cd "c:\Users\Matth\Documents\trae_projects\VirtuaCity Nexus"
python -m http.server 8000
# then open http://localhost:8000
```

Run the app-second React prototype:

```powershell
cd "c:\Users\Matth\Documents\trae_projects\VirtuaCity Nexus\webapp"
npm install
npm run dev
# open http://localhost:5173
```

Organization & next steps
- Accessibility & landmarks: skip-links and ARIA landmarks added. Continue audits and fixes.
- App convergence: the React app mirrors the 26 systems under `webapp/src/data/systems.js`.
- Deployment: see `DEPLOY.md` for recommended static and app deployment steps.
- Polishing: add cinematic transitions, more animations, and accessibility/performance checks.

If you want, I can now:
- Add polished panel animations and OS-like transitions across the site.
- Prepare a production static build and a deployable package.
- Keep the `webapp/` skeleton for when you want the native app; an "App coming soon" page has been added for early access.
