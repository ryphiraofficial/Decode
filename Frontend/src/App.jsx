import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import Hero from './homepage/Hero';
import About from './homepage/About';
import Services from './homepage/Services';
import OurStory from './homepage/OurStory';
import RevealBanner from './homepage/RevealBanner';
import CTA from './homepage/CTA';
import Footer from './shared/Footer';
import Team from './homepage/Team';
import Insights from './homepage/Insights';
// import Preloader from './components/Preloader';
// import Internships from './components/Internships';
import { useDynamicFavicon } from './hooks/useDynamicFavicon';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
// import Lenis from 'lenis';

function App() {
  useDynamicFavicon();

  return (
    <div className="app">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.3
        }}
        style={{
          pointerEvents: 'auto',
          transformOrigin: 'top center',
          width: '100%'
        }}
      >
        <div className="noise-overlay" />
        {/* Navbar and Footer are now handled globally by Layout.jsx */}
        <main>
          <Hero />
          <About />
          <Services />
          <RevealBanner />
          <Team />
          <Insights />
          <CTA />
        </main>
      </motion.div>
    </div>
  );
}


export default App;
