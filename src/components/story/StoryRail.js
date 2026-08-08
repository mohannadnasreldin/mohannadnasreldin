import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFluidScroll } from "../../context/FluidScrollContext";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  { id: "home", label: "Intro" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Journey" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/** Fixed story rail — highlights the active chapter as you scroll. */
const StoryRail = () => {
  const [active, setActive] = useState("home");
  const { scrollTo, reducedMotion } = useFluidScroll();
  const railRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const triggers = CHAPTERS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      return ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => setActive(id),
        onEnterBack: () => setActive(id),
      });
    }).filter(Boolean);

    return () => triggers.forEach((t) => t.kill());
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <nav
      ref={railRef}
      className="story-rail fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      aria-label="Story chapters"
    >
      {CHAPTERS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            className="group flex items-center justify-end gap-3"
            aria-label={`Go to ${label}`}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`max-w-0 overflow-hidden whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 group-hover:max-w-[6rem] ${
                isActive ? "text-accent opacity-100" : "text-ink-faint opacity-0 group-hover:opacity-100"
              }`}
            >
              {label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-3 w-3 bg-accent shadow-glow"
                  : "h-2 w-2 bg-glass-border group-hover:bg-accent/60"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default StoryRail;
