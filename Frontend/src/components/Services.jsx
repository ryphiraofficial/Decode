import React from 'react';
import { motion } from 'framer-motion';
import './css/Services.css';

const CodeParticle = ({ text, delay }) => {
    return (
        <motion.div
            className="floating-code-line"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{
                opacity: [0, 1, 0.8, 0],
                y: [50, -100, -200, -250],
                scale: [0.8, 1, 1.1, 1.2],
                x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                delay: delay,
                ease: 'easeOut'
            }}
            style={{ left: `${Math.random() * 40 + 10}%` }}
        >
            {text}
        </motion.div>
    );
};

const Services = () => {
    const servicesList = [
        { title: "Web Application Engineering", desc: "We build scalable, high-performance web applications using modern stacks like MERN and Next.js, tailored for enterprise needs." },
        { title: "Mobile App Development", desc: "Native and cross-platform mobile solutions delivering seamless user experiences and robust backend connectivity." },
        { title: "Cloud & Infrastructure", desc: "Automated CI/CD, Kubernetes orchestration, and AWS/Azure cloud deployments for zero-downtime applications." },
        { title: "AI & Data Solutions", desc: "Custom LLM integrations, predictive modeling, and intelligent data pipelines to future-proof your business." }
    ];

    const codeSnippets = [
        "<html><head><title>Decoode</title></head>",
        "module.exports = { extend: 'theme' }",
        "SELECT * FROM Users WHERE role='admin'",
        "const server = app.listen(8080);",
        "<motion.div animate={{ opacity: 1 }} />",
        "kubernetes deploy --scale=5",
        "import torch.nn as nn",
        "res.status(200).json({ success: true })",
        "docker-compose up -d",
        "export const runtime = 'edge';"
    ];

    return (
        <section id="services" className="sep-step-top-surface services-section">
            {/* Visual Side acting as background */}
            <div className="services-visual-background">
                {/* Huge background glow behind the person */}
                <div className="services-glow-bg" />

                <motion.img
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 0.15, scale: 1.4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    src="/Emo.png"
                    alt="Decoode Background"
                    className="services-bg-image"
                />

                <div className="bg-code-overlay">
                    {codeSnippets.map((snippet, i) => (
                        <CodeParticle key={i} text={snippet} delay={i * 0.4} />
                    ))}
                </div>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 5 }}>
                <div className="services-header center-mobile">
                    <span className="services-label">Client Solutions</span>
                    <h2 className="services-title">
                        Industrial Grade <br />
                        <span className="text-gradient">IT Services</span>
                    </h2>
                </div>

                <div className="services-list">
                    {servicesList.map((srv, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="service-item"
                        >
                            <h3 className="service-item-title">{srv.title}</h3>
                            <p className="service-item-desc">{srv.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
