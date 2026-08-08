import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { FaGithub } from "react-icons/fa";
import GlassPanel from "./ui/GlassPanel";
import StoryHeading from "./story/StoryHeading";
import FluidSection from "./FluidSection";
import FluidReveal from "./FluidReveal";
import bmi from "../assets/BMI-Calculator-App.png";
import TDL from "../assets/To-Do-List.png";
import ecommerce from "../assets/E-commerce.png";
import city from "../assets/City Organization.png";
import kanHolland from "../assets/Kan-Holland.png";

const projects = [
  {
    title: "Kan Holland K9",
    category: "Frontend",
    imageUrl: kanHolland,
    demoLink: "https://www.kanholland.com/",
    githubLink: null,
  },
  {
    title: "City Organization",
    category: "Frontend",
    imageUrl: city,
    demoLink: "https://city-development-association.vercel.app/",
    githubLink: "https://github.com/mohannadnasreldin/city-organization",
  },
  {
    title: "BMI Calculator",
    category: "Frontend",
    imageUrl: bmi,
    demoLink: "https://bmi-calculator-app-henna.vercel.app/",
    githubLink: "https://github.com/mohannadnasreldin/bmi-calculator-app",
  },
  {
    title: "To-Do List",
    category: "Frontend",
    imageUrl: TDL,
    demoLink: "https://to-do-list-eight-mauve.vercel.app/",
    githubLink: "https://github.com/mohannadnasreldin/to-do-list",
  },
  {
    title: "E-Commerce UI",
    category: "Frontend",
    imageUrl: ecommerce,
    demoLink: null,
    githubLink: "https://github.com/mohannadnasreldin/E-Commerce-UI",
  },
  {
    title: "E-Commerce Core",
    category: "Backend",
    imageUrl: null,
    demoLink: null,
    githubLink: "https://github.com/mohannadnasreldin/E-Commerce-Core",
  },
  {
    title: "Ecommerce Sentiment Analysis",
    category: "Backend",
    imageUrl: null,
    demoLink: null,
    githubLink: "https://github.com/mohannadnasreldin/E-commerce_Sentiment_Analysis",
  },
  {
    title: "Dining Philosopher Solution",
    category: "Backend",
    imageUrl: null,
    demoLink: null,
    githubLink: "https://github.com/mohannadnasreldin/DiningPhilisopher_Solution",
  },
  {
    title: "OCR",
    category: "Machine Learning",
    imageUrl: null,
    demoLink: null,
    githubLink: "https://github.com/mohannadnasreldin/OCR",
  },
  {
    title: "Information Retrieval",
    category: "Machine Learning",
    imageUrl: null,
    demoLink: null,
    githubLink: "https://github.com/mohannadnasreldin/Information_Retrieval",
  },
  {
    title: "Graphics Package",
    category: "Backend",
    imageUrl: null,
    demoLink: null,
    githubLink: "https://github.com/mohannadnasreldin/Graphics_Package",
  },
];

const FILTERS = ["All", "Frontend", "Backend", "Machine Learning"];

const Projects = ({ id = "projects" }) => {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <FluidSection id={id} labelledBy="projects-heading" drift={20}>
      <StoryHeading
        id="projects-heading"
        chapter={3}
        chapterLabel="Selected Work"
        title="Projects"
        subtitle="Selected work across frontend, backend, and machine learning."
      />

      <FluidReveal y={20} scrub={0.5}>
        <div
          className="mb-10 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {FILTERS.map((item) => {
            const active = filter === item;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-accent text-white shadow-glow"
                    : "glass-panel text-ink-muted hover:text-accent"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </FluidReveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {visible.map((project, index) => (
          <FluidReveal
            key={project.title}
            y={56}
            x={index % 2 === 0 ? -40 : 40}
            scaleFrom={0.88}
            rotate={index % 2 === 0 ? -2 : 2}
            scrub={0.75}
          >
            <GlassPanel
              hover
              className="group flex h-full flex-col overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-raised/40">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-expo group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/10 via-transparent to-accent/5">
                    <span className="font-display text-lg text-ink-faint">
                      {project.category}
                    </span>
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-full border border-glass-border bg-black/70 px-3 py-1 text-xs font-medium text-white">
                  {project.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {project.title}
                </h3>
                <div className="mt-auto flex items-center gap-3 pt-5">
                  {project.demoLink ? (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-btn-primary !px-4 !py-2 text-sm"
                    >
                      Live Demo
                      <ArrowTopRightOnSquareIcon
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  ) : null}
                  {project.githubLink ? (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass-bg text-ink transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      <FaGithub className="h-5 w-5" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </div>
            </GlassPanel>
          </FluidReveal>
        ))}
      </div>
    </FluidSection>
  );
};

Projects.propTypes = {
  id: PropTypes.string,
};

export default Projects;
