import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

/**
 * Contact section
 * @param {{ id?: string }} props
 */
const Contact = ({ id = "contact" }) => {
  return (
    <section
      id={id}
      className="py-24 px-6 bg-transparent relative z-10"
    >
      <div className="container-max text-center">
        <h2 className="fluid-text-4xl font-bold mb-6 text-primary">
          Contact
        </h2>
        <p className="mono-label mb-16">
          LET'S WORK TOGETHER
        </p>
        
        <div className="mb-16 flex justify-center space-x-8">
          {[
            { icon: faGithub, href: "https://github.com/mohannadnasreldin", label: "GitHub" },
            { icon: faFacebook, href: "https://www.facebook.com/mohannad.nasraldin/", label: "Facebook" },
            { icon: faInstagram, href: "https://www.instagram.com/anim._.honda/", label: "Instagram" },
            { icon: faLinkedin, href: "https://www.linkedin.com/in/mohannad-nasreldin/", label: "LinkedIn" },
            { icon: faWhatsapp, href: "https://wa.me/201287941698", label: "WhatsApp" }
          ].map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors duration-300"
              aria-label={social.label}
            >
              <FontAwesomeIcon icon={social.icon} size="2x" />
            </a>
          ))}
        </div>
        
        <a
          href="mailto:mohannadnasr.20@gmail.com"
          className="inline-flex items-center justify-center bg-accent text-white px-10 py-5 rounded-full font-bold fluid-text-lg hover:bg-accent-light transition-all shadow-xl shadow-accent/20"
        >
          Schedule a call
        </a>
      </div>
    </section>
  );
};

export default Contact;
Contact.propTypes = {
  id: PropTypes.string,
};
