import React, { useEffect, useRef } from "react";
import { useFluidScroll } from "../context/FluidScrollContext";

/** Thin accent rail that tracks fluid scroll progress (imperative, no re-renders). */
const ScrollProgress = () => {
  const barRef = useRef(null);
  const { reducedMotion, subscribeProgress } = useFluidScroll();

  useEffect(() => {
    if (reducedMotion) return undefined;
    return subscribeProgress((progress) => {
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(
          1,
          Math.max(0, progress)
        )})`;
      }
    });
  }, [reducedMotion, subscribeProgress]);

  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-accent via-accent-soft to-cyan-300 shadow-glow"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
};

export default ScrollProgress;
