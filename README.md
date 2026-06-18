# Maverick Journey — Fit Final Trainer Dashboard

This version fixes the font sizing, spacing, and layout consistency so the dashboard feels more organized when it opens.

## What was fixed

- Consistent font scale across the whole dashboard
- Smaller sidebar typography
- Smaller top header
- Compact metric cards
- Smaller center intelligence/orbit panel
- Tighter card padding and grid gaps
- Better table row sizing
- Lower sections fit cleaner below the main row
- Real image URLs still included for uploads, meals, progress, documents, and client photos
- Working side tabs and clickable client profiles

## Folder structure

```text
index.html
README.md
package.json
build.mjs
vercel.json
src/
  styles.css
  app.js
  data/
    clients.js
public/
```

## Vercel settings

- Framework Preset: Other / No Framework
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
