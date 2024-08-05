"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import AboutMe from "@/components/AboutMe";
import MyProjects from "@/components/MyProjects";
import { TextParallaxContentCollaborate } from "@/components/TextParallaxContent";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Inter } from "next/font/google";
import { FlipWords } from "@/components/ui/flip-words";
import ScrollSection from "@/components/VerticalScroll";
import Intro from "@/components/Preloader";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
const inter = Inter({
  subsets: ["latin"],
  style: ["normal"],
});

const words = ["Full Stack Development", "Artificial Intelligence", "Machine Learning", "Backend Development", "Deep Learning", "Coding"];

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
});
const blurStyle = {
  backdropFilter: "blur(30px)", // Blur effect for the glass-like effect
  WebkitBackdropFilter: "blur(20px)", // For Safari browser support
};
export default function Home() {
  const [isRainbow, setIsRainbow] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,  // Adjust duration for smoother scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // Custom easing function
      smoothWheel: true,  // Enable smooth scrolling for wheel events
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  React.useEffect(() => {
    const timeOut = setTimeout(() => {
      setLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 2000);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <main className="flex flex-col h-full w-full transform-gpu">
      <Navbar isRainbow={isRainbow} setRainbow={setIsRainbow} />
      <AnimatePresence mode="wait">{loading && <Intro />}</AnimatePresence>
      <div className="relative h-[100vh] w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Scene isRainbow={isRainbow} setRainbow={setIsRainbow} />
        </Suspense>
        <div
          className="absolute bottom-[-5px] left-0 w-full h-8 z-50 opacity-40"
          style={blurStyle}
        ></div>

        {/* Hero Section */}
        <section className={"absolute top-0 left-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-75 text-white w-full h-full " + inter.className}>
          <Badge className="flex bg-transparent items-center space-x-2 mb-4 border border-white">
            <span className="relative mt-1">
              <span className="absolute inline-block w-3 h-3 animate-ping opacity-75 bg-green-500 rounded-full"></span>
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
            </span>
            <span className="text-sm font-medium text-white">Available for work!</span>
          </Badge>
          <h1 className="max-w-7xl text-4xl font-bold md:text-5xl lg:text-6xl">
            Hi I&apos;m a developer interested in <br /> <FlipWords className="text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-pink-600" words={words}></FlipWords> <br /> converting problems into solutions.
          </h1>
          <p className="mt-5 max-w-prose text-muted-foreground sm:text-lg">
            Who has an obsession with latest tech, projects and suprisingly research.
          </p>
        </section>
      </div>
      {/* <ScrollSection /> */}
      <div className="mt-32">
        <MyProjects />
      </div>
      <div className="flex-1 w-full container mx-auto">
        <AboutMe />
      </div>

      <TextParallaxContentCollaborate />
    </main>
  );
}
// pages/index.js

// My Projects, {Resume, Contact Me}
// Blog coming soon
// Sound Effect on hovering on buttons
// Random Fact generator
// Adding the bird animation thingy
