import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './css/Navbar.css';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = (e, target) => {
    e.preventDefault();
    
    // If it's a relative page route (not a hash)
    if (target.startsWith('/') && !target.includes('#')) {
      navigate(target);
      window.scrollTo(0, 0);
      return;
    }

    // Handle hash scrolling
    const targetId = target.startsWith('#') ? target : target.split('#')[1] ? `#${target.split('#')[1]}` : null;
    if (!targetId) return;

    const performScroll = (id) => {
      const el = document.querySelector(id);
      if (el) {
        if (window.lenis) {
          window.lenis.scrollTo(id, { duration: 1.5 });
        } else {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => performScroll(targetId), 600);
    } else {
      performScroll(targetId);
    }
  };

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Academy', href: '/all-courses' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
    { name: 'Projects', href: '#projects' }
  ];

  return (
    <motion.nav
      initial={{ y: -100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="navbar"
    >
      <Link to="/" className="navbar-brand-wrapper" onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none' }}>
        <Logo scale={1} />
      </Link>

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
