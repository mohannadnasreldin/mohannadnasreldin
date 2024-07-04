import React, { useState } from "react";

const skillsData = {
  frontend: [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "ReactJS", level: 85 },
    { name: "Angular", level: 50 },
    { name: "TypeScript", level: 45 },
  ],
  backend: [
    { name: "NodeJS", level: 65 },
    { name: "Python", level: 75 },
    { name: "Java", level: 70 },
    { name: "C", level: 70 },
    { name: "C#", level: 70 },
    { name: "PHP", level: 50 },
    { name: "Django", level: 75 },
  ],
  tools: [
    { name: "Matter JS", level: 50 },
    { name: "GitHub", level: 80 },
    { name: "VS Code", level: 85 },
  ],
};

const Skills = () => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <section id="skills" className="py-20 px-4 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
          Skills
        </h2>
        {Object.keys(skillsData).map((category) => (
          <div key={category} className="mb-4">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full text-center p-4 bg-blue-500 text-white font-semibold rounded-md focus:outline-none"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)} 
            </button>
            {openCategory === category && (
              <div className="mt-4 space-y-4">
                {skillsData[category].map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-32 text-gray-700 dark:text-gray-200 font-semibold">
                      {skill.name}
                    </span>
                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full text-center text-white text-sm font-bold"
                        style={{ width: `${skill.level}%` }}
                      >
                        {skill.level}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
