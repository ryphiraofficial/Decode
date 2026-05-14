import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { coursesData } from '../data/courses';
import './css/CTA.css';

const CTA = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseSearch, setCourseSearch] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const officialEmail = import.meta.env.VITE_OFFICIAL_EMAIL || 'dcoodeofficial@gmail.com';

    const filteredCourses = coursesData.filter(course =>
        course.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
        course.cat.toLowerCase().includes(courseSearch.toLowerCase())
    );

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const course = selectedCourse ? selectedCourse.title : 'General Inquiry';
        const message = formData.get('message');

        const mailtoLink = `mailto:${officialEmail}?subject=Academy Enrollment Inquiry - ${course}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0ACourse: ${course}%0D%0AMessage: ${message}`;
        window.location.href = mailtoLink;
        setIsModalOpen(false);
    };

    return (
        <section id="cta" className="cta-outer-section">
            <div className="container">
                <div className="cta-inner-card">
                    {/* Left Content */}
                    <div className="cta-left-content">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="cta-title-v4"
                        >
                            Ready to Master <br /> Industrial Tech?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="cta-desc-v4"
                        >
                            Master industry-ready skills with elite technical training that bridges theory and real-world execution.

                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            whileTap={{ scale: 0.95 }}
                            className="cta-btn-v4"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span>Join Academy</span>
                            <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="cta-socials-v4"
                        >
                            <a href="https://instagram.com/dcoode" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a href="https://linkedin.com/company/dcoode" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.407 3.481 2.242 2.242 3.48 5.23 3.481 8.411-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.3 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Side Visual Assets (The Popup Effect) */}
                    <div className="cta-right-visuals">
                        {/* Main Over-height Phone Mockup */}
                        <div className="phone-mockup-popup">
                            <div className="mockup-screen">
                                <div className="mockup-header">
                                    <div className="mockup-avatar"></div>
                                    <div className="mockup-bar"></div>
                                </div>
                                <div className="mockup-body">
                                    <div className="mockup-message-bubble">
                                        <p>Ready to level up your tech career?</p>
                                    </div>
                                    <div className="mockup-card-lg">
                                        <h4 className="mockup-card-title">Dcoode Your Future</h4>
                                        <div className="mockup-line-sm"></div>
                                        <div className="mockup-cta-text">Join the Tech Elite</div>
                                    </div>
                                    <div className="mockup-message-bubble secondary">
                                        <p>Elite industrial training starts here.</p>
                                    </div>
                                    <div className="mockup-card-md"></div>
                                </div>
                            </div>
                        </div>

                        {/* Skill Mastery Float Card */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="floating-asset skill-mastery-popup"
                        >
                            <div className="skill-info">
                                <div className="skill-icon">
                                    <svg fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
                                </div>
                                <div>
                                    <p className="skill-label">Course Progress</p>
                                    <p className="skill-value">Mastery Level 4</p>
                                </div>
                            </div>
                            <div className="skill-bar-bg">
                                <div className="skill-bar-fill"></div>
                            </div>
                            <p className="skill-subtext">85% concepts completed</p>
                        </motion.div>

                        {/* Students Tag */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="floating-asset student-tag-popup"
                        >
                            <div className="tag-box"></div>
                            <span className="tag-text">9,850+ Enrolled</span>
                        </motion.div>

                        {/* Certification Card Popup */}
                        {/* <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="floating-asset cert-card-popup"
                        >
                            <div className="cert-header">
                                <div className="cert-logo-glow"></div>
                                <span className="cert-label">Official License</span>
                            </div>
                            <div className="cert-footer">
                                <h4 className="cert-name">Industrial Architect</h4>
                                <div className="cert-meta">
                                    <div>
                                        <p className="meta-label">ID NUMBER</p>
                                        <p className="meta-value">DCD-2024-X</p>
                                    </div>
                                    <div className="cert-brand-marks">
                                        <div className="mark-1"></div>
                                        <div className="mark-2"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div> */}
                    </div>
                </div>
            </div>

            {/* Academy Modal Popup */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="cta-modal-overlay" onClick={() => setIsModalOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="cta-modal-card"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>×</button>
                            <h3 className="modal-title">Join the Academy</h3>
                            <p className="modal-subtitle">Begin your journey to becoming a tech elite.</p>

                            <form className="modal-form" onSubmit={handleFormSubmit}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="name" placeholder="John Doe" required />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" placeholder="john@example.com" required />
                                </div>
                                <div className="form-group custom-searchable-dropdown">
                                    <label>Interested Course</label>
                                    <div className="dropdown-search-wrapper">
                                        <input
                                            type="text"
                                            placeholder={selectedCourse ? selectedCourse.title : "Search for a course..."}
                                            value={courseSearch}
                                            onChange={(e) => {
                                                setCourseSearch(e.target.value);
                                                setIsDropdownOpen(true);
                                            }}
                                            onFocus={() => setIsDropdownOpen(true)}
                                            className="dropdown-search-input"
                                            required={!selectedCourse}
                                        />
                                        <AnimatePresence>
                                            {isDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="dropdown-results-card"
                                                >
                                                    {filteredCourses.length > 0 ? (
                                                        filteredCourses.map(course => (
                                                            <div
                                                                key={course.id}
                                                                className="dropdown-item"
                                                                onClick={() => {
                                                                    setSelectedCourse(course);
                                                                    setCourseSearch('');
                                                                    setIsDropdownOpen(false);
                                                                }}
                                                            >
                                                                <div className="item-icon">{course.icon}</div>
                                                                <div className="item-info">
                                                                    <div className="item-title">{course.title}</div>
                                                                    <div className="item-cat">{course.cat}</div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="dropdown-no-results">No courses found</div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea name="message" placeholder="Tell us about your goals..." rows="3"></textarea>
                                </div>
                                <button type="submit" className="modal-submit-btn">Send Application</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default CTA;
