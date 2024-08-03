"use client";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import React from "react";
import { Rainbow } from "./Rainbow";
import * as THREE from "three";
import { useState, useMemo } from "react";
import { Ring } from "./Ring";

function Scene() {
  const [dpr, setDpr] = useState(1.6);

  return (
    <Canvas
      dpr={dpr}
      performance={{ min: 0.5, max: 0.9 }}
      orthographic
      className="h-full w-full"
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 5] }}
    >
      <PerformanceMonitor
        onIncline={() => setDpr(2)}
        onDecline={() => setDpr(1)}
      />
      <color attach="background" args={["black"]} />
      <Rainbow />
      <Ring />
      {/* <EffectComposer resolutionScale={0.01}>
                <Bloom mipmapBlur levels={3} opacity={0.25} intensity={0.5} luminanceThreshold={0.31} luminanceSmoothing={0.71} />
            </EffectComposer> */}
    </Canvas>
  );
}

export default Scene;
