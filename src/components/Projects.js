// import React from "react";
// import bmi from "../assets/BMI-Calculator-App.png"
// import TDL from "../assets/To-Do-List.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";
// // Updated projects array with demo and GitHub links
// const projects = [
//   {
//     title: "BMI Calculator",
//     category: "Frontend Development",
//     imageUrl: bmi,
//     demoLink: "https://bmi-calculator-app-henna.vercel.app/",
//     githubLink: "https://github.com/mohannadnasreldin/bmi-calculator-app",
//   },
//   {
//     title: "To-Do List",
//     category: "Frontend Development",
//     imageUrl: TDL,
//     demoLink: "https://to-do-list-eight-mauve.vercel.app/",
//     githubLink: "https://github.com/mohannadnasreldin/to-do-list",
//   }
// ];

// const Projects = () => {
//   return (
//     <section id="projects" className="py-20 px-4 bg-gray-100 dark:bg-black">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
//           Projects
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
//           {projects.map((project, index) => (
//             <div
//               key={index}
//               className="bg-purple-500 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105"
//             >
//               <img
//                 src={project.imageUrl}
//                 alt={project.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-xl font-bold mb-2">{project.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-400 mb-4">
//                   {project.category}
//                 </p>
//                 <div className="flex justify-between">
//                   <a
//                     href={project.demoLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-block bg-purple-700 text-white px-4 py-2 rounded shadow hover:bg-purple-900"
//                   >
//                     Live Demo
//                   </a>
//                   <a
//                     href={project.githubLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-block bg-gray-900 text-white px-4 py-2 rounded shadow hover:bg-black"
//                   >
//  <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />                  </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Projects;
import React from "react";
import bmi from "../assets/BMI-Calculator-App.png";
import TDL from "../assets/To-Do-List.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Updated projects array with demo and GitHub links
const projects = [
  {
    title: "BMI Calculator",
    category: "Frontend Development",
    imageUrl: bmi,
    demoLink: "https://bmi-calculator-app-henna.vercel.app/",
    githubLink: "https://github.com/mohannadnasreldin/bmi-calculator-app",
  },
  {
    title: "To-Do List",
    category: "Frontend Development",
    imageUrl: TDL,
    demoLink: "https://to-do-list-eight-mauve.vercel.app/",
    githubLink: "https://github.com/mohannadnasreldin/to-do-list",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 bg-gray-100 dark:bg-black">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-56 object-stretch"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-5">{project.category}</p>
                <div className="flex justify-between items-center">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-purple-500 text-white px-5 py-2 rounded shadow hover:bg-purple-600"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gray-700 text-white px-5 py-2 rounded shadow hover:bg-gray-500"
                  >
                    <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
