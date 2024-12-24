import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faContactCard, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Typewriter } from "react-simple-typewriter";
import cv from "../assets/CV.pdf";
import profilePic from "../assets/profilepic (1).webp";
import {
  faGithub,
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const handleScrollToSection = (event, sectionId) => {
  event.preventDefault();
  document.getElementById(sectionId).scrollIntoView({
    behavior: "smooth",
  });
};

const Hero = () => {
  const [isDownloading, setIsDownloading] = useState(false);

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

  return (
    <section id="home" className="bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 py-20 md:py-28 flex flex-col justify-center items-center">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Profile Picture Section */}
        <div className="mb-8 relative">
          <div className="w-64 h-64 md:w-84 md:h-84 bg-gradient-to-t from-purple-500 via-transparent to-transparent rounded-full absolute inset-0"></div>
          <img
            src={profilePic}
            alt="Profile"
            className="w-64 h-64 md:w-84 md:h-84 object-cover rounded-full shadow-xl shadow-purple-500/50 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl z-10"
          />
        </div>

        {/* Introduction Text Section */}
        <div className="text-center mb-6">
          <div className="text-3xl md:text-4xl mb-4">
            Hi, I'm{" "}
            <span className="typewriter-text">
              <Typewriter
                words={["Mohannad"]}
                typeSpeed={50}
                deleteSpeed={50}
                delaySpeed={500}
              />
            </span>
          </div>
          <div className="text-2xl md:text-3xl mb-4">
            a{" "}
            <span className="typewriter-text">
              <Typewriter
                words={["Software Engineer", "Photographer"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={50}
                delaySpeed={400}
              />
            </span>
          </div>
          {/* Social Links */}
          <div className="mt-8 space-x-6">
            <a
              href="https://github.com/mohannadnasreldin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a
              href="https://www.facebook.com/mohannad.nasraldin/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-700 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a
              href="https://www.instagram.com/anim._.honda/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-700 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohannad-nasreldin/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a
              href="https://wa.me/201287941698"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-500 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faWhatsapp} size="2x" />
            </a>
          </div>
        </div>
        
        {/* Download CV and Contact Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            className={`bg-purple-500 text-white rounded-full px-6 py-3 flex items-center space-x-2 transform transition-all hover:scale-105 ${isDownloading ? "animate-pulse" : ""}`}
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading && <FontAwesomeIcon icon={faSpinner} spin className="text-white" />}
            <FontAwesomeIcon icon={faDownload} />
            <span>{isDownloading ? "Downloading..." : "Download CV"}</span>
          </button>
          <button
            onClick={(e) => handleScrollToSection(e, "contact")}
            className="bg-transparent border-2 border-purple-500 text-purple-500 rounded-full px-6 py-3 flex items-center space-x-2 transform transition-all hover:scale-105 hover:bg-purple-500 hover:text-white"
          >
            <FontAwesomeIcon icon={faContactCard} />
            <span>Contact</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
