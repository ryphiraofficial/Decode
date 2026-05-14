import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './css/ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        details: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        // Simulate sending data to email (In real app, use EmailJS or Backend API)
        // For demonstration, we simulate a 2-second delay
        setTimeout(() => {
            console.log('Form Data Submitted:', formData);
            setStatus('success');
            // Reset form after 2 seconds and close modal
            setTimeout(() => {
                setFormData({ name: '', phone: '', details: '', message: '' });
                setStatus('idle');
                onClose();
            }, 2000);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="modal-content"
                    >
                        <button className="modal-close-btn" onClick={onClose}>&times;</button>

                        <div className="modal-header">
                            <h2 className="modal-title">Get <span className="text-gradient">Started</span></h2>
                            <p className="modal-subtitle">Tell us about your project or internship goals.</p>
                        </div>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="success-message"
                            >
                                <div className="success-icon">✓</div>
                                <h3>Message Sent!</h3>
                                <p>We'll get back to you shortly.</p>
                            </motion.div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+91 00000 00000"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Student Details / Course of Interest</label>
                                    <input
                                        type="text"
                                        name="details"
                                        placeholder="Cyber Security / Web Dev"
                                        required
                                        value={formData.details}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Your Message</label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        placeholder="How can we help you?"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary form-submit-btn"
                                    disabled={status === 'sending'}
                                >
                                    {status === 'sending' ? 'SENDING...' : 'SUBMIT MESSAGE'}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
