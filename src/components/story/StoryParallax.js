import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFluidScroll } from "../../context/FluidScrollContext";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed motion layer — elements drift, scale, and rotate with the story.
 */
const StoryParallax = ({
  children,
  className = "",
  y = 0,
  x = 0,
  scale = 1,
  scaleFrom = null,
  rotate = 0,
  opacity = null,
  scrub = 0.75,
  start = "top 90%",
  end = "top 20%",
  trigger = null,
}) => {
  const ref = useRef(null);
  const { reducedMotion } = useFluidScroll();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return undefined;

    const from = {
      ease: "none",
    };
    const to = {
      ease: "none",
      scrollTrigger: {
        trigger: trigger || el,
        start,
        end,
        scrub,
      },
    };

    if (y) {
      from.y = y;
      to.y = 0;
    }
    if (x) {
      from.x = x;
      to.x = 0;
    }
    if (scaleFrom != null || scale !== 1) {
      from.scale = scaleFrom ?? scale;
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
  }, [
    reducedMotion,
    y,
    x,
    scale,
    scaleFrom,
    rotate,
    opacity,
    scrub,
    start,
    end,
    trigger,
  ]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

StoryParallax.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  y: PropTypes.number,
  x: PropTypes.number,
  scale: PropTypes.number,
  scaleFrom: PropTypes.number,
  rotate: PropTypes.number,
  opacity: PropTypes.number,
  scrub: PropTypes.number,
  start: PropTypes.string,
  end: PropTypes.string,
  trigger: PropTypes.object,
};

export default StoryParallax;
