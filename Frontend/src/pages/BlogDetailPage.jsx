import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Copy, Linkedin, Calendar, Clock, ArrowRight } from "lucide-react";
import { insights } from "../data/insightsData.js";
import { blogs } from "../data/blogData.js";
import "./css/BlogDetailPage.css";

// Custom WhatsApp SVG icon to avoid bundle dependency issues
const WhatsappIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={{ width: "14px", height: "14px" }}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.488 1.459 5.416 1.46 5.538 0 10.043-4.507 10.046-10.05.002-2.684-1.04-5.207-2.936-7.104C17.228 1.562 14.717.518 12.016.518c-5.543 0-10.048 4.507-10.05 10.051-.001 1.848.483 3.655 1.401 5.244L2.35 21.047l5.297-1.893zM18.06 14.93c-.33-.165-1.937-.954-2.231-1.06-.294-.105-.509-.16-.723.165-.214.325-.83.105-1.02.325-.19.22-.38.105-.71.06-.33-.045-1.398-.515-2.664-1.644-1.002-.893-1.677-1.996-1.875-2.33-.197-.33-.02-.508.145-.671.15-.147.33-.385.495-.578.165-.192.22-.33.33-.55.11-.22.055-.412-.028-.577-.083-.165-.723-1.742-.99-2.388-.26-.625-.526-.54-.723-.55-.188-.01-.403-.01-.617-.01-.215 0-.564.08-.86.412-.295.33-1.128 1.1-1.128 2.684 0 1.582 1.153 3.107 1.316 3.328.164.22 2.269 3.465 5.5 4.86.767.33 1.366.527 1.833.676.77.244 1.472.21 2.025.127.618-.093 1.938-.792 2.21-1.558.27-.765.27-1.423.19-1.558-.08-.135-.294-.216-.622-.38z" />
  </svg>
);

