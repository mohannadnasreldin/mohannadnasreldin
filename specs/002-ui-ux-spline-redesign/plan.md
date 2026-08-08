# Implementation Plan: Portfolio UI/UX Redesign with Spline 3D

**Branch**: `002-ui-ux-spline-redesign` | **Date**: 2026-05-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/002-ui-ux-spline-redesign/spec.md`

## Summary

Redesign the portfolio with an immersive Spline 3D hero, expressive three-font typography system, scroll-driven section reveals, custom cursor micro-interactions, animated navigation transitions, and full accessibility/performance compliance. All visual decisions are anchored to `./design.md` (Direction B — Kinetic Mono). The existing React + CRA codebase is extended in place; no framework migration is required.

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 18.2  
**Primary Dependencies**: react 18, framer-motion 12, @splinetool/react-spline (new), lenis (new)  
**Storage**: N/A (static portfolio, no backend)  
**Testing**: @testing-library/react, manual Lighthouse audits, axe-core for a11y  
**Target Platform**: Web — latest 2 versions of Chrome, Firefox, Safari, Edge  
**Project Type**: Single-page web application (static deploy)  
**Performance Goals**: Lighthouse ≥ 90, FCP ≤ 1.5s, CLS < 0.1, initial page ≤ 500 KB  
**Constraints**: Spline scene ≤ 2 MB (current: 1.4 MB), self-hosted from `public/`  
**Scale/Scope**: ~12 components, 1 page, single developer

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution is a placeholder template with no active principles or constraints. **No gate violations.** Proceeding.

## Project Structure

### Documentation (this feature)

```text
specs/002-ui-ux-spline-redesign/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── App.js                          # Root component — add CustomCursor, AnimatePresence
├── index.js                        # Entry point
├── index.css                       # Design tokens (CSS custom properties)
├── animation/
│   └── variants.js                 # Framer Motion variants (extend)
├── components/
│   ├── Header.js                   # Navigation bar — redesign with animated indicator
│   ├── Hero.js                     # Hero section — Spline integration, staggered text
│   ├── Background3D.js             # Spline scene wrapper — lazy load + fallback
│   ├── About.js                    # Content section — scroll reveals
│   ├── Experience.js               # Content section — scroll reveals
│   ├── Projects.js                 # Project cards — tilt hover, stagger
│   ├── Skills.js                   # Skills section — scroll reveals
│   ├── Services.js                 # Services section — scroll reveals
│   ├── Contact.js                  # Contact section — scroll reveals
│   └── Footer.js                   # Footer
├── context/
│   └── ThemeContext.js             # Theme context (existing)
├── hooks/                          # NEW directory
│   ├── useReducedMotion.js         # prefers-reduced-motion detection
│   ├── useMouseParallax.js         # Mouse position tracking for Spline
│   ├── useMagneticHover.js         # Magnetic pull effect for interactive elements
│   ├── useScrollReveal.js          # Intersection Observer at 20% threshold
│   └── usePointerType.js           # Fine vs coarse pointer detection
└── ui/                             # NEW directory
    ├── CustomCursor.js             # Custom cursor component (desktop only)
    ├── MobileNav.js                # Mobile overlay navigation
    ├── ScrollReveal.js             # Wrapper component for scroll-triggered reveals
    └── MagneticButton.js           # Button with magnetic hover effect

