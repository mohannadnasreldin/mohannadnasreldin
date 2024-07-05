import React from "react";
import {
  FaLaptopCode,
  FaCamera,
  FaServer,
  FaCodeBranch,
  FaDatabase,
} from "react-icons/fa";
import { MdWeb, MdIntegrationInstructions } from "react-icons/md";

const services = [
  {
    title: "Photography",
    description: "I Shoot and Edit your Photos.",
    icon: FaCamera,
  },
  {
    title: "Web Development",
    description: "I develop robust and scalable web applications.",
    icon: MdWeb,
  },
  {
    title: "Full Stack Engineer",
    description:
      "Expert in both front-end and back-end development to deliver complete solutions.",
    icon: FaLaptopCode,
  },
  {
    title: "Backend Development",
    description: "Creating efficient server-side applications and APIs.",
    icon: FaServer,
  },
  {
    title: "Frontend Development",
    description: "Developing interactive and responsive user interfaces.",
    icon: FaLaptopCode,
  },
  {
    title: "API Integration",
    description: "Connecting your app with third-party services and APIs.",
    icon: MdIntegrationInstructions,
  },
  {
    title: "Database Management",
    description: "Designing and managing efficient database systems.",
    icon: FaDatabase,
  },
  {
    title: "Version Control",
    description:
      "Utilizing version control systems like Git for efficient collaboration.",
    icon: FaCodeBranch,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 px-4 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
          Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg text-center"
            >
              <service.icon className="text-4xl mb-4 text-blue-500 mx-auto" />
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
