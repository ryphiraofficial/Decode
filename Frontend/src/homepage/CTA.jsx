import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './css/CTA.css';

const servicesData = [
    { id: 1, title: 'Custom Software Development', cat: 'Technology', icon: '💻' },
    { id: 2, title: 'UI/UX Design Systems', cat: 'Design', icon: '🎨' },
    { id: 3, title: 'Cloud Infrastructure & DevOps', cat: 'Cloud', icon: '☁️' },
    { id: 4, title: 'Industrial IoT & Automation', cat: 'Automation', icon: '⚙️' },
    { id: 5, title: 'Mobile App Development', cat: 'Mobile', icon: '📱' },
    { id: 6, title: 'Enterprise Digital Transformation', cat: 'Enterprise', icon: '📈' }
];

const CTA = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [serviceSearch, setServiceSearch] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const officialEmail = import.meta.env.VITE_OFFICIAL_EMAIL || 'dcoodeofficial@gmail.com';

    const filteredServices = servicesData.filter(service =>
        service.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
        service.cat.toLowerCase().includes(serviceSearch.toLowerCase())
    );

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const service = selectedService ? selectedService.title : 'General Consultation';
        const budget = formData.get('budget');
        const message = formData.get('message');

        const mailtoLink = `mailto:${officialEmail}?subject=IT Solution Request - ${service}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AService Needed: ${service}%0D%0AEstimated Budget: ${budget}%0D%0AProject Details: ${message}`;
        window.location.href = mailtoLink;
        setIsModalOpen(false);
    };

    return (
        <section id="cta" className="cta-outer-section">
            <div className="container">
                <div className="cta-inner-card">
                    {/* Background Decorative Mesh grid */}
                    <div className="cta-card-grid-bg" />
                    
                    {/* Centered Content Column */}
                    <div className="cta-left-content">
                        {/* <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="cta-badge"
                        >
                            <span className="badge-dot" /> Elite Engineering Partner
                        </motion.div> */}

                        <motion.h2
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="cta-title-v4"
                        >
                            Architecting <br />
                            The Infinite
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="cta-desc-v4"
                        >
                            We engineer hyper-scalable custom software, resilient digital platforms, and premium design architectures. Partner with us to transform your complex business objectives into top-performing products.
                        </motion.p>

                        {/* Premium Digital Metrics Dashboard */}
                        {/* <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="cta-metrics-grid"
                        >
                            <div className="metric-card">
                                <span className="metric-number">99.99%</span>
                                <span className="metric-label">Uptime SLA</span>
                            </div>
                            <div className="metric-card">
                                <span className="metric-number">10x</span>
                                <span className="metric-label">Deploy Velocity</span>
                            </div>
                            <div className="metric-card">
                                <span className="metric-number">Zero</span>
                                <span className="metric-label">Incidents</span>
                            </div>
                        </motion.div> */}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="cta-btn-wrap"
                        >
                            <a
                                href="/contact"
                                className="cta-btn-v4"
                                style={{ textDecoration: 'none' }}
                            >
                                <span>Start a Project</span>
                                <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Project Request Consultation Modal */}
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
                            <h3 className="modal-title">Consult our Experts</h3>
                            <p className="modal-subtitle">Share your ideas, and let's craft a resilient digital solution.</p>

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
                                    <label>Interested IT Solution / Service</label>
                                    <div className="dropdown-search-wrapper">
                                        <input
                                            type="text"
                                            placeholder={selectedService ? selectedService.title : "Search for a service..."}
                                            value={serviceSearch}
                                            onChange={(e) => {
                                                setServiceSearch(e.target.value);
                                                setIsDropdownOpen(true);
                                            }}
                                            onFocus={() => setIsDropdownOpen(true)}
                                            className="dropdown-search-input"
                                            required={!selectedService}
                                        />
                                        <AnimatePresence>
                                            {isDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="dropdown-results-card"
                                                >
                                                    {filteredServices.length > 0 ? (
                                                        filteredServices.map(service => (
                                                            <div
                                                                key={service.id}
                                                                className="dropdown-item"
                                                                onClick={() => {
                                                                    setSelectedService(service);
                                                                    setServiceSearch('');
                                                                    setIsDropdownOpen(false);
                                                                }}
                                                            >
                                                                <div className="item-icon">{service.icon}</div>
                                                                <div className="item-info">
                                                                    <div className="item-title">{service.title}</div>
                                                                    <div className="item-cat">{service.cat}</div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="dropdown-no-results">No services found</div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Estimated Project Budget</label>
                                    <select name="budget" required>
                                        <option value="">Select a range...</option>
                                        <option value="Under $5,000">Under $5,000</option>
                                        <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                                        <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                                        <option value="$50,000+">$50,000+</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Project Brief</label>
                                    <textarea name="message" placeholder="Describe your product requirements, deadlines, or objectives..." rows="3"></textarea>
                                </div>
                                <button type="submit" className="modal-submit-btn">Send Project Request</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default CTA;
