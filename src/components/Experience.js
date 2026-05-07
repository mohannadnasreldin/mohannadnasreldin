import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { cardVariants } from '../animation/variants';
import { FaGraduationCap, FaBriefcase, FaCalendar } from 'react-icons/fa';

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
},
{
    role: 'Software Engineer',
    organization: 'Full-Time @ IFIN Services',
    duration: '2025',
    type: 'work'
},
{
    role: 'System Specialist',
    organization: 'Full-Time @ Egypt Air',
    duration: '2025',
    type: 'work'
}
];

/**
 * Experience section
 * @param {{ id?: string }} props
 */
const Experience = ({ id = 'experience' }) => {
  return (
    <section
      id={id}
      className="py-24 px-6 bg-transparent relative z-10"
    >
      <div className="container-max flex flex-col items-center">
        <h2 className="fluid-text-4xl font-bold mb-2 text-primary">Experience</h2>
        <p className="fluid-text-lg mb-20 text-accent font-medium">My Personal Journey</p>
        
        <div className="relative w-full max-w-4xl">
          {/* Timeline Vertical Line */}
          <div className="absolute inset-y-0 left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="h-full border-l border-border-strong"></div>
          </div>
          
          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              className={`experience-card flex flex-col mb-12 relative group ${
                index % 2 === 0 ? 'md:items-end' : 'md:items-start'
              }`}
            >
              {/* Dot / Icon on Timeline */}
              <div
                className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-accent/20 text-accent shadow-[0_0_15px_rgba(79,110,247,0.15)] z-10 transition-transform group-hover:scale-110"
              >
                {exp.type === 'education' ? (
                  <FaGraduationCap size={20} />
                ) : (
                  <FaBriefcase size={18} />
                )}
              </div>
              
              {/* Card Content */}
              <div
                className={`relative ml-16 md:ml-0 bg-surface p-8 rounded-xl border border-border hover:border-accent/30 transition-colors shadow-sm w-[calc(100%-4rem)] md:w-[calc(50%-2rem)] ${
                  index % 2 === 0
                    ? 'md:mr-[calc(50%+2rem)]'
                    : 'md:ml-[calc(50%+2rem)]'
                }`}
              >
                <h3 className="fluid-text-xl font-bold text-primary mb-2">{exp.role}</h3>
                <p className="fluid-text-base text-accent font-medium mb-3">{exp.organization}</p>
                <p className="fluid-text-sm text-tertiary flex items-center">
                  <FaCalendar className="mr-2 opacity-70" />
                  {exp.duration}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

Experience.propTypes = {
  id: PropTypes.string,
};

export default Experience;
