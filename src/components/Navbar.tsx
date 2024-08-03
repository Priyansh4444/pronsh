"use client";
import { GithubIcon, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/legacy/image";
import React, { useState, useEffect, useRef } from "react";
const navbarStyle = {
  backdropFilter: "blur(20px)", // Blur effect for the glass-like effect
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft box shadow for depth
  WebkitBackdropFilter: "blur(10px)", // For Safari browser support
  borderBottom: "1px solid rgba(255, 255, 255, 0.03)", // Slight border for glossy effect
};
import { useScramble } from "use-scramble";
import Clock from "./Clock";

export default function Navbar({ isRainbow, setRainbow }: { isRainbow: boolean; setRainbow: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [isVisible, setIsVisible] = useState(true);
  const { ref, replay } = useScramble({
    text: "Pronsh",
    speed: 1,
    tick: 1,
    overflow: true,
    scramble: 5,
  });
  const [lastScrollY, setLastScrollY] = useState(0);
  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      // Scroll down and scrolled more than 100px
      setIsVisible(true);
    } else {
      // Scroll up
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <header
      className={`fixed z-50 top-0 left-0 w-full px-4 py-3 shadow-lg md:px-6 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={navbarStyle}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link
          className="flex items-center gap-2 text-lg font-semibold text-gray-50"
          href="https://github.com/Priyansh4444"
        >
          <Image
            src="/pronsh.jpeg"
            width={40}
            height={40}
            className="rounded-full mx-5"
            alt="Profile Picture"
          />
          <span ref={ref} onMouseOver={replay}></span>
        </Link>
        <nav className="hidden space-x-4 md:flex">
          <Clock isRainbow={isRainbow} setRainbow={setRainbow}/>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-50 duration-500"
            href="https://github.com/Priyansh4444"
          >
            <GithubIcon />
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-50 duration-500"
            href="https://www.linkedin.com/in/priyansh-shah-569b3b224/"
          >
            <Linkedin />
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-50 duration-500"
            href="mailto:Priyanshpokemon@gmail.com"
          >
            <Mail />
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-50 duration-500"
            href="https://devpost.com/Priyansh4444"
          >
            <svg
              width="26"
              height="20"
              viewBox="0 0 36 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                id="Vector"
                d="M9.42388 0L0.75882 15.0058L9.42388 30H26.7425L35.4075 15.0058L26.7425 0H9.42388ZM11.7237 5.89605H17.422C22.6265 5.89605 26.4826 8.34312 26.4826 15.0058C26.4826 21.41 21.8483 24.1039 17.1621 24.1039H11.7237V5.89605ZM15.3575 9.43166V20.5683H17.1491C20.9691 20.5683 22.7247 18.3306 22.7247 14.9942C22.7376 11.2854 21.1424 9.43166 17.2863 9.43166H15.3575Z"
                fill="currentColor" // Use currentColor to ensure it inherits the text color
              />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}
