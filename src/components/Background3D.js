import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  memo,
} from 'react'

/* ============================================
 * PREMIUM VIVID MOTION BACKGROUND
 * ============================================
 * - Single requestAnimationFrame loop
 * - Subscriber-based motion engine
 * - Multi-colored pulsing orbs
 * - Cursor-reactive ambient aura
 * - Luminous grid with dynamic hue
 * - Twinkling starfield
 * - Noise texture & vignette
 * - Mobile + reduced-motion friendly
 * - Zero external dependencies
 * ============================================
 */

const CONFIG = {
  orbIntensity: 32,
  gridRotateX: 65,
  gridRotateY: 10,
  smoothness: 0.05,
  idleAmplitude: 10,
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

/* ---------- COLOR HELPERS ---------- */
function interpolateColor(color1, color2, t) {
  const c1 = parseRgba(color1)
  const c2 = parseRgba(color2)
  const r = Math.round(c1.r + (c2.r - c1.r) * t)
  const g = Math.round(c1.g + (c2.g - c1.g) * t)
  const b = Math.round(c1.b + (c2.b - c1.b) * t)
  const a = c1.a + (c2.a - c1.a) * t
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

function parseRgba(str) {
  const match = str.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/,
  )
  if (!match) return { r: 0, g: 0, b: 0, a: 1 }
  return {
    r: +match[1],
    g: +match[2],
    b: +match[3],
    a: match[4] ? +match[4] : 1,
  }
}

/* ---------- SHARED MOTION ENGINE ---------- */
function useSharedMotion({ disabled }) {
  const state = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    idleX: 0,
    idleY: 0,
    scrollProgress: 0,
    targetScrollProgress: 0,
    scrollVelocity: 0,
  })
  const subscribers = useRef(new Set())

  const subscribe = useCallback((fn) => {
    subscribers.current.add(fn)
    return () => subscribers.current.delete(fn)
  }, [])

  useEffect(() => {
    if (disabled) return
    let frame

    function handlePointerMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      state.current.targetX = clamp(x, -1, 1)
      state.current.targetY = clamp(y, -1, 1)
    }

    function animate() {
      if (document.hidden) {
        frame = requestAnimationFrame(animate)
        return
      }
      const s = state.current
      const t = performance.now() * 0.001
      s.idleX = Math.sin(t * 0.4) * CONFIG.idleAmplitude
      s.idleY = Math.cos(t * 0.3) * CONFIG.idleAmplitude

      s.currentX += (s.targetX - s.currentX) * CONFIG.smoothness
      s.currentY += (s.targetY - s.currentY) * CONFIG.smoothness

      const prevScroll = s.scrollProgress
      s.scrollProgress += (s.targetScrollProgress - s.scrollProgress) * 0.1
      s.scrollVelocity = Math.abs(s.scrollProgress - prevScroll)

      subscribers.current.forEach((cb) => cb(s))
      frame = requestAnimationFrame(animate)
    }

    const handleScroll = (e) => {
      if (e.detail && typeof e.detail.progress === 'number') {
        state.current.targetScrollProgress = e.detail.progress
      }
    }

    frame = requestAnimationFrame(animate)
    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    })
    window.addEventListener('motion-scroll', handleScroll, {
      passive: true,
    })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('motion-scroll', handleScroll)
    }
  }, [disabled])

  return useMemo(() => ({ state, subscribe }), [subscribe])
}

/* ---------- ORB (with pulse + color shift) ---------- */
const MotionOrb = memo(function MotionOrb({
  size,
  colors,          // [fromColor, toColor]
  className,
  depth = 1,
  motion,
  isMobile,
  pulseOffset = 0,
}) {
  const ref = useRef(null)
  const { state, subscribe } = motion

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = (s) => {
      const x =
        s.currentX * CONFIG.orbIntensity * depth + s.idleX * depth
      const y =
        s.currentY * CONFIG.orbIntensity * depth +
        s.idleY * depth -
        s.scrollProgress * 400 * depth // Parallax shift

      const now = performance.now() * 0.001 + pulseOffset
      const pulse = 1 + Math.sin(now * 1.5) * 0.04

      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${pulse})`

      if (colors) {
        const mix = clamp((s.currentY + 1) / 2, 0, 1)
        el.style.background = `radial-gradient(circle at center, ${interpolateColor(colors[0], colors[1], mix)} 0%, transparent 75%)`
      }
    }

    update(state.current)
    const unsub = subscribe(update)
    return unsub
  }, [depth, state, subscribe, pulseOffset, colors])

  return (
    <div
      ref={ref}
      className={`
        absolute rounded-full pointer-events-none will-change-transform
        ${isMobile ? 'blur-2xl' : 'blur-3xl'}
        ${className ?? ''}
      `}
      style={{
        width: size,
        height: size,
        background: colors
          ? `radial-gradient(circle at center, ${colors[0]} 0%, transparent 75%)`
          : undefined,
      }}
    />
  )
})

/* ---------- AMBIENT AURA (follows cursor) ---------- */
const AmbientAura = memo(function AmbientAura({ motion }) {
  const ref = useRef(null)
  const { state, subscribe } = motion

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = (s) => {
      const x = s.currentX * 25 + 50 // percent
      const y = s.currentY * 25 + 50
      el.style.left = `${x}%`
      el.style.top = `${y}%`
    }
    update(state.current)
    return subscribe(update)
  }, [motion, state, subscribe])

  return (
    <div
      ref={ref}
      className="absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none blur-2xl"
      style={{
        background:
          'radial-gradient(circle, rgba(120,140,255,0.18) 0%, transparent 70%)',
        transition: 'left 0.3s ease-out, top 0.3s ease-out',
      }}
    />
  )
})

/* ---------- LUMINOUS GRID ---------- */
const GridPlane = memo(function GridPlane({ motion, reducedMotion }) {
  const ref = useRef(null)
  const { state, subscribe } = motion

  useEffect(() => {
    if (reducedMotion) return
    const plane = ref.current
    if (!plane) return

    const update = (s) => {
      const rotateY = s.currentX * CONFIG.gridRotateY
      const rotateX = CONFIG.gridRotateX + s.currentY * -4 + s.scrollProgress * 15 // Tilt forward on scroll
      plane.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${1.08 + s.scrollProgress * 0.1})`

      // subtle warm/cool shift based on cursor Y
      const hueShift = s.currentY * 12 + s.scrollProgress * 20
      plane.style.filter = `hue-rotate(${hueShift}deg) brightness(${1 + s.scrollVelocity * 2})`
    }

    update(state.current)
    return subscribe(update)
  }, [motion, reducedMotion, state, subscribe])

  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden opacity-80">
      <div
        ref={ref}
        className="h-[72vh] w-[140vw] rounded-full will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform:
            'perspective(1400px) rotateX(65deg) scale(1.08)',
          backfaceVisibility: 'hidden',
        }}
      />
    </div>
  )
})