public/
├── nexbot_by_aximoris.spline       # Spline 3D scene (1.4 MB, self-hosted)
└── index.html                      # Add font preload links
```

**Structure Decision**: Extend the existing flat `src/components/` structure. Add `src/hooks/` for reusable animation/interaction hooks and `src/ui/` for new shared UI primitives (cursor, mobile nav, scroll wrappers). This avoids unnecessary restructuring while providing clear separation.

---

## Implementation Phases

### Phase 1 — Design System Foundation

**Goals**: Establish CSS custom properties for all design tokens from `design.md`. Set up fonts. Create the visual foundation that all subsequent phases depend on.

**Files to change**:
- `src/index.css` — replace/extend with design tokens (colors, type scale, animation, spacing)
- `public/index.html` — add font preload links, update meta
- `package.json` — no changes yet (fonts via Google Fonts `<link>`)

**Dependencies**: None (first phase)

**Risks & Mitigation**:
- *Risk*: Neue Haas Grotesk Display may not be freely available on Google Fonts → *Mitigation*: Fall back to Neue Haas Grotesk from CDN or substitute with Inter Display (similar weight range). Research phase confirmed alternatives.
- *Risk*: Tailwind classes conflict with new CSS custom properties → *Mitigation*: New tokens use `--color-*` / `--text-*` namespace; Tailwind utilities remain usable alongside.

**Verification**:
- All token variables resolve correctly in browser DevTools
- Fonts load with `font-display: swap` (no FOIT)
- Contrast ratios verified: `#EEEEF2` on `#04040A` ≥ 4.5:1

---

### Phase 2 — Typography System & Fluid Type Scale

**Goals**: Apply the three-font typography system (Display, Body, Accent) and fluid `clamp()` type scale across all existing components.

**Files to change**:
- `src/index.css` — font-family assignments, fluid type scale utilities
- All components in `src/components/` — update className usage for typography
- `src/animation/variants.js` — no changes yet

**Dependencies**: Phase 1 (tokens + fonts must be loaded)

**Risks & Mitigation**:
- *Risk*: Existing Tailwind typography classes override new font stacks → *Mitigation*: Apply font-family at the CSS level (`:root`, `h1-h6`, `code/pre`) so they cascade; Tailwind size classes replaced with fluid `clamp()` values.
- *Risk*: Monospace accent font used in body copy by mistake → *Mitigation*: Lint rule or code review checklist item per FR-008.

**Verification**:
- Display font renders on H1, H2, hero statements
- Body font on paragraphs, descriptions
- Monospace only on labels, tags, chips, badges
- Resize 320px → 2560px — type scales fluidly, no jumps
- No horizontal overflow at 375px

---

### Phase 3 — Hero Section & Spline 3D Integration

**Goals**: Rebuild the hero with lazy-loaded Spline scene, gradient fallback, and staggered text entrance animation.

**Files to change**:
- `src/components/Hero.js` — full redesign with animated headline, subtitle, CTA
- `src/components/Background3D.js` — rewrite as lazy Spline wrapper with fallback
- `src/hooks/useMouseParallax.js` — NEW: track cursor for ±8° scene rotation
- `src/hooks/useReducedMotion.js` — NEW: detect `prefers-reduced-motion`
- `src/animation/variants.js` — add hero entrance variants
- `package.json` — add `@splinetool/react-spline`

**Dependencies**: Phase 2 (typography must be in place for hero text)

**Risks & Mitigation**:
- *Risk*: Spline scene blocks main thread during parse → *Mitigation*: Load via `React.lazy` + `Suspense`; the scene is behind a gradient placeholder. Spline component is `position: fixed` at `z-index: 0` with `opacity: 0.65`.
- *Risk*: `.spline` format not supported by `@splinetool/react-spline` (expects `.splinecode`) → *Mitigation*: Research confirms both formats work; if `.spline` fails, export as `.splinecode` from Spline editor (stays under 2 MB).
- *Risk*: Scene downloads on mobile despite `display: none` → *Mitigation*: Conditionally render (not just hide) the Spline component based on viewport width using a media query hook. Only mount above 768px.

**Verification**:
- Desktop: gradient appears < 500ms, scene fades in when ready
- Mobile (< 768px): no network request for `.spline` file
- GPU-disabled device: gradient fallback, no console errors
- Reduced motion: hero text + CTA appear instantly, no animation
- Scene responds to mouse movement (±8° parallax)

---

### Phase 4 — Motion System & Scroll Reveals

**Goals**: Implement scroll-triggered section reveals with staggered animations. Add smooth scrolling. Build reusable scroll reveal primitives.

