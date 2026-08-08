import { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Hook for scroll-reveal animations using Intersection Observer.
 * @param {Object} options - Intersection Observer options
 * @returns {{ ref: React.RefObject, isInView: boolean }}
 */
export const useScrollReveal = (options = { threshold: 0.2, triggerOnce: true }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.triggerOnce) {
          observer.unobserve(entry.target);
        }
      } else if (!options.triggerOnce) {
        setIsInView(false);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
      
      // Handle fast-scroll or element already in view on mount
      const rect = currentRef.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsInView(true);
        if (options.triggerOnce) {
          observer.unobserve(currentRef);
        }
      }
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options, isReducedMotion]);

  return { ref, isInView };
};
