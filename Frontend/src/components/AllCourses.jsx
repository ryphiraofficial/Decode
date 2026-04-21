import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowLeft, Terminal, Cpu, Shield, Globe, Database } from 'lucide-react';
import './css/Courses.css';

// --- Sub-components for Visuals ---

const TypingCode = ({ lines, baseSpeed = 40 }) => {
    const [currentCode, setCurrentCode] = useState([]);

    useEffect(() => {
        let isWriting = true;
        let lineIdx = 0;
        let charIdx = 0;
        let timeout;

        const typeNext = () => {
            if (!isWriting) return;
            if (lineIdx >= lines.length) {
                timeout = setTimeout(() => {
                    setCurrentCode([]);
                    lineIdx = 0;
                    charIdx = 0;
                    typeNext();
                }, 3000);
                return;
            }
            const currentLine = lines[lineIdx];
            if (charIdx === 0) {
                setCurrentCode(prev => [...prev, ""]);
            }
            if (charIdx < currentLine.length) {
                const isFast = Math.random() > 0.5;
                const speedMod = isFast ? baseSpeed * 0.4 : baseSpeed * 1.5;
                setCurrentCode(prev => {
                    const newArr = [...prev];
                    newArr[newArr.length - 1] += currentLine[charIdx];
                    return newArr;
                });
                charIdx++;
                timeout = setTimeout(typeNext, speedMod);
            } else {
                lineIdx++;
                charIdx = 0;
                timeout = setTimeout(typeNext, baseSpeed * 5);
            }
        };
        typeNext();
        return () => {
            isWriting = false;
            clearTimeout(timeout);
        };
    }, [lines, baseSpeed]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {currentCode.map((text, i) => (
                <div key={i} style={{
                    color: text.includes('import') || text.includes('from') || text.includes('def') || text.includes('function') ? '#00FF88' : 'rgba(255,255,255,0.7)',
                    fontSize: '0.5rem', whiteSpace: 'nowrap', fontWeight: 500, fontFamily: 'monospace'
                }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)', marginRight: '8px' }}>{i + 1}</span>
                    {text}
                </div>
            ))}
        </div>
    );
};

const AnimatedTechGraphic = ({ type }) => {
    let codeLines = [];
    let Icon = Terminal;
    if (type === 'react') {
        Icon = Globe;
        codeLines = ["import React from 'react';", "const App = () => {", "  return <DOM />", "};"];
    } else if (type === 'python') {
        Icon = Cpu;
        codeLines = ["import torch", "x = torch.rand(5, 3)", "print(model(x))"];
    } else if (type === 'cyber') {
        Icon = Shield;
        codeLines = ["nmap -sV -A 127.0.0.1", "Exploit loaded...", "ACCESS GRANTED"];
    } else if (type === 'devops') {
        Icon = Database;
        codeLines = ["docker-compose up -d", "replicas: 5", "Healthy [OK]"];
    }

    return (
        <div style={{ width: '100%', height: '100%', background: '#050505', padding: '12px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', right: '10px', top: '10px', opacity: 0.1 }}>
                <Icon size={40} color="#00FF88" />
            </div>
            <TypingCode lines={codeLines} />
        </div>
    );
};

// --- Main Data ---

const courses = [
    { title: "Software Development", category: "Development", type: "react", desc: "Enterprise software engineering from architecture to deploy.", duration: "6 Months" },
    { title: "MERN Stack with AI", category: "Full Stack", type: "react", desc: "Next-gen web apps with LLM and Vector DB features.", duration: "5 Months" },
    { title: "Python Engineering", category: "Development", type: "python", desc: "Advanced Python for automation and scalable backends.", duration: "4 Months" },
    { title: "Deep Learning Specialization", category: "AI & ML", type: "python", desc: "CNNs, RNNs, and Transformers with PyTorch.", duration: "6 Months" },
    { title: "Cyber Security Pro", category: "Cyber", type: "cyber", desc: "Defensive and offensive security with real-world labs.", duration: "4 Months" },
    { title: "Cloud & DevOps", category: "Infrastructure", type: "devops", desc: "Kubernetes, CI/CD, and AWS cloud architecture.", duration: "5 Months" },
    { title: "Machine Learning Ops", category: "AI & ML", type: "python", desc: "Turning models into scalable production services.", duration: "4 Months" },
    { title: "Artificial Intelligence", category: "AI & ML", type: "python", desc: "Fundamentals of heuristics and modern AI logic.", duration: "3 Months" },
    { title: "Cyber Forensics", category: "Cyber", type: "cyber", desc: "Digital evidence gathering and incident response.", duration: "4 Months" },
    { title: "Full Stack - Django", category: "Full Stack", type: "python", desc: "Rapid development for enterprise web platforms.", duration: "5 Months" },
    { title: "Penetration Testing", category: "Cyber", type: "cyber", desc: "Advanced red-team operations and network hacking.", duration: "6 Months" },
    { title: "Enterprise DevOps", category: "Infrastructure", type: "devops", desc: "Building high-availability systems and automation.", duration: "6 Months" }
];

