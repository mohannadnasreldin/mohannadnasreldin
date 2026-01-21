import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * A responsive image frame component that dynamically adjusts to perfectly fit each picture's dimensions
 * while maintaining perfect centering and consistent styling.
 *
 * @param {object} props - The component props.
 * @param {string} props.src - The image source URL.
 * @param {string} props.alt - The alt text for the image.
 * @param {string} [props.aspectRatio] - Optional. The aspect ratio of the image (e.g., "16/9", "4/3").
 *                                       If not provided, the component will calculate it dynamically.
 * @param {object} [props.rest] - Additional props to be spread on the root div element.
 */
const ResponsiveImageFrame = ({ src, alt, aspectRatio, ...props }) => {
  const [imageAspectRatio, setImageAspectRatio] = useState(aspectRatio);

  useEffect(() => {
    if (!aspectRatio) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageAspectRatio(`${img.width}/${img.height}`);
      };
    }
  }, [src, aspectRatio]);

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{ aspectRatio: imageAspectRatio }}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="object-contain w-full h-full"
      />
    </div>
  );
};

ResponsiveImageFrame.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  aspectRatio: PropTypes.string,
};

export default ResponsiveImageFrame;
