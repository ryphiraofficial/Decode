import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './css/About.css';

const About = () => {
  const containerRef = useRef(null);

  // We track the scroll relative to the 300vh container.
  // The "end start" ensures it stays sticky until the bottom of the container hits the top of the viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div id="about" className="about-container">
      {/* Increased height to 300vh to give enough room for the full reveal before moving */}
      <section ref={containerRef} className="about-reveal-section">
        <div className="about-sticky-wrapper">
          <h1 className="about-headline">
            <RevealText
              progress={scrollYProgress}
              text="Architecting digital resilience through bespoke engineering and visionary design for future-forward brands."
            />
          </h1>
        </div>
      </section>

    </div>
  );
};

const RevealText = ({ progress, text }) => {
  const words = text.split(" ");
  return (
    <span className="reveal-text-container">
      {words.map((word, i) => {
        // We finish the reveal at 0.6 progress, leaving 0.4 buffer
        const start = (i / words.length) * 0.6;
        const end = start + (0.1); // Add a small overlap/duration for each word
        return <Word key={i} range={[start, end]} progress={progress}>{word}</Word>;
      })}
    </span>
  );
};

const Word = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ["#444444", "#ffffff"]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="reveal-word"
    >
      {children}
    </motion.span>
  );
};

export default About;