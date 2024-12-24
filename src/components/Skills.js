import React from "react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiAngular,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiC,
  SiPhp,
  SiDjango,
  SiMattermost,
  SiGithub,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { TbBrandCSharp } from "react-icons/tb";

const skillsData = [
  { name: "HTML", icon: <SiHtml5 /> },
  { name: "CSS", icon: <SiCss3 /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "ReactJS", icon: <SiReact /> },
  { name: "Angular", icon: <SiAngular /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "NodeJS", icon: <SiNodedotjs /> },
  { name: "Python", icon: <SiPython /> },
  { name: "C", icon: <SiC /> },
  { name: "C#", icon: <TbBrandCSharp /> },
  { name: "PHP", icon: <SiPhp /> },
  { name: "Django", icon: <SiDjango /> },
  { name: "Matter JS", icon: <SiMattermost /> },
  { name: "GitHub", icon: <SiGithub /> },
  { name: "VS Code", icon: <VscVscode /> },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 bg-gray-100 dark:bg-black">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-center">
          Skills
        </h2>

        <div className="relative w-full overflow-hidden">
          <div
            className="skill-container flex justify-start items-center space-x-8 animate-scroll"
            style={{
              display: "flex",
              whiteSpace: "nowrap", // Ensure content stays on one line
            }}
          >
            {/* Duplicate skillsData for continuous scrolling */}
            {skillsData.concat(skillsData).map((skill, index) => (
              <div
                key={index}
                className="text-5xl text-purple-500 inline-block mx-4 cursor-pointer"
                style={{ minWidth: "80px", textAlign: "center" }} // Adjust icon size and alignment
              >
                {skill.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

// Add this CSS to your styles (e.g., in a CSS file or within a <style> tag):
const styles = `
@keyframes scrolling {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-scroll {
  animation: scrolling 30s linear infinite; /* Adjust 30s for scroll speed */
}
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
