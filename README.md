# Tarot Celestial Studio

Tarot Celestial Studio is a production-oriented tarot and zodiac web application built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion. It delivers an immersive mystical interface, multiple spread templates, zodiac-enhanced readings, account sync, favorites, exportable result cards, and a Vercel-friendly API layout.

## Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Express for local API development
- Vercel Functions compatible `api/` routes
- Postgres with local JSON fallback
- html-to-image for result export

## Core Features

- Full-screen cinematic hero with animated starfield
- Chinese / English UI toggle
- 78-card tarot deck structure with bilingual tarot content
- Local SVG card artwork stored inside the project
- Multiple spread templates:
  - Single Card
  - Past / Present / Future
  - Celtic Cross Lite
  - Relationship Mirror
  - Decision Path
  - Lunar Cycle
- Zodiac overlay that supplements, but never replaces, tarot meaning
- Sequential reveal animation after shuffle
- Card spotlight modal
- Reading archive and favorites
- Account registration / login
- PNG export and share support
- Theme switching and sound toggle

## Recent Optimization Pass

This version includes a structural optimization pass focused on deployment stability and maintainability:

- Split visual preferences into a dedicated `PreferencesContext`
- Kept reading, account, favorites, and archive state in `ReadingContext`
- Reworked storage to persist theme mode, theme selection, language, and sound preference
- Replaced corrupted bilingual text with clean UTF-8 translations
- Added bilingual tarot and zodiac content fields at the data layer
- Replaced external tarot image URLs with local static SVG assets
- Added API payload validation for auth, readings, and favorites
- Refactored storage access to use incremental repository-style writes for Postgres
- Added timeout-aware frontend API handling with clearer error categories

## Project Structure

```text
.
├─ api
│  ├─ _lib
│  │  ├─ json.js
│  │  └─ validators.js
│  ├─ auth
│  │  ├─ login.js
│  │  ├─ me.js
│  │  └─ register.js
│  ├─ favorites.js
│  └─ readings.js
├─ backend
│  └─ db.mjs
├─ server
│  ├─ data
│  │  └─ db.json
│  └─ index.mjs
├─ public
│  └─ cards
├─ scripts
│  └─ generate-card-assets.mjs
├─ src
│  ├─ components
│  ├─ context
│  │  ├─ PreferencesContext.tsx
│  │  └─ ReadingContext.tsx
│  ├─ data
│  ├─ lib
│  ├─ pages
│  ├─ types
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ package.json
├─ tailwind.config.ts
├─ vite.config.ts
└─ README.md
```

## Install

The project directory is:

```powershell
D:\Projects\TarotCards
```

Install dependencies in that directory:

```powershell
cd D:\Projects\TarotCards
npm install
```

Generate local tarot card assets if needed:

```powershell
cd D:\Projects\TarotCards
npm run generate:cards
```

## Run Frontend Only

```powershell
cd D:\Projects\TarotCards
npm run dev
```

Open the local Vite URL printed in the terminal, usually:

```text
http://localhost:5173
```

## Run Frontend And Local API Together

```powershell
cd D:\Projects\TarotCards
npm run dev:all
```

This starts:

- Frontend on `http://localhost:5173`
- Local API on `http://localhost:8787`

During development, Vite proxies `/api/*` requests to the local Express server automatically.

## Production Build

```powershell
cd D:\Projects\TarotCards
npm run build
npm run preview
```

## Tarot Draw Logic

The reading flow is intentionally traceable:

1. The selected spread decides card count and position meanings.
2. The deck is shuffled with Fisher-Yates in `src/lib/shuffle.ts`.
3. The first N cards are drawn from the shuffled deck, so duplicates cannot occur within one spread.
4. Each drawn card receives an independent upright / reversed orientation.
5. Interpretation is built in `src/lib/interpretation.ts`.

Interpretation layers:

- Base meaning: card meaning plus orientation
- Positional meaning: the card's role inside the selected spread
- Zodiac overlay: additional tone and emphasis from the selected zodiac profile

## Zodiac Overlay Logic

Zodiac never rewrites tarot meaning itself.

It only adds:

- emotional tone
- decision style emphasis
- caution or encouragement bias

This keeps the result explainable and avoids black-box copy generation.

## Bilingual Content Layer

The project now supports bilingual authored content in the data layer:

- tarot card name
- short card description
- upright / reversed keywords
- upright / reversed meaning
- zodiac profile name
- zodiac tone, emphasis and advice

UI labels and core authored content can now switch together between Chinese and English.

## Backend And Persistence

The project supports two storage modes:

- Local fallback: `server/data/db.json`
- Postgres mode: enabled automatically when one of these environment variables exists:
  - `POSTGRES_URL`
  - `POSTGRES_PRISMA_URL`
  - `DATABASE_URL`

Current API routes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/readings`
- `POST /api/readings`
- `GET /api/favorites`
- `POST /api/favorites`

The API now validates auth payloads, reading payloads, and favorite actions before writing data.

## Vercel Deployment Notes

The project is structured for Vercel deployment:

- Frontend uses relative `/api/*` paths
- Root-level `api/` files are ready for Vercel Functions
- Postgres mode is suitable for deployment
- Local JSON mode remains available for development only

Recommended deployment flow:

1. Push the repo to GitHub
2. Import it into Vercel
3. Add a Postgres integration from the Vercel Marketplace
4. Let Vercel inject the database environment variables
5. Redeploy

Recommended production storage:

- Neon via Vercel Marketplace

Important note:

- `server/data/db.json` is for local development only
- production deployments should use Postgres

## Sharing And Export

The result panel supports:

- browser-native sharing when available
- clipboard fallback
- PNG export with `html-to-image`

## Local Card Assets

Tarot card visuals no longer depend on external image hosts.

- static card art lives in `public/cards`
- generation script lives in `scripts/generate-card-assets.mjs`
- current tarot data points to local `/cards/*.svg` assets

This is more stable for Vercel deployment and avoids remote image failures during result export.

## Next Expansion Directions

- Fully localize tarot card meanings and zodiac authored content into both Chinese and English
- Replace external image URLs with optimized local assets
- Add proper database migrations
- Add stronger account security and session management
- Add more spread templates and question funnels
- Add a complete searchable card library
- Add richer star chart animation and ritual choreography
