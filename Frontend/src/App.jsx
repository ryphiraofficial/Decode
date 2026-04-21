import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import Services from './components/Services';
import Team from './components/Team';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
// import Preloader from './components/Preloader';
// import Internships from './components/Internships';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

function App() {
  // const [showPreloader, setShowPreloader] = useState(true);
  // const [preloaderDone, setPreloaderDone] = useState(false);

  // After intro animation plays (~2.5s), start the exit
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowPreloader(false); // triggers AnimatePresence exit
  //   }, 2500);
  //   return () => clearTimeout(timer);
  // }, []);

  // Initialize Lenis only after preloader is fully gone
  // useEffect(() => {
  //   if (!preloaderDone) return;
  //
  //   const lenis = new Lenis({
  //     duration: 1.2,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //     smoothWheel: true,
  //     wheelMultiplier: 1,
  //     touchMultiplier: 2,
  //   });
  //
  //   window.lenis = lenis;
  //
  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }
  //
  //   requestAnimationFrame(raf);
  //
  //   return () => {
  //     lenis.destroy();
  //   };
  // }, [preloaderDone]);

  return (
    <div className="app">
      {/* <Preloader isVisible={showPreloader} onComplete={() => setPreloaderDone(true)} /> */}

      {/* Site content reveals with a smooth fade + subtle scale up */}
      {/* We trigger animation as soon as showPreloader is false (curtain starts sliding) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.3 // reveal starts slightly after curtain lift begins
        }}
        style={{
          pointerEvents: 'auto',
          transformOrigin: 'top center',
          width: '100%'
        }}
      >
        <div className="noise-overlay" />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Courses />
          <Services />
          {/* <Internships /> */}
          {/* <Team /> */}
          {/* <Projects /> */}
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}


export default App;
