import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFluidScroll } from "../../context/FluidScrollContext";

gsap.registerPlugin(ScrollTrigger);

/** Section title that unfolds as you scroll into the chapter. */
const StoryHeading = ({
  title,
  subtitle,
  chapter,
  chapterLabel,
  id,
  align = "center",
}) => {
  const rootRef = useRef(null);
  const { skipMotion } = useFluidScroll();
  const alignCls =
    align === "left" ? "text-left items-start" : "text-center items-center";

  useEffect(() => {
    const root = rootRef.current;
    if (!root || skipMotion) return undefined;

    const chapterEl = root.querySelector("[data-story-chapter]");
    const titleEl = root.querySelector("[data-story-title]");
    const subEl = root.querySelector("[data-story-sub]");
    const lineEl = root.querySelector("[data-story-line]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top 82%",
        end: "top 38%",
        scrub: 0.65,
      },
    });

    if (chapterEl) {
      tl.fromTo(
        chapterEl,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, ease: "none" },
        0
      );
    }
    if (titleEl) {
      tl.fromTo(
        titleEl,
        { y: 56, opacity: 0.1, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, ease: "none" },
        0.08
      );
    }
    if (subEl) {
      tl.fromTo(
        subEl,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, ease: "none" },
        0.18
      );
    }
    if (lineEl) {
      tl.fromTo(lineEl, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0.25);
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [skipMotion, title, subtitle]);

  return (
    <div
      ref={rootRef}
      className={`mb-14 flex flex-col gap-3 ${alignCls}`}
    >
      {chapter != null ? (
        <p
          data-story-chapter
          className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-accent"
        >
          {String(chapter).padStart(2, "0")}
          {chapterLabel ? ` — ${chapterLabel}` : ""}
        </p>
      ) : null}
      <h2
        id={id}
        data-story-title
        className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          data-story-sub
          className="max-w-xl text-base text-ink-muted sm:text-lg"
        >
          {subtitle}
        </p>
      ) : null}
      <span
        data-story-line
        className="mt-1 h-px w-16 origin-left bg-gradient-to-r from-transparent via-accent to-transparent"
        aria-hidden="true"
      />
    </div>
  );
};

StoryHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  chapter: PropTypes.number,
  chapterLabel: PropTypes.string,
  id: PropTypes.string,
  align: PropTypes.oneOf(["center", "left"]),
};

export default StoryHeading;
