# Feature Specification: Portfolio UI/UX Redesign with Spline 3D

**Feature Branch**: `002-ui-ux-spline-redesign`  
**Created**: 2026-05-07  
**Status**: Draft  
**Design Source**: `./design.md` — Direction B ("Kinetic Mono"), adopted  
**Input**: User description: "Portfolio UI/UX redesign with Spline 3D, motion design, typography system, scroll-driven animation, custom cursor micro-interactions, navigation transitions, and performance/accessibility constraints."

---

## Clarifications

### Session 2026-05-07

- Q: Should the Spline scene be self-hosted from `public/` or loaded from Spline's cloud CDN? → A: Self-hosted from `public/`, lazy-loaded from the same origin.
- Q: What is the maximum content container width for large viewports? → A: 1400 px.
- Q: At what visibility threshold should scroll-triggered animations fire? → A: When 20% of the element is visible in the viewport.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Hero First Impression (Priority: P1)

A visitor lands on the portfolio for the first time. Within the first two seconds, they see an immersive hero section: a full-viewport 3D scene (abstract particle/neural mesh) responds subtly to their mouse position, sitting behind a bold typographic headline, a supporting subtitle, and a call-to-action. The experience communicates technical craft and visual confidence before the visitor reads a single word.

On slow connections, the 3D scene loads lazily; visitors see a smooth radial gradient background (near-black to deep blue) while the scene streams in. On devices without graphics acceleration, the gradient remains as a permanent, graceful fallback—no broken canvas, no spinners.

On mobile devices (viewport < 768 px), the 3D scene is hidden entirely. A CSS gradient replaces it, and the hero remains visually complete and performant.

**Why this priority**: The hero is the single highest-impact surface — it determines whether a hiring manager or design lead stays or leaves within seconds.

**Independent Test**: Load the portfolio on a desktop browser with a cleared cache. Verify the gradient appears immediately, the 3D scene fades in once loaded, the headline animates word-by-word, and the CTA springs into view. Then load on a device without GPU support and verify the gradient fallback activates with no console errors.

**Acceptance Scenarios**:

1. **Given** a first-time visitor on a desktop browser, **When** the page loads, **Then** the hero gradient appears within 500 ms, followed by the 3D scene fading in when ready, and the headline text animates with staggered word reveals.
2. **Given** a visitor on a device without graphics acceleration, **When** the page loads, **Then** the hero displays the radial gradient fallback (`#04040A` → `#0D1230`) with no visible error, and all text and CTA remain fully interactive.
3. **Given** a visitor on a mobile device (viewport < 768 px), **When** the page loads, **Then** the 3D scene is not downloaded or rendered; the gradient background is shown, and the hero text is legible and well-spaced.
4. **Given** a visitor with "prefers reduced motion" enabled in their operating system, **When** the page loads, **Then** all entrance animations are skipped; hero text and CTA appear immediately without any movement or opacity transitions.

---

### User Story 2 — Expressive Typography and Scroll-Driven Discovery (Priority: P1)

As a visitor scrolls beyond the hero, each content section (About, Projects, Skills, Contact) reveals itself with purposeful animation. Headings slide up and fade in; body content follows with a slight delay; project cards stagger in one after another. The typography system uses three distinct typefaces — a heavy display face for headings, a clean sans-serif for body, and a monospace for labels and technical accents — creating clear visual hierarchy at every breakpoint.

The type scale is fluid: sizes adjust smoothly between mobile and desktop viewpoints using viewport-relative calculations. No abrupt size jumps occur between breakpoints.

**Why this priority**: Scroll-driven reveals and typographic hierarchy are the backbone of the entire content experience — without them, the site is a static page with no sense of craft.

**Independent Test**: Scroll through all sections on a desktop at various scroll speeds. Verify each section heading animates in before its body content, cards stagger correctly, and no animation fires before its section enters the viewport. Resize the browser from 320 px to 1920 px and verify type sizes scale fluidly.

**Acceptance Scenarios**:

