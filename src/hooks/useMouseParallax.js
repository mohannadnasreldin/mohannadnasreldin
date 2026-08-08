import { useState, useEffect } from 'react';

/**
 * Hook to track normalized mouse position for parallax effects.
 * Throttled to requestAnimationFrame for performance.
 * @returns {{ mouseX: number, mouseY: number }}
 */
export const useMouseParallax = () => {
  const [position, setPosition] = useState({ mouseX: 0, mouseY: 0 });

  useEffect(() => {
    let frameId;

    const handleMouseMove = (event) => {
      cancelAnimationFrame(frameId);
      
      frameId = requestAnimationFrame(() => {
        // Normalize coordinates to -1 to 1 range
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = (event.clientY / window.innerHeight) * 2 - 1;
        
        setPosition({ mouseX: x, mouseY: y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return position;
};
