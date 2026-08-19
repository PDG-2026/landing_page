# landing_page
> Repository containing the landing page of the project. This page is meant to briefly present the project as well as redirect the user to a download page.

## VaultKey landing page

Next.js (App Router) + TypeScript + Tailwind CSS single-page site, with Motion for
scroll/entrance animations, react-three-fiber + drei for the hero's procedural 3D key, and
GSAP ScrollTrigger for the scroll-stacking feature cards.

### Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` produces the production build,
`npm run lint` runs ESLint.

### Swapping placeholder links

All external links live in `lib/constants.ts`:

- `GITHUB_URL` — the real VaultKey repository (also drives the per-OS release download URLs).
- `EXTENSION_URL` — the real browser extension store listing.

### Structure

- `app/layout.tsx` — fonts, metadata, root shell.
- `app/page.tsx` — composes the page sections.
- `components/` — `Navbar`, `Hero`, `KeyScene` (r3f canvas), `BentoGrid`, `WhySection` /
  `StackCard`, `DownloadSection`, `Footer`.
