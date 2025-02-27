import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGraduationCap, FaBriefcase, FaCalendar } from 'react-icons/fa';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Computer Science',
    organization: 'Helwan University',
    duration: '2020 - 2024',
    type: 'education'
  },
  {
    role: 'Full-Stack Developer',
    organization: 'Internship @ Flextock',
    duration: '2023',
    type: 'work'
  },
  {
    role: 'Front-End Developer',
    organization: 'Freelance @ Illusionare',
    duration: '2024',
    type: 'work'
  },
  {
    role: 'Software Engineer',
    organization: 'Part-Time @ Aydn Labs',
    duration: '2025',
    type: 'work'
  },
{
    role: 'Software Engineer',
    organization: 'Internship @ IFIN Services',
    duration: '2025',
    type: 'work'
}
];

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll('.experience-card');

    elements.forEach((element, index) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: index % 2 === 0 ? '-100%' : '100%' }, // Start from left or right
        {
          opacity: 1,
          x: '0%',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-20 px-4 bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100"
    >
      <div className="flex flex-col text-center items-center justify-center min-h-screen px-4">
        <h1 className="text-4xl font-bold mb-2 sm:text-3xl">Experience</h1>
        <h2 className="text-lg mb-16 text-purple-500 sm:mb-12">My Personal Journey</h2>
        <div className="relative w-full max-w-4xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full border-l-2 border-gray-700"></div>
          </div>
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card flex flex-col items-center mb-8 relative">
              <div
                className={`flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-purple-600 z-10`}
              >
                {exp.type === 'education' ? (
                  <FaGraduationCap className="text-white" />
                ) : (
                  <FaBriefcase className="text-white" />
                )}
              </div>
              <div
                className={`relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-xs md:${
                  index % 2 === 0
                    ? 'ml-auto sm:ml-0 sm:mr-auto'
                    : 'mr-auto sm:mr-0 sm:ml-auto'
                }`}
              >
                <h3 className="text-2xl font-semibold sm:text-xl">{exp.role}</h3>
                <p className="text-purple-400 sm:text-base">{exp.organization}</p>
                <p className="text-gray-400 flex justify-center items-center sm:text-sm">
                  <FaCalendar className="text-purple-500 mr-2" />
                  {exp.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
