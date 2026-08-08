import { useEffect, useState } from "react";

const LITE_QUERIES = [
  "(max-width: 1023px)",
  "(hover: none)",
  "(pointer: coarse)",
  "(prefers-reduced-motion: reduce)",
];

const matches = (query) =>
  typeof window !== "undefined" &&
  Boolean(window.matchMedia?.(query)?.matches);

const getConnection = () => {
  if (typeof navigator === "undefined") return undefined;
  return (
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection
  );
};

/**
 * True on phones, tablets, low-end hardware, Save-Data, or reduced motion.
 * Used to skip WebGL, Lenis, backdrop-filter, and scrubbed GSAP.
 */
export const detectLiteExperience = () => {
  if (typeof window === "undefined") return true;

  if (matches("(prefers-reduced-motion: reduce)")) return true;

  const connection = getConnection();
  if (connection?.saveData) return true;
  if (["slow-2g", "2g"].includes(connection?.effectiveType)) return true;

  if (matches("(max-width: 1023px)")) return true;
  if (matches("(hover: none)") || matches("(pointer: coarse)")) return true;

  if (typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 2) {
    return true;
  }

  return false;
};

export const useLiteExperience = () => {
  const [liteMode, setLiteMode] = useState(detectLiteExperience);

  useEffect(() => {
    const sync = () => setLiteMode(detectLiteExperience());
    const medias = LITE_QUERIES.map((query) => window.matchMedia?.(query)).filter(
      Boolean
    );
    const connection = getConnection();

    medias.forEach((media) => media.addEventListener?.("change", sync));
    window.addEventListener("resize", sync, { passive: true });
    connection?.addEventListener?.("change", sync);

    return () => {
      medias.forEach((media) => media.removeEventListener?.("change", sync));
      window.removeEventListener("resize", sync);
      connection?.removeEventListener?.("change", sync);
    };
  }, []);

  return liteMode;
};
