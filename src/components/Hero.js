import React, { Suspense, lazy, useRef, useState } from "react";
import PropTypes from "prop-types";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownTrayIcon, ChevronDownIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { useFluidScroll } from "../context/FluidScrollContext";
import useStoryHeroScroll from "./story/StoryHeroScroll";
import cv from "../assets/CV.pdf";

const HeroScene3D = lazy(() => import("./HeroScene3D"));
const LiquidGlassLens = lazy(() => import("./ui/LiquidGlassLens"));

const socials = [
  { href: "https://github.com/mohannadnasreldin", label: "GitHub", Icon: FaGithub },
  { href: "https://www.linkedin.com/in/mohannad-nasreldin/", label: "LinkedIn", Icon: FaLinkedin },
  { href: "https://wa.me/201287941698", label: "WhatsApp", Icon: FaWhatsapp },
  { href: "https://www.instagram.com/anim._.honda/", label: "Instagram", Icon: FaInstagram },
  { href: "https://www.facebook.com/mohannad.nasraldin/", label: "Facebook", Icon: FaFacebook },
];

const ROLES = ["Full-Stack Developer", "Problem Solver", "Systems Builder"];

const Hero = ({ id = "home" }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const sceneRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const reduce = useReducedMotion();
  const { scrollTo, reducedMotion, liteMode } = useFluidScroll();
  const richFx = !reduce && !liteMode;

  useStoryHeroScroll(sectionRef, contentRef, sceneRef);

  const downloadCv = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = cv;
    link.setAttribute("download", "Mohannad_Nasreldin_CV.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloading(false);
  };

  const nameWords = ["Mohannad", "Nasreldin"];

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby="hero-heading"
      className="story-hero relative z-10 flex min-h-[115vh] items-center overflow-hidden bg-transparent"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {richFx ? (
          <>
            <motion.div
              data-hero-blob
              className="absolute rounded-full"
              style={{
                width: "min(560px, 55vw)",
                height: "min(560px, 55vw)",
                left: "-8%",
                top: "10%",
                background:
                  "radial-gradient(circle, #0367FE 0%, #0256CC 55%, transparent 70%)",
                filter: "blur(120px)",
                opacity: 0.55,
              }}
              animate={{ x: [0, 40, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              data-hero-blob
              className="absolute rounded-full"
              style={{
                width: "min(480px, 50vw)",
                height: "min(480px, 50vw)",
                right: "-5%",
                top: "5%",
                background:
                  "radial-gradient(circle, #0A1DCB 0%, #0816A3 50%, transparent 70%)",
                filter: "blur(130px)",
                opacity: 0.5,
              }}
              animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              data-hero-blob
              className="absolute rounded-full"
              style={{
                width: "min(420px, 45vw)",
                height: "min(420px, 45vw)",
                left: "35%",
                bottom: "-10%",
                background:
                  "radial-gradient(circle, rgba(56,189,248,0.55) 0%, transparent 70%)",
                filter: "blur(100px)",
              }}
              animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.25, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-hero-mesh opacity-80" />
        )}
      </div>

      {richFx ? (
        <div
          data-hero-strips
          className="pointer-events-none absolute inset-0 z-[1] flex"
          aria-hidden="true"
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="h-full flex-1 animate-refraction"
              style={{
                background:
                  "linear-gradient(90deg, rgba(217,217,217,0) 0%, rgba(0,0,0,0.45) 76%, rgba(255,255,255,0.22) 100%)",
                mixBlendMode: "overlay",
                animationDelay: `${i * 0.12}s`,
                opacity: 0.45,
              }}
            />
          ))}
        </div>
      ) : null}

      <div ref={sceneRef} className="absolute inset-0 z-0">
        {richFx ? (
          <Suspense fallback={null}>
            <HeroScene3D />
          </Suspense>
        ) : null}
      </div>
      {richFx ? (
        <div className="noise-overlay absolute inset-0 z-[2]" aria-hidden="true" />
      ) : null}

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-4 pb-28 pt-32 sm:px-6 lg:px-8 lg:pt-36"
      >
        {richFx ? (
          <Suspense fallback={null}>
            <LiquidGlassLens width={160} height={160} borderRadius={80} blur={1.5} />
          </Suspense>
        ) : null}

        <div className="max-w-2xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-accent"
          >
            00 — Prologue
          </motion.p>

          <h1
            id="hero-heading"
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {nameWords.map((word, i) => (
              <motion.span
                key={word}
                className="mr-3 inline-block last:mr-0"
                initial={reduce ? false : { opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.12 + i * 0.14,
                  duration: 0.7,
                  type: "spring",
                  stiffness: 90,
                }}
              >
                <span className={i === 1 ? "text-gradient" : ""}>{word}</span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.55 }}
            className="mt-5 text-xl font-medium text-accent-soft sm:text-2xl"
          >
            {liteMode ? (
              ROLES[0]
            ) : (
              <Typewriter
                words={ROLES}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={40}
                deleteSpeed={28}
                delaySpeed={2400}
              />
            )}
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.55 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            Scroll to follow the story — from craft and journey to work and
            connection.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              className="glass-btn-primary"
              onClick={() => scrollTo("contact")}
              aria-label="Contact me"
            >
              <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
              Contact Me
            </button>
            <button
              type="button"
              className="glass-btn-ghost"
              onClick={downloadCv}
              disabled={downloading}
              aria-label="Download CV"
            >
              <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />
              {downloading ? "Downloading…" : "Download CV"}
            </button>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.5 }}
            className="mt-10 flex items-center gap-4"
          >
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${label} profile`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-glass-border bg-glass-bg text-ink-muted transition-all duration-200 hover:border-accent/50 hover:text-accent hover:shadow-glow"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {!reducedMotion ? (
        <button
          type="button"
          onClick={() => scrollTo("services")}
          className="story-scroll-hint absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-faint transition-colors hover:text-accent"
          aria-label="Scroll to begin the story"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ChevronDownIcon className="h-5 w-5 animate-bounce" aria-hidden="true" />
        </button>
      ) : null}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-48 bg-gradient-to-t from-surface-deep via-surface-deep/40 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
};

Hero.propTypes = {
  id: PropTypes.string,
};

export default Hero;
