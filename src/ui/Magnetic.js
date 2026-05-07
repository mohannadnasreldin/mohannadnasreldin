import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Magnetic wrapper for buttons and links.
 * Pulls the element towards the mouse when nearby.
 */
export const Magnetic = ({ children, strength = 0.5 }) => {
  const ref = useRef(null);
  const isReducedMotion = useReducedMotion();

  // Smooth springs for magnetic movement
  const springX = useSpring(0, { damping: 15, stiffness: 150 });
  const springY = useSpring(0, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    springX.set(x * strength);
    springY.set(y * strength);
  };

  const handleMouseLeave = () => {
    springX.set(0);
    springY.set(0);
  };

  if (isReducedMotion) return <>{children}</>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {children}
    </motion.div>
  );
};
