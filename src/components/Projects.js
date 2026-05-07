import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { cardVariants } from "../animation/variants";
import bmi from "../assets/BMI-Calculator-App.png";
import TDL from "../assets/To-Do-List.png";
import ecommerce from "../assets/E-commerce.png";
import city from "../assets/City Organization.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const projects = [
  {
    title: "City Organization",
    category: "Frontend Development",
    imageUrl: city,
    demoLink: "https://city-development-association.vercel.app/",
    githubLink: "https://github.com/mohannadnasreldin/city-organization"
  },
  {
    title: "BMI Calculator",
    category: "Frontend Development",
    imageUrl: bmi,
    demoLink: "https://bmi-calculator-app-henna.vercel.app/",
    githubLink: "https://github.com/mohannadnasreldin/bmi-calculator-app",
  },
  {
    title: "To-Do List",
    category: "Frontend Development",
    imageUrl: TDL,
    demoLink: "https://to-do-list-eight-mauve.vercel.app/",
    githubLink: "https://github.com/mohannadnasreldin/to-do-list",
  },
  {
    title: "E-Commerce UI",
    category: "Frontend Development",
    imageUrl: ecommerce,
    demoLink: null,
    githubLink: "https://github.com/mohannadnasreldin/E-Commerce-UI",
  },
  {
    title: "E-Commerce Core",
    category: "Backend Development",
    imageUrl: null,
    demoLink: null,
    githubLink: "https://github.com/mohannadnasreldin/E-Commerce-Core",
  },
  {
    title: "Ecommerce Sentiment Analysis",
    category: "Backend Development",
    imageUrl: null,
    demoLink: null,
    githubLink: "https://github.com/mohannadnasreldin/E-commerce_Sentiment_Analysis",
  },
  {
    title: "Dining Philosopher Solution",
    category: "Backend Development",
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
  },  {
    title: "Graphics Package",
    category: "Backend Development",
    imageUrl: null,
    demoLink: null,
    githubLink: "https://github.com/mohannadnasreldin/Graphics_Package",
  },
];

/**
 * Projects section
 * @param {{ id?: string }} props
 */
const Projects = ({ id = "projects" }) => {
  return (
    <section
      id={id}
      className="py-24 px-6 bg-transparent relative z-10"
    >
      <div className="container-max">
        <h2 className="fluid-text-4xl font-bold mb-16 text-center text-primary">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="project-card group bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-accent/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
            >
              <div className="relative overflow-hidden h-64">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
) : <div />}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="p-8">
                <div className="mono-label mb-3">{project.category}</div>
                <h3 className="fluid-text-2xl font-bold text-primary mb-6">{project.title}</h3>
                
                <div className="flex justify-between items-center">
                  {project.demoLink ? (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-accent text-white px-6 py-2.5 rounded-full font-medium fluid-text-sm hover:bg-accent-light transition-colors shadow-lg shadow-accent/20"
                    >
                      Live Demo
                    </a>
                  ) : <div />}
                  
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-11 h-11 bg-surface-hover border border-border-strong text-primary rounded-full hover:bg-accent hover:border-accent transition-all"
                    aria-label="GitHub Repository"
                  >
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
Projects.propTypes = {
  id: PropTypes.string,
};
