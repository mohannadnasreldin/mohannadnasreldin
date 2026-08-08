import React from "react";
import PropTypes from "prop-types";

/**
 * Liquid-glass surface used for interactive content panels.
 */
const GlassPanel = ({
  as: Tag = "div",
  children,
  className = "",
  strong = false,
  hover = false,
  ...rest
}) => {
  const base = strong ? "glass-panel-strong" : "glass-panel";
  const hoverCls = hover
    ? "transition-all duration-300 ease-expo hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
    : "";

  return (
    <Tag className={`${base} ${hoverCls} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
};

GlassPanel.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  strong: PropTypes.bool,
  hover: PropTypes.bool,
};

export default GlassPanel;
