import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, GraduationCap, Briefcase, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { coursesData } from '../data/courses';
import './css/CourseDetail.css';

// Specialized detailed contents for popular tracks
const specializedDetails = {
  "software-development": {
    desc: "Enterprise software engineering from architecture design to production grade deployment.",
    longDesc: "Master the art of building scalable, production-ready software systems. This track covers design patterns, system architecture, test-driven development (TDD), and building resilient backends. You will learn how enterprise teams design, test, and ship software at scale.",
    skills: ["System Design", "Clean Architecture", "OOP Design Patterns", "TDD / Jest", "PostgreSQL", "Docker"],
    audience: [
      "Developers looking to transition from writing script files to building resilient software systems.",
      "Engineers wanting to master high-level system architecture and API design.",
      "CS students wishing to learn real-world professional coding workflows."
    ],
    curriculum: [
      {
        phase: "Month 1: Clean Code & Architecture",
        desc: "Understanding design patterns, clean coding principles, and test-driven development.",
        topics: ["SOLID Principles", "Design Patterns", "Unit Testing basics", "REST API standards"]
      },
      {
        phase: "Month 3: System Design & Microservices",
        desc: "Scaling backends and splitting monolithic architectures into resilient microservices.",
        topics: ["Docker Containers", "Microservices communication", "Caching with Redis", "Advanced ORMs"]
      },
      {
        phase: "Month 6: DevOps & Enterprise Delivery",
        desc: "Deploying production-grade clusters and configuring automated CI/CD monitoring.",
        topics: ["Kubernetes", "GitHub Actions CI/CD", "AWS ECS / EKS", "System Monitoring & Alerting"]
      }
    ]
  },
  "mern-stack-ai": {
    desc: "Next-generation full stack web development enhanced with LLM and Vector DB features.",
    longDesc: "Traditional MERN stack is evolving. In this track, you will build modern React, Node, Express, and MongoDB applications while integrating cutting-edge AI features, including OpenAI APIs, vector search with Pinecone, and custom AI agent loops.",
    skills: ["React & Next.js", "Node & Express", "MongoDB & Mongoose", "OpenAI API", "Vector Databases", "LangChain"],
    audience: [
      "Web developers wanting to stand out by building AI-integrated modern SaaS products.",
      "JavaScript enthusiasts looking to learn robust, real-world full-stack development.",
      "Start-up founders looking to build prototypes with generative AI capabilities."
    ],
    curriculum: [
      {
        phase: "Month 1: Modern Full Stack MERN",
        desc: "Building rich frontends with React and establishing secure backends with Node & MongoDB.",
        topics: ["React State & Hooks", "RESTful API Development", "JWT Authentication", "MongoDB Schema Design"]
      },
      {
        phase: "Month 3: AI Model Integrations",
        desc: "Connecting your applications to Large Language Models and engineering prompts.",
        topics: ["OpenAI API SDK", "Prompt Engineering", "Streaming Responses", "Function Calling"]
      },
      {
        phase: "Month 6: Vector Search & Agents",
        desc: "Implementing semantic search with Vector DBs and building autonomous AI agent workflows.",
        topics: ["Embeddings", "Pinecone/Milvus Vector Search", "LangChain Framework", "Agentic Workflows"]
      }
    ]
  },
  "cyber-security": {
    desc: "Defensive and offensive security with immersive lab environments.",
    longDesc: "Enter the world of digital defense and red-team hacking. Learn penetration testing, vulnerability assessment, secure coding practices, and incident response. This course includes live laboratory exercises simulating real network attacks.",
    skills: ["Penetration Testing", "Linux Admin", "Wireshark", "Metasploit", "Vulnerability Auditing", "Network Security"],
    audience: [
      "System admins wanting to move into dedicated security/SOC team roles.",
      "Developers looking to learn secure software engineering and secure coding patterns.",
      "Aspiring ethical hackers seeking hands-on, credential-oriented training."
    ],
    curriculum: [
      {
        phase: "Month 1: Linux & Network Security",
        desc: "Mastering system administration, bash scripting, and network protocol analysis.",
        topics: ["Linux Command Line", "Networking (TCP/IP)", "Wireshark Packet Analysis", "Firewall Configuration"]
      },
      {
        phase: "Month 3: Vulnerability & Penetration Testing",
        desc: "Conducting ethical hacking operations, vulnerability scanning, and privilege escalation.",
        topics: ["OWASP Top 10", "Metasploit Framework", "System Exploits", "Web App Auditing"]
      },
      {
        phase: "Month 6: Incident Response & Threat Hunting",
        desc: "Monitoring logs, identifying intrusion indicators, and deploying defensive architectures.",
        topics: ["SIEM (Splunk)", "SOC Analysis basics", "Malware Analysis foundations", "Incident Response Playbooks"]
      }
    ]
  },
  "ui-ux-architecture": {
    desc: "Building modern user interfaces from wireframe to interactive design system.",
    longDesc: "Bridge the gap between design and development. Learn typography, layout, wireframing, high-fidelity UI design in Figma, and how to build scalable, component-based design systems that developer teams can instantly translate into code.",
    skills: ["Figma Design", "User Research", "Wireframing", "Design Systems", "Prototyping", "UI Styling Systems"],
    audience: [
      "Creative designers wanting to learn product-focused UI/UX workflows.",
      "Frontend developers looking to improve their design aesthetics and layout eye.",
      "Product managers wanting to build quick, detailed interactive mockups."
    ],
    curriculum: [
      {
        phase: "Month 1: UX Research & Layout Design",
        desc: "Mastering user workflows, wireframing, design principles, and visual hierarchy.",
        topics: ["UX Research & Persona", "Grid Systems", "Typography & Harmonious Palettes", "Low-Fidelity Mockups"]
      },
      {
        phase: "Month 3: Advanced Figma & Design Systems",
        desc: "Building reusable components, autolayout, responsive constraints, and styling tokens.",
        topics: ["Figma Autolayout 4.0", "Component Variants", "Design Tokens", "High-Fidelity Interactive Prototypes"]
      },
      {
        phase: "Month 6: Design Handoff & Frontend Alignment",
        desc: "Structuring style guides and exporting assets with perfect layout specs for frontend engineers.",
        topics: ["Figma Handoff checklists", "UI QA testing", "Design System Documentation", "Component Mapping"]
      }
    ]
  }
};

