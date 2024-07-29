"use client";
import { GithubIcon, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import React, { useState, useEffect } from "react";
const navbarStyle = {
  backdropFilter: "blur(20px)", // Blur effect for the glass-like effect
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft box shadow for depth
  WebkitBackdropFilter: "blur(10px)", // For Safari browser support
  borderBottom: "1px solid rgba(255, 255, 255, 0.03)", // Slight border for glossy effect
};


export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      // Scroll down and scrolled more than 100px
      setIsVisible(false);
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
  }, [lastScrollY]);

  return (
    <header
      className={`fixed z-50 top-0 left-0 w-full px-4 py-3 shadow-lg md:px-6 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      style={navbarStyle}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link className="flex items-center gap-2 text-lg font-semibold text-gray-50" href="https://github.com/Priyansh4444">
          <Image src="/pronsh.jpeg" width={40} height={40} className="rounded-full mx-5" alt="Profile Picture" />
          <span>Pronsh</span>
        </Link>
        <nav className="hidden space-x-4 md:flex">
          <Link className="text-sm font-medium text-gray-600 hover:text-gray-50 duration-500" href="https://github.com/Priyansh4444">
            <GithubIcon />
          </Link>
          <Link className="text-sm font-medium text-gray-600 hover:text-gray-50 duration-500" href="https://www.linkedin.com/in/priyansh-shah-569b3b224/">
            <Linkedin />
          </Link>
          <Link className="text-sm font-medium text-gray-600 hover:text-gray-50 duration-500" href="mailto:Priyanshpokemon@gmail.com">
            <Mail />
          </Link>
        </nav>
      </div>
    </header>
  );
}