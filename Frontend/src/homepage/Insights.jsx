import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "./css/Insights.css";
import { insights } from "../data/insightsData.js";

const InsightCard = ({ insight, index }) => (
  <a href={`/insight/${insight.id}`} style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="insight-card"
    >
      {/* Clean, Square-cut Cinematic Image Container */}
      <div className="insight-image-wrapper">
        <img
          src={insight.image}
          alt={insight.title}
          className="insight-image"
        />
      </div>

      {/* Metadata Row matching target layout */}
      <div className="insight-meta">
        <div className="insight-meta-left">
          <span className="insight-tag">{insight.tag}</span>
          <span className="insight-dot">•</span>
          <span className="insight-readtime">{insight.readTime}</span>
        </div>
        <span className="insight-date">{insight.date}</span>
      </div>

      {/* Elegant bold black headers */}
      <h3 className="insight-heading">
        {insight.title}
      </h3>
    </motion.article>
  </a>
);

const Insights = () => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="insights-section"
    >
      <div className="insights-container">
        
        {/* Navigation / Section Header */}
        <div className="insights-header">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="insights-title"
          >
            Insights
          </motion.h2>
        </div>

        {/* Cinematic Grid Row */}
        <div className="insights-grid">
          {insights.map((insight, index) => (
            <InsightCard key={insight.id} insight={insight} index={index} />
          ))}
        </div>

        {/* Minimal Rectangle CTA matching video/screenshot outline design */}
        <div className="insights-button-wrapper">
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="explore-button"
          >
            <span>Explore all insights</span>
            <ArrowRight className="explore-icon" />
          </motion.a>
        </div>

      </div>
    </section>
  );
};

export default Insights;