// Fallback dynamic details generator
const getCourseDetails = (id) => {
  // Try matching directly
  if (specializedDetails[id]) {
    return specializedDetails[id];
  }

  // Find base course from courses list to get proper title
  const baseCourse = coursesData.find(c => c.id === id);
  const title = baseCourse ? baseCourse.title : id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const category = baseCourse ? baseCourse.cat : 'Engineering';

  return {
    desc: `Professional training program in ${title}. Learn the frameworks, languages, and workflows required.`,
    longDesc: `This ${category} program is designed to take you from a foundation level to an advanced, industry-ready engineering standard. You will study directly under seasoned mentors, work on industrial-grade project specifications, and acquire the specialized skills demanded by top digital product studios and enterprise engineering teams globally.`,
    skills: [
      baseCourse?.cat || "Engineering",
      "System Architecture",
      "Best Practices",
      "Git & Team Workflows",
      "Scalability",
      "API Integrations"
    ],
    audience: [
      "Aspiring professionals looking for a rigorous, industry-grade curriculum.",
      "Developers wanting to level up their core systems knowledge and engineering best practices.",
      "Students looking for hands-on, practical internship experience."
    ],
    curriculum: [
      {
        phase: "Month 1: Core Foundations",
        desc: "Understanding development workflow setups, core syntax, and basic architecture principles.",
        topics: ["Development Environment Setup", "Core Syntax & Foundations", "Version Control (Git)", "First Hands-on Project"]
      },
      {
        phase: "Month 3: Intermediate Integration",
        desc: "Building complex functions, API integrations, and working with data persistence.",
        topics: ["Database Systems", "API Design & REST", "State Management", "Performance Optimization"]
      },
      {
        phase: "Month 6: Production Deployment",
        desc: "Continuous Integration, Cloud deployment architectures, and final capstone projects.",
        topics: ["DevOps & Containers", "CI/CD Pipelines", "Scaling Strategies", "Capstone Internship Project"]
      }
    ]
  };
};

