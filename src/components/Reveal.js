import React, { useEffect, useRef, useState } from 'react';

/**
 * 2026 REVEAL COMPONENT
 * High-performance viewport-entry animations with CSS transforms.
 */
export const Reveal = ({
  children,
  animation = 'fade',
  delay = 0,
  duration = 800,
  threshold = 0.15,
  once = true,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      mq.removeEventListener('change', handler);
    };
  }, [threshold, once]);

  const getInitialStyles = () => {
    if (reducedMotion) return { opacity: 0 };

    const base = {
      opacity: 0,
      transition: `all ${duration}ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
      willChange: 'transform, opacity',
    };

    switch (animation) {
      case 'slide-up':
        return { ...base, transform: 'translate3d(0, 40px, 0)' };
      case '3d-rotate':
        return { ...base, transform: 'perspective(1000px) rotateX(-20deg) translate3d(0, 30px, 0)' };
      case 'reveal-mask':
        return { ...base, clipPath: 'inset(100% 0 0 0)' };
      case 'reveal':
        return { ...base, transform: 'translate3d(0, 30px, 0)' };
      default:
        return base;
    }
  };

  const getVisibleStyles = () => {
    if (reducedMotion) return { opacity: 1, transition: `opacity ${duration}ms ease` };
    const base = { opacity: 1 };

    switch (animation) {
      case 'slide-up':
        return { ...base, transform: 'translate3d(0, 0, 0)' };
      case '3d-rotate':
        return { ...base, transform: 'perspective(1000px) rotateX(0deg) translate3d(0, 0, 0)' };
      case 'reveal-mask':
        return { ...base, clipPath: 'inset(0% 0 0 0)' };
      case 'reveal':
        return { ...base, transform: 'translate3d(0, 0, 0)' };
      default:
        return base;
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={isVisible ? getVisibleStyles() : getInitialStyles()}
    >
      {children}
    </div>
  );
};

export default Reveal;
