import React from "react";
import PropTypes from "prop-types";
import GlassPanel from "./ui/GlassPanel";
import StoryHeading from "./story/StoryHeading";
import FluidSection from "./FluidSection";
import FluidReveal from "./FluidReveal";
import StoryParallax from "./story/StoryParallax";
import { useFluidScroll } from "../context/FluidScrollContext";
import profilePic from "../assets/profilepic.png";

const lines = [
  "I am a passionate Software Engineer and Web Developer with a degree in Computer Science and Artificial Intelligence from Helwan University.",
  "My journey into tech began during my internship at Flextock, where I honed my skills in Full Stack Development.",
  "I thrive on solving complex problems and enjoy collaborating closely with clients to deliver efficient and innovative solutions.",
  "I'm eager to contribute my skills and enthusiasm to your team and help turn your ideas into reality.",
];

const About = ({ id = "about" }) => {
  const { scrollTo } = useFluidScroll();

  return (
    <FluidSection id={id} labelledBy="about-heading" drift={22}>
      <StoryHeading
        id="about-heading"
        chapter={5}
        chapterLabel="The Person"
        title="About Me"
        subtitle="A bit of context behind the work."
      />

      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <StoryParallax
          y={60}
          x={-30}
          scaleFrom={0.88}
          scrub={0.85}
          className="relative mx-auto w-full max-w-sm"
        >
          <div
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/30 via-transparent to-accent/10 blur-2xl"
            aria-hidden="true"
          />
          <GlassPanel strong className="relative overflow-hidden rounded-[1.75rem] p-2">
            <img
              src={profilePic}
              alt="Mohannad Nasreldin"
              className="aspect-[4/5] w-full rounded-[1.35rem] object-cover"
              loading="lazy"
            />
          </GlassPanel>
        </StoryParallax>

        <div className="space-y-5">
          {lines.map((line, index) => (
            <FluidReveal
              key={line.slice(0, 28)}
              y={32}
              x={index % 2 === 0 ? 36 : -36}
              scrub={0.65}
            >
              <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                {line}
              </p>
            </FluidReveal>
          ))}
          <FluidReveal y={20} scrub={0.5}>
            <button
              type="button"
              className="glass-btn-primary mt-2 inline-flex"
              onClick={() => scrollTo("contact")}
            >
              Let&apos;s work together
            </button>
          </FluidReveal>
        </div>
      </div>
    </FluidSection>
  );
};

About.propTypes = {
  id: PropTypes.string,
};

export default About;
