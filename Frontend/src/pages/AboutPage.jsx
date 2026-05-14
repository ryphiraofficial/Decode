"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import './css/AboutPage.css';

const MagneticMorphStack = () => {
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // TOP-LEVEL HOOKS (Must be called every render)
    const heroScale = useTransform(smoothProgress, [0, 0.4], [1, 0.5]);
    const heroX = useTransform(smoothProgress, [0, 0.4], ["0%", "-20%"]);
    const heroBorderRadius = useTransform(smoothProgress, [0, 0.4], ["0rem", "2rem"]);
    const heroTextOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

    const contentX = useTransform(smoothProgress, [0.3, 0.6], ["100%", "0%"]);
    const contentOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);

    // STATIC MOBILE VIEW
    if (isMobile) {
        return (
            <div className="relative w-full h-[80vh] bg-black overflow-hidden flex items-center justify-center px-6">
                <img
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40"
                    alt="Hero Architecture"
                />
                <div className="absolute inset-0 bg-black/30" />
                
                <div className="relative z-10 text-center">
                    <h2 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] text-white">
                        Architecting the <br /> Digital Frontier.
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="relative h-[400vh] bg-black text-white"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* --- THE MORPHING HERO (DESKTOP) --- */}
                <motion.div
                    style={{
                        scale: heroScale,
                        x: heroX,
                        borderRadius: heroBorderRadius,
                    }}
                    className="relative z-20 w-full h-full bg-neutral-900 shadow-2xl overflow-hidden border border-white/5"
                >
                    <img
                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000"
                        className="w-full h-full object-cover grayscale opacity-60"
                        alt="Hero Architecture"
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    <motion.div
                        style={{
                            opacity: heroTextOpacity
                        }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center"
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
                            Architecting the <br /> Digital Frontier.
                        </h2>
                        <p className="text-base md:text-xl font-bold text-neutral-400 uppercase tracking-widest max-w-xl">
                            A premier engineering studio dedicated to crafting high-performance digital ecosystems.
                        </p>
                    </motion.div>
                </motion.div>

                {/* --- THE REVEALED FEATURE CONTENT --- */}
                <motion.div
                    style={{ 
                        x: contentX, 
                        opacity: contentOpacity 
                    }}
                    className="absolute right-[5%] w-[90%] md:w-[35%] z-10"
                >
                    <div className="space-y-6 md:space-y-10">
                        <div className="space-y-4 md:space-y-6">
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
                                Designed for the <br /> modern era.
                            </h2>
                            <p className="text-neutral-400 text-sm md:text-lg font-bold leading-relaxed uppercase tracking-tight">
                                Our approach combines aesthetic purity with high-performance
                                engineering to deliver unmatched digital experiences.
                            </p>
                        </div>

                        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            <div className="p-6 md:p-8 bg-white text-black rounded-[2.5rem] border border-white/10 group transition-all duration-500">
                                <h4 className="font-black uppercase tracking-tighter text-xl">Adaptive</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mt-2 leading-relaxed">
                                    Responsive layouts that feel natural on any device.
                                </p>
                            </div>
                            <div className="p-6 md:p-8 bg-white text-black rounded-[2.5rem] border border-white/10 group transition-all duration-500">
                                <h4 className="font-black uppercase tracking-tighter text-xl">Performant</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mt-2 leading-relaxed">
                                    Optimized code for blazing fast interactions.
                                </p>
                            </div>
                        </div> */}

                        {/* <button className="w-full md:w-auto group relative px-8 md:px-10 py-4 md:py-5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] active:scale-95 flex items-center justify-center gap-4">
                            <span>Read Case Study</span>
                        </button> */}
                    </div>
                </motion.div>

                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neutral-900/40 to-transparent z-0 pointer-events-none" />
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-30" />
        </div>
    );
};

const AboutPage = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* The Morphing Hero */}
            <MagneticMorphStack />

            {/* --- LOWER SECTIONS --- */}
            <section className="ap-narrative-sec">
                <div className="ap-container">
                    <div className="ap-narrative-content">
                        <div className="ap-narrative-header text-center md:text-left">
                            <span className="ap-badge">The Studio</span>
                            <h2 className="ap-narrative-title">
                                We bridge the gap between <br className="hidden md:block" />
                                <span className="dim">vision and delivery.</span>
                            </h2>
                        </div>
                        
                        <div className="ap-narrative-grid">
                            <p className="ap-narrative-p text-center md:text-left">
                                At Decoode, we believe that software is more than just code—it's the architecture of the modern world. Our team of senior engineers and architects work closely with global partners to build resilient, scalable, and beautiful digital ecosystems.
                            </p>
                            <p className="ap-narrative-p dim text-center md:text-left">
                                Founded by industry veterans, our studio operates on the principles of apprenticeship and technical excellence. We don't just deliver projects; we architect the future of how users interact with technology.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ap-expertise-sec">
                <div className="ap-container">
                    <div className="ap-expertise-grid">
                        <div className="ap-expertise-card">
                            <h3 className="text-2xl md:text-3xl">Technical Mastery</h3>
                            <p>
                                We utilize cutting-edge stacks and architectural patterns to ensure every project is built for long-term scalability and security.
                            </p>
                        </div>
                        <div className="ap-expertise-card">
                            <h3 className="text-2xl md:text-3xl">Direct Mentorship</h3>
                            <p>
                                Our studio culture is built on deep domain expertise, where senior architects guide every line of code to perfection.
                            </p>
                        </div>
                        <div className="ap-expertise-card">
                            <h3 className="text-2xl md:text-3xl">Global Delivery</h3>
                            <p>
                                From stealth startups to global enterprises, we have a proven track record of shipping production-grade software worldwide.
                            </p>
                        </div>
                    </div>
                    
                    <div className="ap-stats-row">
                        <div className="ap-stat-item text-center md:text-left">
                            <span className="ap-stat-value">15+</span>
                            <span className="ap-stat-label">Years Exp.</span>
                        </div>
                        <div className="ap-stat-item text-center md:text-left">
                            <span className="ap-stat-value">150+</span>
                            <span className="ap-stat-label">Projects</span>
                        </div>
                        <div className="ap-stat-item text-center md:text-left">
                            <span className="ap-stat-value">100+</span>
                            <span className="ap-stat-label">Alumni</span>
                        </div>
                        <div className="ap-stat-item text-center md:text-left">
                            <span className="ap-stat-value">05</span>
                            <span className="ap-stat-label">Continents</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;