const BlogDetailPage = () => {
  const { id } = useParams();
  const postId = parseInt(id);
  // Search across both events/insights and blogs datasets
  const allArticles = [...insights, ...blogs];
  const post = allArticles.find((item) => item.id === postId);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // Track page reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="blog-detail-wrapper error-state" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="blog-page-container text-center">
          <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>Post Not Found</h2>
          <p style={{ color: "#666666", marginBottom: "30px" }}>
            The blog article you are trying to view does not exist or has been relocated.
          </p>
          <Link to="/blog" className="blog-detail-back-btn">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Get related articles (same category or general, excluding current)
  const relatedPosts = blogs
    .filter((item) => item.id !== postId)
    .sort((a, b) => (a.tag === post.tag ? -1 : 1)) // Prioritize matching category
    .slice(0, 3);

  // Sharing Actions
  const currentUrl = window.location.href;
  const shareTitle = `${post.title} | Dcoode Developer Blog`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      "_blank"
    );
  };

  const shareToWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + " " + currentUrl)}`,
      "_blank"
    );
  };

  // Default coordinate detail for generic posts
  const defaultCoords = {
    location: "Second Floor, Pathiripala Trade Center, Kerala 679103",
    time: "Mon - Sat @ 9:00 AM - 6:00 PM IST",
    rsvp: "dcoodeofficial@gmail.com",
  };

  const coords = post.details || defaultCoords;

  return (
    <div className="blog-detail-wrapper">
      <Helmet>
        <title>{post.title} | Dcoode Blog</title>
        <meta
          name="description"
          content={post.subtitle || (post.content && post.content[0] ? post.content[0].substring(0, 150) : "")}
        />
        <meta name="keywords" content={`${post.tag}, ${post.title}, Palakkad, Kerala, Dcoode`} />
        <link rel="canonical" href={`https://www.dcoode.com/blog/${post.id}`} />
        
        {/* GEO Tags */}
        <meta name="geo.region" content="IN-KL" />
        <meta name="geo.placename" content="Pathirippala, Ottapalam, Palakkad, Kerala" />
        <meta name="geo.position" content="10.7801;76.4753" />
        <meta name="ICBM" content="10.7801, 76.4753" />

        {/* Schema.org Blog Posting Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.image.startsWith("http") ? post.image : `https://www.dcoode.com${post.image}`,
            "datePublished": post.date && post.date.includes("2026") ? new Date(post.date).toISOString().split('T')[0] : "2026-06-10",
            "description": post.subtitle || (post.content && post.content[0] ? post.content[0].substring(0, 150) : ""),
            "author": {
              "@type": "Organization",
              "name": "Dcoode Developer Studio"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Dcoode | Codropic",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.dcoode.com/logo.jpeg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.dcoode.com/blog/${post.id}`
            }
          })}
        </script>
      </Helmet>

      {/* Reading Progress Indicator */}
      <div className="blog-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* 1. CLEAN HERO HEADER */}
      <section className="blog-detail-hero">
        <div className="blog-page-container">
          {/* Back Navigation */}
          <div className="blog-detail-back-wrapper">
            <Link to="/blog" className="blog-detail-back-btn">
              <ArrowLeft className="blog-detail-back-icon" />
              <span>Back to Blog</span>
            </Link>
          </div>

          <div className="blog-meta-row">
            <span className="blog-detail-tag">{post.tag}</span>
            <span className="blog-detail-dot">•</span>
            <span className="blog-detail-date">{post.date}</span>
          </div>

          <h1 className="blog-detail-title">{post.title}</h1>

          {post.subtitle && <p className="blog-detail-subtitle">{post.subtitle}</p>}
        </div>
      </section>

      {/* 2. ARTICLE BODY (White Editorial Section) */}
      <div className="blog-detail-white-section">
        <div className="blog-page-container">
          <div className="blog-editorial-layout">
            {/* Floated image poster */}
            <div className="blog-image-frame">
              <img src={post.image} alt={post.title} className="blog-poster-img" />
            </div>

            {/* Paragraph content */}
            {post.content &&
              post.content.map((paragraph, index) => (
                <p key={index} className="blog-detail-paragraph">
                  {paragraph}
                </p>
              ))}

            {/* Social Share Bar */}
            <div className="blog-share-widget">
              <span className="blog-share-label">Share Article</span>
              <button onClick={copyToClipboard} className="blog-share-btn" title="Copy Link">
                <Copy className="blog-share-icon" />
              </button>
              <button onClick={shareToLinkedIn} className="blog-share-btn" title="LinkedIn">
                <Linkedin className="blog-share-icon" />
              </button>
              <button onClick={shareToWhatsApp} className="blog-share-btn" title="WhatsApp">
                <WhatsappIcon className="blog-share-icon" />
              </button>
            </div>

            {/* Local Coordinates Box */}
            <div className="blog-coordinates-box">
              <h4 className="coords-box-title">Studio Coordinates</h4>
              <div className="coords-grid">
                <div className="coord-block">
                  <span className="coord-block-label">Venue Location</span>
                  <span className="coord-block-value">{coords.location}</span>
                </div>
                <div className="coord-block">
                  <span className="coord-block-label">Operating Hours</span>
                  <span className="coord-block-value">{coords.time}</span>
                </div>
                <div className="coord-block">
                  <span className="coord-block-label">Email Support</span>
                  <a href={`mailto:${coords.rsvp}`} className="coord-block-value link">
                    {coords.rsvp}
                  </a>
                </div>
              </div>
            </div>

            {/* Event Registration (If applicable) */}
            {post.isRegisterOpen && (
              <div className="blog-register-cta-wrapper">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScOcMxqkd6pcrIvpM58byYUoeBKzYX8VAuqulYv5D6cZ74_kw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-register-cta-btn"
                >
                  <span>Register for Event</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{ width: "16px", height: "16px", marginLeft: "6px" }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}

            {/* Gallery (If applicable) */}
            {post.gallery && post.gallery.length > 0 && (
              <div className="blog-gallery-section">
                <div className="blog-gallery-header">
                  <h3 className="blog-gallery-title">Event Highlights</h3>
                  <p className="blog-gallery-subtitle">
                    Captured moments from the official Dcoode studio inauguration.
                  </p>
                </div>
                <div className="blog-gallery-grid">
                  {post.gallery.map((imagePath, idx) => (
                    <div key={idx} className="blog-gallery-item">
                      <img
                        src={imagePath}
                        alt={`Gallery Highlight ${idx + 1}`}
                        className="blog-gallery-img"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. RELATED POSTS SECTION */}
      <div className="blog-related-dark-section">
        <div className="blog-page-container">
          <h3 className="blog-related-title">Related Reads</h3>
          <div className="blog-related-grid">
            {relatedPosts.map((relatedPost) => (
              <Link to={`/blog/${relatedPost.id}`} className="blog-card" key={relatedPost.id}>
                <div className="blog-card-image-wrapper">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="blog-card-image"
                  />
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span>{relatedPost.date}</span>
                    <span className="blog-card-dot">•</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                  <h4 className="blog-card-title" style={{ fontSize: "1.1rem" }}>
                    {relatedPost.title}
                  </h4>
                  <div className="blog-card-footer" style={{ marginTop: "auto" }}>
                    <span>Read Article</span>
                    <ArrowRight className="blog-card-arrow" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copy Clipboard Toast Message */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="blog-share-toast"
          >
            Article URL copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogDetailPage;
