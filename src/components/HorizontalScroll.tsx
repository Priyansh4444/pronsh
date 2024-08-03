"use client";
// components/HorizontalScroll.js
import {
  motion,
  useViewportScroll,
  useTransform,
  useScroll,
} from "framer-motion";
import React, { useRef, useEffect, useState, ReactNode } from "react";

export const HorizontalScroll = ({ children }: { children: ReactNode }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], ["3%", "-72%"]);
  return (
    <section ref={targetRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen overflow-hidden items-center">
        <motion.div style={{ x }} className="flex gap-4 overflow-x-visible">
          {children}
        </motion.div>
      </div>
    </section>
  );
};
