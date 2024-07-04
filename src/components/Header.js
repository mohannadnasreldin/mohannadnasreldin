import React, { useState } from "react";
import { Menu, X } from "feather-icons-react"; // Assuming you imported Moon and Sun icons for dark and light mode from feather-icons-react

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

 

  return (
    <header className={`bg-gray-900 text-white py-4 shadow-lg `}>
      <div className="container mx-auto px-4 md:px-0 flex flex-wrap items-center justify-between">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 header-font">Mohannad Nasreldin</h1>
        
        <div className="relative">
          <div className="cursor-pointer md:hidden flex items-center" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
          
          <nav className={`md:flex md:items-center space-x-6 ${isOpen ? "block" : "hidden"} md:block absolute md:relative right-0 mt-2 md:mt-0 md:w-auto md:bg-transparent md:shadow-none md:space-x-0 md:flex-row md:space-x-0 header-font`}>
            
            <ul className="md:flex md:items-center md:space-x-6">
              <li>
                <a href="#services" className="block px-4 py-2 text-gray-300 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#skills" className="block px-4 py-2 text-gray-300 hover:text-white">
                  Skills
                </a>
              </li>
              <li>
                <a href="#about" className="block px-4 py-2 text-gray-300 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="block px-4 py-2 text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
