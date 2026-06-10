import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Search, MapPin, Briefcase, ChevronDown, PieChart, HardHat, HeadphonesIcon, LineChart, Activity, Users, FileText, Monitor, CheckCircle, PenTool, LayoutTemplate } from 'lucide-react';
import { coursesData, ShieldIcon } from '../data/courses';
import './css/AllCourses.css';

// Mapping to course-specific content to replace the job placeholders while keeping layout
const adaptedCourses = coursesData;

const AllCourses = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(location.state?.category || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const coursesRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // If we navigated with a category, scroll to the courses section
    if (location.state?.category && coursesRef.current) {
      setTimeout(() => {
        coursesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location.state]);

  useEffect(() => {
    // Click outside handler for suggestions dropdown
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter logic
  const filteredCourses = adaptedCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.cat.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === '' || course.cat === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Suggestion logic (only titles that match current input)
  const suggestions = searchQuery
    ? adaptedCourses.filter(course => course.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const handleSearchAction = () => {
    setShowSuggestions(false);
    if (coursesRef.current) {
      coursesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSuggestionClick = (title) => {
    setSearchQuery(title);
    handleSearchAction();
  };

  // Calculate dynamic category counts
  const getCategoryCount = (catName) => {
    return adaptedCourses.filter(c => c.cat === catName).length;
  };

  const dynamicCategories = [
    { title: 'Development', icon: <Monitor size={24} />, count: getCategoryCount('Development') },
    { title: 'Full Stack', icon: <LayoutTemplate size={24} />, count: getCategoryCount('Full Stack') },
    { title: 'AI & ML', icon: <Activity size={24} />, count: getCategoryCount('AI & ML') },
    { title: 'Data', icon: <LineChart size={24} />, count: getCategoryCount('Data') },
    { title: 'Security', icon: <ShieldIcon />, count: getCategoryCount('Security') },
    { title: 'Infrastructure', icon: <HardHat size={24} />, count: getCategoryCount('Infrastructure') }
  ];

  return (
    <div className="ac-page">
      {/* --- HERO SECTION --- */}
      <section className="ac-hero">
        <div className="ac-hero-left">
          <motion.h1
            className="ac-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Find the perfect <br />course for you
          </motion.h1>
          <motion.p
            className="ac-hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Search your learning opportunity through our intensive systems
          </motion.p>

          <motion.div
            className="ac-search-box"
            ref={searchRef}
            style={{ position: 'relative' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Course Title or Keyword"
              className="ac-search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchAction();
              }}
            />
            <button className="ac-search-btn" style={{ marginLeft: '10px' }} onClick={handleSearchAction}>
              <Search size={20} />
            </button>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="ac-suggestions-dropdown"
                >
                  {suggestions.map((item, idx) => (
                    <div
                      key={idx}
                      className="ac-suggestion-item"
                      onClick={() => handleSuggestionClick(item.title)}
                    >
                      <Search size={14} style={{ opacity: 0.5 }} />
                      <span>{item.title}</span>
                      <span className="ac-suggestion-cat">{item.cat}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="ac-popular"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="ac-popular-title">Popular Searches</div>
            <div className="ac-popular-tags">
              {['AI', 'Full Stack', 'Python', 'Cyber Security', 'Machine Learning', 'Django', 'DevOps'].map(tag => (
                <span
                  key={tag}
                  className="ac-tag"
                  onClick={() => {
                    setSearchQuery(tag);
                    handleSearchAction();
                  }}
                >
                  {tag}
                </span>
              ))}
              {activeCategory && (
                <span
                  className="ac-tag"
                  style={{ background: '#0b1a2d', color: '#fff' }}
                  onClick={() => setActiveCategory('')}
                >
                  Clear Category: {activeCategory} ✕
                </span>
              )}
            </div>
          </motion.div>

          <motion.div
            className="ac-logos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span style={{ fontWeight: 800 }}>DCOODE</span>
            <span style={{ fontWeight: 800 }}>ACADEMY</span>
            <span style={{ fontWeight: 800 }}>ENGINEERING</span>
            <span style={{ fontWeight: 800 }}>SYSTEMS</span>
          </motion.div>
        </div>

        <div className="ac-hero-right">
          <div className="ac-hero-shape-dark"></div>
          <div className="ac-hero-image-stack">
            <div className="ac-img-card ac-img-card-2"></div>
            <div className="ac-img-card ac-img-card-1"></div>
            <div className="ac-img-card ac-img-main"></div>

            <div className="ac-floating-stat ac-stat-1">
              <div className="ac-stat-num">{getCategoryCount('Full Stack')} <span className="ac-stat-label">courses</span></div>
              <div className="ac-stat-sub">in Full Stack Dev</div>
            </div>
            <div className="ac-floating-stat ac-stat-2">
              <div className="ac-stat-num">{getCategoryCount('AI & ML')} <span className="ac-stat-label">courses</span></div>
              <div className="ac-stat-sub">in Artificial Intelligence</div>
            </div>
            <div className="ac-floating-stat ac-stat-3">
              <div className="ac-stat-num">{adaptedCourses.length} <span className="ac-stat-label">courses</span></div>
              <div className="ac-stat-sub">Total Programs</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CATEGORIES SECTION --- */}
      <section className="ac-categories">
        <div className="ac-section-header">
          <div>
            <h2 className="ac-section-title">Search by Category</h2>
            <p className="ac-section-subtitle">Filter your learning opportunity by domains</p>
          </div>
          <span className="ac-link" style={{ cursor: 'pointer' }} onClick={() => setActiveCategory('')}>
            All Categories &gt;
          </span>
        </div>

        <div className="ac-cat-grid">
          {dynamicCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              className="ac-cat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveCategory(cat.title)}
              style={{
                background: activeCategory === cat.title ? '#0066ff' : '#f0f5fa',
                color: activeCategory === cat.title ? '#ffffff' : 'inherit'
              }}
            >
              <div className="ac-cat-icon" style={{ color: activeCategory === cat.title ? '#0066ff' : '#0b1a2d' }}>
                {cat.icon}
              </div>
              <div className="ac-cat-title">{cat.title}</div>
              <div className="ac-cat-subtitle" style={{ color: activeCategory === cat.title ? 'rgba(255,255,255,0.8)' : '#718096' }}>
                {cat.count} open courses
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FEATURED OFFERS SECTION --- */}
      <section className="ac-featured" ref={coursesRef}>
        <div className="ac-section-header" style={{ marginBottom: '30px' }}>
          <div>
            <h2 className="ac-section-title">Featured Course Offers</h2>
            <p className="ac-section-subtitle">Showing {filteredCourses.length} learning opportunities</p>
          </div>
        </div>

        <div className="ac-featured-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((item, idx) => (
              <Link to={`/course/${item.id}`} key={idx} className="ac-course-card-link">
                <motion.div
                  className="ac-course-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(0,0,0,0.06)' }}
                >
                  <div className="ac-course-header">
                    <div className="ac-course-cat-icon">{item.catIcon}</div>
                    <div className="ac-course-cat-name">{item.cat}</div>
                  </div>

                  <h3 className="ac-course-title">{item.title}</h3>

                  <div className="ac-course-meta">
                    <div className="ac-course-meta-item">
                      {item.type}
                    </div>
                  </div>

                  <div className="ac-course-footer">
                    <div>
                      <div className="ac-course-date">{item.date} by</div>
                      <div className="ac-course-company">{item.company}</div>
                    </div>
                    <div className="ac-course-logo" style={{ background: item.logoColor }}>
                      {item.icon}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))
          ) : (
            <div style={{ padding: '50px', textAlign: 'center', color: '#718096', width: '100%', gridColumn: '1 / -1' }}>
              <h3>No courses found matching your criteria.</h3>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory(''); }}
                className="ac-btn-primary"
                style={{ marginTop: '20px' }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllCourses;;