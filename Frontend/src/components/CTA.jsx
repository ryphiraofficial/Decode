import React from 'react';
import { motion } from 'framer-motion';
import './css/CTA.css';

const CTA = () => {
    return (
        <section className="cta-section" id="contact">
            {/* Background floating abstract elements */}
            <motion.div 
                animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '400px',
                    height: '400px',
                    border: '1px solid rgba(0, 255, 136, 0.05)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }} 
            />
            
            <div className="container">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="cta-container"
                >
                    <div className="cta-glow-element" />
                    
                    <div className="cta-content">
                        <span className="cta-label">Unlock Your Potential</span>
                        <h2 className="cta-title">
                            Build The Future
                            <div className="cta-logo-row">
                                With 
                                <div className="navbar-logo-container">
                                    <span className="nav-logo-letter">D</span>
                                    <span className="nav-logo-letter">C</span>
                                    <div className="nav-logo-pill"></div>
                                    <span className="nav-logo-letter">D</span>
                                    <span className="nav-logo-letter">E</span>
                                </div>
                            </div>
                        </h2>
                        <p className="cta-desc">
                            Whether you need enterprise-grade software architecture or you're an aspiring engineer looking to master the modern tech stack—we have the blueprint for your success.
                        </p>
                        
                        <div className="cta-btn-group">
                            <motion.button 
                                whileTap={{ scale: 0.95 }}
                                className="cta-btn-primary"
                            >
                                Join Academy
                            </motion.button>
                            <motion.button 
                                whileTap={{ scale: 0.95 }}
                                className="cta-btn-outline"
                            >
                                Book Services
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
