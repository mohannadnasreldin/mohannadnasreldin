import React from "react";
import PropTypes from "prop-types";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiAngular,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiC,
  SiPhp,
  SiDjango,
  SiGithub,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { TbBrandCSharp } from "react-icons/tb";
import StoryHeading from "./story/StoryHeading";
import GlassPanel from "./ui/GlassPanel";
import FluidSection from "./FluidSection";
import FluidReveal from "./FluidReveal";
import StoryParallax from "./story/StoryParallax";

const skillsData = [
  { name: "HTML", Icon: SiHtml5 },
  { name: "CSS", Icon: SiCss3 },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "React", Icon: SiReact },
  { name: "Angular", Icon: SiAngular },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Python", Icon: SiPython },
  { name: "C", Icon: SiC },
  { name: "C#", Icon: TbBrandCSharp },
  { name: "PHP", Icon: SiPhp },
  { name: "Django", Icon: SiDjango },
  { name: "GitHub", Icon: SiGithub },
  { name: "VS Code", Icon: VscVscode },
];

const Skills = ({ id = "skills" }) => {
  const loop = [...skillsData, ...skillsData];

  return (
    <FluidSection id={id} labelledBy="skills-heading" drift={16}>
      <StoryHeading
        id="skills-heading"
        chapter={4}
        chapterLabel="Craft"
        title="Skills"
        subtitle="Tools and languages I reach for every day."
      />

      <StoryParallax y={30} scrub={0.8} start="top 85%" end="top 25%">
        <FluidReveal y={24} scrub={0.6}>
          <GlassPanel className="overflow-hidden rounded-2xl py-8">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-deep/80 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-deep/80 to-transparent" />
              <div className="flex w-max animate-marquee gap-4 px-4 hover:[animation-play-state:paused]">
                {loop.map((skill, index) => (
                  <div
                    key={`${skill.name}-${index}`}
                    className="flex min-w-[7.5rem] flex-col items-center gap-3 rounded-2xl border border-glass-border bg-glass-bg px-5 py-4 text-accent"
                    title={skill.name}
                  >
                    <skill.Icon className="h-9 w-9" aria-hidden="true" />
                    <span className="text-xs font-medium text-ink-muted">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>
        </FluidReveal>
      </StoryParallax>
    </FluidSection>
  );
};

Skills.propTypes = {
  id: PropTypes.string,
};

export default Skills;
