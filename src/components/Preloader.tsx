"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useScramble } from "use-scramble";
import styles from "./Intro.module.css"; // Assuming you have a CSS module for styling

const introStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
    width: "100vw",
    height: "100vh",
    backgroundColor: "black",
    overflow: "hidden",
};

const containerStyles: React.CSSProperties = {
    position: "fixed",
    gap: "3.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};

const Intro: React.FC = () => {
    const { ref } = useScramble({
        text: "Loading Website",
        scramble: 20,
    });

    return (
        <motion.div
            style={introStyles}
            initial={{ y: 0 }}
            exit={{ y: "-100vh" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        >
            <div style={containerStyles}>
                <div className="spinner-box">
                    <div className="configure-border-1">
                        <div className="configure-core"></div>
                    </div>
                    <div className="configure-border-2">
                        <div className="configure-core"></div>
                    </div>
                </div>

                <h1 ref={ref} style={{ color: "white" }}>Loading Website</h1>
            </div>
        </motion.div>
    );
};

export default Intro;
