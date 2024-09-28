import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaLaptopCode,
  FaCamera,
  FaServer,
  FaCodeBranch,
  FaDatabase,
} from 'react-icons/fa';
import { MdWeb, MdIntegrationInstructions } from 'react-icons/md';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Software Engineering',
    description: 'I develop robust and scalable Software applications.',
    icon: FaLaptopCode,
  },
  {
    title: 'Full Stack Engineer',
    description: 'Expert in both front-end and back-end development to deliver complete solutions.',
    icon: FaLaptopCode,
  },
  {
    title: 'Backend Development',
    description: 'Creating efficient server-side applications and APIs.',
    icon: FaServer,
  },
  {
    title: 'Frontend Development',
    description: 'Developing interactive and responsive user interfaces.',
    icon: MdWeb,
  },
  {
    title: 'API Integration',
    description: 'Connecting your app with third-party services and APIs.',
    icon: MdIntegrationInstructions,
  },
  {
    title: 'Database Management',
    description: 'Designing and managing efficient database systems.',
    icon: FaDatabase,
  },
  {
    title: 'Version Control',
    description: 'Utilizing version control systems like Git for efficient collaboration.',
    icon: FaCodeBranch,
  },
  {
    title: 'Photography',
    description: 'I Shoot and Edit your Photos.',
    icon: FaCamera,
  },
];

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll('.service-card');

    elements.forEach((element, index) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 }, // Start state: hidden and slightly down
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element, // Element that triggers the animation
            start: 'top 80%', // Start when the top of the element is 80% down the viewport
            end: 'top 30%', // End when the top of the element reaches 30% of the viewport
            scrub: true,
          },
          delay: index * 0.2, // Stagger the animations for each card
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-20 px-4 bg-gray-100 dark:bg-black">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
          Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-white dark:bg-gray-900 p-6 shadow-lg rounded-lg text-center"
            >
              <service.icon className="text-4xl mb-4 text-purple-500 mx-auto" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
