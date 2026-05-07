import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Magnetic } from '../ui/Magnetic';
import cv from "../assets/CV.pdf";

const Hero = ({ id = 'home' }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    const link = document.createElement("a");
    link.href = cv;
    link.setAttribute("download", "mohannad-nasreldin-cv.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 1000);
  };

  const handleScroll = (targetId) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id={id} className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 font-mono text-sm tracking-[0.3em] text-tertiary uppercase"
        >
          Software Engineer · Motion UI
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl xs:text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl text-primary"
        >
          Crafting fast,
          <br />
          cinematic digital experiences.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-8 max-w-2xl mx-auto text-base leading-8 text-secondary sm:text-lg"
        >
          Interactive systems, elegant interfaces, and immersive motion design built
          with performance-first engineering.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
        >
          <Magnetic>
            <button 
              onClick={() => handleScroll("projects")}
              className="rounded-2xl bg-accent px-10 py-5 text-sm font-bold text-white shadow-[0_0_40px_rgba(79,110,247,0.35)] transition-all duration-300 hover:scale-[1.05] active:scale-[0.95]"
              data-cursor="hover"
            >
              View Work
            </button>
          </Magnetic>

          <Magnetic>
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-10 py-5 text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] active:scale-[0.95]"
              data-cursor="hover"
            >
              {isDownloading ? "Downloading..." : "Get CV"}
            </button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-tertiary"
      >
        <span className="mono-label mb-2">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent"></div>
      </motion.div>
    </section>
  );
};

Hero.propTypes = {
  id: PropTypes.string,
};

export default Hero;
