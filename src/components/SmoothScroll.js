import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * 2026 SMOOTH SCROLL ENGINE
 * Powered by Lenis for momentum-based narrative scrolling.
 */
export const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync with Background3D motion engine
    lenis.on('scroll', ({ progress, velocity }) => {
      // Dispatch custom event for Background3D
      window.dispatchEvent(new CustomEvent('motion-scroll', {
        detail: { progress, velocity }
      }));
    });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="smooth-scroll-wrapper relative overflow-x-hidden">
      {children}
    </div>
  );
};

export default SmoothScroll;
