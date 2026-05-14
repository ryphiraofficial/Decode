import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './css/Footer.css';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="footer-grid"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="footer-brand">
            <div className="logo-footer-container" >
              <span className="logo-footer-letter">D</span>
              <span className="logo-footer-letter">C</span>
              <div className="logo-footer-pill"></div>
              <span className="logo-footer-letter">D</span>
              <span className="logo-footer-letter">E</span>
            </div>
            <p className="footer-tagline">
              Cultivating the next generation of industrial architects through elite technical training and software services.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants} className="footer-column">
            <h4>Navigate</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/all-courses">Academy</Link></li>
              <li><Link to="/services">Services</Link></li>
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div variants={itemVariants} className="footer-column">
            <h4>Connect</h4>
            <ul className="footer-links">
              <li><a href="mailto:dcoodeofficial@gmail.com">dcoodeofficial@gmail.com</a></li>
              <li><a href="https://linkedin.com/company/dcoode" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://x.com/dcoode" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
              <li><a href="https://www.instagram.com/_dcoode_/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="footer-column">
            <h4>Newsletter</h4>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '24px' }}>
              Stay updated with our latest industrial tracks.
            </p>
            <form className="newsletter-input-group" onSubmit={(e) => {
              e.preventDefault();
              const email = e.target[0].value;
              window.location.href = `mailto:dcoodeofficial@gmail.com?subject=Newsletter Subscription&body=Please subscribe me to the newsletter. My email: ${email}`;
            }}>
              <input type="email" placeholder="Your e-mail" required />
              <button type="submit" className="newsletter-submit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2024 DECOODE DIGITAL AGENCY • BUILT FOR ARCHITECTS
          </div>
          <div className="footer-legal">
            <Link to="/legal">Privacy & Terms</Link>
            <a href="mailto:dcoodeofficial@gmail.com">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
