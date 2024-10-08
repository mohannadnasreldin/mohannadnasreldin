import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const linesRef = useRef(null);

  const lines = [
    "I am a passionate Software Engineer and Web Developer with a degree in Computer Science and Artificial Intelligence from Helwan University.",
    "My journey into tech began during my internship at Flextock, where I honed my skills in Full Stack Development.",
    "I thrive on solving complex problems and enjoy collaborating closely with clients to deliver efficient and innovative solutions.",
    "I'm eager to contribute my skills and enthusiasm to your team and help turn your ideas into reality.",
    "Feel free to reach out to discuss how we can work together!",
  ];

  useEffect(() => {
    const lines = linesRef.current.children;

    gsap.fromTo(
      lines,
      { opacity: 0, y: 20 }, // Start with each line fully transparent and slightly below
      {
        opacity: 1, // Fade in to full opacity
        y: 0, // Move to original position
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.3, // Delay between each line's appearance
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 px-4 bg-gray-100 dark:bg-black"
    >
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            About Me
          </h2>
          <div className="h-1 mx-auto bg-purple-500 w-24 opacity-75 my-0 py-0 rounded-t"></div>
        </div>
        <div ref={linesRef}>
          {lines.map((line, index) => (
            <p key={index} className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
