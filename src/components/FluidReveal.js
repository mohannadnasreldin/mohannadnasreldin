import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFluidScroll } from "../context/FluidScrollContext";

gsap.registerPlugin(ScrollTrigger);

/**
 * Soft scrubbed reveal — content drifts in with scroll (storyteller motion).
 */
const FluidReveal = ({
  children,
  className = "",
  y = 36,
  x = 0,
  scaleFrom = 0.94,
  rotate = 0,
  opacity = 0.12,
  scrub = 0.65,
  start = "top 92%",
  end = "top 42%",
}) => {
  const ref = useRef(null);
  const { skipMotion } = useFluidScroll();

  useEffect(() => {
    const el = ref.current;
    if (!el || skipMotion) return undefined;

    const from = { ease: "none" };
    const to = { ease: "none", scrollTrigger: { trigger: el, start, end, scrub } };

    if (y) {
      from.y = y;
      to.y = 0;
    }
    if (x) {
      from.x = x;
      to.x = 0;
    }
    if (scaleFrom != null) {
      from.scale = scaleFrom;
      to.scale = 1;
    }
    if (rotate) {
      from.rotate = rotate;
      to.rotate = 0;
    }
    if (opacity != null) {
      from.opacity = opacity;
      to.opacity = 1;
    }

    const tween = gsap.fromTo(el, from, to);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [skipMotion, y, x, scaleFrom, rotate, opacity, scrub, start, end]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

FluidReveal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  y: PropTypes.number,
  x: PropTypes.number,
  scaleFrom: PropTypes.number,
  rotate: PropTypes.number,
  opacity: PropTypes.number,
  scrub: PropTypes.number,
  start: PropTypes.string,
  end: PropTypes.string,
};

export default FluidReveal;