1. **Given** a visitor scrolling on a desktop browser, **When** a section becomes at least 20% visible in the viewport, **Then** the section heading slides up (from 60 px below) and fades in over 600 ms using an exponential ease-out, followed by content at 120 ms delay and cards staggered at 80 ms intervals.
2. **Given** a visitor on a 375 px mobile viewport, **When** viewing any page section, **Then** the display font, body font, and monospace accent font are all legible and correctly sized per the fluid type scale — no text overflows its container, and no horizontal scroll is introduced.
3. **Given** a visitor with "prefers reduced motion" enabled, **When** scrolling, **Then** all sections are visible immediately with no slide, fade, or stagger animation.
4. **Given** a visitor on any viewport width between 320 px and 2560 px, **When** viewing heading text, **Then** the font size scales continuously without discrete jumps between breakpoints.

---

### User Story 3 — Custom Cursor and Magnetic Hover Effects (Priority: P2)

On desktop devices with a fine pointer (mouse or trackpad), the default browser cursor is replaced with a custom cursor: a 12 px filled circle in the accent color, rendered with a blending mode that ensures visibility over both dark and light surfaces. When hovering over interactive elements (links, buttons), the cursor expands into a 40 px ring (border only, no fill) with spring-physics easing. When hovering over project cards, a directional text label ("VIEW →") appears inside the cursor.

Interactive elements (buttons, navigation links, social icons) exhibit a magnetic pull effect: as the cursor approaches within a defined radius, the element shifts subtly toward the cursor, snapping back on exit with spring physics.

On touch devices or when a coarse pointer is detected, the custom cursor is hidden entirely. Native touch interactions are preserved.

**Why this priority**: Cursor interactions are a signature differentiator for a motion-focused portfolio, but they are desktop-only enhancements — the site must be fully functional without them.

**Independent Test**: On a desktop with a mouse, navigate across the page. Verify cursor morph on link hover, "VIEW →" label on card hover, and magnetic pull on interactive elements. Switch to a touch device or enable touch emulation — verify no custom cursor appears and all elements respond to standard tap interactions.

**Acceptance Scenarios**:

1. **Given** a desktop visitor with a fine pointer, **When** moving the cursor across the page, **Then** a 12 px filled accent-colored circle follows the cursor position with mix-blend-mode applied.
2. **Given** a desktop visitor hovering over a link or button, **When** the cursor enters the hit area, **Then** the cursor animates to a 40 px ring (border only) using spring physics.
3. **Given** a desktop visitor hovering over a project card, **When** the cursor enters the card, **Then** a "VIEW →" text label appears inside the cursor, and the card tilts subtly following cursor position (perspective-based rotation of ±5°/±8°).
4. **Given** a visitor on a touch device (pointer: coarse), **When** interacting with the page, **Then** no custom cursor is rendered, and all elements respond normally to tap and swipe gestures.
5. **Given** a desktop visitor with a fine pointer hovering near an interactive element, **When** the cursor enters the magnetic radius, **Then** the element translates toward the cursor position by a proportional offset, and snaps back with spring easing on cursor exit.

---

### User Story 4 — Navigation Transitions and Mobile Overlay (Priority: P2)

The portfolio navigation provides smooth, animated transitions between page states. On desktop, the navigation bar includes an animated indicator (underline or highlight) that slides between active items with spring physics. When navigating between sections or pages, content transitions with coordinated exit and entrance animations — outgoing content fades and shifts, incoming content enters from the opposite direction.

On mobile (viewport < 768 px), the navigation converts to a hamburger-triggered overlay. The overlay opens with a full-screen slide animation, and menu items stagger in sequentially. Closing the overlay reverses the animation. The overlay traps keyboard focus while open.

**Why this priority**: Navigation is the connective tissue of the site. Animated transitions between sections reinforce the kinetic identity, but must be implemented after core content sections are in place.

**Independent Test**: On desktop, click between navigation items and verify the animated indicator follows. On mobile, open the hamburger menu and verify staggered item reveals; tab through items to confirm focus trap; close and verify focus returns to the trigger button.

**Acceptance Scenarios**:

