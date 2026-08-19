# Landing Page

> Repository containing the landing page of the project. This page is meant to briefly present the project as well as redirect the user to a download page.

## Keypr landing page

This landing page is built using [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/). It is currently deployed using Github Pages, but can be deployed on any static hosting service.

### Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` produces the production build,
`npm run lint` runs ESLint.

### Structure

- `app/layout.tsx` : fonts, metadata, root shell.
- `app/page.tsx` : composes the page sections.
- `components/` : `Navbar`, `Hero`, `KeyScene`, `BentoGrid`, `WhySection` /
  `StackCard`, `DownloadSection`, `Footer`.
- `lib`: `constants.ts` : links to be modified for deployment.

---

> **Note:** The landing page has been fully designed, developped and thought by the team. However, we've used Claude AI to help us write the code related to animations, GSAP, and Three.js.
