# Quickstart: 002-ui-ux-spline-redesign

## Prerequisites

- Node.js 18+ and npm
- Git (on branch `002-ui-ux-spline-redesign`)

## Setup

```bash
# Clone and switch to feature branch
git checkout 002-ui-ux-spline-redesign

# Install dependencies (including new ones from Phase 3-4)
npm install

# Start development server
npm start
```

## New Dependencies (added during implementation)

```bash
npm install @splinetool/react-spline lenis
```

## Key Files

| File | Purpose |
|------|---------|
| `src/index.css` | Design tokens (colors, type scale, animation) |
| `src/components/Hero.js` | Hero section with Spline 3D |
| `src/components/Background3D.js` | Spline scene wrapper + fallback |
| `src/hooks/useReducedMotion.js` | Reduced motion detection |
| `src/hooks/useScrollReveal.js` | Intersection Observer (20% threshold) |
| `src/ui/CustomCursor.js` | Custom cursor (desktop only) |
| `src/ui/MobileNav.js` | Mobile navigation overlay |
| `design.md` | Design system source of truth |

## Verification Commands

```bash
# Run dev server
npm start

# Run tests
npm test

# Build for production (checks bundle size)
npm run build

# Analyze bundle (install first: npm i -D source-map-explorer)
npx source-map-explorer build/static/js/*.js
```

## Key Design Decisions

1. **Self-hosted Spline** — `.spline` file served from `public/`, not Spline CDN
2. **Framer Motion only** — GSAP evaluated for removal to reduce bundle
3. **1400px max-width** — content containers capped for readability
4. **20% scroll threshold** — animations trigger when 20% of element visible
5. **No new CSS framework** — design tokens as CSS custom properties in `index.css`
