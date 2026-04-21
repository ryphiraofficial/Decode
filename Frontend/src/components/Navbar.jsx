import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './css/Navbar.css';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (e, targetId) => {
    e.preventDefault(); // Prevent default browser jump
    if (window.lenis) {
      window.lenis.scrollTo(targetId, {
        offset: 0, // No extra offset needed as Lenis handles it
        duration: 1.5, // Satisfyingly smooth length
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Sync with App.jsx scroll
      });
    }
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Academy', href: '#courses' },
    { name: 'Team', href: '#team' },
    { name: 'Projects', href: '#projects' }
  ];

  return (
    <motion.nav
      initial={{ y: -100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="navbar"
    >
      <div className="navbar-brand-wrapper">
        <Logo scale={1} />
      </div>

      {/* Desktop Links */}
      <div className="navbar-links">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="navbar-link"
            onClick={(e) => handleScroll(e, link.href)}
          >
            {link.name}
          </a>
        ))}
        <button className="btn-primary navbar-cta">GET STARTED</button>
      </div>

      {/* Mobile Burger Icon */}
      <div className="navbar-burger" onClick={() => setIsOpen(!isOpen)}>
        <motion.div 
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} 
          className="burger-line" 
        />
        <motion.div 
          animate={isOpen ? { rotate: -45, y: -6, width: '20px' } : { rotate: 0, y: 0, width: '14px' }} 
          className="burger-line" 
          style={{ marginLeft: 'auto' }}
        />
      </div>

      {/* Mobile Menu Backdrop & Links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="navbar-mobile-menu"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="navbar-mobile-link"
                onClick={(e) => {
                  setIsOpen(false);
                  handleScroll(e, link.href);
                }}
              >
                {link.name}
              </a>
            ))}
            <button className="btn-primary navbar-cta" style={{ width: '100%', marginTop: '10px' }}>GET STARTED</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
