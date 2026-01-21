import React, { useState } from "react";
import PropTypes from "prop-types";
import { LazyMotion, domAnimation, m as motion, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDownload,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Typewriter } from "react-simple-typewriter";
import { SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiNodedotjs } from "react-icons/si";
import { fadeInUp, slideInRight, staggerContainer, scaleOnHover } from "../animation/variants";
import Background3D from "./Background3D";
import ProjectsCarousel from "./ProjectsCarousel";
import ResponsiveImageFrame from "./ResponsiveImageFrame";
import cv from "../assets/CV.pdf";
import profilePic from "../assets/profilepic.png";
import bmi from "../assets/BMI-Calculator-App.png";
import TDL from "../assets/To-Do-List.png";
import ecommerce from "../assets/E-commerce.png";
import city from "../assets/City Organization.png";

/**
 * Layout patterns & design decisions
 * - Two‑column responsive grid: single column on small screens, split on large screens.
 * - Visual hierarchy: prominent heading, highlighted role, supportive description, clear CTAs.
 * - Consistent spacing: responsive gaps/padding via Tailwind breakpoints.
 * - Accessibility: keyboard‑navigable buttons/links with focus rings; reduced motion respected.
 * - Contrast: purple accent on light/dark surfaces; improved legibility with larger text/leading.
 * - Media sizing: aspect‑ratio utilities to keep image framing consistent across breakpoints.
 */
const Hero = ({ id = "home" }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const reduce = useReducedMotion();
  const revealProps = reduce
    ? {}
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.3 } };

  const handleScrollToSection = (event, sectionId) => {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownload = () => {
    setIsDownloading(true);
    const link = document.createElement("a");
    link.href = cv;
    link.setAttribute("download", "cv.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloading(false);
  };

  const featuredProjects = [
    { title: "City Organization", img: city, href: "#projects" },
    { title: "BMI Calculator", img: bmi, href: "#projects" },
    { title: "To-Do List", img: TDL, href: "#projects" },
    { title: "E-Commerce UI", img: ecommerce, href: "#projects" },
  ];

  return (
    <section
      id={id}
      aria-labelledby="hero-heading"
      className="relative bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100"
    >
      <Background3D />
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-14 md:py-20 lg:py-28">
        <LazyMotion features={domAnimation}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center lg:items-start">
            <motion.div
              variants={staggerContainer}
              {...revealProps}
              className="flex flex-col gap-6 md:gap-8 items-center lg:items-start text-center lg:text-left"
              style={{ willChange: "transform" }}
            >
              <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-indigo-600 blur opacity-30"></div>
                <ResponsiveImageFrame
                  src={profilePic}
                  alt="Mohannad Nasreldin portrait"
                  className="h-[48vh]"
                />
              </div>
            </motion.div>
            <motion.div
              variants={slideInRight}
              {...revealProps}
              className="flex flex-col gap-6"
              style={{ willChange: "transform" }}
            >
                            <motion.h1
                variants={fadeInUp}
                id="hero-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
              >
                <span className="text-gray-900 dark:text-gray-100">Mohannad Nasreldin</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl md:text-2xl font-semibold text-purple-600 dark:text-purple-400"
              >
                <span className="typewriter-text">
                  <Typewriter
                    words={["Software Engineer", "Full‑Stack Developer", "Problem Solver"]}
                    loop
                    cursor
                    cursorStyle="-"
                    typeSpeed={30}
                    deleteSpeed={30}
                    delaySpeed={3000}
                  />
                </span>
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-prose"
              >
                Building accessible, high‑performance experiences with modern JavaScript, React, and scalable backends.
              </motion.p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {/* <motion.button
                  {...scaleOnHover}
                  onClick={(e) => handleScrollToSection(e, "projects")}
                  onKeyDown={(e) => e.key === "Enter" && handleScrollToSection(e, "projects")}
                  aria-label="View projects"
                  className={`inline-flex items-center gap-2 rounded-full bg-purple-600 text-white px-6 py-3 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-purple-400 focus:outline-none ${isDownloading ? "" : ""}`}
                >
                  <FontAwesomeIcon icon={faPlay} />
                  View Projects
                </motion.button> */}
                <motion.button
                  {...scaleOnHover}
                  onClick={(e) => handleScrollToSection(e, "contact")}
                  onKeyDown={(e) => e.key === "Enter" && handleScrollToSection(e, "contact")}
                  aria-label="Contact me"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-purple-600 text-purple-600 px-6 py-3 shadow-md transition-all duration-200 hover:bg-purple-600 hover:text-white hover:shadow-lg focus-visible:ring-2 focus-visible:ring-purple-400 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  Contact Me
                </motion.button>
                <motion.button
                  {...scaleOnHover}
                  onClick={handleDownload}
                  onKeyDown={(e) => e.key === "Enter" && handleDownload()}
                  aria-label="Download CV"
                  disabled={isDownloading}
                  className={`inline-flex items-center gap-2 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gray-400 focus:outline-none ${isDownloading ? "opacity-80" : ""}`}
                >
                  <FontAwesomeIcon icon={faDownload} />
                  {isDownloading ? "Downloading..." : "Download CV"}
                </motion.button>
              </div>
              <motion.div variants={staggerContainer} className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 mt-6">
                {[SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiNodedotjs].map((Icon, idx) => (
                  <motion.div
                    key={idx}
                    {...scaleOnHover}
                    className="flex items-center justify-center rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow px-3 py-3 focus-within:ring-2 focus-within:ring-purple-400"
                    tabIndex={0}
                    aria-label="Skill icon"
                  >
                    <Icon className="text-2xl text-purple-600" />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={staggerContainer} className="flex items-center gap-5 mt-6 justify-center lg:justify-start">
                <motion.a
                  variants={fadeInUp}
                  href="https://github.com/mohannadnasreldin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open GitHub profile"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
                >
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </motion.a>
                <motion.a
                  variants={fadeInUp}
                  href="https://www.facebook.com/mohannad.nasraldin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Facebook profile"
                  className="text-gray-500 hover:text-blue-700 transition-colors transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
                >
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </motion.a>
                <motion.a
                  variants={fadeInUp}
                  href="https://www.instagram.com/anim._.honda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Instagram profile"
                  className="text-gray-500 hover:text-purple-700 transition-colors transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
                >
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </motion.a>
                <motion.a
                  variants={fadeInUp}
                  href="https://www.linkedin.com/in/mohannad-nasreldin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open LinkedIn profile"
                  className="text-gray-500 hover:text-blue-500 transition-colors transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </motion.a>
                <motion.a
                  variants={fadeInUp}
                  href="https://wa.me/201287941698"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open WhatsApp chat"
                  className="text-gray-500 hover:text-green-600 transition-colors transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
                >
                  <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                </motion.a>
              </motion.div>
              
            </motion.div>
          </div>
          <motion.div
            variants={fadeInUp}
            {...revealProps}
            className="mt-16 lg:mt-24 text-center"
            style={{ willChange: "transform" }}
          >
            <h2 className="text-3xl font-semibold mb-8">Featured Work</h2>
            <ProjectsCarousel items={featuredProjects} />
          </motion.div>
        </LazyMotion>
      </div>
    </section>
  );
};

Hero.propTypes = {
  id: PropTypes.string,
};

export default Hero;
