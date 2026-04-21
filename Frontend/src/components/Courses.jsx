import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './css/Courses.css';

const TypingCode = ({ lines, baseSpeed }) => {
    const [currentCode, setCurrentCode] = useState([]);

    useEffect(() => {
        let isWriting = true;
        let lineIdx = 0;
        let charIdx = 0;
        let timeout;

        const typeNext = () => {
            if (!isWriting) return;

            if (lineIdx >= lines.length) {
                // Pause at the end, then clear and restart loop
                timeout = setTimeout(() => {
                    setCurrentCode([]);
                    lineIdx = 0;
                    charIdx = 0;
                    typeNext();
                }, 3000); // 3 second pause at the end
                return;
            }

            const currentLine = lines[lineIdx];

            if (charIdx === 0) {
                setCurrentCode(prev => [...prev, ""]);
            }

            if (charIdx < currentLine.length) {
                // Determine uneven speed: some chars type fast, some slightly slower
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
                // Line finished
                lineIdx++;
                charIdx = 0;
                // Wait slightly longer at end of lines
                timeout = setTimeout(typeNext, baseSpeed * 10);
            }
        };

        // Start typing
        typeNext();

        return () => {
            isWriting = false;
            clearTimeout(timeout);
        };
    }, [lines, baseSpeed]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {currentCode.map((text, i) => (
                <div key={i} style={{
                    color: text.includes('import') || text.includes('from') || text.includes('def') || text.includes('function') ? '#00FF88' : 'rgba(255,255,255,0.7)',
                    fontSize: '0.65rem', whiteSpace: 'nowrap', fontWeight: 500
                }}>
                    {text}
                    {i === currentCode.length - 1 && (
                        <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                            style={{ display: 'inline-block', width: '5px', height: '10px', background: '#00FF88', verticalAlign: 'middle', marginLeft: '4px' }}
                        />
                    )}
                </div>
            ))}
            {currentCode.length === 0 && (
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'inline-block', width: '5px', height: '10px', background: '#00FF88', verticalAlign: 'middle' }}
                />
            )}
        </div>
    );
};