1. **Given** a desktop visitor, **When** clicking a navigation item, **Then** an animated indicator slides from the current item to the newly selected item using spring physics, and the page content transitions smoothly (outgoing content exits, incoming content enters).
2. **Given** a mobile visitor (viewport < 768 px), **When** tapping the hamburger icon, **Then** a full-screen overlay slides in, and menu items appear with staggered animation (80 ms intervals).
3. **Given** a mobile visitor with the overlay open, **When** pressing the Tab key, **Then** keyboard focus is trapped within the overlay — it cycles through menu items and the close button only.
4. **Given** a mobile visitor with the overlay open, **When** pressing the Escape key or tapping the close button, **Then** the overlay closes with a reverse animation, and keyboard focus returns to the hamburger trigger.
5. **Given** a visitor with "prefers reduced motion" enabled, **When** navigating, **Then** navigation changes are instantaneous with no slide, fade, or spring animation.

---

### User Story 5 — Reduced Motion, Contrast, and Keyboard Accessibility (Priority: P1)

All animated experiences across the portfolio respect the user's operating system motion preferences. When "prefers reduced motion" is enabled, every animation (hero entrance, scroll reveals, cursor effects, navigation transitions, card hovers) is disabled or replaced with instant state changes. No animation-dependent content is hidden — all information remains accessible.

The portfolio meets color contrast requirements: primary text on the background achieves at least a 4.5:1 contrast ratio, and large/heading text achieves at least 3:1. All interactive elements are reachable and operable via keyboard. Focus indicators are visible and styled consistently with the design system (accent color ring).

**Why this priority**: Accessibility is not an enhancement — it is a baseline requirement. The portfolio must be usable by all visitors regardless of motion sensitivity, visual ability, or input method.

**Independent Test**: Enable "prefers reduced motion" in the OS and load the portfolio — verify no animation plays. Tab through the entire page and verify every interactive element receives a visible focus ring. Run an automated contrast checker on all text/background combinations.

**Acceptance Scenarios**:

1. **Given** a visitor with "prefers reduced motion" enabled, **When** loading and navigating the entire portfolio, **Then** zero animation, transition, or transform effects are visible — all content appears immediately in its final state.
2. **Given** any text element on the portfolio, **When** evaluated against its background color, **Then** primary body text (`#EEEEF2` on `#04040A`) achieves ≥ 4.5:1 contrast ratio, and heading text achieves ≥ 3:1 contrast ratio.
3. **Given** a keyboard-only user, **When** pressing Tab repeatedly from the top of the page, **Then** every interactive element (links, buttons, navigation items, project cards) receives focus in a logical order, with a visible focus indicator styled as an accent-colored ring.
4. **Given** a screen reader user, **When** navigating the hero section, **Then** the 3D scene is marked as decorative (hidden from the accessibility tree), and all meaningful content (headline, subtitle, CTA) is announced in correct order.
5. **Given** the portfolio loaded on any supported browser, **When** evaluating the page weight, **Then** the total initial page load (before lazy-loaded assets) does not exceed 500 KB of transferred content (excluding the Spline scene), and the Spline scene file does not exceed 2 MB.

---

### Edge Cases

