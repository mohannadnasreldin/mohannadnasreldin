import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { revealVariants } from '../animation/variants';

/**
 * Wrapper component for scroll-reveal animations.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.delay=0] - Delay in seconds
 * @param {string} [props.className]
 */
export const ScrollReveal = ({ children, delay = 0, className = "" }) => {
  const { ref, isInView } = useScrollReveal();
  const isReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={revealVariants}
      custom={delay}
      className={className}
      transition={isReducedMotion ? { duration: 0 } : undefined}
    >
      {children}
    </motion.div>
  );
};
