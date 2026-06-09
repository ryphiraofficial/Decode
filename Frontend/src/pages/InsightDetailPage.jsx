import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { insights } from '../data/insightsData.js';
import './css/InsightDetailPage.css';

const InsightDetailPage = () => {
  const { id } = useParams();
  const insight = insights.find((item) => item.id === parseInt(id));

  // Handle case where insight is not found
  if (!insight) {
    return (
      <div className="insight-detail-wrapper error-state">
        <div className="container">
          <h2>Insight Not Found</h2>
          <p>The post you are trying to view does not exist or has been relocated.</p>
          <a href="/" className="back-btn">Return Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="insight-detail-wrapper">
      <div className="insight-detail-grid" />
      <div className="insight-detail-glow-1" />
      <div className="insight-detail-glow-2" />

      <div className="container insight-detail-container">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="back-btn-wrapper"
        >
          <a href="/" className="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="back-icon">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Insights</span>
          </a>
        </motion.div>

        {/* Dynamic Split Editorial Layout */}
        <div className="editorial-split-layout">
          
          {/* Left Column: Premium Framed Poster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="editorial-image-frame"
          >
            <img 
              src={insight.image} 
              alt={insight.title} 
              className="editorial-poster-img"
            />
            <div className="frame-overlay" />
          </motion.div>

          {/* Right Column: Dynamic Rich Typography */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="editorial-content-panel"
          >
            <div className="editorial-meta-row">
              <span className="editorial-tag">{insight.tag}</span>
              <span className="editorial-dot">•</span>
              <span className="editorial-date">{insight.date}</span>
            </div>

            <h1 className="editorial-title">{insight.title}</h1>
            
            {insight.subtitle && (
              <p className="editorial-subtitle">{insight.subtitle}</p>
            )}

            <div className="editorial-separator" />

            <div className="editorial-body">
              {insight.content.map((paragraph, index) => (
                <p key={index} className="editorial-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Event Specific coordinates */}
            {insight.details && (
              <div className="editorial-coordinates-box">
                <h4 className="coords-box-title">Event Coordinates</h4>
                <div className="coords-grid">
                  <div className="coord-block">
                    <span className="coord-block-label">Venue Location</span>
                    <span className="coord-block-value">{insight.details.location}</span>
                  </div>
                  <div className="coord-block">
                    <span className="coord-block-label">Date & Timing</span>
                    <span className="coord-block-value">{insight.details.time}</span>
                  </div>
                  <div className="coord-block">
                    <span className="coord-block-label">Contact us</span>
                    <a href={`mailto:${insight.details.rsvp}`} className="coord-block-value link">{insight.details.rsvp}</a>
                  </div>
                </div>
              </div>
            )}

            {/* Premium Call-to-Action Registration Button */}
            {insight.isRegisterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="register-btn-wrapper"
              >
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLScOcMxqkd6pcrIvpM58byYUoeBKzYX8VAuqulYv5D6cZ74_kw/viewform" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="register-cta-btn"
                >
                  <span>Register Now</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="register-icon">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Symmetrical Event Photo Gallery */}
        {insight.gallery && insight.gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="editorial-gallery-section"
          >
            <div className="gallery-header">
              <h3 className="gallery-title">Event Highlights</h3>
              <p className="gallery-subtitle">Moments from the grand inauguration and technical studio launch.</p>
            </div>
            
            <div className="gallery-grid">
              {insight.gallery.map((imagePath, idx) => (
                <div key={idx} className="gallery-item">
                  <img 
                    src={imagePath} 
                    alt={`Event Highlight ${idx + 1}`} 
                    className="gallery-img"
                  />
                  <div className="gallery-item-overlay" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default InsightDetailPage;
