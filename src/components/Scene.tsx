"use client";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, TiltShift2 } from "@react-three/postprocessing";
import React from "react";
import { Rainbow } from "./Rainbow";
import { useState } from "react";

function Scene({
  isRainbow,
  setRainbow,
}: {
  isRainbow: boolean;
  setRainbow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [dpr, setDpr] = useState(0.3);

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
        onIncline={() => {
          setDpr(0.7);
        }}
        onDecline={() => {
          setDpr(0.1);
        }}
      />
      <Rainbow isRainbow={isRainbow} />
      {/* <EffectComposer>
        <Bloom
          mipmapBlur
          levels={3}
          opacity={0.25}
          intensity={0.5}
          luminanceThreshold={0.31}
          luminanceSmoothing={0.71}
        />
      </EffectComposer> */}
    </Canvas>
  );
}

export default React.memo(Scene);
