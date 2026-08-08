import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FluidScrollContext = createContext({
  scrollTo: () => {},
  reducedMotion: false,
  subscribeProgress: () => () => {},
});

export const useFluidScroll = () => useContext(FluidScrollContext);

/**
 * Lenis + GSAP ScrollTrigger: inertia scroll that feels continuous,
 * with nav scrollTo and reduced-motion fallback.
 */
export const FluidScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);
  const listenersRef = useRef(new Set());
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!media) return undefined;
    const sync = () => setReducedMotion(Boolean(media.matches));
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  const subscribeProgress = useCallback((listener) => {
    listenersRef.current.add(listener);
    return () => listenersRef.current.delete(listener);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.remove("has-fluid-scroll");
      document.documentElement.style.scrollBehavior = "smooth";
      return undefined;
    }

    document.documentElement.classList.add("has-fluid-scroll");
    document.documentElement.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.35,
      wheelMultiplier: 0.95,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      const limit = e.limit || 1;
      const progress = limit > 0 ? e.scroll / limit : 0;
      listenersRef.current.forEach((fn) => fn(progress));
    });

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("has-fluid-scroll");
    };
  }, [reducedMotion]);

  const scrollTo = useCallback(
    (target, options = {}) => {
      const el =
        typeof target === "string" ? document.getElementById(target) : target;
      if (!el) return;

      const offset = options.offset ?? -88;

      if (reducedMotion || !lenisRef.current) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }

      lenisRef.current.scrollTo(el, {
        offset,
        duration: options.duration ?? 1.45,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    },
    [reducedMotion]
  );

  const value = useMemo(
    () => ({ scrollTo, reducedMotion, subscribeProgress }),
    [scrollTo, reducedMotion, subscribeProgress]
  );

  return (
    <FluidScrollContext.Provider value={value}>
      {children}
    </FluidScrollContext.Provider>
  );
};

FluidScrollProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