const CourseDetail = () => {
  const { id } = useParams();
  const [courseMeta, setCourseMeta] = useState(null);
  const [courseDetail, setCourseDetail] = useState(null);
  const [activePlan, setActivePlan] = useState(3); // Default 3 months

  useEffect(() => {
    window.scrollTo(0, 0);
    // Retrieve base metadata from courses data list
    const meta = coursesData.find(c => c.id === id);
    setCourseMeta(meta);

    // Retrieve rich details
    const detail = getCourseDetails(id);
    setCourseDetail(detail);
  }, [id]);

  if (!courseDetail) {
    return (
      <div className="loading-screen" style={{ background: '#ffffff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0b1a2d' }}>
        <h2>Loading Course details...</h2>
      </div>
    );
  }

  // Set default title and category values if metadata is empty
  const title = courseMeta ? courseMeta.title : (id ? id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : "Course Track");
  const category = courseMeta ? courseMeta.cat : "Development";

  return (
    <div className="course-detail-page">
      <Helmet>
        <title>{title} Course & Internship | Dcoode Academy</title>
        <meta name="description" content={courseDetail.desc} />
        <meta name="keywords" content={`${category}, ${title}, Internship, Kerala, Tech Academy`} />
      </Helmet>
      <div className="noise-overlay" />
      <div className="detail-glow-sphere" />

      <div className="detail-container">
        <div className="back-link-wrapper">
          <Link to="/all-courses" className="back-link">
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
        </div>

        <header className="detail-header">
          <span className="detail-category-badge">{category} Track</span>
          <h1 className="detail-title">{title}</h1>
          <p className="detail-desc">{courseDetail.desc}</p>
        </header>

        <div className="detail-content-grid">
          {/* Left Column: Rich Syllabus & Details */}
          <div className="detail-main-content">
            
            {/* Overview Card */}
            <div className="detail-section-card">
              <h2 className="detail-section-title">
                <GraduationCap size={22} className="enroll-perk-icon" />
                Track Overview
              </h2>
              <p className="overview-text">{courseDetail.longDesc}</p>
              
              <h3 className="phase-title" style={{ fontSize: '1rem', marginTop: '24px', marginBottom: '12px' }}>
                Key Technologies & Skills
              </h3>
              <div className="skills-grid">
                {courseDetail.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            {/* Curriculum Card */}
            <div className="detail-section-card">
              <h2 className="detail-section-title">
                <Zap size={22} className="enroll-perk-icon" />
                Syllabus & Internship Roadmap
              </h2>
              <div className="curriculum-timeline">
                {courseDetail.curriculum.map((phase, index) => (
                  <div key={index} className="curriculum-phase">
                    <div className="phase-duration">{phase.phase}</div>
                    <h3 className="phase-title">{phase.desc}</h3>
                    <div className="phase-topics">
                      {phase.topics.map((topic, idx) => (
                        <span key={idx} className="topic-bullet">{topic}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience Card */}
            <div className="detail-section-card">
              <h2 className="detail-section-title">
                <CheckCircle2 size={22} className="enroll-perk-icon" />
                Who is this for?
              </h2>
              <div className="checklist-grid">
                {courseDetail.audience.map((item, index) => (
                  <div key={index} className="checklist-item">
                    <CheckCircle2 size={18} className="checklist-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Enrollment Card */}
          <div>
            <div className="enroll-card">
              <div className="enroll-price-section">
                <div className="enroll-price-title">Internship Track</div>
                <div className="enroll-price-value">
                  {activePlan === 1 && "1 Month Immersion"}
                  {activePlan === 3 && "3 Month Specialization"}
                  {activePlan === 6 && "6 Month Mastery"}
                </div>
                <div className="enroll-price-sub">
                  {activePlan === 1 && "Ideal for getting core framework foundations."}
                  {activePlan === 3 && "Standard advanced project & certificate timeline."}
                  {activePlan === 6 && "Complete industrial portfolio & placement track."}
                </div>
              </div>

              <div className="enroll-options">
                <div 
                  className={`enroll-option-row ${activePlan === 1 ? 'active' : ''}`}
                  onClick={() => setActivePlan(1)}
                >
                  <span>1 Month Track</span>
                  <span className="option-badge">Basics</span>
                </div>
                <div 
                  className={`enroll-option-row ${activePlan === 3 ? 'active' : ''}`}
                  onClick={() => setActivePlan(3)}
                >
                  <span>3 Month Track</span>
                  <span className="option-badge">Specialist</span>
                </div>
                <div 
                  className={`enroll-option-row ${activePlan === 6 ? 'active' : ''}`}
                  onClick={() => setActivePlan(6)}
                >
                  <span>6 Month Track</span>
                  <span className="option-badge">Mastery</span>
                </div>
              </div>
              <Link 
                to="/contact" 
                className="enroll-btn"
                state={{ message: `Hii I am interested in enrolling in the ${title} (${activePlan} Month Track).` }}
              >
                Inquire for Enrollment
              </Link>
              <div className="enroll-perks">
                <div className="enroll-perk-item">
                  <ShieldCheck size={18} className="enroll-perk-icon" />
                  <span>Verified course certificate</span>
                </div>
                <div className="enroll-perk-item">
                  <Briefcase size={18} className="enroll-perk-icon" />
                  <span>Talent network placement support</span>
                </div>
                <div className="enroll-perk-item">
                  <GraduationCap size={18} className="enroll-perk-icon" />
                  <span>Hands-on industrial projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseDetail;
