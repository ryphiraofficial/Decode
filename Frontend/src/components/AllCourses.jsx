import React from 'react';
import { motion } from 'framer-motion';
import './css/Courses.css';

// Duplicate the courses array from Courses.jsx for now (ideally, refactor to share data)
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
    { title: "Full Stack Academy", type: "react", desc: "Master the MERN stack and enterprise architecture for industrial implementation.", speed: 40 },
    { title: "Python Engineering", type: "python", desc: "Advanced Python scripting, data systems, and backend optimization for scale.", speed: 20 },
    { title: "UI/UX Architecture", type: "uiux", desc: "Industrial-grade design thinking and high-tier prototyping for software products.", speed: 30 },
    { title: "Cloud & DevOps", type: "devops", desc: "Scalable containerization, CI/CD pipelines, and robust cloud infrastructure deployments.", speed: 45 },
    { title: "Data Science & AI", type: "python", desc: "Develop advanced LLM tuning structures and predictive ML capabilities.", speed: 15 }
];

const AllCourses = () => (
    <section className="sep-v-top-dark courses-section">
        <div className="container">
            <div className="courses-header">
                <span className="section-label courses-label">All Courses</span>
                <h2 className="courses-title">
                    Complete <span className="text-gradient">Course List</span>
                </h2>
            </div>
            <div className="courses-grid">
                {courses.map((course, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.07 }}
                        className="course-card"
                    >
                        <div className="course-visual" style={{ minHeight: 80 }} />
                        <div className="course-content">
                            <h3 className="course-name">{course.title}</h3>
                            <p className="course-desc">{course.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default AllCourses;