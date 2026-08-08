import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassPanel from "./ui/GlassPanel";
import StoryHeading from "./story/StoryHeading";
import FluidSection from "./FluidSection";
import FluidReveal from "./FluidReveal";
import { useFluidScroll } from "../context/FluidScrollContext";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Computer Science",
    organization: "Helwan University",
    duration: "2020 – 2024",
    type: "education",
  },
  {
    role: "Full-Stack Developer",
    organization: "Internship @ Flextock",
    duration: "2023",
    type: "work",
  },
  {
    role: "Front-End Developer",
    organization: "Freelance @ Illusionare",
    duration: "2024",
    type: "work",
  },
  {
    role: "Software Engineer",
    organization: "Part-Time @ Aydn Labs",
    duration: "2025",
    type: "work",
  },
  {
    role: "Software Engineer",
    organization: "Internship @ IFIN Services",
    duration: "2025",
    type: "work",
  },
  {
    role: "Software Engineer",
    organization: "Full-Time @ IFIN Services",
    duration: "2025",
    type: "work",
  },
  {
    role: "System Specialist",
    organization: "Full-Time @ Egypt Air",
    duration: "2025",
    type: "work",
  },
];

const Experience = ({ id = "experience" }) => {
  const timelineRef = useRef(null);
  const listRef = useRef(null);
  const { reducedMotion } = useFluidScroll();

  useEffect(() => {
    const line = timelineRef.current;
    const list = listRef.current;
    if (!line || !list || reducedMotion) return undefined;

    const tween = gsap.fromTo(
      line,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: list,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion]);

  return (
    <FluidSection id={id} labelledBy="experience-heading" drift={28}>
      <StoryHeading
        id="experience-heading"
        chapter={2}
        chapterLabel="Journey"
        title="Experience"
        subtitle="My personal journey across education, products, and production systems."
      />

      <div ref={listRef} className="relative mx-auto max-w-3xl">
        <div
          ref={timelineRef}
          className="absolute bottom-2 left-6 top-2 w-px origin-top bg-gradient-to-b from-accent via-accent/50 to-transparent md:left-1/2"
          aria-hidden="true"
        />

        <ul className="space-y-8">
          {experiences.map((exp, index) => {
            const left = index % 2 === 0;
            return (
              <li
                key={`${exp.organization}-${exp.role}-${exp.duration}`}
                className={`relative flex md:justify-center ${
                  left
                    ? "md:justify-end md:pr-[calc(50%+1.5rem)]"
                    : "md:justify-start md:pl-[calc(50%+1.5rem)]"
                }`}
              >
                <span className="absolute left-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-accent/40 bg-surface-deep/80 text-accent shadow-glow backdrop-blur-md md:left-1/2">
                  {exp.type === "education" ? (
                    <AcademicCapIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <BriefcaseIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>

                <FluidReveal
                  className="ml-14 w-full max-w-sm md:ml-0"
                  y={48}
                  x={left ? -56 : 56}
                  scaleFrom={0.92}
                  scrub={0.7}
                >
                  <GlassPanel className="w-full rounded-2xl p-5">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent">
                      {exp.organization}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-ink-muted">
                      <CalendarDaysIcon
                        className="h-4 w-4 text-accent"
                        aria-hidden="true"
                      />
                      {exp.duration}
                    </p>
                  </GlassPanel>
                </FluidReveal>
              </li>
            );
          })}
        </ul>
      </div>
    </FluidSection>
  );
};

Experience.propTypes = {
  id: PropTypes.string,
};

export default Experience;
