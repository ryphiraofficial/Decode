import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './css/Navbar.css';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContracted, setIsContracted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // Track scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Disable contract / retract animations completely on mobile viewports
    if (window.innerWidth <= 768) {
      setIsContracted(false);
      return;
    }
    
    const previous = scrollY.getPrevious();

    // Scrolling DOWN → contract the navbar
    if (latest > previous && latest > 80) {
      setIsContracted(true);
    }
    // Scrolling UP → retract (expand) the navbar
    if (latest < previous) {
      setIsContracted(false);
    }
    // At the very top → fully expanded
    if (latest < 20) {
      setIsContracted(false);
    }
  });

  const handleScroll = (e, target) => {
    e.preventDefault();

    if (target.startsWith('/') && !target.includes('#')) {
      window.location.href = target;
      return;
    }

    const targetId = target.startsWith('#') ? target : target.split('#')[1] ? `#${target.split('#')[1]}` : null;
    if (!targetId) return;

    if (location.pathname !== '/') {
      window.location.href = '/' + targetId;
    } else {
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const isLinkActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    // Check if path starts with href to handle sub-pages beautifully
    return location.pathname.startsWith(href);
  };

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Programs', href: '/all-courses' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{
          y: 0,
          x: '-50%',
          opacity: 1,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`navbar ${isContracted ? 'navbar--contracted' : ''}`}
      >
        <a href="/" className="navbar-brand-wrapper" style={{ textDecoration: 'none' }}>
          <Logo scale={1} />
        </a>

        {/* Desktop Links — hidden when contracted */}
        <div className="navbar-links">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.href);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`navbar-link ${isActive ? 'active' : ''}`}
                onClick={(e) => handleScroll(e, link.href)}
              >
                {link.name}
              </a>
            );
          })}
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
      </motion.nav>

      {/* Mobile Menu Backdrop Overlay & Right Sliding Drawer (Placed outside transformed parent) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark background blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="navbar-mobile-overlay"
              onClick={() => setIsOpen(false)}
            />

            {/* Right-sliding drawer container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="navbar-mobile-menu"
            >
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`navbar-mobile-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      setIsOpen(false);
                      handleScroll(e, link.href);
                    }}
                  >
                    {link.name}
                  </a>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
