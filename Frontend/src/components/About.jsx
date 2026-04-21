import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './css/About.css';
import Logo from './Logo';

// Animated counter that counts up from 0 when scrolled into view
const CountUp = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic for a satisfying deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container" style={{ position: 'relative' }}>
        <div className="about-grid">

          {/* Left: Person with Floating Stats (Decoode style) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-left"
          >
            {/* Background Shape */}
            <div className="about-bg-shape" />

            {/* Portrait Image in Shape Mask */}
            <div className="about-image-wrapper">
              <img
                src="/Techyguy.png"
                alt="Decoode Founder"
                className="about-image"
              />
            </div>

            {/* Floating Stats Circles (Decoode style) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="stat-circle-1"
            >
              <div className="stat-val-1"><CountUp target={100} suffix="+" /></div>
              <div className="stat-label-1">Graduated</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="stat-circle-2"
            >
              <div className="stat-val-2"><CountUp target={12} suffix="+" /></div>
              <div className="stat-label-2">Production Apps</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="stat-circle-3"
            >
              <div className="stat-val-3">Elite</div>
              <div className="stat-label-3">Support</div>
            </motion.div>
          </motion.div>

          {/* Right: Text Content (Decoode style) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="about-right"
          >
            <span className="about-right-subtitle">Let Me Introduce Us</span>
            <h2 className="about-right-title">
              About <Logo />
            </h2>
            <h3 className="about-right-heading">Bridging the gap between theory and industry</h3>
            <p className="about-right-desc">
              Decoode was founded with a single mission: to provide the next generation of engineers with
              real-world, industrial-grade technical experience. We combine elite software agency output
              with a specialized internship ecosystem.
            </p>

            <div className="about-track-box">
              <div>
                <div className="track-col-1-title">INTERNSHIPS</div>
                <div className="track-col-1-desc">1, 3, AND 6 MONTH TRACKS</div>
              </div>
              <div>
                <div className="track-col-2-title">SERVICES</div>
                <div className="track-col-2-desc">ENTERPRISE APP SOLUTIONS</div>
              </div>
            </div>

            <div className="about-btn-group">
              <button className="btn-primary about-btn-1">JOIN ACADEMY</button>
              <button className="btn-outline about-btn-2">BOOK SERVICES</button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
