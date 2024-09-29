import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const iconsRef = useRef([]);
  const buttonRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;
    const icons = iconsRef.current;
    const button = buttonRef.current;

    // Heading animation
    gsap.fromTo(
      heading,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
        },
      }
    );

    // Paragraph animation
    gsap.fromTo(
      paragraph,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 55%",
          toggleActions: "play none none none",
        },
      }
    );

    // Icons animation (staggering effect)
    gsap.fromTo(
      icons,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 50%",
          toggleActions: "play none none none",
        },
      }
    );

    // Button animation
    gsap.fromTo(
      button,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          end: "bottom 45%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 px-4 bg-gray-100 dark:bg-black text-gray-900 dark:text-white"
    >
      <div className="container mx-auto text-center">
        <h2 ref={headingRef} className="text-3xl font-bold mb-8">
          Contact
        </h2>
        <p ref={paragraphRef} className="mb-8">
          LET'S WORK TOGETHER
        </p>
        <div className="mb-8 flex justify-center space-x-6">
          <a
            ref={(el) => (iconsRef.current[0] = el)}
            href="https://github.com/mohannadnasreldin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a
            ref={(el) => (iconsRef.current[1] = el)}
            href="https://www.facebook.com/mohannad.nasraldin/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-700"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a
            ref={(el) => (iconsRef.current[2] = el)}
            href="https://www.instagram.com/anim._.honda/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-700"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a
            ref={(el) => (iconsRef.current[3] = el)}
            href="https://www.linkedin.com/in/mohannad-nasreldin/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a
            ref={(el) => (iconsRef.current[4] = el)}
            href="https://wa.me/201287941698"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-500"
          >
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </a>
        </div>
        <a
          ref={buttonRef}
          href="mailto:mohannadnasr.20@gmail.com"
          className="inline-block bg-purple-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-purple-600"
        >
          Schedule a call
        </a>
      </div>
    </section>
  );
};

export default Contact;