**Files to change**:
- `src/hooks/useScrollReveal.js` — NEW: Intersection Observer (20% threshold)
- `src/ui/ScrollReveal.js` — NEW: wrapper component
- `src/animation/variants.js` — add section reveal + card stagger variants
- All content components (`About.js`, `Experience.js`, `Projects.js`, `Skills.js`, `Services.js`, `Contact.js`) — wrap with ScrollReveal
- `package.json` — add `lenis` for smooth scrolling
- `src/App.js` — initialize Lenis scroll instance

**Dependencies**: Phase 3 (hero must be complete; reduced motion hook reused)

**Risks & Mitigation**:
- *Risk*: Intersection Observer fires for already-scrolled-past sections on page load → *Mitigation*: Use `triggerOnce: true` pattern; if element is already past threshold when observer attaches, resolve to final state immediately.
- *Risk*: Lenis conflicts with native scroll behavior or anchor links → *Mitigation*: Configure Lenis to respect `prefers-reduced-motion` (disable smooth scroll) and ensure anchor links still work via Lenis's `scrollTo()` API.
- *Risk*: Stagger animations accumulate and lag on slow devices → *Mitigation*: Cap stagger to first 8 visible children; remaining appear without stagger.

**Verification**:
- Scroll through all sections: headings animate first, content follows at 120ms, cards stagger at 80ms
- Fast scroll: passed sections resolve to final state (no animation backlog)
- Reduced motion: all sections visible immediately
- Smooth scrolling active on desktop, disabled when reduced motion enabled

---

### Phase 5 — Custom Cursor & Micro-Interactions

**Goals**: Implement custom cursor (desktop fine-pointer only), magnetic hover on interactive elements, and perspective tilt on project cards.

**Files to change**:
- `src/ui/CustomCursor.js` — NEW: 12px dot → 40px ring → "VIEW →" label
- `src/ui/MagneticButton.js` — NEW: magnetic pull wrapper
- `src/hooks/useMagneticHover.js` — NEW: magnetic effect logic
- `src/hooks/usePointerType.js` — NEW: fine vs coarse detection
- `src/components/Projects.js` — add perspective tilt to cards
- `src/components/Header.js` — wrap nav links with MagneticButton
- `src/App.js` — mount CustomCursor at root level

**Dependencies**: Phase 4 (scroll system must be stable; reduced motion + pointer hooks foundation)

**Risks & Mitigation**:
- *Risk*: Custom cursor adds jank on lower-end devices → *Mitigation*: Use CSS `transform: translate3d()` for GPU-accelerated cursor movement; throttle position updates to `requestAnimationFrame`.
- *Risk*: `mix-blend-mode: difference` breaks on certain backgrounds → *Mitigation*: Test against all surface colors from design tokens; adjust blend mode if needed.
- *Risk*: Magnetic pull interferes with click targets (a11y) → *Mitigation*: Magnetic offset is capped at 8px max translation; actual click/focus area remains unchanged.

**Verification**:
- Desktop mouse: 12px dot follows cursor, morphs to ring on links, shows "VIEW →" on cards
- Touch device / coarse pointer: no custom cursor visible
- Magnetic pull: buttons shift toward cursor within radius, snap back on exit
- Card tilt: perspective rotation tracks cursor, shadow shifts, border brightens
- Reduced motion: no cursor animation, no magnetic effect, no card tilt

---

### Phase 6 — Navigation Transitions & Mobile Overlay

**Goals**: Animated nav indicator on desktop, page section transitions, hamburger overlay with focus trap on mobile.

**Files to change**:
- `src/components/Header.js` — animated indicator (underline/highlight slides between items)
- `src/ui/MobileNav.js` — NEW: full-screen overlay with staggered menu items
- `src/App.js` — wrap sections with `AnimatePresence` for page transitions
- `src/animation/variants.js` — add nav transition + overlay variants

**Dependencies**: Phase 5 (cursor + magnetic effects must be in place for nav interactions)