- **What happens when the 3D scene file fails to download?** The radial gradient fallback (`#04040A` → `#0D1230`) is shown permanently. No error UI or broken canvas is displayed. The hero text and CTA remain fully functional.
- **What happens when a visitor scrolls very quickly past multiple sections?** All passed sections resolve to their final animated state immediately — no queue of pending animations accumulates. Only sections currently in the viewport animate in real time.
- **What happens when the browser window is resized from desktop to mobile while the custom cursor is active?** The custom cursor is removed when the viewport drops below 768 px or when a coarse pointer is detected. It re-appears if the viewport returns above 768 px with a fine pointer.
- **What happens when JavaScript fails to load or is disabled?** All content remains visible and readable via semantic HTML. Animations, the custom cursor, and the 3D scene are absent, but navigation links, text, and images remain accessible. The CSS gradient background is visible.
- **What happens on very large viewports (> 2560 px)?** Fluid type sizes are capped at their maximum values. Content containers are constrained to a maximum width of 1400 px (centered with auto margins) to prevent excessive line lengths. The 3D scene scales to fill the viewport.
- **What happens when the mobile nav overlay is open and the viewport is resized to desktop width?** The overlay closes automatically, and the desktop navigation bar is displayed.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The hero section MUST display a full-viewport 3D scene behind the headline, subtitle, and CTA. The scene MUST respond to cursor position with parallax rotation of ±8° on both axes.
- **FR-002**: The 3D scene MUST be self-hosted in the `public/` directory and load lazily from the same origin — the portfolio MUST display and be interactive before the scene finishes loading. A radial gradient background (`#04040A` → `#0D1230`) MUST be shown while the scene loads.
- **FR-003**: If the 3D scene fails to load (network error, no graphics acceleration, or disabled), the gradient fallback MUST remain as the permanent background with no error indicators.
- **FR-004**: The 3D scene MUST be hidden entirely on viewports narrower than 768 px. It MUST NOT be downloaded on mobile devices.
- **FR-005**: The 3D scene MUST render at 65% opacity so it does not compete with hero text readability.
- **FR-006**: The typography system MUST use three distinct typefaces: a heavy display face for headings (weights 400, 700, 900), a clean sans-serif for body text (weights 400, 500), and a monospace face for labels, tags, chips, timestamps, and badges (weights 400, 500).
- **FR-007**: The type scale MUST be fluid, using viewport-relative calculations to scale continuously between defined minimum and maximum sizes across all viewport widths from 320 px to 2560 px. No discrete size jumps between breakpoints.
- **FR-008**: The monospace typeface MUST NOT be used for body copy or paragraph text — only for labels, tags, skill chips, timestamps, and role badges.
- **FR-009**: Hero text MUST animate on entry: headline words stagger with a slide-up and fade (80 ms delay per word), subtitle fades in after the headline completes (slide from 20 px below), and CTA scales from 0.95 to 1.0 with spring physics.
- **FR-010**: Content sections MUST animate on scroll entry when at least 20% of the element is visible in the viewport: heading slides up from 60 px below and fades in over 600 ms (exponential ease-out), content follows at 120 ms delay, and cards stagger at 80 ms intervals with the same slide/fade pattern.
- **FR-011**: Scroll-triggered animations MUST fire only when at least 20% of the element is visible in the viewport — sections scrolled past quickly MUST resolve to their final state without playing the full animation sequence.
- **FR-012**: On desktop devices with a fine pointer, the default cursor MUST be replaced with a 12 px filled circle in the accent color using a blending mode for contrast. On link/button hover, the cursor MUST expand to a 40 px ring (border only) with spring easing. On project card hover, the cursor MUST display a "VIEW →" text label.
- **FR-013**: The custom cursor MUST be hidden on touch devices or when a coarse pointer is detected. Native touch interactions MUST be preserved.
- **FR-014**: Interactive elements (buttons, nav links, social icons) MUST exhibit a magnetic hover effect: the element shifts toward the cursor when within a defined radius and snaps back on exit with spring physics. This is desktop-only.
- **FR-015**: Project cards MUST tilt on hover using perspective-based rotation (±5° X, ±8° Y following cursor), with an inner shadow shift for depth, border opacity change (0.07 → 0.2), and a subtle scale increase (1.0 → 1.02).
- **FR-016**: Navigation MUST include an animated indicator that slides between active items using spring physics on desktop.
- **FR-017**: Page/section transitions MUST include coordinated exit and entrance animations — outgoing content fades and shifts out, incoming content enters from the opposite direction.
- **FR-018**: On mobile (viewport < 768 px), navigation MUST convert to a hamburger-triggered full-screen overlay. Menu items MUST stagger in on open (80 ms intervals) and the animation MUST reverse on close.
- **FR-019**: The mobile navigation overlay MUST trap keyboard focus while open. Pressing Escape or activating the close button MUST close the overlay and return focus to the trigger.
- **FR-020**: ALL animations, transitions, and motion effects MUST be disabled when the user's operating system has "prefers reduced motion" enabled. Content MUST appear in its final state immediately.
- **FR-021**: All text MUST meet minimum contrast ratios: 4.5:1 for body text, 3:1 for large/heading text, per the defined color tokens (primary text `#EEEEF2` on background `#04040A`).
- **FR-022**: All interactive elements MUST be keyboard-accessible with a visible focus indicator styled as an accent-colored ring.
- **FR-023**: The 3D scene MUST be marked as decorative and hidden from the accessibility tree. All meaningful content in the hero MUST be announced by screen readers in logical order.
- **FR-024**: Fonts MUST be loaded with `font-display: swap` to prevent invisible text during font loading.
- **FR-025**: Content containers MUST have a maximum width of 1400 px, centered horizontally with auto margins, to maintain readable line lengths on wide viewports.

