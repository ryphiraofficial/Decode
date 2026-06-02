import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import './css/ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to absolute top — kill ScrollTrigger pins first so nothing blocks it
  const scrollToTop = () => {
    // Disable all GSAP ScrollTrigger instances so pinned sections don't trap the scroll
    const ScrollTrigger = window.ScrollTrigger;
    if (ScrollTrigger) {
      ScrollTrigger.getAll().forEach(st => st.disable(false));
    }

    // Force instant jump to the very top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Re-enable ScrollTrigger after the scroll has landed
    if (ScrollTrigger) {
      requestAnimationFrame(() => {
        ScrollTrigger.getAll().forEach(st => st.enable());
        ScrollTrigger.refresh();
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={24} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
