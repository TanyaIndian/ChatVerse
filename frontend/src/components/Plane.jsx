import React, { forwardRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export const Plane = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/paper_airplane.glb");

  useEffect(() => {
    if (materials["Scene_-_Root"]) {
      materials["Scene_-_Root"].transparent = true;
      materials["Scene_-_Root"].opacity = 0; // initially invisible
    }
  }, [materials]);
  return (
    <group scale={[2.5, 2.5, 2.5]} {...props} dispose={null}>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials["Scene_-_Root"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
});

useGLTF.preload("/paper_airplane.glb");
