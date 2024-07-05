import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faContactCard } from "@fortawesome/free-solid-svg-icons";
import { Typewriter } from "react-simple-typewriter";
import cv from "../assets/cv.pdf";
import profilePic from "../assets/profilepic.webp";

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
    <section className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-20 md:py-28 fa-font-brands">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-2/3 text-center md:text-left mb-6 md:mb-0 ios-font">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hello 👋</h2>
          <h3 className="text-lg md:text-xl">I'm</h3>
          <br />
          <div className="text-3xl md:text-4xl font-bold mb-4">
            <Typewriter
              words={["Mohannad Nasreldin"]}
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={500}
            />
          </div>
          <div className="text-2xl md:text-3xl font-bold mb-4">
            <Typewriter
              words={["Fullstack Developer", "Photographer"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={500}
            />
          </div>
        </div>
        <div className="md:w-1/3 flex justify-center md:justify-end">
          <img
            src={profilePic}
            alt="Profile"
            className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full shadow-lg"
          />
        </div>
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        <button
          className={`d-button hover:text-blue-500 dark:hover:text-white ${
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
        <button className="d-button hover:text-blue-500 dark:hover:text-white">
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
