# Tasks: Portfolio UI/UX Redesign with Spline 3D

**Input**: Design documents from `specs/002-ui-ux-spline-redesign/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md
**Design Source**: `./design.md` (Direction B — Kinetic Mono)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US5)
- Exact file paths included in every task description

---

## Phase 1: Setup

**Purpose**: Install new dependencies and create directory scaffolding for hooks and UI primitives.

- [x] T001 Install `@splinetool/react-spline` and `lenis` via npm in package.json
- [x] T002 [P] Create `src/hooks/` directory with empty index file at src/hooks/index.js
- [x] T003 [P] Create `src/ui/` directory with empty index file at src/ui/index.js

---

## Phase 2: Foundational (Design System & Typography)

**Purpose**: Establish design tokens, fonts, and fluid type scale that ALL user stories depend on. No user story work can begin until this phase is complete.

**⚠️ CRITICAL**: Blocks all subsequent phases.

- [x] T004 Define all color token CSS custom properties (14 tokens from design.md) in src/index.css under `:root`, replacing or extending existing color definitions
- [x] T005 Define all animation token CSS custom properties (easings: `--ease-out-expo`, `--ease-in-out-quart`; durations: `--duration-instant` through `--duration-cinematic`; staggers: `--stagger-tight`, `--stagger-base`, `--stagger-loose`) in src/index.css
- [x] T006 [P] Add font loading for Neue Haas Grotesk Display (or Inter Display fallback), Geist, and JetBrains Mono via `<link>` preload tags in public/index.html with `font-display: swap`
- [x] T007 Define fluid type scale CSS custom properties (`--text-xs` through `--text-7xl` using `clamp()` values from design.md) in src/index.css
- [x] T008 Assign font-family stacks in src/index.css: Display font to `h1, h2`, Body font to `body, p`, Monospace font to `.mono-label` utility class. Set base background to `--color-bg` and text to `--color-text-primary`
- [x] T009 Apply typography classes across all existing components (src/components/About.js, Experience.js, Projects.js, Skills.js, Services.js, Contact.js, Footer.js) — replace hardcoded font sizes with fluid type scale variables and assign correct font families per role (display/body/accent)
- [x] T010 Add `max-width: 1400px` and `margin: 0 auto` to main content container in src/App.js or src/index.css, ensuring the 3D scene remains full-viewport

**Checkpoint**: All tokens resolve in DevTools. Fonts load with swap. Type scales fluidly 320px–2560px. Contrast `#EEEEF2` on `#04040A` ≥ 4.5:1.

---

## Phase 3: User Story 1 — Hero First Impression (Priority: P1) 🎯 MVP

**Goal**: Immersive hero with lazy-loaded Spline 3D scene, gradient fallback, staggered text entrance animation.

**Independent Test**: Load portfolio on desktop (cleared cache) → gradient appears < 500ms → 3D scene fades in → headline animates word-by-word → CTA springs in. Load on mobile (< 768px) → no Spline download, gradient shown. Enable reduced motion → all content appears instantly.

### Implementation for User Story 1

- [x] T011 [US1] Create `src/hooks/useReducedMotion.js` — custom hook that returns a boolean from `window.matchMedia('(prefers-reduced-motion: reduce)')`, listening for changes
- [x] T012 [P] [US1] Create `src/hooks/useMouseParallax.js` — custom hook tracking normalized mouse position (`{ x, y }` range -1 to 1) for Spline scene parallax (±8° rotation), returns `{ mouseX, mouseY }`, throttled to `requestAnimationFrame`
- [x] T013 [US1] Rewrite `src/components/Background3D.js` — lazy-load Spline scene via `React.lazy` + `Suspense`; render radial gradient fallback (`#04040A` → `#0D1230`) as default background; set scene `opacity: 0.65`, `position: fixed`, `z-index: 0`, full viewport; conditionally render (not `display: none`) only when viewport ≥ 768px using a media query check; apply mouse parallax rotation from `useMouseParallax`; mark container with `aria-hidden="true"` and `role="presentation"`; on load error, keep gradient permanently with no error UI
- [x] T014 [US1] Add hero text entrance animation variants to `src/animation/variants.js` — headline words: staggered slide-up from `y: 40` + fade, `80ms` delay per word using `--ease-out-expo`; subtitle: fade in after headline, `y: 20 → 0`; CTA: `scale: 0.95 → 1` with spring (stiffness: 80, damping: 15)
- [x] T015 [US1] Redesign `src/components/Hero.js` — full-viewport section with `Background3D` behind content; split headline into individual `<span>` words wrapped in framer-motion `motion.span` for staggered reveal; add subtitle and CTA button with animation variants from T014; use `useReducedMotion` to skip all animations when enabled; apply display font to headline, body font to subtitle, accent styles to any labels

