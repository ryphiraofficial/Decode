import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, Smartphone, Layout, Cloud, ArrowRight, CheckCircle2, Terminal, Code2, Database, ShieldCheck, Zap } from 'lucide-react';
import './css/AboutPage.css'; // Global structure
import './css/ServicesPage.css'; // Specific overrides and new styles

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Framer Motion Animation Variants
  const heroTransition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  const serviceDetails = [
    {
      title: "Enterprise Web Engineering",
      subtitle: "High-Performance Systems",
      desc: "We build scalable, resilient web architectures using MERN, Next.js, and specialized microservices. Our focus is on atomic performance and technical SEO.",
      icon: <Layers size={28} />
    },
    {
      title: "Mobile App Development",
      subtitle: "Cross-Platform Precision",
      desc: "Architecting high-fidelity mobile experiences with React Native and Flutter. We bridge the gap between native performance and hybrid efficiency.",
      icon: <Smartphone size={28} />
    },
    {
      title: "UI/UX Architecture",
      subtitle: "Design Systems",
      desc: "We don't just design; we architect visual languages. Building robust design systems that scale with your brand across every digital touchpoint.",
      icon: <Layout size={28} />
    },
    {
      title: "Cloud & DevOps Solutions",
      subtitle: "Infrastructure as Code",
      desc: "Automating your deployment pipeline with Kubernetes, Docker, and AWS. Zero-downtime releases and immutable infrastructure for peace of mind.",
      icon: <Cloud size={28} />
    }
  ];

  return (
    <div className="ap-page sp-page">
      
      {/* 1. HERO SECTION */}
      <section className="sp-hero">
        <div className="ap-hero-bg-shapes">
           <div className="ap-shape sp-hero-shape-1"></div>
           <div className="ap-shape sp-hero-shape-2"></div>
        </div>
        <div className="ap-container">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroTransition}
            className="sp-hero-title"
          >
            Solutions Engineered <span className="sp-hero-subtitle">For Scale</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.15 }}
            className="sp-hero-desc"
          >
            Dcoode specializes in translating complex business logic into high-end technical implementations. From stealth startups to global enterprises, we architect the future.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.3 }}
          >
            <button 
              className="ap-btn-primary sp-btn-explore"
              onClick={() => {
                const element = document.getElementById('capabilities-grid');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Explore Services
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW GRID (White Section) */}
      <div className="sp-white-section" id="capabilities-grid">
        <div className="sp-white-bg-grid"></div>
        <div className="sp-white-bg-line-left"></div>
        <div className="sp-white-bg-line-right"></div>

        <div className="ap-container">
          <section>
            <motion.div 
              className="ap-sec-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="ap-badge sp-badge-dark">Capabilities</span>
              <h2 className="sp-text-dark">Digital Architecture</h2>
              <p className="sp-text-gray-dark">Precision-driven services designed for modern digital ecosystems.</p>
            </motion.div>

            <motion.div 
              className="ap-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              {serviceDetails.map((service, idx) => {
                const isDark = idx % 2 === 0;
                return (
                  <motion.div 
                    key={idx}
                    className={`ap-card ${isDark ? 'sp-card-dark' : 'sp-card-white'}`}
                    variants={fadeInUp}
                  >
                    <div className="ap-card-icon">
                      {service.icon}
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>
        </div>
      </div>

      <div className="ap-container">
        
        {/* 3. DETAILED SERVICE SECTIONS */}
        <section style={{ padding: '140px 0' }}>
          <motion.div 
            className="ap-sec-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="ap-badge sp-badge-light">Deep Dive</span>
            <h2 className="sp-text-light">What We Actually Do</h2>
          </motion.div>

          {/* Web Dev */}
          <div className="sp-detail-row">
            <motion.div 
              className="sp-detail-content"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h3 className="sp-text-light sp-detail-title" variants={fadeInLeft}>Web Engineering</motion.h3>
              <motion.p className="sp-detail-desc" variants={fadeInLeft}>
                <strong>Problem:</strong> Slow load times, messy legacy spaghetti codebases, security holes, and poor organic SEO ranking.
              </motion.p>
              <motion.p className="sp-detail-desc" variants={fadeInLeft}>
                <strong>What we build:</strong> State-of-the-art SaaS platforms, real-time analytics dashboards, robust head-less e-commerce engines, and highly secure REST/GraphQL API systems.
              </motion.p>
              <motion.div className="sp-detail-quote" variants={fadeInLeft}>
                <p className="sp-detail-quote-text">
                  <strong>Outcome:</strong> Blazing-fast, ultra-scalable, enterprise-ready web applications that easily absorb traffic spikes and convert users effortlessly.
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              className="sp-detail-media"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            >
              <div className="sp-code-window">
                <div className="sp-code-header">
                  <div className="sp-code-dots">
                    <span className="sp-code-dot red"></span>
                    <span className="sp-code-dot yellow"></span>
                    <span className="sp-code-dot green"></span>
                  </div>
                  <span className="sp-code-title">Server.js</span>
                </div>
                <div className="sp-code-body">
                  <pre className="sp-code-text">
                    <code>
                      <span className="sp-code-highlight">// High-Scale Ignite Architecture</span><br/>
                      <span className="sp-code-keyword">import</span> {'{ Server }'} <span className="sp-code-keyword">from</span> <span className="sp-code-tag">'dcoode-core'</span>;<br/>
                      <span className="sp-code-keyword">import</span> Redis <span className="sp-code-keyword">from</span> <span className="sp-code-tag">'ioredis'</span>;<br/><br/>
                      <span className="sp-code-keyword">const</span> app = <span className="sp-code-keyword">new</span> Server({'{'}<br/>
                      &nbsp;&nbsp;loadBalancing: <span className="sp-code-keyword">true</span>,<br/>
                      &nbsp;&nbsp;cache: <span className="sp-code-keyword">new</span> Redis(),<br/>
                      &nbsp;&nbsp;security: <span className="sp-code-tag">'military-grade'</span>,<br/>
                      {'})'};<br/><br/>
                      app.ignite().then(() =&gt; {'{'}<br/>
                      &nbsp;&nbsp;console.log(<span className="sp-code-tag">'System running flawlessly'</span>);<br/>
                      {'})'};
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Dev */}
          <div className="sp-detail-row" style={{ flexDirection: 'row-reverse' }}>
            <motion.div 
              className="sp-detail-content"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h3 className="sp-text-light sp-detail-title" variants={fadeInRight}>Mobile Development</motion.h3>
              <motion.p className="sp-detail-desc" variants={fadeInRight}>
                <strong>Problem:</strong> Clunky hybrid app wrapper bridges, sluggish navigation, high battery usage, and outdated layouts.
              </motion.p>
              <motion.p className="sp-detail-desc" variants={fadeInRight}>
                <strong>What we build:</strong> High-performance iOS and Android applications utilizing React Native and Flutter, fine-tuned with native Swift/Kotlin modules when necessary.
              </motion.p>
              <motion.div className="sp-detail-quote" variants={fadeInRight}>
                <p className="sp-detail-quote-text">
                  <strong>Outcome:</strong> Responsive, butter-smooth native mobile experiences that users love, generating outstanding App Store ratings.
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              className="sp-detail-media"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            >
              <div className="sp-code-window">
                <div className="sp-code-header">
                  <div className="sp-code-dots">
                    <span className="sp-code-dot red"></span>
                    <span className="sp-code-dot yellow"></span>
                    <span className="sp-code-dot green"></span>
                  </div>
                  <span className="sp-code-title">App.tsx</span>
                </div>
                <div className="sp-code-body">
                  <pre className="sp-code-text">
                    <code>
                      <span className="sp-code-highlight">// High-Fidelity UI Animation</span><br/>
                      <span className="sp-code-keyword">import</span> React <span className="sp-code-keyword">from</span> <span className="sp-code-tag">'react'</span>;<br/>
                      <span className="sp-code-keyword">import</span> {'{ Animated }'} <span className="sp-code-keyword">from</span> <span className="sp-code-tag">'react-native'</span>;<br/><br/>
                      <span className="sp-code-keyword">export default function</span> App() {'{'}<br/>
                      &nbsp;&nbsp;<span className="sp-code-keyword">return</span> (<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="sp-code-keyword">SafeAreaView</span>&gt;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="sp-code-keyword">Animated.View</span> style={'{styles.glow}'}&gt;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="sp-code-keyword">DecoodeCoreMobileEngine</span> /&gt;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="sp-code-keyword">Animated.View</span>&gt;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="sp-code-keyword">SafeAreaView</span>&gt;<br/>
                      &nbsp;&nbsp;);<br/>
                      {'}'}
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. TECH STACK */}
        <section style={{ padding: '80px 0', borderTop: '1px solid #161616', borderBottom: '1px solid #161616' }}>
          <motion.div 
            className="ap-sec-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="ap-badge sp-badge-light">Credibility</span>
            <h2 className="sp-text-light">The Engine Room</h2>
            <p className="sp-text-gray-light">We do not use hype technology. We use bulletproof, industry-proven stacks.</p>
          </motion.div>

          <motion.div 
            className="sp-tech-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {['React / Next.js', 'Node.js / Express', 'MongoDB / PostgreSQL', 'AWS / Kubernetes', 'Redis / Microservices'].map((tech, idx) => (
              <motion.div 
                key={idx}
                className="sp-tech-item"
                variants={fadeInUp}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 5. PROCESS */}
        <section style={{ padding: '140px 0' }}>
          <motion.div 
            className="ap-sec-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="ap-badge sp-badge-light">Methodology</span>
            <h2 className="sp-text-light">Execution Protocol</h2>
            <p className="sp-text-gray-light">A highly structured, transparent, and chaos-free software pipeline.</p>
          </motion.div>

          <motion.div 
            className="sp-process-list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {['Requirement Analysis & Architecture', 'Comprehensive Database & API Planning', 'Core Front-End & Back-End Coding', 'Automated QA & Unit Integration Testing', 'Zero-Downtime Live AWS Deployment'].map((step, idx) => (
              <motion.div 
                key={idx} 
                className="sp-process-item"
                variants={fadeInLeft}
              >
                <div className="sp-process-num">0{idx + 1}</div>
                <h4 className="sp-text-light sp-process-title">{step}</h4>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* 6. PORTFOLIO / CASE STUDIES (White Section) */}
      <div className="sp-white-section">
        <div className="sp-white-bg-grid"></div>
        <div className="sp-white-bg-line-left"></div>
        <div className="sp-white-bg-line-right"></div>

        <div className="ap-container">
          <motion.div 
            className="ap-sec-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="ap-badge sp-badge-dark">Proof of Work</span>
            <h2 className="sp-text-dark">Case Studies</h2>
            <p className="sp-text-gray-dark">Real business problems solved with precision engineering.</p>
          </motion.div>

          <motion.div 
            className="ap-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="sp-case-card" variants={fadeInUp}>
              <h3 className="sp-case-title">Fintech Real-Time Dashboard</h3>
              <p><strong>Problem:</strong> Legacy architecture could not ingest 5,000 concurrent web socket tickers per second.</p>
              <p><strong>Solution:</strong> Built an event-driven React layout supported by Redis caching layer and Node.js clusters.</p>
              <div className="sp-case-highlight">
                <span>Result: 300% faster rendering, zero dropdown latency.</span>
                <ArrowRight size={18} />
              </div>
            </motion.div>

            <motion.div className="sp-case-card" variants={fadeInUp}>
              <h3 className="sp-case-title">Next-Gen E-Commerce</h3>
              <p><strong>Problem:</strong> Checkout latency resulted in massive cart abandonment and poor user engagement.</p>
              <p><strong>Solution:</strong> Fabricated a fully headless Next.js system integrated with microservices and AWS CloudFront.</p>
              <div className="sp-case-highlight">
                <span>Result: Sub-second page routing, 42% conversions up.</span>
                <ArrowRight size={18} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="ap-container">
        {/* 7. WHY CHOOSE US */}
        <section style={{ padding: '140px 0' }}>
          <motion.div 
            className="ap-sec-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="ap-badge sp-badge-light">Advantage</span>
            <h2 className="sp-text-light">Why Dcoode</h2>
          </motion.div>

          <motion.div 
            className="ap-grid" 
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="sp-why-card" variants={fadeInUp}>
              <Terminal size={26} className="sp-why-icon" />
              <h4 className="sp-text-light sp-why-title">Production Quality</h4>
              <p className="sp-why-desc">We do not construct toy models. Everything we ship is solid, secure, and ready for market operations.</p>
            </motion.div>

            <motion.div className="sp-why-card" variants={fadeInUp}>
              <Database size={26} className="sp-why-icon" />
              <h4 className="sp-text-light sp-why-title">Internship Powered</h4>
              <p className="sp-why-desc">Built by energetic, brilliant developers under the direct supervision of elite senior architects.</p>
            </motion.div>

            <motion.div className="sp-why-card" variants={fadeInUp}>
              <Zap size={26} className="sp-why-icon" />
              <h4 className="sp-text-light sp-why-title">High Speed Cycles</h4>
              <p className="sp-why-desc">Lean scrum methodology allows us to release new builds quickly without sacrificing security or details.</p>
            </motion.div>

            <motion.div className="sp-why-card" variants={fadeInUp}>
              <ShieldCheck size={26} className="sp-why-icon" />
              <h4 className="sp-text-light sp-why-title">Infinite Scalability</h4>
              <p className="sp-why-desc">We structure architecture that scales automatically when your active daily user metric spikes 10x.</p>
            </motion.div>
          </motion.div>
        </section>

        {/* 8. TESTIMONIALS */}
        <section style={{ padding: '0 0 140px 0' }}>
          <motion.div 
            className="sp-testimonial-wrap"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
          >
            <p className="sp-testimonial-text">
              "Dcoode did not just code our interface; they engineered our technical blueprint. The platform easily handles heavy traffic drops with supreme resilience."
            </p>
            <div className="sp-testimonial-author">
              <strong>Elena Rostova</strong>
              <span>Chief Technology Officer, Neobank</span>
            </div>
          </motion.div>
        </section>
      </div>

      {/* 9. FAQ (White Section) */}
      <div className="sp-white-section" style={{ padding: '120px 0' }}>
        <div className="sp-white-bg-grid"></div>
        <div className="sp-white-bg-line-left"></div>
        <div className="sp-white-bg-line-right"></div>

        <div className="ap-container">
          <motion.div 
            className="ap-sec-header"
            style={{ margin: '0 auto 60px auto', textAlign: 'center' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="ap-badge sp-badge-dark">Information</span>
            <h2 className="sp-text-dark">Frequently Asked Questions</h2>
          </motion.div>

          <motion.div 
            className="sp-faq-list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="sp-faq-card" variants={fadeInUp}>
              <h4>How long does a typical project cycle take?</h4>
              <p>Depending on complexity, structured MVP versions take 4–6 weeks. Full-scale global enterprise systems span 3–5 months.</p>
            </motion.div>
            
            <motion.div className="sp-faq-card" variants={fadeInUp}>
              <h4>Which technology architectures are used?</h4>
              <p>We primarily build on React, Next.js, Node.js, PostgreSQL/MongoDB, Redis, Docker, and Kubernetes hosted on AWS.</p>
            </motion.div>

            <motion.div className="sp-faq-card" variants={fadeInUp}>
              <h4>Do you offer post-production engineering support?</h4>
              <p>Absolutely. We provide continuous CI/CD pipelines, DevOps monitoring, bug remediation, and hardware capacity upgrades.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 10. FINAL CTA */}
      <div className="ap-container">
        <section className="ap-cta">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.7 }}
           >
             Ready to Build?
           </motion.h2>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.7, delay: 0.15 }}
           >
             Stop compromising on quality. Let us engineer a digital architecture that sets your business apart.
           </motion.p>
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
           >
             <button 
               className="sp-btn-green"
               onClick={() => {
                 // Scroll to bottom or redirect to contact page
                 window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
               }}
             >
               Start Your Project
             </button>
           </motion.div>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;
