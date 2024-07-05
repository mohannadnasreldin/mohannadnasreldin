import React, { useState } from "react";
import { Menu, X } from "feather-icons-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-4 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-center relative">
        {/* Menu button for mobile */}
        <div
          className="absolute left-4 md:left-auto md:right-4 md:hidden flex items-center"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        {/* Navigation */}
        <nav
          className={`w-full md:w-auto flex items-center justify-center ${
            isOpen ? "block" : "hidden md:flex"
          }`}
        >
          <ul className="flex flex-col md:flex-row items-center justify-center w-full md:w-auto space-y-2 md:space-y-0 md:space-x-6">
            <li>
              <a
                href="#services"
                className="block px-4 py-2  hover:text-blue-500 dark:hover:text-white border-b-2 border-transparent hover:border-blue-500 transition-colors duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="block px-4 py-2 t hover:text-blue-500 dark:hover:text-white border-b-2 border-transparent hover:border-blue-500 transition-colors duration-300"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block px-4 py-2 t hover:text-blue-500 dark:hover:text-white border-b-2 border-transparent hover:border-blue-500 transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block px-4 py-2 t hover:text-blue-500 dark:hover:text-white border-b-2 border-transparent hover:border-blue-500 transition-colors duration-300"
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
