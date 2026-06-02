import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { insights } from "../data/insightsData.js";
import "./css/InsightsPage.css";

const InsightsPage = () => {
  return (
    <div className="insights-page-wrapper">
      {/* Background decorative elements */}
      <div className="insights-page-grid" />
      <div className="insights-page-glow-1" />
      <div className="insights-page-glow-2" />

      <div className="insights-page-container">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="insights-page-back-wrapper"
        >
          <Link to="/" className="insights-page-back-btn">
            <ArrowLeft className="insights-page-back-icon" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="insights-page-header"
        >
          <span className="insights-page-label">News & Events</span>
          <h1 className="insights-page-title">All Insights</h1>
          <p className="insights-page-subtitle">
            Stay informed with our latest events, programs, and community initiatives shaping the future of tech innovation.
          </p>
        </motion.div>

        {/* Insights Grid */}
        <div className="insights-page-grid-layout">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.08,
              }}
            >
              <Link to={`/insight/${insight.id}`} className="insights-page-card">
                {/* Image */}
                <div className="insights-page-card-image-wrapper">
                  <img
                    src={insight.image}
                    alt={insight.title}
                    className="insights-page-card-image"
                  />
                </div>

                {/* Meta */}
                <div className="insights-page-card-meta">
                  <div className="insights-page-card-meta-left">
                    <span className="insights-page-card-tag">{insight.tag}</span>
                    <span className="insights-page-card-dot">•</span>
                    <span className="insights-page-card-readtime">{insight.readTime}</span>
                  </div>
                  <span className="insights-page-card-date">{insight.date}</span>
                </div>

                {/* Title */}
                <h3 className="insights-page-card-title">{insight.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
