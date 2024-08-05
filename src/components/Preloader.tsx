"use client";
import React from "react";
import { motion } from "framer-motion";
import { useScramble } from "use-scramble";
import styles from "./styles.module.scss";

const Intro = () => {
    const { ref } = useScramble({
        text: "Loading Website",
        scramble: 20,
    });
    return (
        <motion.div
            className={styles.intro}
            initial={{ y: 0 }}
            exit={{ y: "-100vh" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        >
            <div className={styles.container}>

            </div>
        </motion.div>
    );
};

export default Intro;