const UiUxAnimation = () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
            <motion.div animate={{ width: ['30%', '80%', '30%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ height: '20px', background: 'rgba(0,255,136,0.2)', borderRadius: '4px' }} />
            <motion.div animate={{ width: ['70%', '20%', '70%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ height: '20px', background: 'rgba(0,255,136,0.5)', borderRadius: '4px' }} />
        </div>
        <motion.div animate={{ scaleX: [1, 0.9, 1] }} transition={{ duration: 3, repeat: Infinity }} style={{ height: '50px', width: '100%', background: 'rgba(0,255,136,0.1)', borderRadius: '4px', transformOrigin: 'left' }} />
        <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ flex: 1, background: 'rgba(0,255,136,0.3)', borderRadius: '4px' }} />
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} style={{ flex: 2, background: 'rgba(0,255,136,0.2)', borderRadius: '4px' }} />
        </div>
    </div>
);

const AnimatedTechGraphic = ({ type, typingSpeed = 30 }) => {
    let codeLines = [];
    if (type === 'react') {
        codeLines = [
            "import React, { useState } from 'react';",
            "import { motion } from 'framer-motion';",
            "",
            "const Dashboard = () => {",
            "  const [data, setData] = useState([]);",
            "  ",
            "  useEffect(() => {",
            "    fetch('/api/v1/metrics')",
            "      .then(res => res.json())",
            "      .then(setData);",
            "  }, []);",
            "  ",
            "  return <div className='grid' />;",
            "};"
        ];
    } else if (type === 'python') {
        codeLines = [
            "import tensorflow as tf",
            "from fastapi import FastAPI",
            "",
            "app = FastAPI()",
            "model = load_model('model.h5')",
            "",
            "@app.post('/predict')",
            "def predict_tensor(data: dict):",
            "    tensor = preprocess(data)",
            "    return {'pred': model.predict(tensor)}",
            "",
            "if __name__ == '__main__':",
            "    uvicorn.run(app)"
        ];
    } else if (type === 'cyber') {
        codeLines = [
            "import socket, ssl",
            "from cryptography.fernet import Fernet",
            "",
            "def encrypt_payload(data):",
            "    key = Fernet.generate_key()",
            "    cipher = Fernet(key)",
            "    return cipher.encrypt(data)",
            "",
            "def scan_ports(target):",
            "    for port in range(1, 1024):",
            "        s = socket.socket()",
            "        if s.connect_ex((target, port)) == 0:",
            "            print(f'Port {port} OPEN')",
        ];
    } else if (type === 'devops') {
        codeLines = [
            "version: '3.8'",
            "services:",
            "  app:",
            "    build: .",
            "    ports:",
            "      - '8000:8000'",
            "  redis:",
            "    image: redis:alpine",
            "kubernetes:",
            "  deployment:",
            "    replicas: 3",
            "    rollingUpdate:"
        ];
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            background: '#0D0D0D', // high contrast black
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            fontFamily: 'monospace',
            perspective: '1000px'
        }}>
            {/* Ambient Background Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60%',
                height: '60%',
                background: 'radial-gradient(circle, rgba(0, 255, 136, 0.15) 0%, transparent 70%)',
                filter: 'blur(30px)',
                zIndex: 0
            }} />

            {/* Window container with slight float */}
            <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    width: '95%',
                    height: '92%',
                    border: '1px solid rgba(0,255,136,0.2)',
                    background: 'rgba(0,0,0,0.6)',
                    borderRadius: '8px',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px',
                    boxShadow: '0 0 20px rgba(0, 255, 136, 0.05)',
                    backdropFilter: 'blur(10px)',
                    overflow: 'hidden'
                }}
            >
                {/* Mock Browser Header */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
                </div>

                <div style={{ display: 'flex', flex: 1, gap: '16px', overflow: 'hidden', position: 'relative' }}>

                    {/* Gradient masks for seamless loop effect on edges (optional) */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '15px', background: 'linear-gradient(to top, #000, transparent)', zIndex: 10 }} />

                    {/* Main Content Area */}
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
                        {type === 'uiux' ? <UiUxAnimation /> : <TypingCode lines={codeLines} baseSpeed={typingSpeed} />}
                    </div>

                    {/* Dashboard Mini-Charts Section */}
                    {type !== 'uiux' && (
                        <div style={{ flex: 1, borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '12px' }}>
                            {/* Ring Chart Loop */}
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '3px solid rgba(0,255,136,0.1)', borderTopColor: '#00FF88', position: 'relative' }}>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                    style={{ width: '100%', height: '100%', borderRadius: '50%', border: '3px solid transparent', borderRightColor: 'rgba(0,255,136,0.4)', position: 'absolute', top: '-3px', left: '-3px' }}
                                />
                            </div>

                            {/* Bar charts looping */}
                            <div style={{ display: 'flex', gap: '3px', height: '30px', alignItems: 'flex-end', marginTop: 'auto' }}>
                                {[1, 2, 3].map((bar) => (
                                    <motion.div
                                        key={bar}
                                        animate={{ height: ['20%', '90%', '40%', '100%', '30%', '80%'] }}
                                        transition={{ duration: 4 + bar * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                                        style={{ width: '6px', background: '#00FF88', opacity: 0.8, borderRadius: '2px 2px 0 0' }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </motion.div>
        </div>
    );
}

const Courses = () => {
    // Provide a different typingSpeed for each course to make typing uneven
    const courses = [
        { title: "Software Development", type: "react", desc: "Comprehensive software engineering principles and project delivery.", speed: 35 },
        { title: "MERN Stack with AI", type: "react", desc: "Build intelligent web apps using MERN and AI integrations.", speed: 40 },
        { title: "Web Development", type: "react", desc: "Modern web technologies for responsive and dynamic sites.", speed: 32 },
        { title: "Full Stack with AI", type: "react", desc: "End-to-end development with AI-powered features.", speed: 38 },
        { title: "Python", type: "python", desc: "Core Python programming for automation and backend.", speed: 20 },
        { title: "Deep Learning", type: "python", desc: "Neural networks, CNNs, and advanced AI models.", speed: 18 },
        { title: "Machine Learning", type: "python", desc: "ML algorithms, model training, and deployment.", speed: 18 },
        { title: "Artificial Intelligence", type: "python", desc: "AI concepts, applications, and real-world projects.", speed: 18 },
        { title: "Data Science", type: "python", desc: "Data analysis, visualization, and predictive analytics.", speed: 15 },
        { title: "Cyber Security", type: "cyber", desc: "Enterprise endpoint protection, penetration testing & cryptographic implementations.", speed: 25 },
        { title: "MERN Stack", type: "react", desc: "Master MongoDB, Express, React, and Node.js.", speed: 40 },
        { title: "MEAN Stack", type: "react", desc: "Build scalable apps with MongoDB, Express, Angular, and Node.js.", speed: 40 },
        { title: "Full Stack - Django", type: "python", desc: "Full stack web apps using Django and REST APIs.", speed: 22 },
        { title: "R Programming", type: "python", desc: "Statistical computing and graphics with R.", speed: 16 },
        { title: "Cyber Forensic", type: "cyber", desc: "Digital forensics, investigation, and evidence handling.", speed: 22 },
        { title: "Cloud Computing", type: "devops", desc: "Cloud infrastructure, deployment, and scaling.", speed: 45 },
        // Existing demo/sample courses
        { title: "Full Stack Academy", type: "react", desc: "Master the MERN stack and enterprise architecture for industrial implementation.", speed: 40 },
        { title: "Python Engineering", type: "python", desc: "Advanced Python scripting, data systems, and backend optimization for scale.", speed: 20 },
        { title: "UI/UX Architecture", type: "uiux", desc: "Industrial-grade design thinking and high-tier prototyping for software products.", speed: 30 },
        { title: "Cloud & DevOps", type: "devops", desc: "Scalable containerization, CI/CD pipelines, and robust cloud infrastructure deployments.", speed: 45 },
        { title: "Data Science & AI", type: "python", desc: "Develop advanced LLM tuning structures and predictive ML capabilities.", speed: 15 }
    ];

    const navigate = useNavigate();
    const visibleCourses = courses.slice(0, 8);

    return (
        <section id="courses" className="sep-v-top-dark courses-section">
            <div className="container">
                <div className="courses-header">
                    <span className="section-label courses-label">Skill Track Hub</span>
                    <h2 className="courses-title">
                        Course <span className="text-gradient">Catalog</span>
                    </h2>
                </div>

                <div className="courses-grid" style={{ position: 'relative' }}>
                    {visibleCourses.map((course, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="course-card"
                            onMouseMove={(e) => {
                                const card = e.currentTarget;
                                const rect = card.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                const centerX = rect.width / 2;
                                const centerY = rect.height / 2;
                                const rotateY = ((x - centerX) / centerX) * 8; // ±8deg
                                const rotateX = ((centerY - y) / centerY) * 8;
                                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                                card.style.transition = 'transform 0.1s ease';
                            }}
                            onMouseLeave={(e) => {
                                const card = e.currentTarget;
                                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                                card.style.transition = 'transform 0.4s ease';
                            }}
                        >
                            <div className="course-visual">
                                <AnimatedTechGraphic type={course.type} typingSpeed={course.speed} />
                            </div>
                            <div className="course-content">
                                <h3 className="course-name">{course.title}</h3>
                                <p className="course-desc">{course.desc}</p>
                                <button className="btn-outline course-btn">Track Details</button>
                            </div>
                        </motion.div>
                    ))}
                    {courses.length > 8 && (
                        <div className="courses-shadow-overlay">
                            <div style={{ height: '40px' }} />
                            <button
                                className="btn-outline explore-btn"
                                onClick={() => navigate('/all-courses')}
                                style={{ marginBottom: '32px' }}
                            >
                                Explore More Courses
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Courses;