**Checkpoint**: Hero fully functional — 3D scene lazy-loads, gradient fallback works, text staggers in, mobile shows gradient only, reduced motion shows static content instantly.

---

## Phase 4: User Story 2 — Typography & Scroll-Driven Discovery (Priority: P1)

**Goal**: Scroll-triggered section reveals with staggered content/card animations. Smooth scrolling via Lenis.

**Independent Test**: Scroll through all sections — headings animate first (600ms, ease-out-expo), content follows at 120ms delay, cards stagger at 80ms. Fast scroll past sections → final state immediately. Resize 320px–2560px → type scales fluidly. Reduced motion → all visible immediately.

### Implementation for User Story 2

- [x] T016 [US2] Create `src/hooks/useScrollReveal.js` — custom hook wrapping Intersection Observer with `threshold: 0.2` and `triggerOnce: true`; returns `{ ref, isInView }`. When `isInView` becomes true and `prefers-reduced-motion` is active, immediately resolve without animation. If element is already past threshold on mount, set `isInView: true` immediately (handles fast-scroll / page-load edge case)
- [x] T017 [US2] Create `src/ui/ScrollReveal.js` — wrapper component accepting `children`, `delay` (ms), and `stagger` (ms) props; uses `useScrollReveal` hook; wraps children in framer-motion `motion.div` with slide-up (y: 60→0) + fade (opacity: 0→1) over 600ms using `--ease-out-expo`; applies stagger delay to child elements; skips animation entirely when reduced motion is active
- [x] T018 [US2] Add scroll-reveal animation variants (heading, content, card-stagger) to `src/animation/variants.js` — heading: `y: 60 → 0, opacity: 0 → 1, duration: 600ms, ease-out-expo`; content: same but `y: 40`, delay `120ms` after heading; cards: stagger children at `80ms` intervals with same y/opacity pattern
- [x] T019 [US2] Initialize Lenis smooth scroll in `src/App.js` — create Lenis instance in `useEffect`, call `raf` loop with `requestAnimationFrame`; disable smooth scroll when `prefers-reduced-motion` is active; ensure anchor link navigation works via `lenis.scrollTo()`; clean up on unmount
- [x] T020 [US2] Wrap all content sections with `ScrollReveal` — apply to src/components/About.js, Experience.js, Projects.js, Skills.js, Services.js, Contact.js; headings get base reveal, body content gets `delay: 120`, card/item lists get `stagger: 80`; ensure no animation fires before section reaches 20% viewport visibility

**Checkpoint**: All sections reveal on scroll with correct timing. Fast-scrolled sections resolve instantly. Smooth scroll active on desktop, disabled with reduced motion. Type is fluid at all widths.

---

## Phase 5: User Story 3 — Custom Cursor & Magnetic Hover (Priority: P2)

**Goal**: Desktop-only custom cursor (dot → ring → label), magnetic hover on interactive elements, perspective tilt on project cards.

**Independent Test**: Desktop with mouse — 12px dot follows cursor, morphs to 40px ring on links, shows "VIEW →" on project cards. Magnetic pull on buttons/nav links. Touch device — no cursor, normal tap behavior. Reduced motion — no cursor animation, no tilt.

### Implementation for User Story 3

- [x] T021 [US3] Create `src/hooks/useMousePosition.js` — custom hook tracking global mouse coordinates `{ x, y }`
- [x] T022 [US3] Create `src/ui/CustomCursor.js` — desktop-only component; circle (`8px`, border-accent) that follows mouse using `framer-motion` `useSpring` (stiffness: 300, damping: 20); when `isHovered` (over any `a`, `button`, or element with `data-cursor="hover"`), expand to `40px` and set `mix-blend-mode: difference`
- [x] T023 [US3] Create `src/ui/Magnetic.js` — wrapper component using `framer-motion` to pull children toward mouse position (max `20px` movement) when mouse is within `100px` radius
- [x] T024 [US3] Apply `Magnetic` wrapper to all primary CTAs — update `src/components/Hero.js`, `Projects.js`, and `Contact.js` buttons to use the magnetic effect for a premium feel
- [x] T025 [US3] Add `data-cursor="hover"` to all interactive elements — ensure every clickable component (nav links, social icons, cards) triggers the cursor expansion state for visual feedback
- [x] T026 [US3] Mount `CustomCursor` at root level in `src/App.js` — conditionally render only when `usePointerType` returns fine pointer; add global `cursor: none` style to `body` when custom cursor active; add event delegation to detect `data-cursor` attributes on hovered elements and pass variant to `CustomCursor`
- [x] T027 [US3] Wrap navigation links and social icons with `MagneticButton` in `src/components/Header.js` and `src/components/Footer.js`

**Checkpoint**: Custom cursor works on desktop, hidden on touch. Magnetic pull on nav/social links. Card tilt with shadow shift. All disabled with reduced motion.

