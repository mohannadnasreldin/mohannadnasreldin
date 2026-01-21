import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Background3D = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1, 3);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(3, 3, 3);
    scene.add(light);

    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      roughness: 0.5,
      metalness: 0.2,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let raf;
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const target = { x: 0, y: 0 };
    const pointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      target.x = nx;
      target.y = ny;
    };
    mount.addEventListener("pointermove", pointerMove, { passive: true });

    const render = () => {
      controls.update();
      if (!reduce) {
        mesh.rotation.y += 0.003;
        mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, -target.y * 0.2, 0.06);
        mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, target.x * 0.2, 0.06);
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.x * 0.6, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, -target.y * 0.3, 0.05);
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else render();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      controls.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 -z-10" aria-hidden="true" />
  );
};

export default Background3D;
