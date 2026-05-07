import React, { useEffect, useRef, useState } from 'react';

/**
 * Self-contained custom cursor.
 * - Smooth movement via requestAnimationFrame + lerp.
 * - Hover detection via event delegation (data-cursor="hover" or links/buttons).
 * - Hides on touch devices and when the user prefers reduced motion.
 * - Pure CSS transforms – no extra dependencies.
 */

// Small helper: linear interpolation
const lerp = (start, end, factor) => start + (end - start) * factor;

export const CustomCursor = () => {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(true);   // hidden on touch / reduced motion

  const cursorRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 }); // raw mouse position
  const posRef = useRef({ x: -100, y: -100 });   // smoothed position
  const rafRef = useRef(null);

  useEffect(() => {
    const fineMq = window.matchMedia('(pointer: fine)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setVisible(fineMq.matches && !motionMq.matches && !('ontouchstart' in window || navigator.maxTouchPoints > 0));
    };

    update();
    fineMq.addEventListener('change', update);
    motionMq.addEventListener('change', update);
    return () => {
      fineMq.removeEventListener('change', update);
      motionMq.removeEventListener('change', update);
    };
  }, []);

  // ---- 2. Mouse move listener ----
  useEffect(() => {
    const handleMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // ---- 3. Hover detection ----
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      const interactive =
        !!target.closest('[data-cursor="hover"]') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a') ||
        !!target.closest('button');
      setHovering(interactive);
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);

  // ---- 4. RAF animation loop (smooth lerp) ----
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const animate = () => {
      const mouse = mouseRef.current;
      const pos = posRef.current;

      // Add a little inertia
      pos.x = lerp(pos.x, mouse.x, 0.1);
      pos.y = lerp(pos.y, mouse.y, 0.1);

      cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ---- 5. Hide completely if not visible ----
  if (!visible) return null;

  // ---- 6. Render ----
  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999999,
        pointerEvents: 'none',
        transform: 'translate3d(-100px, -100px, 0)', // initial off‑screen
      }}
    >
      {/* Outer glass ring */}
      <div
        style={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          width: hovering ? 64 : 32,
          height: hovering ? 64 : 32,
          borderRadius: '50%',
          backgroundColor: hovering ? 'rgba(79,110,247,0.01)' : 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px) saturate(200%)',
          WebkitBackdropFilter: 'blur(12px) saturate(200%)',
          border: `1px solid ${hovering ? 'rgba(79,110,247,0.45)' : 'rgba(255,255,255,0.15)'}`,
          boxShadow: hovering
            ? '0 0 28px rgba(79,110,247,0.35), inset 0 0 0 1px rgba(79,110,247,0.2)'
            : '0 6px 16px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.08)',
          transition: 'width 150ms ease-out, height 150ms ease-out, background-color 150ms, border-color 150ms, box-shadow 150ms',
        }}
      />
    </div>
  );
};