import React, { useState, useEffect } from "react";

const Clock = ({
  isRainbow,
  setRainbow,
}: {
  isRainbow: boolean;
  setRainbow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [rotation, setRotation] = useState(90);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the page we've scrolled
      const scrollPercentage =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      const newRotation = scrollPercentage * 360 + 90;
      setRotation(newRotation);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className="navbar-icon -rotate-90"
      onClick={() => {
        setRainbow(!isRainbow);
      }}
    >
      <svg
        id="clock"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="25"
        height="25"
        className="stroke-gray-600 hover:stroke-gray-50 duration-500"
      >
        {/* Clock face */}
        <circle cx="50" cy="50" r="45" strokeWidth="8" fill="none" />

        {/* Clock hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="5"
          strokeWidth="8"
          style={{
            transformOrigin: "50px 50px",
            transform: `rotate(${rotation}deg)`,
            transition: "transform 150ms ease-out",
          }}
        />
      </svg>
    </button>
  );
};

export default Clock;
