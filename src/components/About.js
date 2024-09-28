
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // GSAP animation with ScrollTrigger
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, x: '-100%' }, // Start off-screen to the left
      {
        opacity: 1,
        x: '0%',
        duration: 2,
        ease: 'power3.out', // Smooth easing function for a natural effect
        scrollTrigger: {
          trigger: sectionRef.current, // Element that triggers the animation
          start: 'top 80%', // Start when the top of the element is 80% down the viewport
          end: 'top 30%', // End when the top of the element reaches 30% of the viewport
          scrub: true, // Smooth scrubbing effect
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
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          I am a passionate Software Engineer and Web Developer with a degree
          in Computer Science and Artificial Intelligence from Helwan
          University. My journey into tech began during my internship at
          Flextock, where I honed my skills in Full Stack Development. I thrive
          on solving complex problems and enjoy collaborating closely with
          clients to deliver efficient and innovative solutions. I'm eager to
          contribute my skills and enthusiasm to your team and help turn your
          ideas into reality. Feel free to reach out to discuss how we can work
          together!
        </p>
      </div>
    </section>
  );
};

export default About;
