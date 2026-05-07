import React from "react";
import PropTypes from "prop-types";
import {
  SiHtml5,
  SiCss,
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
  { name: "CSS", icon: <SiCss /> },
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

/**
 * Skills section
 * @param {{ id?: string }} props
 */
const Skills = ({ id = "skills" }) => {
  return (
    <section id={id} className="py-24 px-6 bg-transparent relative z-10">
      <div className="container-max">
        <h2 className="fluid-text-3xl font-bold mb-16 text-primary text-center">
          Skills
        </h2>

        <div className="relative w-full overflow-hidden">
          <div
            className="skill-container flex justify-start items-center space-x-12 animate-scroll"
            style={{
              display: "flex",
              whiteSpace: "nowrap",
            }}
          >
            {skillsData.concat(skillsData).map((skill, index) => (
              <div
                key={index}
                className="text-6xl text-accent inline-block mx-8 cursor-pointer transition-transform hover:scale-110"
                style={{ minWidth: "100px", textAlign: "center" }}
                title={skill.name}
                aria-label={`Skill: ${skill.name}`}
              >
                {skill.icon}
              </div>
            ))}
          </div>
          {/* Hidden list for SEO crawlers */}
          <div className="sr-only">
            <h3>Technical Expertise</h3>
            <ul>
              {skillsData.map((skill) => (
                <li key={skill.name}>{skill.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
Skills.propTypes = {
  id: PropTypes.string,
};
