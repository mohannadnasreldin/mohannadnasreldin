import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Menu, X } from "feather-icons-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/LetterM.webp";
import { Magnetic } from "../ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

/**
 * Header component
 * @param {{ onNavigate?: (id:string)=>void }} props
 */
const Header = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScrollToSection = (event, sectionId) => {
    event.preventDefault();
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "services", label: "Services" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ];

  const socialLinks = [
    { icon: faGithub, href: "https://github.com/mohannadnasreldin", label: "GitHub" },
    { icon: faLinkedin, href: "https://www.linkedin.com/in/mohannad-nasreldin/", label: "LinkedIn" },
    { icon: faInstagram, href: "https://www.instagram.com/anim._.honda/", label: "Instagram" }
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "py-4 bg-bg/80 backdrop-blur-xl border-b border-white/5" : "py-6 bg-transparent"
      }`}
    >
      <div className="container-max flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-8 w-auto dark:invert cursor-pointer transition-transform hover:scale-110"
            onClick={(e) => handleScrollToSection(e, "home")}
          />
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <Magnetic strength={0.2}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScrollToSection(e, item.id)}
                    className="mono-label !text-secondary hover:!text-accent transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 text-primary hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[60] bg-bg flex flex-col p-8 md:hidden"
            >
              <div className="flex justify-between items-center mb-16">
                <img src={logo} alt="Logo" className="h-8 w-auto dark:invert" />
                <button
                  onClick={toggleMenu}
                  className="p-2 text-primary hover:text-accent transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-grow flex flex-col justify-center">
                <ul className="space-y-6">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleScrollToSection(e, item.id)}
                        className="text-4xl font-bold text-primary hover:text-accent transition-colors block"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto border-t border-white/5 pt-8 flex items-center justify-between">
                <div className="flex space-x-6">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-accent transition-colors"
                    >
                      <FontAwesomeIcon icon={social.icon} size="lg" />
                    </a>
                  ))}
                </div>
                <div className="text-tertiary text-xs mono-label">
                  © 2026 MN
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
Header.propTypes = {
  onNavigate: PropTypes.func,
};