### Non-Functional Requirements

- **NFR-001**: Total initial page weight (before lazy-loaded assets) MUST NOT exceed 500 KB transferred.
- **NFR-002**: The Spline scene file MUST NOT exceed 2 MB. The existing asset (`nexbot_by_aximoris.spline`, 1.4 MB) is within budget.
- **NFR-003**: The portfolio MUST achieve a Lighthouse Performance score of 90 or above on a simulated mobile connection.
- **NFR-004**: First Contentful Paint MUST occur within 1.5 seconds on a 4G connection.
- **NFR-005**: Cumulative Layout Shift MUST remain below 0.1 across all page loads.
- **NFR-006**: The portfolio MUST function correctly on the latest two major versions of Chrome, Firefox, Safari, and Edge.
- **NFR-007**: The portfolio MUST be responsive across viewport widths from 320 px to 2560 px without horizontal overflow or content truncation.

---

## Design System Alignment *(from design.md)*

All visual tokens below are extracted from `./design.md` (Direction B — Kinetic Mono, adopted 2026-05-07). Implementation MUST use these values without deviation.

### Color Tokens

| Token                    | Value                          |
|--------------------------|--------------------------------|
| `--color-bg`             | `#04040A`                      |
| `--color-bg-elevated`    | `#0A0A12`                      |
| `--color-surface`        | `#0D0D18`                      |
| `--color-surface-hover`  | `#12121F`                      |
| `--color-border`         | `rgba(255, 255, 255, 0.07)`    |
| `--color-border-strong`  | `rgba(255, 255, 255, 0.14)`    |
| `--color-text-primary`   | `#EEEEF2`                      |
| `--color-text-secondary` | `#8080A0`                      |
| `--color-text-tertiary`  | `#50507A`                      |
| `--color-accent`         | `#4F6EF7`                      |
| `--color-accent-light`   | `#7B95FF`                      |
| `--color-accent-glow`    | `rgba(79, 110, 247, 0.3)`      |
| `--color-accent-subtle`  | `rgba(79, 110, 247, 0.08)`     |
| `--color-mono-label`     | `#60609A`                      |

### Typography

| Role    | Typeface                      | Weights     | Usage                                         |
|---------|-------------------------------|-------------|-----------------------------------------------|
| Display | Neue Haas Grotesk Display     | 400, 700, 900 | H1, H2, hero statements                      |
| Body    | Geist                         | 400, 500    | Paragraphs, descriptions, UI text             |
| Accent  | JetBrains Mono                | 400, 500    | Labels, tags, skill chips, timestamps, badges |

### Animation Tokens

| Token                  | Value                                         |
|------------------------|-----------------------------------------------|
| `--ease-out-expo`      | `cubic-bezier(0.16, 1, 0.3, 1)`              |
| `--ease-in-out-quart`  | `cubic-bezier(0.76, 0, 0.24, 1)`             |
| `--ease-spring`        | Spring physics (stiffness: 80, damping: 15)   |
| `--duration-instant`   | 0 ms                                          |
| `--duration-fast`      | 150 ms                                        |
| `--duration-base`      | 300 ms                                        |
| `--duration-slow`      | 600 ms                                        |
| `--duration-cinematic` | 1200 ms                                       |
| `--stagger-tight`      | 40 ms                                         |
| `--stagger-base`       | 80 ms                                         |
| `--stagger-loose`      | 120 ms                                        |

