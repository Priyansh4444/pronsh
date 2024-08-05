import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div className="scroll-container">
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 50, transition: { duration: 1 } },
        }}
        className="scroll-content"
      >
        <h1>Sticky Content</h1>
        <p>This content stays in place for a duration of the scroll.</p>
      </motion.div>
    </div>
  );
};

export default ScrollSection;
