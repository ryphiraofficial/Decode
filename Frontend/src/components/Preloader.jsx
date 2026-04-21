import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './css/Preloader.css';

const Preloader = ({ isVisible, onComplete }) => {
    // The logo text pieces: D, C, OO (pill), D, E
    const logoItems = [
        { type: 'letter', value: 'D' },
        { type: 'letter', value: 'E' },
        { type: 'letter', value: 'C' },
        { type: 'pill', value: 'OO' },
        { type: 'letter', value: 'D' },
        { type: 'letter', value: 'E' },
    ];

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isVisible && (
                <motion.div
                    className="preloader"
                    // Lift up the entire background like a curtain
                    exit={{ y: '-100%' }}
                    transition={{ 
                        duration: 0.9, 
                        ease: [0.76, 0, 0.24, 1], // Standard Expo-like ease
                        delay: 0.2 // Reduced delay for faster transition
                    }}
                >
                    <motion.div
                        className="preloader-content"
                        // Content fades out and moves slightly up before the background moves
                        exit={{ opacity: 0, scale: 0.95, y: -15 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        {/* Inline logo sequence */}
                        <div className="preloader-logo-container">
                            {logoItems.map((item, i) => {
                                // Calculate staggered dynamic positions for "not in straight line" intro
                                const randomY = i % 2 === 0 ? 50 : -50;
                                const randomRotate = i % 2 === 0 ? -15 : 15;

                                return (
                                    <motion.div
                                        key={i}
                                        className={item.type === 'letter' ? "preloader-letter" : "preloader-pill"}
                                        initial={{ opacity: 0, y: randomY, rotate: randomRotate, scale: 0.5 }}
                                        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.1 + i * 0.15,
                                            type: "spring",
                                            bounce: 0.4,
                                            stiffness: 80
                                        }}
                                    >
                                        {item.type === 'letter' ? (
                                            item.value
                                        ) : (
                                            <div className="pill-inner"></div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Tagline */}
                        <motion.div
                            className="preloader-tagline"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.3 }}
                        >
                            Engineering The Future
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
