import React from 'react';
import { motion } from 'framer-motion';
import './css/Team.css';

const Team = () => {
    const categories = {
        leaders: [
            { name: "Saharsh Krishna", role: "Founder & CEO", img: "/team/Saharsh Krishna C.jpeg" },
            { name: "Vishnu Hari", role: "Founder & Chairman", img: "/team/vishnu hari.jpeg" }
        ],
        developers: [
            { name: "Mohammed Farsin", role: "Mern Fullstack Developer", img: "/team/Mohammed Farsin.jpeg" },
            { name: "Vaideesh S", role: "Python Fullstack Developer", img: "/team/Vaideesh S.jpeg" },
            { name: "Arya", role: "Python Fullstack Developer", img: "/team/Arya.jpeg" },
            { name: "Mridul", role: "Mern Fullstack Developer", img: "/team/Mridul.jpg" }
        ]
    };

    return (
        <section id="team" className="team-section">
            <div className="team-bg-glow" />

            <div className="container team-header">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="team-label"
                >
                    The Architects
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="team-title"
                >
                    Elite <span className="text-gradient">Team</span>
                </motion.h2>
            </div>

            <div className="container">
                {/* Founders Grid */}
                <div className="founders-grid">
                    {categories.leaders.map((founder, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="founder-card"
                        >
                            <div className="founder-img-wrapper">
                                <img src={founder.img} alt={founder.name} className="founder-img" />
                                <div className="founder-border" />
                            </div>
                            <h3 className="founder-name">{founder.name}</h3>
                            <p className="founder-role">{founder.role}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Engineering Team Grid */}
                <div className="engineers-container">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="engineers-title"
                    >
                        Engineering Force
                    </motion.h3>

                    <div className="engineers-grid">
                        {categories.developers.map((dev, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                                className="engineer-card"
                            >
                                <img src={dev.img} alt={dev.name} className="engineer-img" />
                                <div className="engineer-info">
                                    <h4 className="engineer-name">{dev.name}</h4>
                                    <p className="engineer-role">{dev.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