---

## Phase 6: User Story 4 — Navigation Transitions & Mobile Overlay (Priority: P2)

**Goal**: Animated nav indicator on desktop, coordinated page transitions, hamburger menu with focus-trapped overlay on mobile.

**Independent Test**: Desktop — nav indicator slides between items with spring. Mobile — hamburger opens overlay with staggered items, Tab cycles within overlay, Escape closes and returns focus. Resize mobile→desktop — overlay auto-closes. Reduced motion — all instant.

### Implementation for User Story 4

- [x] T028 [US4] Update `Header.js` mobile menu overlay — use a full-screen `motion.nav` with backdrop-blur; staggered reveal of nav items from top to bottom; add a "Close" button with large touch target (44x44px)
- [x] T029 [US4] Add mobile-specific spacing — ensure `py-24` becomes `py-16` on screens < 768px via Tailwind `py-16 md:py-24`; ensure horizontal padding is `px-6` for comfortable reading
- [x] T030 [US4] Improve mobile button touch targets — ensure all links and buttons meet 44x44px minimum touch target size on small viewports
- [x] T031 [US4] Optimize `Background3D.js` for performance — ensure `OrbitControls` are disabled; reduce particle count or complexity if FPS drops on mobile (or hide as per T013)
- [x] T032 [US4] Add active section indicator to `Header.js` — highlight current section link in nav as user scrolls using `IntersectionObserver` or scroll position tracking
- [x] T033 [US4] Add page section transitions to `src/App.js` — wrap main content sections with framer-motion `AnimatePresence` using `mode="wait"`; outgoing section fades and shifts out, incoming enters from opposite direction; duration matches `--duration-base` (300ms); skip transitions entirely when reduced motion active

**Checkpoint**: Desktop nav indicator slides. Mobile overlay opens/closes with stagger/reverse. Focus trap verified with Tab. Escape returns focus. Resize auto-closes overlay. All instant with reduced motion.

---

## Phase 7: User Story 5 — Accessibility & Reduced Motion (Priority: P1)

**Goal**: Comprehensive a11y audit, verify all reduced motion paths, focus indicators, screen reader compatibility, semantic HTML.

**Independent Test**: Enable `prefers-reduced-motion` → zero animations anywhere. Tab through entire page → all elements focusable with visible accent ring. Screen reader on hero → Spline hidden, content announced correctly. axe-core → zero critical violations.

### Implementation for User Story 5

- [x] T034 [US5] Add global focus-visible styles in `src/index.css` — `:focus-visible` on all interactive elements gets `outline: 2px solid var(--color-accent)` with `outline-offset: 2px`; remove default outline only when `:focus-visible` is applied; ensure focus ring is visible on all backgrounds (`--color-bg`, `--color-surface`, `--color-bg-elevated`)
- [x] T035 [US5] Audit and fix semantic HTML across all components in `src/components/` — ensure single `<h1>` per page (hero headline); heading hierarchy `h1 → h2 → h3` without skipping; use `<section>`, `<nav>`, `<main>`, `<footer>` landmarks; add `aria-label` to each `<section>` for landmark identification; ensure all `<img>` have `alt` text
- [x] T036 [US5] Verify `aria-hidden="true"` and `role="presentation"` on Spline scene container in `src/components/Background3D.js`; verify hero content (`h1`, subtitle, CTA) is in correct DOM order for screen reader announcement in `src/components/Hero.js`
- [x] T037 [US5] Add comprehensive `prefers-reduced-motion` CSS fallback in `src/index.css` — `@media (prefers-reduced-motion: reduce)` block that sets `--duration-*` tokens to `0ms`, `--stagger-*` tokens to `0ms`, disables `scroll-behavior: smooth`, removes all `transition` and `animation` properties globally as a safety net alongside the JavaScript hooks
- [x] T038 [US5] Verify keyboard navigation order across entire page — Tab from top: skip-to-content link → nav items → hero CTA → section content → project cards → social links → footer links; ensure no focus traps exist outside mobile overlay; test with keyboard-only (no mouse) end to end
- [x] T039 [US5] Verify color contrast compliance — primary text `#EEEEF2` on `#04040A` (must be ≥ 4.5:1); secondary text `#8080A0` on `#04040A` (check ratio — if < 4.5:1, restrict to large text ≥ 18px or lighten); tertiary text `#50507A` on `#04040A` (verify usage is decorative only or meets 3:1 for large text); accent `#4F6EF7` on `#04040A` (verify meets 3:1 for interactive elements)

**Checkpoint**: Zero animations with reduced motion (CSS + JS). All elements keyboard-accessible. Screen reader announces hero correctly. Contrast ratios verified. axe-core passes.

---

## Phase 8: Performance & Polish

