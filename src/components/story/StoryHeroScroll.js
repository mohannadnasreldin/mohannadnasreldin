import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFluidScroll } from "../../context/FluidScrollContext";

gsap.registerPlugin(ScrollTrigger);

/** Hero exit choreography — content and 3D drift apart as you scroll into the story. */
export const useStoryHeroScroll = (sectionRef, contentRef, sceneRef) => {
  const { skipMotion } = useFluidScroll();

  useEffect(() => {
    const section = sectionRef?.current;
    const content = contentRef?.current;
    const scene = sceneRef?.current;
    if (!section || !content || skipMotion) return undefined;

    const blobs = section.querySelectorAll("[data-hero-blob]");
    const strips = section.querySelector("[data-hero-strips]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.85,
      },
    });

    tl.fromTo(
      content,
      { y: 0, opacity: 1, scale: 1 },
      { y: -140, opacity: 0, scale: 0.92, ease: "none" },
      0
    );

    if (scene) {
      tl.fromTo(
        scene,
        { y: 0, x: 0, scale: 1, opacity: 1 },
        { y: 120, x: 60, scale: 1.15, opacity: 0.35, ease: "none" },
        0
      );
    }

    blobs.forEach((blob, i) => {
      tl.fromTo(
        blob,
        { y: 0 },
        { y: (i + 1) * -80, ease: "none" },
        0
      );
    });

    if (strips) {
      tl.fromTo(strips, { opacity: 0.45 }, { opacity: 0, ease: "none" }, 0.3);
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [sectionRef, contentRef, sceneRef, skipMotion]);
};

export default useStoryHeroScroll;
