"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = React.memo(
  ({
    words,
    duration = 6000,
    className,
  }: {
    words: string[];
    duration?: number;
    className?: string;
  }) => {
    const [currentWord, setCurrentWord] = useState(words[0]);
    const [isAnimating, setIsAnimating] = useState(false);

    const startAnimation = useCallback(() => {
      setCurrentWord((prev) => words[(words.indexOf(prev) + 1) % words.length]);
      setIsAnimating(true);
    }, [words]);

    useEffect(() => {
      if (!isAnimating) {
        const timer = setTimeout(startAnimation, duration);
        return () => clearTimeout(timer);
      }
    }, [isAnimating, duration, startAnimation]);

    const containerVariants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.05,
        },
      },
      exit: {
        transition: {
          staggerChildren: 0.03,
          staggerDirection: -1,
        },
      },
    };

    const letterVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200,
        },
      },
      exit: {
        opacity: 0,
        y: -20,
        transition: {
          type: "tween",
          ease: "easeInOut",
          duration: 0.2,
        },
      },
    };

    return (
      <div className="relative overflow-hidden">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => setIsAnimating(false)}
        >
          <motion.div
            key={currentWord}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn("inline-block relative text-left px-2 py-2", className)}
          >
            {currentWord.split("").map((letter, index) => (
              <motion.span
                key={`${currentWord}-${index}`}
                variants={letterVariants}
                className="inline-block"
                style={{ display: "inline-block" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
);

FlipWords.displayName = "FlipWords";
