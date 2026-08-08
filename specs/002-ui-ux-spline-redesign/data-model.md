# Data Model: 002-ui-ux-spline-redesign

**Date**: 2026-05-07

This feature is a **UI/UX redesign** — it introduces no persistent data entities, database schemas, or server-side state. The "data model" for this feature consists of design tokens and component state contracts.

## Design Token Entities

### ColorToken
- `name`: CSS custom property name (e.g., `--color-bg`)
- `value`: CSS color value (hex, rgba)
- `role`: Semantic role (background, text, accent, border)
- Source: `design.md` → `index.css`

### TypeScaleToken
- `name`: CSS custom property name (e.g., `--text-xl`)
- `value`: CSS `clamp()` expression
- `min`/`max`: Pixel bounds
- Source: `design.md` → `index.css`

### AnimationToken
- `name`: CSS custom property name (e.g., `--ease-out-expo`)
- `value`: CSS timing function or duration
- Source: `design.md` → `index.css`

## Component State (runtime only, not persisted)

### CustomCursorState
- `position`: `{ x: number, y: number }` — mouse coordinates
- `variant`: `'default' | 'link' | 'card'` — determines visual style
- `visible`: `boolean` — hidden on touch devices
- `scale`: `number` — 12px (default) or 40px (link hover)

### MobileNavState
- `isOpen`: `boolean` — overlay visibility
- `triggerRef`: `HTMLElement` — reference for focus return

### ScrollRevealState
- `isInView`: `boolean` — whether element has crossed 20% visibility threshold
- `hasAnimated`: `boolean` — prevents re-triggering (trigger once)

### SplineSceneState
- `isLoaded`: `boolean` — scene finished loading
- `isFallback`: `boolean` — gradient shown (WebGL unavailable or load failed)
- `mousePosition`: `{ x: number, y: number }` — normalized for parallax
