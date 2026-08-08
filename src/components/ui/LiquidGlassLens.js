import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";

/**
 * Apple-inspired liquid glass distortion lens (adapted from 21st.dev paceui LiquidGlass).
 * Follows the pointer inside its parent for a refraction highlight.
 */
const LiquidGlassLens = ({
  width = 140,
  height = 140,
  borderRadius = 999,
  tintOpacity = 0.12,
  blur = 2,
  className = "",
}) => {
  const glassRef = useRef(null);

  useEffect(() => {
    const glass = glassRef.current;
    const parent = glass?.parentElement;
    if (!glass || !parent) return undefined;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) return undefined;

    const onMove = (e) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      gsap.to(glass, {
        duration: 0.55,
        left: x,
        top: y,
        ease: "power2.out",
      });
    };

    parent.addEventListener("mousemove", onMove);
    return () => parent.removeEventListener("mousemove", onMove);
  }, [width, height]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        className="absolute overflow-hidden"
        aria-hidden="true"
      >
        <defs>
          <filter id="liquid-glass-distortion" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.008"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="70"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div
        ref={glassRef}
        className={`pointer-events-none absolute left-1/2 top-1/4 z-20 isolate hidden md:block ${className}`}
        style={{
          width,
          height,
          borderRadius,
          "--lg-tint": tintOpacity,
          "--lg-blur": `${blur}px`,
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 rounded-[inherit]"
          style={{
            backdropFilter: `blur(var(--lg-blur))`,
            WebkitBackdropFilter: `blur(var(--lg-blur))`,
            filter: "url(#liquid-glass-distortion)",
          }}
        />
        <div
          className="absolute inset-0 rounded-[inherit] shadow-[inset_0_0_24px_-4px_rgba(255,255,255,0.55)]"
          style={{
            background: `rgba(255,255,255,var(--lg-tint))`,
            border: "1px solid rgba(255,255,255,0.28)",
          }}
        />
      </div>
    </>
  );
};

LiquidGlassLens.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  borderRadius: PropTypes.number,
  tintOpacity: PropTypes.number,
  blur: PropTypes.number,
  className: PropTypes.string,
};

export default LiquidGlassLens;
