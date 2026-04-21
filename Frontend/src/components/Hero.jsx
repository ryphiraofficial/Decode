import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './css/Hero.css';

const Hero = () => {
  // Refs for manual RAF-based parallax updates
  const bgTextRef = useRef(null);
  const videoRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const mobilePortraitRef = useRef(null);
  const heroOverlayRef = useRef(null);

  useEffect(() => {
    let rafId;

    const updateParallax = () => {
      // Get current scroll from our global Lenis instance
      const scroll = window.lenis?.scroll || 0;

      // Calculate transformations
      // Background text moves slowly (-150px at 1000px scroll)
      const yBg = (scroll / 1000) * -150;
      const scaleBg = 1 + (scroll / 1000) * 0.2;

      // Video moves faster (-50px at 800px scroll)
      const yVideo = (scroll / 800) * -50;

      // Foreground content (-100px at 800px scroll)
      const yFore = (scroll / 800) * -100;

      // Apply to DOM directly (GPU-based via transform)
      if (bgTextRef.current) {
        bgTextRef.current.style.transform = `translate3d(0, ${yBg}px, 0) scale(${scaleBg})`;
      }
      if (videoRef.current) {
        videoRef.current.style.transform = `translate3d(0, ${yVideo}px, 0)`;
      }
      if (leftContentRef.current) {
        leftContentRef.current.style.transform = `translate3d(0, ${yFore}px, 0)`;
      }
      if (rightContentRef.current) {
        rightContentRef.current.style.transform = `translate3d(0, ${yFore}px, 0)`;
      }
      if (mobilePortraitRef.current) {
        mobilePortraitRef.current.style.transform = `translate3d(0, ${yFore}px, 0)`;
      }

      // Fade-to-black overlay (0 at top, full black by 600px scroll)
      if (heroOverlayRef.current) {
        const fadeOpacity = Math.min(scroll / 600, 1);
        heroOverlayRef.current.style.opacity = fadeOpacity;
      }

      rafId = requestAnimationFrame(updateParallax);
    };

    updateParallax();

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section id="home" className="hero-section">
      {/* Fade-to-black overlay for cinematic exit */}
      <div className="hero-fade-overlay" ref={heroOverlayRef} />
      {/* Huge Background Text - DECOODE */}
      <div className="hero-bg-text-container" ref={bgTextRef}>
        <h1 className="hero-bg-text">
          DCOODE
        </h1>
      </div>

      {/* Center Video Component */}
      <div className="hero-image-container" ref={videoRef}>
        <motion.video
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hero-image"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/animate1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>

        {/* Floating Bubble Stats */}
        <motion.div
          animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="hero-stat-bubble bubble-1"
        >
          <div className="bubble-lab">Hands-on</div>
          <div className="bubble-val">Learning</div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="hero-stat-bubble bubble-2"
        >
          <div className="bubble-lab">Production Level</div>
          <div className="bubble-val">Coding</div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="hero-stat-bubble bubble-3"
        >
          <div className="bubble-val">Live Project</div>
          <div className="bubble-lab">Experience</div>
        </motion.div>

        {/* Black Smoke at Bottom */}
        <div className="hero-smoke" />
      </div>

      {/* Foreground Content Layout */}
      <div className="container hero-content-layout">
        <div className="hero-left-content" ref={leftContentRef}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className="hero-subtitle">
              Decoode specializes in building elite workforces and
            </span>
            <h2 className="hero-title">
              Engineering <br />
              <span className="hero-title-highlight">The Future.</span>
            </h2>
            <p className="hero-description">
              We provide <span className="hero-highlight">industry-standard training</span> and <span className="hero-highlight">hands-on experience</span> to bridge the gap between academic learning and high-end tech execution.
            </p>
            <div className="hero-btn-group">
              <Link to="/all-courses" className="btn-primary hero-btn-outline">
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Dedicated Mobile Portrait */}
        <div className="hero-mobile-portrait-wrapper" ref={mobilePortraitRef}>
          <motion.img 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            src="/Techy.png" 
            alt="Decoode Mobile" 
            className="hero-mobile-portrait" 
          />
        </div>

        <div className="hero-right-content" ref={rightContentRef}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <h3 className="hero-academy-title">
              <span className="hero-academy-highlight">Software</span> Academy
            </h3>
            <p className="hero-academy-text">
              Immersive internship tracks and scalable IT architectural implementations for industrial software.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