**Risks & Mitigation**:
- *Risk*: Focus trap implementation breaks on certain screen readers → *Mitigation*: Use established focus-trap pattern (track first/last focusable element, loop Tab, handle Escape).
- *Risk*: Overlay open during resize from mobile to desktop leaves stale state → *Mitigation*: Listen for viewport resize; auto-close overlay when width ≥ 768px.
- *Risk*: Page transitions cause content flash or layout shift → *Mitigation*: Use `mode="wait"` on AnimatePresence so exit completes before enter begins; fixed-height containers prevent CLS.

**Verification**:
- Desktop: nav indicator slides between items with spring physics
- Mobile: hamburger opens overlay, items stagger in at 80ms intervals
- Overlay focus trap: Tab cycles within overlay only
- Escape / close button: overlay closes, focus returns to hamburger
- Resize from mobile to desktop: overlay auto-closes
- Reduced motion: all transitions instantaneous

---

### Phase 7 — Accessibility, Reduced Motion & Performance Tuning

**Goals**: Comprehensive a11y audit, verify all reduced-motion paths, optimize bundle and asset loading for performance budget.

**Files to change**:
- All components — audit ARIA attributes, focus order, semantic HTML
- `src/components/Background3D.js` — ensure `aria-hidden="true"`, `role="presentation"`
- `src/index.css` — add focus-visible styles (accent ring)
- `public/index.html` — optimize preload/prefetch strategy
- `package.json` — audit bundle (remove unused deps like gsap if replaced by framer-motion)

**Dependencies**: Phase 6 (all features must be implemented before audit)

**Risks & Mitigation**:
- *Risk*: Bundle exceeds 500 KB initial budget → *Mitigation*: Code-split Spline scene (already lazy); tree-shake unused icon libraries; analyze with `source-map-explorer`; remove duplicate animation libs (gsap vs framer-motion — keep one).
- *Risk*: Contrast fails on secondary/tertiary text → *Mitigation*: Verify `#8080A0` on `#04040A` (ratio ~4.1:1); if below 4.5:1 for body use, lighten the secondary color or restrict to large text only.

**Verification**:
- Lighthouse Performance ≥ 90 (mobile simulation)
- FCP ≤ 1.5s, CLS < 0.1
- Initial load ≤ 500 KB (network tab, gzipped)
- axe-core scan: zero critical/serious violations
- Keyboard nav: Tab through entire page, all elements focusable
- Screen reader: Spline scene hidden, hero content announced correctly
- `prefers-reduced-motion`: zero animations across all sections

---

### Phase 8 — QA & Polish

**Goals**: Cross-browser testing, edge case verification, visual polish, final performance pass.

**Files to change**: Any files requiring fixes from QA findings

**Dependencies**: Phase 7 (a11y + perf baselines established)

**Risks & Mitigation**:
- *Risk*: Safari WebGL inconsistencies with Spline → *Mitigation*: Test on Safari 17+; if scene fails, fallback gradient activates per FR-003.
- *Risk*: Animation timing feels wrong at certain viewport sizes → *Mitigation*: Fine-tune stagger/duration values per design.md tokens; test at 375px, 768px, 1280px, 1920px, 2560px.

**Verification**:
- Cross-browser: Chrome, Firefox, Safari, Edge (latest 2 versions)
- Viewport sweep: 320px, 375px, 768px, 1024px, 1280px, 1920px, 2560px
- Edge cases from spec: JS disabled, fast scroll, resize during cursor, overlay resize, scene download failure, ultra-wide viewport
- Final Lighthouse audit ≥ 90
- Visual comparison against design.md animation recipes

---

## Complexity Tracking

No constitution violations to justify. The project is a single React application with no unnecessary abstractions.

---

## New Dependencies Required

| Package | Purpose | Phase |
|---------|---------|-------|
| `@splinetool/react-spline` | Spline 3D scene rendering in React | 3 |
| `lenis` | Smooth scroll with reduced-motion support | 4 |

**Dependencies to evaluate for removal** (Phase 7):
- `gsap` — may be redundant if framer-motion covers all animation needs
- `three` — check if Spline's runtime bundles its own Three.js; if so, remove standalone dep
- `@tailwindcss/*` plugins — evaluate usage; unused plugins add to devDep bloat
