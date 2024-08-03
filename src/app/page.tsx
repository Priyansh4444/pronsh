"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import AboutMe from "@/components/AboutMe";
import MyProjects from "@/components/MyProjects";
import { TextParallaxContentCollaborate } from "@/components/TextParallaxContent";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
});
const blurStyle = {
  backdropFilter: "blur(30px)", // Blur effect for the glass-like effect
  WebkitBackdropFilter: "blur(20px)", // For Safari browser support
};
export default function Home() {
  return (
    <main className="flex flex-col h-full w-full">
      <div className="relative transform-gpu h-[100vh] w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Scene />
        </Suspense>
        <div
          className="absolute bottom-[-5px] left-0 w-full h-8 z-50 opacity-40"
          style={blurStyle}
        ></div>
      </div>
      <div className="flex-1 w-full container my-32 mx-auto">
        <AboutMe />
      </div>
      <MyProjects />
      <TextParallaxContentCollaborate />
    </main>
  );
}
// pages/index.js

// My Projects, {Resume, Contact Me}
// Blog coming soon
// Sound Effect on hovering on buttons
// Random Fact generator
