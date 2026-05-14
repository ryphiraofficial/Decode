import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, GraduationCap, Briefcase, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import './css/CourseDetail.css';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    // This data would ideally come from a central constants file
    const coursesData = {
        "software-development": { title: "Software Development", category: "Development", desc: "Enterprise software engineering from architecture to deploy.", details: "Master the art of building scalable, production-ready software. This track covers everything from design patterns to advanced microservices architecture." },
        "mern-stack-with-ai": { title: "MERN Stack with AI", category: "Full Stack", desc: "Next-gen web apps with LLM and Vector DB features.", details: "The modern stack enhanced with Artificial Intelligence. Learn to integrate Large Language Models (LLMs) and Vector Databases into high-performance web applications." },
        "python-engineering": { title: "Python Engineering", category: "Development", desc: "Advanced Python for automation and scalable backends.", details: "Deep dive into Python's powerful ecosystem. Focus on asynchronous programming, data pipelines, and optimizing backend systems for industrial scale." },
        "deep-learning-pro": { title: "Deep Learning Pro", category: "AI & ML", desc: "CNNs, RNNs, and Transformers with PyTorch.", details: "Expert-level training in neural networks. Build and deploy complex models including Transformers, GANs, and deep reinforcement learning systems." },
        "cyber-security-pro": { title: "Cyber Security Pro", category: "Cyber", desc: "Defensive and offensive security with real-world labs.", details: "Become a elite security professional. Master penetration testing, network defense, and ethical hacking through immersive laboratory environments." },
        "cloud-devops": { title: "Cloud & DevOps", category: "Infrastructure", desc: "Kubernetes, CI/CD, and AWS cloud architecture.", details: "Learn the backbone of modern tech operations. Master container orchestration with Kubernetes and build robust CI/CD pipelines on AWS and Azure." },
        "machine-learning-ops": { title: "Machine Learning Ops", category: "AI & ML", desc: "Turning models into scalable production services.", details: "The bridge between ML research and production. Learn to automate model retraining, monitoring, and deployment at enterprise scale." },
        "artificial-intelligence": { title: "Artificial Intelligence", category: "AI & ML", desc: "Fundamentals of heuristics and modern AI logic.", details: "Explore the foundations of AI. From traditional heuristics to the latest breakthroughs in agentic reasoning and cognitive architectures." },
        "cyber-forensics": { title: "Cyber Forensics", category: "Cyber", desc: "Digital evidence gathering and incident response.", details: "Master the science of digital investigation. Learn to preserve, identify, and extract evidence from digital devices for legal and corporate requirements." },
        "full-stack-django": { title: "Full Stack - Django", category: "Full Stack", desc: "Rapid development for enterprise web platforms.", details: "Build powerful, secure web platforms at lightning speed using Python's most robust framework, Django, paired with modern frontend tech." },
        "penetration-testing": { title: "Penetration Testing", category: "Cyber", desc: "Red-team operations and network hacking labs.", details: "Advanced red-teaming. Learn to think like an attacker to identify vulnerabilities and secure enterprise networks against modern threats." },
        "enterprise-devops": { title: "Enterprise DevOps", category: "Infrastructure", desc: "Building high-availability systems and automation.", details: "Architect high-availability systems that never fail. Master site reliability engineering (SRE) and large-scale infrastructure automation." }
    };

    useEffect(() => {
        setCourse(coursesData[id]);
        window.scrollTo(0, 0);
    }, [id]);

    if (!course) return (
        <div className="loading-screen" style={{ background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <h2>Initializing Track...</h2>
        </div>
    );

    return (
        <div className="course-detail-page">
            {/* Navbar is handled by Layout */}
            <div className="noise-overlay" />

            <main className="container">
                <header className="detail-header">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link to="/all-courses" className="back-link">
                            <ArrowLeft size={16} /> Back to Catalog
                        </Link>
                    </motion.div>

                    <div className="header-content">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="detail-category"
                        >
                            {course.category} Track
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="detail-title"
                        >
                            {course.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="detail-short-desc"
                        >
                            {course.details}
                        </motion.p>
                    </div>
                </header>

                <section className="internship-programs">
                    <div className="section-intro">
                        <Zap size={24} color="var(--primary)" />
                        <h2>Internship Programs</h2>
                    </div>

                    <div className="internship-grid">
                        {[
                            { month: 1, title: "Immersion", focus: "Core Foundations", features: ["Live Mentorship", "Industry Tools", "Project Basics"] },
                            { month: 3, title: "Specialization", focus: "Advanced Implementation", features: ["Real-world Apps", "Code Reviews", "Certification"] },
                            { month: 6, title: "Mastery", focus: "Industrial Grade", features: ["Corporate Training", "Stipend Basis", "Job Assistance"] }
                        ].map((prog, index) => (
                            <motion.div
                                key={prog.month}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`internship-card ${prog.month === 3 ? 'highlight' : ''}`}
                            >
                                <div className="prog-duration">{prog.month} Month Program</div>
                                <h3 className="prog-title">{prog.title}</h3>
                                <p className="prog-focus">{prog.focus}</p>

                                <ul className="prog-features">
                                    {prog.features.map(f => (
                                        <li key={f}><CheckCircle2 size={16} /> {f}</li>
                                    ))}
                                </ul>

                                <button className="btn-primary apply-btn">Initialize Enrollment</button>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="track-perks">
                    <div className="perk">
                        <ShieldCheck size={32} />
                        <div>
                            <h4>Verified Certification</h4>
                            <p>Industry-recognized credentials upon completion.</p>
                        </div>
                    </div>
                    <div className="perk">
                        <Briefcase size={32} />
                        <div>
                            <h4>Placement Assistance</h4>
                            <p>Direct entry into our partner talent network.</p>
                        </div>
                    </div>
                    <div className="perk">
                        <GraduationCap size={32} />
                        <div>
                            <h4>Alumni Access</h4>
                            <p>Lifetime access to our community and resources.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer is handled by Layout */}
        </div>
    );
};

export default CourseDetail;
