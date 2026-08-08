import React from "react";
import PropTypes from "prop-types";
import {
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import GlassPanel from "./ui/GlassPanel";
import StoryHeading from "./story/StoryHeading";
import FluidSection from "./FluidSection";
import FluidReveal from "./FluidReveal";

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

const Contact = ({ id = "contact" }) => {
  return (
    <FluidSection id={id} labelledBy="contact-heading" drift={18}>
      <StoryHeading
        id="contact-heading"
        chapter={6}
        chapterLabel="Finale"
        title="Contact"
        subtitle="Let's work together."
      />

      <FluidReveal y={48} scaleFrom={0.9} scrub={0.8}>
        <GlassPanel
          strong
          className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl px-6 py-12 text-center sm:px-10"
        >
          <p className="max-w-md text-base text-ink-muted sm:text-lg">
            Have a product idea, systems challenge, or collaboration in mind?
            Reach out — I&apos;d love to hear about it.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${label}`}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-glass-border bg-glass-bg text-ink-muted transition-all duration-200 hover:border-accent/50 hover:text-accent hover:shadow-glow"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>

          <a
            href="mailto:mohannadnasr.20@gmail.com"
            className="glass-btn-primary mt-10"
          >
            Schedule a call
          </a>
        </GlassPanel>
      </FluidReveal>
    </FluidSection>
  );
};

Contact.propTypes = {
  id: PropTypes.string,
};

export default Contact;
