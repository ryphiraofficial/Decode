import React from 'react';
import { motion } from 'framer-motion';
import './css/Projects.css';

const Projects = () => {
    const projects = [
        { title: "Enterprise Cloud Scaler", client: "Industrial Tech Co.", category: "DevSecOps", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" },
        { title: "Global Logistics HUB", client: "CargoFlow Group", category: "Fullstack Architecture", img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80" },
        { title: "FinTech Security Core", client: "Apex Finance Bank", category: "Infrastructure Security", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80" },
        { title: "Asset Liquidity AI", client: "Zebec Markets", category: "AI & Data Science", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80" }
    ];

    // Background particles for a cinematic feel
    const particles = Array.from({ length: 40 });

    return (
        <section id="projects" className="projects-section">
            <div className="projects-bg-animation">
                {particles.map((_, i) => (
                    <motion.div
                        key={i}
                        className="bg-dot"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * 1000,
                            opacity: Math.random() * 0.3
                        }}
                        animate={{
                            y: [null, Math.random() * -500],
                            opacity: [null, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: Math.random() * 10
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="projects-header"
                >
                    <span className="projects-subtitle">Production Pipeline</span>
                    <h2 className="projects-title">Projects <span className="text-gradient">Done</span></h2>
                </motion.div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="project-card"
                        >
                            <img src={project.img} alt={project.name} className="project-img" />
                            <div className="project-overlay" />
                            <div className="project-info">
                                <span className="project-category">{project.category}</span>
                                <div className="project-client">Client: {project.client}</div>
                            </div>

                            <div className="project-overlay-glow" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
