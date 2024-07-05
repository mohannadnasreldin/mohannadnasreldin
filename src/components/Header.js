import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "feather-icons-react";
import logo from "../assets/Letter M.webp";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <header className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-4 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between relative">
        {/* Logo outside sidenav (for large screens) */}
        <div className="flex items-center">
          <img
            src={logo} // Replace with your logo path
            alt="Logo"
            className="h-8 w-auto dark:invert " // Hide on mobile to show inside sidenav
          />
        </div>

        {/* Menu button for mobile */}
        <div
          className="md:hidden flex items-center cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        {/* Overlay */}
        {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleMenu}></div>}

        {/* Navigation */}
        <nav
          ref={navRef}
          className={`fixed inset-0 bg-gray-100 dark:bg-gray-900 z-50 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 md:relative md:translate-x-0 md:bg-transparent md:flex items-center`}
        >
          {/* Close button and Logo inside sidenav */}
          <div className="relative flex flex-col items-center w-full md:hidden">
            <div className="absolute top-4 right-4 cursor-pointer" onClick={toggleMenu}>
              <X size={24} />
            </div>
            <div className="mt-8 mb-4">
              <img
                src={logo}// Replace with your logo path
                alt="Logo"
                className="h-12 w-auto dark:invert"
              />
            </div>
          </div>

          <ul className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mt-20 md:mt-0">
            <li>
              <a
                href="#services"
                className="block px-4 py-2 hover:text-blue-500 dark:hover:text-white border-b-2 border-transparent hover:border-blue-500 transition-colors duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="block px-4 py-2 hover:text-blue-500 dark:hover:text-white border-b-2 border-transparent hover:border-blue-500 transition-colors duration-300"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block px-4 py-2 hover:text-blue-500 dark:hover:text-white border-b-2 border-transparent hover:border-blue-500 transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block px-4 py-2 hover:text-blue-500 dark:hover:text-white border-b-2 border-transparent hover:border-blue-500 transition-colors duration-300"
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
