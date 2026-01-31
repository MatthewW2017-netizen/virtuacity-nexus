# Deploying Nexus OS Prototype

This document outlines simple, professional deployment options for both the static website and the React/Vite app.

Static site (website-first)
- The static files in the repo root (e.g., `index.html`, `css/`, `assets/`, `systems/`) can be deployed to any static host: GitHub Pages, Netlify, Vercel (static), or an S3 bucket + CDN.
- Example: deploy to Netlify by dragging the project folder into Netlify, or using the Netlify CLI.

React/Vite app (app-second)
- Build and deploy the app in `webapp/`.

Commands:

```powershell
cd "c:\Users\Matth\Documents\trae_projects\VirtuaCity Nexus\webapp"
npm install
npm run build
# deploy the `dist` folder with your chosen host (Netlify, Vercel, Surge, S3+CloudFront)
```

Notes
- Ensure environment variables and secrets are never committed. Use host-specific configuration for production keys.
- For maximum performance, enable a CDN, compression (gzip/brotli), and set long-lived cache headers for assets.
