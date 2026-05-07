import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { cardVariants } from '../animation/variants';
import {
  FaLaptopCode,
  FaCamera,
  FaServer,
  FaCodeBranch,
  FaDatabase,
} from 'react-icons/fa';
import { MdWeb, MdIntegrationInstructions } from 'react-icons/md';

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

/**
 * Services section
 * @param {{ id?: string }} props
 */
const Services = ({ id = 'services' }) => {
  return (
    <section id={id} className="py-24 px-6 bg-transparent relative z-10">
      <div className="container-max">
        <h2 className="fluid-text-4xl font-bold mb-16 text-center text-primary">
          Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="service-card group bg-surface border border-border p-8 rounded-2xl text-center transition-all duration-300 hover:border-accent/30 hover:-translate-y-2"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-500 group-hover:rotate-12">
                <service.icon size={32} />
              </div>
              <h3 className="fluid-text-xl font-bold mb-3 text-primary">
                {service.title}
              </h3>
              <p className="fluid-text-sm text-secondary leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

Services.propTypes = {
  id: PropTypes.string,
};

export default Services;
