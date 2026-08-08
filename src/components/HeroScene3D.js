import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Full-bleed animated 3D hero scene: glass torus knot, orbiting orbs, particle field.
 * Desktop-only; paused when off-screen or the tab is hidden.
 */
const HeroScene3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const dprCap = 1.25;
    const renderer = new THREE.WebGLRenderer({
      antialias: window.devicePixelRatio < 1.25,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 5.2);

    scene.add(new THREE.AmbientLight(0x9ad4ff, 0.7));

    const key = new THREE.DirectionalLight(0xffffff, 1.25);
    key.position.set(4, 5, 3);
    scene.add(key);

    const fill = new THREE.PointLight(0x38bdf8, 2.6, 18);
    fill.position.set(-3, 1, 2);
    scene.add(fill);

    const rim = new THREE.PointLight(0x67e8f9, 1.8, 14);
    rim.position.set(2, -2, -3);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xb8ecff,
      metalness: 0.85,
      roughness: 0.18,
      transparent: true,
      opacity: 0.78,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.18,
      side: THREE.DoubleSide,
    });

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.85, 0.28, 128, 16),
      glassMat
    );
    knot.position.set(1.35, 0.1, 0);
    group.add(knot);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 1),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      })
    );
    wire.position.copy(knot.position);
    group.add(wire);

    const orbGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const orbs = [-1.1, 0, 1.1].map((offset, i) => {
      const mat = new THREE.MeshStandardMaterial({
        color: i === 1 ? 0x7dd3fc : 0x22d3ee,
        metalness: 0.7,
        roughness: 0.2,
        transparent: true,
        opacity: 0.88,
        emissive: 0x0284c7,
        emissiveIntensity: 0.22,
      });
      const mesh = new THREE.Mesh(orbGeo, mat);
      mesh.userData = { offset, speed: 0.4 + i * 0.15, radius: 1.8 + i * 0.15 };
      group.add(mesh);
      return mesh;
    });

    const particleCount = 64;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        color: 0x7dd3fc,
        size: 0.025,
        transparent: true,
        opacity: 0.65,
        sizeAttenuation: true,
      })
    );
    scene.add(particles);

    const target = { x: 0, y: 0 };
    const onPointer = (e) => {
      const rect = mount.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    mount.addEventListener("pointermove", onPointer, { passive: true });

    let raf;
    let visible = true;
    const clock = new THREE.Clock();

    const render = () => {
      if (!visible || document.hidden) return;

      const t = clock.getElapsedTime();

      if (!reduce) {
        knot.rotation.x = t * 0.25;
        knot.rotation.y = t * 0.35;
        wire.rotation.x = -t * 0.15;
        wire.rotation.y = t * 0.2;

        orbs.forEach((orb) => {
          const { offset, speed, radius } = orb.userData;
          orb.position.x =
            Math.cos(t * speed + offset) * radius + knot.position.x * 0.2;
          orb.position.y = Math.sin(t * speed * 1.3 + offset) * 0.7;
          orb.position.z = Math.sin(t * speed + offset) * radius * 0.45;
        });

        particles.rotation.y = t * 0.03;

        group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, target.x * 0.35, 0.05);
        group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -target.y * 0.2, 0.05);
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.x * 0.4, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.2 - target.y * 0.25, 0.04);
        camera.lookAt(0.6, 0, 0);
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (document.hidden || !visible) return;
      cancelAnimationFrame(raf);
      clock.getDelta();
      raf = requestAnimationFrame(render);
    };

    const stopLoop = () => {
      cancelAnimationFrame(raf);
    };

    startLoop();

    const onResize = () => {
      if (!mount) return;
      const { clientWidth, clientHeight } = mount;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              visible = Boolean(entry?.isIntersecting);
              if (visible) startLoop();
              else stopLoop();
            },
            { threshold: 0.05 }
          )
        : null;
    io?.observe(mount);

    return () => {
      stopLoop();
      io?.disconnect();
      mount.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      particleGeo.dispose();
      particles.material.dispose();
      knot.geometry.dispose();
      glassMat.dispose();
      wire.geometry.dispose();
      wire.material.dispose();
      orbGeo.dispose();
      orbs.forEach((o) => o.material.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
};

export default HeroScene3D;