const categories = ["All", ...new Set(courses.map(c => c.category))];

const AllCourses = () => {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredCourses = useMemo(() => {
        return courses.filter(c => {
            const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                c.desc.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = activeCategory === "All" || c.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [search, activeCategory]);

    return (
        <main className="all-courses-page" style={{ background: '#000', minHeight: '100vh', color: '#fff', paddingTop: '100px' }}>
            <div className="noise-overlay" style={{ opacity: 0.05 }} />

            <div className="container">
                {/* Navigation & Header */}
                <header style={{ marginBottom: '80px' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ marginBottom: '30px' }}
                    >
                        <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', width: 'fit-content' }}>
                            <ArrowLeft size={16} /> Back to Terminal
                        </Link>
                    </motion.div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <span className="section-label">Academy Archive</span>
                        <h1 className="courses-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1 }}>
                            Engineering <span className="text-gradient">Catalog</span>
                        </h1>
                    </div>
                </header>

                {/* Filters & Search Section */}
                <section className="interactive-filters" style={{ marginBottom: '50px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Category Pills */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '50px',
                                    border: `1px solid ${activeCategory === cat ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
                                    background: activeCategory === cat ? 'rgba(0,255,65,0.1)' : 'transparent',
                                    color: activeCategory === cat ? 'var(--primary)' : 'rgba(255,255,255,0.6)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontSize: '0.85rem',
                                    fontWeight: activeCategory === cat ? '700' : '400'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div style={{ position: 'relative', maxWidth: '350px', width: '100%' }}>
                        <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} size={18} />
                        <input
                            type="text"
                            placeholder="Search systems..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 15px 12px 45px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#fff',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                borderFocus: '1px solid var(--primary)'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>
                </section>

                {/* Status Indicator */}
                <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }} />
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {filteredCourses.length} Systems Identified
                    </span>
                </div>

                {/* Animated Grid */}
                <div className="courses-grid" style={{ minHeight: '400px' }}>
                    <AnimatePresence mode="popLayout">
                        {filteredCourses.map((course) => (
                            <motion.div
                                layout
                                key={course.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="course-card"
                                whileHover={{ y: -10 }}
                                style={{ height: 'fit-content' }}
                            >
                                <div className="course-visual" style={{ height: '140px' }}>
                                    <AnimatedTechGraphic type={course.type} />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        left: '10px',
                                        background: 'rgba(0,0,0,0.8)',
                                        padding: '4px 10px',
                                        borderRadius: '4px',
                                        fontSize: '0.65rem',
                                        color: 'var(--primary)',
                                        border: '1px solid rgba(0,255,65,0.3)'
                                    }}>
                                        {course.duration}
                                    </div>
                                </div>
                                <div className="course-content" style={{ padding: '20px' }}>
                                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '8px' }}>
                                        {course.category}
                                    </div>
                                    <h3 className="course-name" style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{course.title}</h3>
                                    <p className="course-desc" style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '20px', minHeight: '45px' }}>{course.desc}</p>
                                    <button className="btn-outline" style={{ width: '100%', fontSize: '0.75rem', padding: '10px' }}>Initialize Session</button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredCourses.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ textAlign: 'center', padding: '100px 0' }}
                    >
                        <h3 style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.2)' }}>No matching systems found in database.</h3>
                    </motion.div>
                )}
            </div>

            <footer style={{ padding: '100px 0', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '80px' }}>
                <Link to="/" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: '0.8rem' }}>
                    © 2024 DECOODE Engineering Hub. All Rights Reserved.
                </Link>
            </footer>
        </main>
    );
};

export default AllCourses;