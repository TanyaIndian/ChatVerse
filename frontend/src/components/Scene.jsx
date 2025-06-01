import React, { useRef, useEffect } from "react";
// import {useframe} from '@react-three/fiber'
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Plane } from "./Plane";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const Scene = ({ planeRef, flyPlane }) => {
  useEffect(() => {
    const plane = planeRef?.current;
    if (flyPlane && plane) {
      gsap.set(plane.position, { x: 3.5, y: -2, z: 0 });
      gsap.set(plane.rotation, { x: Math.PI / 2, y: 0, z: 0 });
      gsap.set(plane.material, { opacity: 1, transparent: true });

      const tl = gsap.timeline();

      // ✈️ Main flight path
      tl.to(
        plane.position,
        {
          duration: 6,
          motionPath: {
            path: [
              { x: 3.5, y: -2 },
              { x: 2.2, y: -0.5 },
              { x: 0, y: 0.7 },
              { x: -1.5, y: 0.3 },
              { x: -3, y: -1.5 },
            ],
            curviness: 1.5,
            autoRotate: false,
          },
          ease: "power1.inOut",
        },
        0
      );

      // ✨ Enhanced 3D tilt in the middle of the arc
      tl.to(
        plane.rotation,
        {
          duration: 2.5,
          y: Math.PI / 2, // Nose points left
          x: Math.PI / 2.2, // Nose tips down a bit
          z: -Math.PI / 3.5, // Strong banking (left wing dips)
          ease: "sine.inOut",
        },
        1.8
      ); // Start this during the arc

      // 🎯 Recover slowly
      tl.to(
        plane.rotation,
        {
          duration: 1.5,
          y: Math.PI / 2,
          z: -Math.PI / 8,
          ease: "sine.out",
        },
        4.2
      ); // Recover late in the path

      // ✨ Wobble for flutter
      gsap.to(plane.rotation, {
        z: "-=0.2",
        repeat: 10,
        yoyo: true,
        duration: 0.4,
        ease: "sine.inOut",
      });

      // 🎐 Slight flutter in z-depth
      gsap.to(plane.position, {
        z: 0.4,
        duration: 0.3,
        repeat: 10,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 🌫️ Fade out at the end
      tl.to(plane.material, {
        duration: 0.8,
        opacity: 0,
        delay: 5.2,
        onComplete: () => {
          gsap.set(plane.position, { x: 3.5, y: -2, z: 0 });
          gsap.set(plane.rotation, { x: Math.PI / 2, y: 0, z: 0 });
        },
      });
    }
  }, [flyPlane, planeRef]);

  return (
    <>
      <OrbitControls />
      <PerspectiveCamera
        fov={45}
        near={0.1}
        far={10000}
        makeDefault
        position={[0, 0, 10]}
      />
      <Environment preset="city" />
      <Plane ref={planeRef} />
      {/* <axesHelper args={[500]}/> */}
    </>
  );
};

export default Scene;
