"use client";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import React from "react";
import { Rainbow } from "./Rainbow";
import { useState } from "react";

function Scene({ isRainbow, setRainbow }: { isRainbow: boolean; setRainbow: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [dpr, setDpr] = useState(1);
  const [tooLaggy, setTooLaggy] = useState(false);

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
        onDecline={() => {
          setDpr(0.7);
          setTooLaggy(true);
        }}
      />
      <color attach="background" args={["black"]} />
      <Rainbow isRainbow={isRainbow} />
      {!tooLaggy &&
        <EffectComposer resolutionScale={0.01}>
          <Bloom mipmapBlur levels={3} opacity={0.25} intensity={0.5} luminanceThreshold={0.31} luminanceSmoothing={0.71} />
        </EffectComposer>
        }
    </Canvas>
  );
}

export default Scene;
