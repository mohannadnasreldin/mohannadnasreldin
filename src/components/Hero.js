import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faContactCard } from "@fortawesome/free-solid-svg-icons";
import { Typewriter } from "react-simple-typewriter";
import cv from "../assets/cv.pdf";
import profilePic from "../assets/profilepic.webp";
import {
  faGithub,
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
const Hero = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000); // Example duration, adjust as needed
  };

  return (
    <section id="home" className="bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 py-20 md:py-28">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
      <div className="md:w-1/3 flex justify-center md:justify-start mb-8">
          <img
            src={profilePic}
            alt="Profile"
            className="w-56 h-56 md:w-72 md:h-72 object-cover bg-purple-500 rounded-full shadow-lg shadow-purple-500/100"
          />
        </div>
        <div className="md:w-2/3 text-center md:text-left mb-6 md:mb-0 ios-font md:justify-end">
          <div className="text-3xl md:text-4xl font-bold mb-4">
            Hi, I'm {" "}
            <span className="typewriter-text">
              <Typewriter
                words={["Mohannad"]}
                typeSpeed={50}
                deleteSpeed={50}
                delaySpeed={500}
              />
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-bold mb-4">
            a {" "}
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
          <div className="mt-8 space-x-6 ">
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
        </div>
        
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        <button
          className={`d-button hover:text-purple-500  ${
            isDownloading ? "animate-pulse" : ""
          }`}
          onClick={handleDownload}
          disabled={isDownloading}
        >
          <a download="cv.pdf" href={cv} className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faDownload} />
            <span>{isDownloading ? "Downloading..." : "Download CV"}</span>
          </a>
        </button>
        <button className="d-button hover:text-purple-500 ">
          <a href="#contact" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faContactCard} />
            <span>Contact</span>
          </a>
        </button>
      </div>
    </section>
  );
};

export default Hero;

