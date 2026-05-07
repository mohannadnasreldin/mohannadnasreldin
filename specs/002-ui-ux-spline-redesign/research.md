# Research: 002-ui-ux-spline-redesign

**Date**: 2026-05-07

## R1: Spline React Integration

**Decision**: Use `@splinetool/react-spline` for embedding the 3D scene.  
**Rationale**: Official React wrapper from Spline; supports both `.spline` and `.splinecode` formats; provides `onLoad` callback for fade-in timing; handles WebGL context lifecycle.  
**Alternatives considered**:
- Raw `<canvas>` with Three.js — too much boilerplate for a single scene; Spline's runtime already bundles Three.js internally.
- `<iframe>` embed — no mouse parallax control; no programmatic opacity/interaction.

## R2: Spline File Format

**Decision**: Use the existing `.spline` file (`nexbot_by_aximoris.spline`, 1.4 MB) self-hosted from `public/`.  
**Rationale**: Already in repo and under the 2 MB budget. Self-hosting avoids dependency on Spline CDN availability. If the runtime requires `.splinecode`, re-export from Spline editor.  
**Alternatives considered**:
- Spline CDN hosting — introduces third-party dependency and CORS considerations.
- Converting to glTF + Three.js — loses Spline's built-in interaction system.

## R3: Neue Haas Grotesk Display Availability

**Decision**: Use Neue Haas Grotesk Display if available via licensed CDN; otherwise substitute with **Inter Display** (weights 400, 700, 900) from Google Fonts.  
**Rationale**: Neue Haas Grotesk Display is a commercial typeface (Linotype). If the user has a license or CDN access, self-host. Inter Display is the closest free alternative with the same Swiss grotesque DNA and full weight range.  
**Alternatives considered**:
- Space Grotesk — lacks the 900 weight.
- Plus Jakarta Sans — slightly too rounded for the "Kinetic Mono" direction.

## R4: Smooth Scrolling Library

**Decision**: Use `lenis` (formerly @studio-freight/lenis).  
**Rationale**: Lightweight (~5 KB gzipped), provides native-feeling smooth scroll, respects `prefers-reduced-motion` out of the box, works with Intersection Observer (no conflict with scroll-triggered animations).  
**Alternatives considered**:
- Locomotive Scroll — heavier, more opinionated, overkill for this use case.
- CSS `scroll-behavior: smooth` — insufficient control for scroll-linked animations.
- No smooth scroll — acceptable fallback but misses the "kinetic" feel.

## R5: Animation Library Consolidation

**Decision**: Use `framer-motion` as the sole animation library. Evaluate removing `gsap`.  
**Rationale**: framer-motion is already installed (v12), provides spring physics, `AnimatePresence`, scroll-triggered animations via `whileInView`, and `useReducedMotion`. GSAP adds ~30 KB and overlaps in functionality.  
**Alternatives considered**:
- Keep both — unnecessary bundle weight.
- Replace framer-motion with GSAP — GSAP lacks React-native declarative API.

## R6: Three.js Dependency

**Decision**: Evaluate removal of standalone `three` package in Phase 7.  
**Rationale**: `@splinetool/react-spline` bundles its own Three.js runtime. If no other component uses Three.js directly, the standalone package (~600 KB unparsed) can be removed to reduce bundle.  
**Alternatives considered**:
- Keep for future 3D work — YAGNI; can re-add later.

## R7: Focus Trap Implementation

**Decision**: Implement focus trap manually (no new dependency).  
**Rationale**: The mobile nav overlay is the only component needing focus trap. A ~20-line utility tracking first/last focusable elements, handling Tab/Shift+Tab cycling, and Escape key is simpler than adding `focus-trap-react` (another dependency).  
**Alternatives considered**:
- `focus-trap-react` — adds dependency for a single use case.
- `react-aria` — too heavy for just focus management.

## R8: Custom Cursor Performance

**Decision**: Use CSS `transform: translate3d()` updated via `requestAnimationFrame` for cursor positioning.  
**Rationale**: GPU-accelerated transforms avoid layout thrashing. `requestAnimationFrame` naturally throttles to display refresh rate. `mix-blend-mode: difference` provides contrast on all backgrounds.  
**Alternatives considered**:
- CSS `left`/`top` positioning — causes layout recalculation.
- Canvas-based cursor — overkill, harder to style text labels.
