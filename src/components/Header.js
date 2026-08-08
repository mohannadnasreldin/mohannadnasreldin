import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";
import { useFluidScroll } from "../context/FluidScrollContext";
import logo from "../assets/Letter M.webp";

const NAV = [
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const Header = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { scrollTo } = useFluidScroll();
  const navRef = useRef(null);

  const go = (event, sectionId) => {
    event.preventDefault();
    setOpen(false);
    if (onNavigate) onNavigate(sectionId);
    else scrollTo(sectionId);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    document.body.classList.add("overflow-hidden");
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ease-expo ${
          scrolled || open ? "glass-panel-strong" : "glass-panel"
        }`}
      >
        <button
          type="button"
          onClick={(e) => go(e, "home")}
          className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none"
          aria-label="Go to home"
        >
          <img
            src={logo}
            alt="Mohannad Nasreldin"
            className={`h-8 w-auto ${isDarkMode ? "invert" : ""}`}
          />
          <span className="hidden font-display text-sm font-semibold tracking-wide text-ink sm:inline">
            MN
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => go(e, item.id)}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors duration-200 hover:bg-white/5 hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass-bg text-ink transition-colors hover:border-accent/50 hover:text-accent"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <MoonIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass-bg text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            ref={navRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass-panel-strong mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl p-4 md:hidden"
            aria-label="Mobile navigation"
          >
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => go(e, item.id)}
                className="rounded-xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-white/5 hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

Header.propTypes = {
  onNavigate: PropTypes.func,
};

export default Header;
