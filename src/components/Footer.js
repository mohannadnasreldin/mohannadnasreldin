import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Magnetic } from "../ui";

/**
 * Footer component
 * @param {{ year?: number }} props
 */
const Footer = ({ year = new Date().getFullYear() }) => {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-bg/80 backdrop-blur-md py-16">
      <div className="container-max flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side: Copyright */}
        <div className="order-3 md:order-1">
          <p className="fluid-text-xs font-mono text-tertiary tracking-wider">
            &copy; {year} MOHANNAD NASRELDIN. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="order-1 md:order-2 flex flex-wrap justify-center gap-8 md:gap-12">
          {['Contact', 'Projects', 'About'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="mono-label text-tertiary hover:text-accent transition-colors duration-300"
              data-cursor="hover"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right Side: Social Icons */}
        <div className="order-2 md:order-3 flex items-center space-x-6">
          {[
            { icon: faGithub, href: "https://github.com/mohannadnasreldin", label: "GitHub" },
            { icon: faLinkedin, href: "https://www.linkedin.com/in/mohannad-nasreldin/", label: "LinkedIn" },
            { icon: faWhatsapp, href: "https://wa.me/201287941698", label: "WhatsApp" },
            { icon: faInstagram, href: "https://www.instagram.com/anim._.honda/", label: "Instagram" }
          ].map((social) => (
            <Magnetic key={social.label} strength={0.3}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tertiary hover:text-accent transition-all duration-300 hover:scale-110 block"
                aria-label={social.label}
                data-cursor="hover"
              >
                <FontAwesomeIcon icon={social.icon} className="text-xl" />
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
Footer.propTypes = {
  year: PropTypes.number,
};
