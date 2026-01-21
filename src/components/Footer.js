import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

/**
 * Footer component
 * @param {{ year?: number }} props
 */
const Footer = ({ year = new Date().getFullYear() }) => {
  return (
    <footer className="bg-gray-200 dark:bg-black text-gray-800 dark:text-white py-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {year} Mohannad Nasreldin. All rights
          reserved.
        </p>
        <div className="mt-5 flex justify-center space-x-12">
          <a
            href="https://github.com/mohannadnasreldin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a
            href="https://www.facebook.com/mohannad.nasraldin/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-700"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a
            href="https://www.instagram.com/anim._.honda/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-700"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a
            href="https://www.linkedin.com/in/mohannad-nasreldin/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a
            href="https://wa.me/201287941698"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-500"
          >
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </a>
        </div>
        <div className="mt-4">
          <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mx-2">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
Footer.propTypes = {
  year: PropTypes.number,
};
