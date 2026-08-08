import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFluidScroll } from "../context/FluidScrollContext";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fixed ambient layers that drift with scroll — keeps the page feeling
 * like one continuous space instead of stacked section blocks.
 */
const FluidBackdrop = () => {
  const rootRef = useRef(null);
  const { reducedMotion } = useFluidScroll();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return undefined;

    const layers = root.querySelectorAll("[data-parallax]");
    const tweens = [];

    layers.forEach((layer) => {
      const speed = Number(layer.getAttribute("data-parallax")) || 8;
      const tween = gsap.to(layer, {
        yPercent: speed,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });
      tweens.push(tween);
    });

    const veil = root.querySelector("[data-veil]");
    if (veil) {
      tweens.push(
        gsap.to(veil, {
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        })
      );
    }

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-surface-deep" />

      <div
        data-parallax="-12"
        className="absolute -left-[20%] top-[-10%] h-[55vh] w-[55vw] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(3,103,254,0.45) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        data-parallax="18"
        className="absolute -right-[15%] top-[20%] h-[50vh] w-[50vw] rounded-full opacity-45"
        style={{
          background:
            "radial-gradient(circle, rgba(10,29,203,0.4) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        data-parallax="-22"
        className="absolute bottom-[-5%] left-[25%] h-[45vh] w-[45vw] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.35) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        data-parallax="10"
        className="absolute left-[40%] top-[55%] h-[35vh] w-[35vw] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(103,232,249,0.28) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div
        data-veil
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(5,7,15,0.35) 45%, rgba(5,7,15,0.65) 100%)",
        }}
      />
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
};

export default FluidBackdrop;
