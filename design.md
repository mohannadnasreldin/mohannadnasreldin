# design.md — Portfolio Visual Direction
**Feature:** 002-ui-ux-spline-redesign  
**Decision Date:** 2026-05-07

---

## The Question

Which visual design direction best represents a software engineer whose work centers on **animation and typography**?

Three directions were evaluated. A clear recommendation follows.

---

## Direction A — "Dark Editorial"

> *Like a high-end design magazine ran on a server rack.*

| Property | Choice | Rationale |
|----------|--------|-----------|
| **Display font** | Instrument Serif (italic) | Unexpected in tech — creates instant contrast with code |
| **Body font** | Geist | Clean, modern, Vercel's own — signals technical taste |
| **Accent font** | JetBrains Mono | Code DNA woven into the visual language |
| **Background** | `#04040A` near-black | Rich depth without pure black harshness |
| **Accent color** | `#C8FF00` acid green | Maximum contrast, signals precision |
| **Spline scene** | Floating abstract serif letterform in 3D | Typography as environment |
| **Animation** | Slow, deliberate reveals. Long ease-out curves. Text draws in per-character. | Cinematic weight |
| **Personality** | Refined, confident, surprising | |

**Pros:** Truly memorable. Immediately signals "this person has taste."  
**Cons:** Serif + dark is harder to pull off. Requires precise execution.

---

## Direction B — "Kinetic Mono"

> *Everything has mass. Type is infrastructure. Motion is the product.*

| Property | Choice | Rationale |
|----------|--------|-----------|
| **Display font** | Neue Haas Grotesk Display (Black weight) | Swiss precision, extreme weight contrast |
| **Body font** | Geist (Regular) | Pairs cleanly with heavy display |
| **Accent font** | JetBrains Mono | Code as identity, not decoration |
| **Background** | `#04040A` with subtle blue-shift | Space-like depth |
| **Accent color** | `#4F6EF7` electric blue | Technical, focused, professional |
| **Spline scene** | Abstract mesh / particle field responding to mouse | Engineering metaphor (systems, networks) |
| **Animation** | Spring physics on everything. Magnetic hovers. Staggered grids. | Motion IS the message |
| **Personality** | Technical mastery, kinetic energy, precision | |

**Pros:** Animation is the star — every interaction teaches the visitor what you can build.  
**Cons:** Risk of looking like every other dark dev portfolio if executed generically.

---

## Direction C — "Cold Luxury"

> *Dieter Rams had a dark mode.*

| Property | Choice | Rationale |
|----------|--------|-----------|
| **Display font** | Reckless Neue (Light/Thin) | Hairline luxury feel, editorial |
| **Body font** | Syne | Geometric, slightly quirky, memorable |
| **Accent font** | Commit Mono | Functional beauty in monospace |
| **Background** | `#080810` + `#12121F` surfaces | Cool blue-black, premium |
| **Accent color** | `#F0F0FF` near-white + `#7C6AFA` violet | Restrained luxury |
| **Spline scene** | Single floating geometric object (torus, icosphere) — ultra-minimal | One 3D object > complex scene |
| **Animation** | Barely-there transitions. Type fades. Surgical precision. | Confidence through restraint |
| **Personality** | Minimal, premium, architectural | |

**Pros:** Screams seniority and taste. Ages well.  
**Cons:** Might be too quiet to demonstrate animation capabilities.

---

## ✅ Recommendation: Direction B — "Kinetic Mono"

**Why this one wins for a software engineer focused on animation:**

1. **Animation IS the portfolio.** For an engineer whose skill is motion, the site must demonstrate that skill at every interaction. Direction B makes animation the product — not decoration. Every hover, scroll, and load teaches the visitor something about your capabilities.

2. **The Spline scene becomes proof of work.** A particle mesh or abstract geometry that responds to the mouse is not just aesthetic — it shows WebGL integration, performance awareness, and 3D scene management. It's a mini-project inside the hero.

3. **Typography that earns its place.** Neue Haas Grotesk at heavy weights with JetBrains Mono accents signals that you understand typographic systems, not just font choices. The weight contrast creates visual hierarchy without complex color systems.

4. **It scales correctly.** Direction B can hold extremely creative project cards, animated skill sections, and rich hover states without feeling inconsistent. Direction A requires extremely disciplined restraint across every component.

5. **Hiring managers remember kinetic.** The target audience (CTOs, senior engineers, design leads) will notice when something moves unusually well. That's the first impression that gets you a conversation.

---

## Final Design System (Direction B — Adopted)

### Typography
```
Display:     Neue Haas Grotesk Display
             Weights: 400, 700, 900
             Use: H1, H2, hero statements

Body:        Geist
             Weights: 400, 500
             Use: paragraphs, descriptions, UI text

Accent:      JetBrains Mono
             Weights: 400, 500
             Use: labels, tags, skill chips, timestamps, role badges
             NOT used for body copy
```

