import React from 'react';
import PropTypes from 'prop-types';
import profilePic from "../assets/profilepic.png";

/**
 * About section
 * @param {{ id?: string }} props
 */
const About = ({ id = 'about' }) => {
  const lines = [
    "I am a passionate Software Engineer and Web Developer with a degree in Computer Science and Artificial Intelligence from Helwan University.",
    "Expert in building scalable web applications using React, Node.js, and modern cloud technologies.",
    "I thrive on solving complex problems and creating seamless user experiences that combine logic with aesthetics."
  ];

  return (
    <section
      id={id}
      className="py-24 px-6 bg-transparent relative z-10"
    >
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="fluid-text-4xl font-bold mb-6 text-primary">
            About Me
          </h2>
          <div className="h-1 mx-auto bg-accent w-24 opacity-75 my-0 py-0 rounded-t"></div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Profile Image with Glass Frame */}
          <div className="relative group flex-shrink-0">
            <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl group-hover:bg-accent/30 transition-all duration-500"></div>
            <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm bg-white/5 shadow-2xl">
              <img 
                src={profilePic} 
                alt="Mohannad Nasreldin - Professional Software Engineer & Web Developer" 
                className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
              />
            </div>
            {/* Decorative Corner */}
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-accent rounded-br-lg"></div>
            <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-accent rounded-tl-lg"></div>
          </div>

          {/* Bio Text */}
          <div className="flex-grow space-y-6">
            {lines.map((line, index) => (
              <p 
                key={index} 
                className="fluid-text-lg text-secondary leading-relaxed border-l-2 border-accent/20 pl-6 hover:border-accent transition-colors duration-300"
              >
                {line}
              </p>
            ))}
            
            <div className="pt-6">
              <div className="inline-flex items-center space-x-2 text-accent font-mono text-sm tracking-widest uppercase">
                <span className="w-8 h-[1px] bg-accent"></span>
                <span>Software Engineer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
About.propTypes = {
  id: PropTypes.string,
};
