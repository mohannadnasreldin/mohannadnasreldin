import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "feather-icons-react";
import logo from "../assets/Letter M.webp";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const headerRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleScrollToSection = (event, sectionId) => {
    event.preventDefault();
    setIsOpen(false);
    document.getElementById(sectionId).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 w-full z-50 transition-all duration-300 `}
    >
      <div className="container mx-auto px-4 flex items-center justify-between relative py-4 ">
        {/* Logo outside sidenav (for large screens) */}
        <div className={`flex items-center ${isOpen ? 'hidden' : ''}`}>
  <img
    src={logo}
    alt="Logo"
    className="h-8 w-auto dark:invert hover:cursor-pointer"
    onClick={(e) => handleScrollToSection(e, "home")}
  />
</div>


        {/* Menu button for mobile */}
        <div
          className="md:hidden dark:text-white flex items-center cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? null : <Menu size={24} />}
        </div>

        {/* Navigation */}
        <nav
          ref={navRef}
          className={`fixed inset-0 z-50 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 md:relative md:translate-x-0  md:flex items-center`} // Added backdrop-blur-lg
        >
          {/* Close button and Logo inside sidenav */}
          <div className="relative flex flex-col items-center w-full md:hidden ">
            <div
              className="absolute dark:text-white top-4 right-4 cursor-pointer"
              onClick={toggleMenu}
            >
              <X size={24} />
            </div>
            <div className="mt-8">
              <img src={logo} alt="Logo" className="h-12 w-auto dark:invert hover:cursor-pointer" onClick={(e) => handleScrollToSection(e, "home")}
              />
            </div>
          </div>

          <ul
  className={`flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 md:mt-0 ${isOpen ? 'bg-white dark:bg-black' : ''} text-gray-900 dark:text-gray-100`}
>            <li>
              <a
                href=""
                onClick={(e) => handleScrollToSection(e, "services")}
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-purple-500 border-b-2 border-transparent hover:border-purple-500 transition-colors duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href=""
                onClick={(e) => handleScrollToSection(e, "experience")}
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-purple-500 border-b-2 border-transparent hover:border-purple-500 transition-colors duration-300"
              >
                Experience
              </a>
            </li>
            <li>
              <a
                href=""
                onClick={(e) => handleScrollToSection(e, "projects")}
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-purple-500 border-b-2 border-transparent hover:border-purple-500 transition-colors duration-300"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href=""
                onClick={(e) => handleScrollToSection(e, "skills")}
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-purple-500 border-b-2 border-transparent hover:border-purple-500 transition-colors duration-300"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href=""
                onClick={(e) => handleScrollToSection(e, "about")}
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-purple-500 border-b-2 border-transparent hover:border-purple-500 transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href=""
                onClick={(e) => handleScrollToSection(e, "contact")}
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-purple-500 border-b-2 border-transparent hover:border-purple-500 transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;