### Type Scale
```css
--text-xs:   clamp(0.75rem, 0.7rem + 0.25vw, 0.8rem);     /* 12–13px */
--text-sm:   clamp(0.875rem, 0.8rem + 0.35vw, 0.9rem);    /* 14–15px */
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.05rem);      /* 16–17px */
--text-lg:   clamp(1.125rem, 1rem + 0.5vw, 1.25rem);      /* 18–20px */
--text-xl:   clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);     /* 20–24px */
--text-2xl:  clamp(1.5rem, 1.25rem + 1.25vw, 2rem);       /* 24–32px */
--text-3xl:  clamp(1.875rem, 1.5rem + 2vw, 2.5rem);       /* 30–40px */
--text-4xl:  clamp(2.25rem, 1.75rem + 2.75vw, 3.25rem);   /* 36–52px */
--text-5xl:  clamp(3rem, 2.25rem + 4vw, 4.5rem);          /* 48–72px */
--text-6xl:  clamp(3.75rem, 2.75rem + 5vw, 6rem);         /* 60–96px */
--text-7xl:  clamp(4.5rem, 3rem + 7.5vw, 8rem);           /* 72–128px */
```

### Color Tokens
```css
--color-bg:              #04040A;
--color-bg-elevated:     #0A0A12;
--color-surface:         #0D0D18;
--color-surface-hover:   #12121F;
--color-border:          rgba(255, 255, 255, 0.07);
--color-border-strong:   rgba(255, 255, 255, 0.14);

--color-text-primary:    #EEEEF2;
--color-text-secondary:  #8080A0;
--color-text-tertiary:   #50507A;

--color-accent:          #4F6EF7;
--color-accent-light:    #7B95FF;
--color-accent-glow:     rgba(79, 110, 247, 0.3);
--color-accent-subtle:   rgba(79, 110, 247, 0.08);

--color-mono-label:      #60609A;   /* JetBrains Mono labels */
```

### Animation Tokens
```css
/* Easings */
--ease-out-expo:     cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
--ease-spring:       /* use Framer Motion spring({ stiffness: 80, damping: 15 }) */

/* Durations */
--duration-instant:   0ms;
--duration-fast:      150ms;
--duration-base:      300ms;
--duration-slow:      600ms;
--duration-cinematic: 1200ms;

/* Stagger delay between children */
--stagger-tight: 40ms;
--stagger-base:  80ms;
--stagger-loose: 120ms;
```

### Spline Scene Spec
```
Scene type:     Abstract particle/neural mesh OR floating geometric primitives
Interaction:    Mouse parallax — scene rotates ±8deg X/Y based on cursor position
Opacity:        65% to not compete with hero text
Position:       Fixed, full viewport, z-index: 0
Mobile:         Hidden (display: none at <768px), replaced by CSS gradient
Fallback:       Radial gradient bg (#04040A → #0D1230) if WebGL fails
Load strategy:  Lazy via React.lazy + Suspense, Spline CDN hosted
File target:    < 2MB .splinecode file
```

### Component Animation Recipes

**Hero text entrance:**
```
H1 words: staggered slide-up from y:40 + fade, delay 80ms per word
Subtitle: fade in after H1 completes, y:20 → 0
CTA button: scale 0.95 → 1 + fade, spring physics
```

**Project card hover:**
```
Card: perspective(1000px) rotateX(±5deg) rotateY(±8deg) — follows cursor
Inner shadow: shifts with rotation for depth illusion
Border: opacity 0.07 → 0.2 on hover
Scale: 1 → 1.02
```

**Scroll-triggered sections:**
```
Heading:  y:60 → 0, opacity 0 → 1, duration 600ms, ease-out-expo
Content:  y:40 → 0, opacity 0 → 1, delay 120ms after heading
Cards:    stagger 80ms per card, same y/opacity pattern
```

**Custom cursor:**
```
Default:     12px filled circle, --color-accent, mix-blend-mode: difference
On links:    Scale to 40px ring (border only, no fill), slow spring
On cards:    "VIEW →" text label appears inside cursor
Mobile:      hidden (pointer: coarse detection)
```

---

## Implementation Order

1. Install dependencies (`@splinetool/react-spline`, `framer-motion`, `lenis`)
2. Set up design tokens (CSS custom properties in `globals.css`)
3. Load and configure fonts (self-host or Google Fonts with `font-display: swap`)
4. Build animation utility hooks (`useReducedMotion`, `useMouseParallax`, `useMagneticHover`)
5. Integrate Spline scene into hero with lazy loading
6. Redesign hero section
7. Add custom cursor
8. Rebuild navigation with animated indicator
9. Add scroll-triggered animations to all sections
10. Implement page transitions with AnimatePresence
11. Performance audit + Lighthouse pass