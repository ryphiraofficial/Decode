import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './css/Testimonials.css';

const Testimonials = () => {
    const originalTestimonials = [
        { name: "Arjun Mehta", role: "Fullstack Intern @ Decoode", text: "The architectural depth at Decoode is unparalleled. I didn't just learn React; I learned how to build enterprise systems." },
        { name: "Sarah Khan", role: "Python Developer", text: "Decoode's mentorship changed my perspective on engineering. The 3-month track is intense but incredibly rewarding." },
        { name: "Vikram Raj", role: "UI/UX Designer", text: "Building design systems with Decoode's architects was a game-changer. The focus on industrial handoff is unique." },
        { name: "Priya Nair", role: "Frontend Engineer", text: "The MERN track at Decoode is the most production-focused program I've ever experienced. Highly recommended." },
        { name: "David Chen", role: "Backend Architect", text: "Senior mentorship and live architecture reviews are what set Decoode apart. It's elite training for serious devs." },
        { name: "Ayesha Malik", role: "Cloud Intern", text: "Moving from basics to cloud optimization in 6 months was a transformation. Decoode is the real deal." }
    ];

    // For infinite loop: [last, ...original, first]
    const testimonials = [
        originalTestimonials[originalTestimonials.length - 1],
        ...originalTestimonials,
        originalTestimonials[0]
    ];

    const [index, setIndex] = useState(1); // Start at the first real item (index 1)
    const [isTransitioning, setIsTransitioning] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 3000);
        return () => clearInterval(timer);
    }, [index]);

    const handleNext = () => {
        if (index >= testimonials.length - 1) return;
        setIsTransitioning(true);
        setIndex((prev) => prev + 1);
    };

    const handleTransitionEnd = () => {
        // If we've scrolled to the clone of the first item (at the end)
        if (index === testimonials.length - 1) {
            setIsTransitioning(false); // Disable animation
            setIndex(1); // Jump to the real first item
        }
        // If we've scrolled to the clone of the last item (at the start)
        if (index === 0) {
            setIsTransitioning(false);
            setIndex(testimonials.length - 2);
        }
    };

    return (
        <section id="testimonials" className="sep-v-top-dark testimonials-section">
            <div className="container testimonials-header">
                <div className="section-label" style={{ justifyContent: 'center', textAlign: 'center' }}>Community Voice</div>
                <h2 className="testimonials-title" style={{ textAlign: 'center' }}>Elite <span className="text-gradient">Feedback</span></h2>
            </div>

            <div className="testimonials-carousel-wrapper">
                <div
                    className="testimonials-carousel-inner"
                    onTransitionEnd={handleTransitionEnd}
                    style={{ 
                        // Math: To center an item: Offset = (ViewportCenter - ItemCenter) - (Index * ItemWidth)
                        // This formula is universal for any number of visible items
                        transform: `translateX(calc((100% - var(--slide-width)) / 2 - (${index} * var(--slide-width))))`,
                        transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)' : 'none',
                        width: '100%',
                        display: 'flex'
                    }}
                >
                    {testimonials.map((item, i) => {
                        // Logic to highlight the "active" slide based on real index
                        const isActive = i === index;
                        return (
                            <div 
                                key={i} 
                                className={`testimonial-slide ${isActive ? 'active' : ''}`}
                            >
                                <div className="testimonial-card-v2">
                                    <div className="quote-mark">“</div>
                                    <p className="testimonial-text-v2">{item.text}</p>
                                    <div className="testimonial-footer">
                                        <h4 className="author-name">{item.name}</h4>
                                        <p className="author-role">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="testimonials-pagination">
                    {originalTestimonials.map((_, i) => (
                        <div
                            key={i}
                            className={`test-dot ${index - 1 === i || (index === 0 && i === originalTestimonials.length - 1) || (index === testimonials.length - 1 && i === 0) ? 'active' : ''}`}
                            onClick={() => {
                                setIsTransitioning(true);
                                setIndex(i + 1);
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
