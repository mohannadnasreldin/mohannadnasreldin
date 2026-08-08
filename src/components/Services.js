import React from "react";
import PropTypes from "prop-types";
import {
  CodeBracketIcon,
  ServerStackIcon,
  RectangleGroupIcon,
  ArrowsRightLeftIcon,
  CircleStackIcon,
  CommandLineIcon,
  CameraIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import GlassPanel from "./ui/GlassPanel";
import StoryHeading from "./story/StoryHeading";
import FluidSection from "./FluidSection";
import FluidReveal from "./FluidReveal";

const services = [
  {
    title: "Software Engineering",
    description: "Robust, scalable applications shaped around real product needs.",
    Icon: CpuChipIcon,
  },
  {
    title: "Full-Stack Development",
    description: "End-to-end delivery across modern frontends and APIs.",
    Icon: CodeBracketIcon,
  },
  {
    title: "Backend Development",
    description: "Efficient server-side systems, services, and data flows.",
    Icon: ServerStackIcon,
  },
  {
    title: "Frontend Development",
    description: "Responsive interfaces with clarity, motion, and accessibility.",
    Icon: RectangleGroupIcon,
  },
  {
    title: "API Integration",
    description: "Reliable connections to third-party platforms and services.",
    Icon: ArrowsRightLeftIcon,
  },
  {
    title: "Database Management",
    description: "Thoughtful schema design and performant data access.",
    Icon: CircleStackIcon,
  },
  {
    title: "Version Control",
    description: "Clean Git workflows for collaboration and safe iteration.",
    Icon: CommandLineIcon,
  },
  {
    title: "Photography",
    description: "Capture and edit visuals that support brand storytelling.",
    Icon: CameraIcon,
  },
];

const Services = ({ id = "services" }) => {
  return (
    <FluidSection id={id} labelledBy="services-heading">
      <StoryHeading
        id="services-heading"
        chapter={1}
        chapterLabel="Capabilities"
        title="Services"
        subtitle="How I help teams ship polished software and memorable experiences."
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <FluidReveal
            key={service.title}
            y={40 + (index % 2) * 12}
            x={index % 2 === 0 ? -24 : 24}
            scaleFrom={0.9}
            scrub={0.7}
          >
            <GlassPanel hover className="flex h-full flex-col rounded-2xl p-6">
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-glass-border bg-glass-tint text-accent">
                <service.Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold text-ink">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {service.description}
              </p>
            </GlassPanel>
          </FluidReveal>
        ))}
      </div>
    </FluidSection>
  );
};

Services.propTypes = {
  id: PropTypes.string,
};

export default Services;
