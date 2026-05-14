import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, Smartphone, Layout, Cloud, ArrowRight, CheckCircle2, Terminal, Code2, Database, ShieldCheck, Zap } from 'lucide-react';
import './css/AboutPage.css'; // Global structure
import './css/ServicesPage.css'; // Specific overrides and new styles

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceDetails = [
    {
      title: "Enterprise Web Engineering",
      subtitle: "High-Performance Systems",
      desc: "We build scalable, resilient web architectures using MERN, Next.js, and specialized microservices. Our focus is on atomic performance and technical SEO.",
      icon: <Layers size={30} />
    },
    {
      title: "Mobile App Development",
      subtitle: "Cross-Platform Precision",
      desc: "Architecting high-fidelity mobile experiences with React Native and Flutter. We bridge the gap between native performance and hybrid efficiency.",
      icon: <Smartphone size={30} />
    },
    {
      title: "UI/UX Architecture",
      subtitle: "Design Systems",
      desc: "We don't just design; we architect visual languages. Building robust design systems that scale with your brand across every digital touchpoint.",
      icon: <Layout size={30} />
    },
    {
      title: "Cloud & DevOps Solutions",
      subtitle: "Infrastructure as Code",
      desc: "Automating your deployment pipeline with Kubernetes, Docker, and AWS. Zero-downtime releases and immutable infrastructure for peace of mind.",
      icon: <Cloud size={30} />
    }
  ];

  return (
    <div className="ap-page sp-page">
      
      {/* 1. HERO SECTION */}
      <section className="ap-hero sp-hero">
        <div className="ap-hero-bg-shapes">
           <div className="ap-shape ap-shape-1 sp-hero-shape-1"></div>
           <div className="ap-shape ap-shape-2 sp-hero-shape-2"></div>
        </div>
        <div className="ap-container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sp-hero-title"
          >
            Solutions Engineered <span className="sp-hero-subtitle">For Scale</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="sp-hero-desc"
          >
            Dcoode specializes in translating complex business logic into high-end technical implementations. From startups to enterprises, we architect the future.
          </motion.p>
          <motion.button 
            className="ap-btn-primary sp-btn-explore"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Explore Services
          </motion.button>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW GRID (White Section) */}
      <div className="sp-white-section">
        <div className="sp-white-bg-grid"></div>
        <div className="sp-white-bg-line-left"></div>
        <div className="sp-white-bg-line-right"></div>

        <div className="ap-container" style={{ position: 'relative', zIndex: 1 }}>
          <section>
            <motion.div 
              className="ap-sec-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="ap-badge sp-badge-dark">Capabilities</span>
              <h2 className="sp-text-dark">Digital Architecture</h2>
              <p className="sp-text-gray-dark">Precision-driven services designed for modern digital ecosystems.</p>
            </motion.div>

            <div className="ap-grid">
              {serviceDetails.map((service, idx) => {
                const isDark = idx % 2 === 0;
                return (
                  <motion.div 
                    key={idx}
                    className={`ap-card ${isDark ? 'sp-card-dark' : 'sp-card-white'}`}
                    whileHover={{ y: -5 }}
                  >
                    <div className="ap-card-icon">
                      {service.icon}
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <div className="ap-container">
        
        {/* 3. DETAILED SERVICE SECTIONS */}
        <section style={{ padding: '120px 0' }}>
          <div className="ap-sec-header">
            <span className="ap-badge sp-badge-light">Deep Dive</span>
            <h2 className="sp-text-light">What We Actually Do</h2>
          </div>

          {/* Web Dev */}
          <div className="sp-detail-row">
            <div style={{ flex: 1 }}>
              <h3 className="sp-text-light" style={{ fontSize: '2rem', marginBottom: '20px' }}>Web Development</h3>
              <p style={{ color: '#aaa', marginBottom: '20px' }}><strong>Problem:</strong> Slow performance, messy codebases, and poor scalability.</p>
              <p style={{ color: '#aaa', marginBottom: '20px' }}><strong>What we build:</strong> SaaS platforms, internal dashboards, and robust REST/GraphQL APIs.</p>
              <div style={{ padding: '15px', borderLeft: '3px solid #fff', background: '#111' }}>
                <p style={{ margin: 0, color: '#fff' }}><strong>Outcome:</strong> Fast, highly scalable, production-ready web applications that handle massive traffic effortlessly.</p>
              </div>
            </div>
            <div style={{ flex: 1, background: '#111', padding: '40px', borderRadius: '16px', border: '1px solid #222' }}>
               <Code2 size={40} style={{ color: '#fff', marginBottom: '20px' }} />
               <p style={{ fontFamily: 'monospace', color: '#888' }}>
                 {`// Scalable Arch`}<br/>
                 {`import { Server } from 'dcoode';`}<br/><br/>
                 {`const app = new Server({`}<br/>
                 {`  loadBalancing: true,`}<br/>
                 {`  cache: 'Redis',`}<br/>
                 {`});`}<br/>
                 {`app.ignite();`}
               </p>
            </div>
          </div>

          {/* Mobile Dev */}
          <div className="sp-detail-row" style={{ flexDirection: 'row-reverse' }}>
            <div style={{ flex: 1 }}>
              <h3 className="sp-text-light" style={{ fontSize: '2rem', marginBottom: '20px' }}>Mobile Development</h3>
              <p style={{ color: '#aaa', marginBottom: '20px' }}><strong>Problem:</strong> Clunky cross-platform bridges and poor UI responsiveness.</p>
              <p style={{ color: '#aaa', marginBottom: '20px' }}><strong>What we build:</strong> High-fidelity iOS and Android applications, utilizing native-grade performance.</p>
              <div style={{ padding: '15px', borderLeft: '3px solid #fff', background: '#111' }}>
                <p style={{ margin: 0, color: '#fff' }}><strong>Outcome:</strong> Seamless, buttery-smooth mobile experiences that users actually want to interact with.</p>
              </div>
            </div>
            <div style={{ flex: 1, background: '#111', padding: '40px', borderRadius: '16px', border: '1px solid #222' }}>
               <Smartphone size={40} style={{ color: '#fff', marginBottom: '20px' }} />
               <p style={{ fontFamily: 'monospace', color: '#888' }}>
                 {`<SafeAreaView>`}<br/>
                 {`  <Animated.View>`}<br/>
                 {`    <FlawlessUI />`}<br/>
                 {`  </Animated.View>`}<br/>
                 {`</SafeAreaView>`}
               </p>
            </div>
          </div>
        </section>

        {/* 4. TECH STACK */}
        <section style={{ padding: '80px 0', borderTop: '1px solid #222', borderBottom: '1px solid #222' }}>
          <div className="ap-sec-header">
            <span className="ap-badge sp-badge-light">Credibility</span>
            <h2 className="sp-text-light">The Engine Room</h2>
            <p className="sp-text-gray-light">We don't use hype tech. We use proven, enterprise-grade stacks.</p>
          </div>
          <div className="sp-tech-grid">
            <div className="sp-tech-item" style={{ background: '#111', color: '#fff', borderColor: '#333' }}>React / Next.js</div>
            <div className="sp-tech-item" style={{ background: '#111', color: '#fff', borderColor: '#333' }}>Node.js</div>
            <div className="sp-tech-item" style={{ background: '#111', color: '#fff', borderColor: '#333' }}>MongoDB / Postgres</div>
            <div className="sp-tech-item" style={{ background: '#111', color: '#fff', borderColor: '#333' }}>AWS / Docker</div>
            <div className="sp-tech-item" style={{ background: '#111', color: '#fff', borderColor: '#333' }}>Redis</div>
          </div>
        </section>

        {/* 5. PROCESS */}
        <section style={{ padding: '120px 0' }}>
          <div className="ap-sec-header">
            <span className="ap-badge sp-badge-light">Methodology</span>
            <h2 className="sp-text-light">Execution Protocol</h2>
            <p className="sp-text-gray-light">A structured, chaos-free development pipeline.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {['Requirement Analysis', 'Architecture Planning', 'Development Engine', 'QA & Testing', 'Production Deployment'].map((step, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', background: '#0a0a0a', border: '1px solid #222', padding: '20px 40px', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '2rem', color: '#333', marginRight: '40px' }}>0{idx + 1}</h3>
                <h4 className="sp-text-light" style={{ fontSize: '1.2rem', margin: 0 }}>{step}</h4>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 6. PORTFOLIO / CASE STUDIES (White Section) */}
      <div className="sp-white-section">
        <div className="sp-white-bg-grid"></div>
        <div className="ap-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ap-sec-header">
            <span className="ap-badge sp-badge-dark">Proof of Work</span>
            <h2 className="sp-text-dark">Case Studies</h2>
            <p className="sp-text-gray-dark">Real problems solved with heavy-duty engineering.</p>
          </div>

          <div className="ap-grid">
            <div className="ap-card sp-card-dark">
              <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '15px' }}>Fintech Dashboard</h3>
              <p style={{ marginTop: '15px' }}><strong>Problem:</strong> Legacy system could not handle concurrent data streams.</p>
              <p><strong>Built:</strong> Real-time React dashboard with Redis caching layer.</p>
              <p style={{ color: '#fff' }}><strong>Result:</strong> 300% faster data rendering, zero latency dropouts.</p>
            </div>
            <div className="ap-card sp-card-dark">
              <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '15px' }}>E-Commerce Engine</h3>
              <p style={{ marginTop: '15px' }}><strong>Problem:</strong> Checkout flow abandoned due to slow load times.</p>
              <p><strong>Built:</strong> Next.js headless architecture mapped to a microservices backend.</p>
              <p style={{ color: '#fff' }}><strong>Result:</strong> 40% increase in conversion, sub-second load times.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="ap-container">
        {/* 7. WHY CHOOSE US */}
        <section style={{ padding: '120px 0' }}>
          <div className="ap-sec-header">
            <span className="ap-badge sp-badge-light">Advantage</span>
            <h2 className="sp-text-light">Why Dcoode</h2>
          </div>
          <div className="ap-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div style={{ background: '#111', padding: '30px', borderRadius: '16px', border: '1px solid #222' }}>
              <Terminal size={24} style={{ color: '#fff', marginBottom: '15px' }} />
              <h4 className="sp-text-light" style={{ marginBottom: '10px' }}>Real Project-Based</h4>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>We don't build toys. Every project solves a real business problem.</p>
            </div>
            <div style={{ background: '#111', padding: '30px', borderRadius: '16px', border: '1px solid #222' }}>
              <Database size={24} style={{ color: '#fff', marginBottom: '15px' }} />
              <h4 className="sp-text-light" style={{ marginBottom: '10px' }}>Internship-Driven</h4>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>Executed by hungry talent under strict senior architectural oversight.</p>
            </div>
            <div style={{ background: '#111', padding: '30px', borderRadius: '16px', border: '1px solid #222' }}>
              <Zap size={24} style={{ color: '#fff', marginBottom: '15px' }} />
              <h4 className="sp-text-light" style={{ marginBottom: '10px' }}>Fast Turnaround</h4>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>Lean agile pipelines ensure rapid delivery without sacrificing quality.</p>
            </div>
            <div style={{ background: '#111', padding: '30px', borderRadius: '16px', border: '1px solid #222' }}>
              <ShieldCheck size={24} style={{ color: '#fff', marginBottom: '15px' }} />
              <h4 className="sp-text-light" style={{ marginBottom: '10px' }}>Scalable Architecture</h4>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>Codebases that don't need a total rewrite when your user base 10xs.</p>
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS */}
        <section style={{ padding: '0 0 120px 0' }}>
          <div style={{ background: '#0a0a0a', padding: '60px', borderRadius: '24px', border: '1px solid #222', textAlign: 'center' }}>
            <p style={{ fontSize: '1.5rem', fontStyle: 'italic', color: '#fff', marginBottom: '30px' }}>
              "Dcoode didn't just build our platform; they architected our entire digital strategy. The codebase is incredibly clean and resilient."
            </p>
            <div>
              <strong style={{ display: 'block', color: '#fff' }}>Sarah J.</strong>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>Tech Founder</span>
            </div>
          </div>
        </section>
      </div>

      {/* 9. FAQ (White Section) */}
      <div className="sp-white-section" style={{ padding: '100px 0' }}>
        <div className="ap-container">
          <div className="ap-sec-header">
            <h2 className="sp-text-dark">Frequently Asked Questions</h2>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="sp-faq-item">
              <h4>How long does a typical project take?</h4>
              <p>Depending on scope, MVPs take 4-6 weeks, while enterprise systems can take 3-6 months.</p>
            </div>
            <div className="sp-faq-item">
              <h4>What technologies do you use?</h4>
              <p>We primarily utilize React, Next.js, Node.js, and Postgres/Mongo, deployed via AWS and Docker.</p>
            </div>
            <div className="sp-faq-item">
              <h4>Do you provide ongoing support?</h4>
              <p>Yes. We offer continuous integration, maintenance, and scaling support post-launch.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 10. FINAL CTA */}
      <div className="ap-container">
        <section className="ap-cta" style={{ background: '#0a0a0a', border: '1px solid #222', margin: '120px auto' }}>
           <h2 style={{ color: '#fff' }}>Ready to Build?</h2>
           <p style={{ color: '#aaa' }}>Stop settling for average. Let's architect something extraordinary.</p>
           <button className="ap-btn-white sp-btn-green">
             Start Your Project
           </button>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;
