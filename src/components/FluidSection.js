import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFluidScroll } from "../context/FluidScrollContext";

gsap.registerPlugin(ScrollTrigger);

/**
 * Story chapter wrapper — soft blends + subtle section drift on scroll.
 */
const FluidSection = ({
  id,
  children,
  className = "",
  labelledBy,
  dense = false,
  drift = 24,
}) => {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const { reducedMotion } = useFluidScroll();

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || reducedMotion) return undefined;

    const tweens = [];

    const wash = section.querySelector("[data-fluid-wash]");
    if (wash) {
      tweens.push(
        gsap.fromTo(
          wash,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 35%",
              scrub: 0.55,
            },
          }
        )
      );
    }

    if (inner && drift) {
      tweens.push(
        gsap.fromTo(
          inner,
          { y: drift, opacity: 0.85 },
          {
            y: -drift * 0.35,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        )
      );
    }

    return () => tweens.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
  }, [reducedMotion, drift]);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={labelledBy}
      className={`fluid-section relative z-10 ${
        dense ? "py-16 sm:py-20" : "section-shell"
      } ${className}`.trim()}
    >
      <div
        data-fluid-wash
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent/[0.06] to-transparent opacity-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-gradient-to-b from-transparent via-surface-deep/40 to-transparent"
        aria-hidden="true"
      />
      <div ref={innerRef} className="section-inner relative">
        {children}
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-8 h-24 bg-gradient-to-b from-transparent to-surface-deep/50"
        aria-hidden="true"
      />
    </section>
  );
};

FluidSection.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  labelledBy: PropTypes.string,
  dense: PropTypes.bool,
  drift: PropTypes.number,
};

export default FluidSection;