/* ---------- STARFIELD ---------- */
const Starfield = memo(function Starfield() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      delay: Math.random() * 6,
    }))
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${3 + star.delay}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  )
})

/* ---------- NOISE OVERLAY ---------- */
const NoiseOverlay = memo(function NoiseOverlay({ opacity = 0.025 }) {
  const noise = useMemo(
    () =>
      `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
    [],
  )

  return (
    <div
      className="absolute inset-0 mix-blend-soft-light pointer-events-none"
      style={{ backgroundImage: noise, opacity }}
    />
  )
})

/* ---------- HOOKS ---------- */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = () => setReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

/* ---------- GLOBAL KEYFRAMES INJECTOR ---------- */
function useInjectTwinkle() {
  useEffect(() => {
    const id = 'twinkle-keyframes'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.15; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.4); }
      }
    `
    document.head.appendChild(style)
    return () => {
      const el = document.getElementById(id)
      if (el) el.remove()
    }
  }, [])
}

/* ============================================
 * MAIN COMPONENT
 * ============================================ */
const AnimatedBackground = ({ className }) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const motion = useSharedMotion({
    disabled: prefersReducedMotion || isMobile,
  })

  // Dynamic base background that shifts hue with mouse
  const baseRef = useRef(null)
  const { subscribe } = motion

  useEffect(() => {
    const el = baseRef.current
    if (!el || prefersReducedMotion || isMobile) return

    const update = (s) => {
      const hue1 = 220 + s.currentY * 20
      const hue2 = 260 + s.currentX * 20
      el.style.background = `linear-gradient(125deg, hsl(${hue1}, 80%, 18%) 0%, hsl(${hue2}, 60%, 8%) 70%)`
    }

    update(motion.state.current)
    const unsub = subscribe(update)
    return unsub
  }, [motion, subscribe, prefersReducedMotion, isMobile])

  // Inject the twinkle animation
  useInjectTwinkle()

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className ?? ''}`}
    >
      {/* DYNAMIC BASE */}
      <div ref={baseRef} className="absolute inset-0" style={{ background: '#04040A' }} />

      {/* LIGHT OVERLAYS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,140,255,0.12),transparent_55%)]" />

      {/* AMBIENT AURA */}
      {!isMobile && !prefersReducedMotion && <AmbientAura motion={motion} />}

      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.65))]" />

      {/* STARFIELD */}
      {!isMobile && <Starfield />}

      {/* NOISE */}
      <NoiseOverlay opacity={0.028} />

      {/* ORBS */}
      <div className="absolute inset-0 overflow-hidden">
        <MotionOrb
          motion={motion}
          size={620}
          depth={1.1}
          className="left-[5%] top-[12%]"
          colors={['rgba(129,140,248,0.6)', 'rgba(147,51,234,0.45)']}
          isMobile={isMobile}
          pulseOffset={0}
        />
        <MotionOrb
          motion={motion}
          size={440}
          depth={0.9}
          className="right-[8%] top-[20%]"
          colors={['rgba(244,114,182,0.35)', 'rgba(99,102,241,0.45)']}
          isMobile={isMobile}
          pulseOffset={2}
        />
        <MotionOrb
          motion={motion}
          size={380}
          depth={1.6}
          className="bottom-[5%] left-[15%]"
          colors={['rgba(56,189,248,0.4)', 'rgba(79,70,229,0.55)']}
          isMobile={isMobile}
          pulseOffset={4}
        />
        <MotionOrb
          motion={motion}
          size={280}
          depth={0.6}
          className="top-[45%] right-[20%]"
          colors={['rgba(192,132,252,0.45)', 'rgba(244,114,182,0.35)']}
          isMobile={isMobile}
          pulseOffset={1.5}
        />
      </div>

      {/* GRID */}
      {!isMobile && (
        <GridPlane motion={motion} reducedMotion={prefersReducedMotion} />
      )}
    </div>
  )
}

export default memo(AnimatedBackground)