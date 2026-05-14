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
      navigate(target);
      window.scrollTo(0, 0);
      return;
    }

    const targetId = target.startsWith('#') ? target : target.split('#')[1] ? `#${target.split('#')[1]}` : null;
    if (!targetId) return;

    const performScroll = (id) => {
      const el = document.querySelector(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
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
    { name: 'Programs', href: '/all-courses' },
    { name: 'Contact', href: '#cta' },
    { name: 'Projects', href: '#projects' }
  ];

  return (
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
      <Link to="/" className="navbar-brand-wrapper" onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none' }}>
        <Logo scale={1} />
      </Link>

      {/* Desktop Links — hidden when contracted */}
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
        {/* <button className="btn-primary navbar-cta">GET STARTED</button> */}
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

      {/* Mobile Menu */}
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