### Spline Scene Constraints

| Property        | Value                                                       |
|-----------------|-------------------------------------------------------------|
| Scene type      | Abstract particle/neural mesh or floating geometric primitives |
| Interaction     | Mouse parallax — ±8° X/Y rotation based on cursor position  |
| Opacity         | 65%                                                         |
| Position        | Fixed, full viewport, z-index: 0                            |
| Mobile          | Hidden (`display: none` at < 768 px), replaced by CSS gradient |
| Fallback        | Radial gradient (`#04040A` → `#0D1230`)                     |
| Load strategy   | Self-hosted from `public/`, lazy-loaded from same origin    |
| File budget     | ≤ 2 MB                                                      |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 90% of first-time visitors see a complete, interactive hero section (3D scene or gradient fallback, animated headline, CTA) within 3 seconds on a standard broadband connection.
- **SC-002**: Portfolio achieves a Lighthouse Performance score ≥ 90 on simulated mobile.
- **SC-003**: All page content is accessible via keyboard-only navigation — 100% of interactive elements receive visible focus in a logical order.
- **SC-004**: Zero animation plays when "prefers reduced motion" is active — verified across hero, scroll sections, cursor, navigation, and card interactions.
- **SC-005**: All text/background combinations meet WCAG 2.1 AA contrast thresholds (4.5:1 body, 3:1 large text).
- **SC-006**: First Contentful Paint ≤ 1.5 s and Cumulative Layout Shift < 0.1 on 4G simulation.
- **SC-007**: Portfolio renders correctly, with no horizontal overflow, across viewports from 320 px to 2560 px on latest two versions of Chrome, Firefox, Safari, and Edge.
- **SC-008**: 3D scene fallback activates gracefully (gradient shown, no errors) on 100% of devices lacking graphics acceleration support.
- **SC-009**: Initial page weight (excluding lazy-loaded Spline scene) ≤ 500 KB transferred.

---

## Assumptions

- The portfolio is a single-page or few-page site deployed as static assets; no server-side rendering or backend API is in scope.
- Visitors use modern evergreen browsers (latest two versions of Chrome, Firefox, Safari, Edge). Legacy browser support (IE11, older mobile browsers) is out of scope.
- The existing Spline scene file (`public/nexbot_by_aximoris.spline`, 1.4 MB) is the 3D asset to be used in the hero. No new 3D modeling is required.
- Fonts will be loaded from Google Fonts or self-hosted with `font-display: swap`. No font licensing issues exist for the selected typefaces.
- The portfolio targets software engineering hiring managers, CTOs, senior engineers, and design leads as its primary audience.
- Content strategy, copywriting, CMS integration, backend services, routing framework, and mobile-native behavior are explicitly out of scope for this feature.
- Smooth scrolling (e.g., via Lenis or similar) is assumed as part of the scroll experience but is an implementation detail, not specified here.
- All animation recipes (hero text entrance, card hover, scroll reveals, cursor states) are defined in `design.md` and serve as the source of truth for motion behavior.

---

## Dependencies

- **3D Scene Asset**: `public/nexbot_by_aximoris.spline` (1.4 MB) — already present in the repository.
- **Design System**: `./design.md` — provides all color tokens, typography, animation tokens, Spline scene spec, and component animation recipes.
- **Typefaces**: Neue Haas Grotesk Display, Geist, JetBrains Mono — must be available via Google Fonts, CDN, or self-hosted.
- **Reduced Motion API**: Operating system support for `prefers-reduced-motion` media query.
- **Pointer Detection**: Operating system/browser support for `pointer: fine` / `pointer: coarse` media queries.

---

## Out of Scope

- Content strategy, copywriting, or content management systems
- Backend services, APIs, or server-side rendering
- Client-side routing framework selection or implementation details
- Mobile-native (iOS/Android) application behavior
- SEO meta tags, Open Graph, or structured data (separate concern)
- Analytics, tracking, or third-party script integration
- Dark/light mode toggle (the design is dark-only per design.md)
- Internationalization or localization
