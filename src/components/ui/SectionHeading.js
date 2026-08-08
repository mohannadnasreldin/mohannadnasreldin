import React from "react";
import PropTypes from "prop-types";
import { motion, useReducedMotion } from "framer-motion";

const SectionHeading = ({ title, subtitle, align = "center", id }) => {
  const reduce = useReducedMotion();
  const alignCls =
    align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <motion.div
      className={`mb-14 flex flex-col gap-3 ${alignCls}`}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2
        id={id}
        className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-xl text-base text-ink-muted sm:text-lg">{subtitle}</p>
      ) : null}
      <span
        className="mt-1 h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent"
        aria-hidden="true"
      />
    </motion.div>
  );
};

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  align: PropTypes.oneOf(["center", "left"]),
  id: PropTypes.string,
};

export default SectionHeading;
