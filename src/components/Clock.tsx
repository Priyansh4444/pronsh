import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useViewportScroll } from "framer-motion";

const Clock = ({ isRainbow, setRainbow }: { isRainbow: boolean; setRainbow: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { scrollYProgress } = useViewportScroll();
  const [scrollX1, setX1] = useState(50);
  const [scrollY1, setY1] = useState(50);
  const [scrollX2, setX2] = useState(95);
  const [scrollY2, setY2] = useState(50);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    scrollYProgress.onChange((latest) => {
      const newRotation = latest * 360;
      setRotation(newRotation);

      const newX2 = Math.cos(newRotation * (Math.PI / 180)) * 45 + 50;
      const newY2 = Math.sin(newRotation * (Math.PI / 180)) * 45 + 50;

      setX2(newX2);
      setY2(newY2);
    });
  }, [scrollYProgress]);

  return (
    <button className="navbar-icon -rotate-90" onClick={() => { setRainbow(!isRainbow) }}>
      <motion.svg
        id="clock"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="25"
        height="25"
        className="stroke-gray-600 hover:stroke-gray-50 duration-500"
      >
        <circle cx="50" cy="50" r="45" strokeWidth="8" fill="none" />
        <motion.line
          id="hand"
          x1={scrollX1}
          y1={scrollY1}
          x2={scrollX2}
          y2={scrollY2}
          strokeWidth="8"
          animate={{
            x2: scrollX2,
            y2: scrollY2
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 5
          }}
        />
      </motion.svg>
    </button>
  );
};

export default Clock;
