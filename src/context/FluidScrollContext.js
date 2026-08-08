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
import { useLiteExperience } from "../hooks/useLiteExperience";

gsap.registerPlugin(ScrollTrigger);

const FluidScrollContext = createContext({
  scrollTo: () => {},
  reducedMotion: false,
  liteMode: false,
  skipMotion: false,
  subscribeProgress: () => () => {},
});

export const useFluidScroll = () => useContext(FluidScrollContext);

const emitNativeProgress = (listeners) => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? window.scrollY / max : 0;
  listeners.forEach((fn) => fn(progress));
};

/**
 * Lenis + GSAP ScrollTrigger on capable desktops.
 * Phones/tablets use native scroll to avoid extra rAF + compositor cost.
 */
export const FluidScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);
  const listenersRef = useRef(new Set());
  const [reducedMotion, setReducedMotion] = useState(false);
  const liteMode = useLiteExperience();
  const skipMotion = reducedMotion || liteMode;

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!media) return undefined;
    const sync = () => setReducedMotion(Boolean(media.matches));
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("is-lite", liteMode);
    return () => document.documentElement.classList.remove("is-lite");
  }, [liteMode]);

  const subscribeProgress = useCallback((listener) => {
    listenersRef.current.add(listener);
    return () => listenersRef.current.delete(listener);
  }, []);

  useEffect(() => {
    if (skipMotion) {
      document.documentElement.classList.remove("has-fluid-scroll");
      document.documentElement.style.scrollBehavior = "smooth";

      const onScroll = () => emitNativeProgress(listenersRef.current);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      return () => {
        window.removeEventListener("scroll", onScroll);
        document.documentElement.style.scrollBehavior = "";
      };
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
  }, [skipMotion]);

  const scrollTo = useCallback(
    (target, options = {}) => {
      const el =
        typeof target === "string" ? document.getElementById(target) : target;
      if (!el) return;

      const offset = options.offset ?? -88;

      if (skipMotion || !lenisRef.current) {
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
    [skipMotion]
  );

  const value = useMemo(
    () => ({
      scrollTo,
      reducedMotion,
      liteMode,
      skipMotion,
      subscribeProgress,
    }),
    [scrollTo, reducedMotion, liteMode, skipMotion, subscribeProgress]
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
