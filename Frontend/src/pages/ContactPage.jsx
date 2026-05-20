import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './css/ContactPage.css';

const servicesOptions = [
  'Custom Software Development',
  'UI/UX Design Systems',
  'Cloud Infrastructure & DevOps',
  'Industrial IoT & Automation',
  'Mobile App Development',
  'Enterprise Digital Transformation'
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const officialEmail = import.meta.env.VITE_OFFICIAL_EMAIL || 'dcoodeofficial@gmail.com';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:${officialEmail}?subject=Dcoode Studio Contact - ${formData.name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${formData.message}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  return (
    <div className="contact-page-wrapper">
      {/* Background Decorative Grid and Glow Elements */}
      <div className="contact-bg-grid" />
      <div className="contact-glow-sphere-1" />
      <div className="contact-glow-sphere-2" />

      <div className="container contact-container">
        {/* Left Side: Editorial Typography & Coordinates */}
        <div className="contact-editorial">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="contact-hero-title"
          >
            Let's Dcoode <br />
            Your Vision.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="contact-hero-desc"
          >
            Whether you want to build a highly secure custom platform, design a world-class interface, or automate complex operations, we engineer resilient digital systems that scale infinitely.
          </motion.p>

          {/* Studio Coordinates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="contact-coordinates"
          >
            <div className="coordinate-item">
              <span className="coord-label">General & Partnership Inquiry</span>
              <a href={`mailto:${officialEmail}`} className="coord-value">{officialEmail}</a>
            </div>
            <div className="coordinate-item">
              <span className="coord-label">Studio Location</span>
              <a
                href="https://maps.app.goo.gl/TBMZ6Fb9R7pX27WT9"
                target="_blank"
                rel="noopener noreferrer"
                className="coord-value"
              >
                SECOND FLOOR, TRADE CENTRE, NO:11/673, Pathirippala, Kerala 679103
              </a>
            </div>
          </motion.div>
          {/* Social connections */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="contact-socials"
          >
            <a href="https://linkedin.com/company/dcoode" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
            <a href="https://www.instagram.com/_dcoode_/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
            <a href={`mailto:${officialEmail}`} className="social-link">Email ID</a>
          </motion.div>
        </div>

        {/* Right Side: Elite Glowing Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="contact-form-card"
        >
          <div className="form-card-glow-overlay" />
          <h2 className="form-card-title">Initiate a Project</h2>
          <p className="form-card-subtitle">Complete this brief, and our architects will reach out within 24 hours.</p>

          <form onSubmit={handleSubmit} className="contact-real-form">
            <div className="form-row">
              <div className="form-group-v2">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  required
                />
              </div>
              <div className="form-group-v2">
                <label>Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email ID"
                  required
                />
              </div>
            </div>

            <div className="form-group-v2">
              <label>Project Details / Brief</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your goals, tech stack, or deadlines..."
                rows="6"
                required
              />
            </div>

            <button type="submit" className="contact-submit-btn">
              <span>Send Project Request</span>
              <svg className="submit-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
