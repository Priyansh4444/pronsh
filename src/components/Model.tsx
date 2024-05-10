// @ts-nocheck
import React, { useRef } from "react";
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'

export default function Model() {
  const { nodes } = useGLTF("torrus.glb");
  const { viewport } = useThree();
  const light  = useRef(null);
  const torus = useRef(null);
  const light_texture = useLoader(TextureLoader, 'light_line.png')
  useFrame((  ) => {
    torus.current.rotation.z += 0.01;
    torus.current.rotation.x += 0.01;
  });
  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },

    roughness: { value: 0, min: 0, max: 1, step: 0.1 },

    transmission: { value: 1, min: 0, max: 1, step: 0.1 },

    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },

    chromaticAberration: { value: 0.02, min: 0, max: 1 },

    backside: { value: true },
  });

  return (
    <group scale={viewport.width / 3}>
      <Text
        font="https://cdn.jsdelivr.net/fontsource/fonts/comfortaa@latest/latin-400-normal.ttf"
        position={[0, 0, -1]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Hello, I am Pronsh
      </Text>

      <mesh ref={torus} {...nodes.Torus002}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>

      {/* This is going to be our light! */}
      <instancedMesh ref={light} args={[null, null, 1]} instanceMatrix-usage={THREE.DynamicDrawUsage}>
        <planeGeometry />
        <meshBasicMaterial
          map={light_texture}
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={true}
          toneMapped={true}
        />
      </instancedMesh>

    </group>
  );
}
