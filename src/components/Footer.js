import React from "react";
import PropTypes from "prop-types";
import {
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { useFluidScroll } from "../context/FluidScrollContext";

const socials = [
  { href: "https://github.com/mohannadnasreldin", label: "GitHub", Icon: FaGithub },
  {
    href: "https://www.facebook.com/mohannad.nasraldin/",
    label: "Facebook",
    Icon: FaFacebook,
  },
  {
    href: "https://www.instagram.com/anim._.honda/",
    label: "Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://www.linkedin.com/in/mohannad-nasreldin/",
    label: "LinkedIn",
    Icon: FaLinkedin,
  },
  { href: "https://wa.me/201287941698", label: "WhatsApp", Icon: FaWhatsapp },
];

const Footer = ({ year = new Date().getFullYear() }) => {
  const { scrollTo } = useFluidScroll();

  return (
    <footer className="relative z-10 border-t border-glass-border/60 bg-transparent px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <p className="text-sm text-ink-muted">
          &copy; {year} Mohannad Nasreldin. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-ink-faint transition-colors hover:text-accent"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </a>
          ))}
        </div>
        <button
          type="button"
          className="text-sm text-ink-muted transition-colors hover:text-accent"
          onClick={() => scrollTo("contact")}
        >
          Contact
        </button>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  year: PropTypes.number,
};

export default Footer;