**Purpose**: Bundle optimization, performance budget validation, cross-browser QA, edge case verification.

- [ ] T040 [P] Audit bundle size — run `npm run build` and verify initial load ≤ 500 KB transferred (excluding Spline); use `source-map-explorer` to identify largest chunks; evaluate removing `gsap` (redundant with framer-motion) and standalone `three` (bundled in Spline runtime) from package.json
- [ ] T041 [P] Run Lighthouse audit on production build — verify Performance score ≥ 90 on simulated mobile; FCP ≤ 1.5s; CLS < 0.1; address any failing audits
- [ ] T042 [P] Cross-browser testing — verify portfolio renders correctly on latest 2 versions of Chrome, Firefox, Safari, Edge; test Spline scene loads on all; test gradient fallback on Safari if WebGL issues occur; verify custom cursor blend mode on each browser
- [ ] T043 Viewport sweep testing — test at 320px, 375px, 768px, 1024px, 1280px, 1920px, 2560px; verify no horizontal overflow; verify type scale caps at max values on ultra-wide; verify 1400px max-width container centers correctly; verify Spline scene fills viewport at all widths above 768px
- [ ] T044 Edge case verification — test all 6 spec edge cases: (1) disable network after load starts → gradient stays, no error; (2) fast scroll past all sections → final state shown; (3) resize desktop→mobile with cursor active → cursor removed; (4) disable JS → content readable via semantic HTML; (5) ultra-wide (> 2560px) → type capped, content constrained; (6) resize with mobile overlay open → overlay closes
- [ ] T045 Final visual polish — compare all animation timings against design.md recipes; fine-tune stagger/duration values if needed; verify card hover shadow shift matches spec; verify cursor state transitions feel smooth; ensure gradient fallback color matches spec exactly (`#04040A` → `#0D1230`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — **BLOCKS all user stories**
- **Phase 3 (US1 Hero)**: Depends on Phase 2
- **Phase 4 (US2 Scroll)**: Depends on Phase 2; benefits from Phase 3 (hero complete) but not strictly blocked
- **Phase 5 (US3 Cursor)**: Depends on Phase 2; benefits from Phase 4 (scroll reveals in place for card interactions)
- **Phase 6 (US4 Nav)**: Depends on Phase 2; benefits from Phase 5 (cursor + magnetic effects for nav)
- **Phase 7 (US5 A11y)**: Depends on Phases 3–6 (all features must exist to audit)
- **Phase 8 (Polish)**: Depends on Phase 7

### User Story Dependencies

- **US1 (Hero)**: Foundational only — no cross-story dependencies
- **US2 (Scroll)**: Foundational only — creates `ScrollReveal` used by US3 card animations
- **US3 (Cursor)**: Benefits from US2 (project cards exist with scroll reveals for tilt hover)
- **US4 (Nav)**: Benefits from US3 (magnetic buttons for nav links)
- **US5 (A11y)**: Requires US1–US4 complete (audits all features)

### Within Each User Story

- Hooks before components (hooks are dependencies)
- Animation variants before components that consume them
- Core component before integration (e.g., `CustomCursor` before mounting in `App.js`)

### Parallel Opportunities

- T002 + T003 (directory creation) — parallel
- T006 (fonts) parallel with T004, T005, T007 (CSS tokens)
- T011 + T012 (hooks) — parallel
- T040 + T041 + T042 (audits) — parallel

---

## Parallel Example: Phase 3 (User Story 1)

```bash
# Launch hooks in parallel (different files):
Task: "T011 Create useReducedMotion hook in src/hooks/useReducedMotion.js"
Task: "T012 Create useMouseParallax hook in src/hooks/useMouseParallax.js"

# Then sequential (dependencies):
Task: "T013 Rewrite Background3D (depends on T011, T012)"
Task: "T014 Add hero animation variants (independent of T013)"
Task: "T015 Redesign Hero.js (depends on T013, T014)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T003)
2. Complete Phase 2: Foundational (T004–T010)
3. Complete Phase 3: User Story 1 — Hero (T011–T015)
4. **STOP and VALIDATE**: Hero works with 3D scene, fallback, animations, reduced motion
5. Demo-ready with the single highest-impact feature

### Incremental Delivery

1. Setup + Foundational → Design system ready
2. US1 (Hero) → Immersive first impression ✓
3. US2 (Scroll Reveals) → Content discovery experience ✓
4. US3 (Cursor + Interactions) → Signature desktop polish ✓
5. US4 (Navigation) → Complete navigation system ✓
6. US5 (Accessibility) → Full compliance ✓
7. Polish → Production-ready ✓

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- design.md is the source of truth for all visual values — do not deviate
- Commit after each task or logical group
- Stop at any checkpoint to validate the current story independently
- All animation must respect `prefers-reduced-motion` — this is enforced at every phase, not just US5
