import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layers, Smartphone, Layout, Cloud, ArrowRight, CheckCircle2, Terminal, Code2, Database, ShieldCheck, Zap } from 'lucide-react';
import './css/AboutPage.css'; // Global structure
import './css/ServicesPage.css'; // Specific overrides and new styles

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Setup high-performance scroll observer for entrance animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: "0px 0px -40px 0px"
    });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

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
      <Helmet>
        <title>IT Solutions & Custom Software Development in Kerala | Dcoode | Codropic</title>
        <meta name="description" content="Ranked #1 IT Solutions Company in Kerala. We specialize in enterprise web engineering, mobile app development, and cloud solutions. Located in Pathiripala, Ottapalam." />
        <meta name="keywords" content="IT solutions Kerala, custom software development Ottapalam, IT company Pathirippala, managed IT services Kerala, top web development Palakkad, cybersecurity services Kerala, enterprise web engineering" />
        {/* GEO Tags specific to this page */}
        <meta name="geo.region" content="IN-KL" />
        <meta name="geo.placename" content="Pathirippala, Ottapalam, Kerala" />
        <meta name="geo.position" content="10.7801;76.4753" />
        <meta name="ICBM" content="10.7801, 76.4753" />
      </Helmet>

      {/* 1. HERO SECTION */}
      <section className="sp-hero">
        <div className="ap-hero-bg-shapes">
          <div className="ap-shape sp-hero-shape-1"></div>
          <div className="ap-shape sp-hero-shape-2"></div>
        </div>
        <div className="ap-container">
          <h1 className="sp-hero-title animate-on-scroll hero-slide-up" style={{ transitionDelay: '0.3s' }}>
            Solutions Engineered <span className="sp-hero-subtitle">For Scale</span>
          </h1>
          <p className="sp-hero-desc animate-on-scroll hero-slide-up" style={{ transitionDelay: '0.6s' }}>
            Dcoode specializes in translating complex business logic into high-end technical implementations. From stealth startups to global enterprises, we architect the future.
          </p>
          <div className="animate-on-scroll hero-slide-up" style={{ transitionDelay: '0.9s' }}>
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
          </div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW GRID (White Section) */}
      <div className="sp-white-section" id="capabilities-grid">
        <div className="sp-white-bg-grid"></div>
        <div className="sp-white-bg-line-left"></div>
        <div className="sp-white-bg-line-right"></div>

        <div className="ap-container">
          <section>
            <div className="ap-sec-header animate-on-scroll fade-up">
              <span className="ap-badge sp-badge-dark">Capabilities</span>
              <h2 className="sp-text-dark">Digital Architecture</h2>
              <p className="sp-text-gray-dark">Precision-driven services designed for modern digital ecosystems.</p>
            </div>

            <div className="ap-grid">
              {serviceDetails.map((service, idx) => {
                const isDark = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`ap-card ${isDark ? 'sp-card-dark' : 'sp-card-white'} animate-on-scroll ${idx % 2 === 0 ? 'slide-left' : 'slide-right'}`}
                    style={{ transitionDelay: `${idx * 0.08}s` }}
                  >
                    <div className="ap-card-icon">
                      {service.icon}
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <div className="ap-container">

        {/* 3. DETAILED SERVICE SECTIONS */}
        <section style={{ padding: '140px 0' }}>
          <div className="ap-sec-header animate-on-scroll fade-up">
            <span className="ap-badge sp-badge-light">Deep Dive</span>
            <h2 className="sp-text-light">What We Actually Do</h2>
          </div>

          {/* Web Dev */}
          <div className="sp-detail-row">
            <div className="sp-detail-content animate-on-scroll slide-left">
              <h3 className="sp-text-light sp-detail-title">Web Engineering</h3>
              <p className="sp-detail-desc">
                <strong>Problem:</strong> Slow load times, messy legacy spaghetti codebases, security holes, and poor organic SEO ranking.
              </p>
              <p className="sp-detail-desc">
                <strong>What we build:</strong> State-of-the-art SaaS platforms, real-time analytics dashboards, robust head-less e-commerce engines, and highly secure REST/GraphQL API systems.
              </p>
              <div className="sp-detail-quote">
                <p className="sp-detail-quote-text">
                  <strong>Outcome:</strong> Blazing-fast, ultra-scalable, enterprise-ready web applications that easily absorb traffic spikes and convert users effortlessly.
                </p>
              </div>
            </div>

            <div className="sp-detail-media animate-on-scroll slide-right">
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
                      <span className="sp-code-highlight">// High-Scale Ignite Architecture</span><br />
                      <span className="sp-code-keyword">import</span> {'{ Server }'} <span className="sp-code-keyword">from</span> <span className="sp-code-tag">'dcoode-core'</span>;<br />
                      <span className="sp-code-keyword">import</span> Redis <span className="sp-code-keyword">from</span> <span className="sp-code-tag">'ioredis'</span>;<br /><br />
                      <span className="sp-code-keyword">const</span> app = <span className="sp-code-keyword">new</span> Server({'{'}<br />
                      &nbsp;&nbsp;loadBalancing: <span className="sp-code-keyword">true</span>,<br />
                      &nbsp;&nbsp;cache: <span className="sp-code-keyword">new</span> Redis(),<br />
                      &nbsp;&nbsp;security: <span className="sp-code-tag">'military-grade'</span>,<br />
                      {'})'};<br /><br />
                      app.ignite().then(() =&gt; {'{'}<br />
                      &nbsp;&nbsp;console.log(<span className="sp-code-tag">'System running flawlessly'</span>);<br />
                      {'})'};
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Dev */}
          <div className="sp-detail-row" style={{ flexDirection: 'row-reverse' }}>
            <div className="sp-detail-content animate-on-scroll slide-right">
              <h3 className="sp-text-light sp-detail-title">Mobile Development</h3>
              <p className="sp-detail-desc">
                <strong>Problem:</strong> Clunky hybrid app wrapper bridges, sluggish navigation, high battery usage, and outdated layouts.
              </p>
              <p className="sp-detail-desc">
                <strong>What we build:</strong> High-performance iOS and Android applications utilizing React Native and Flutter, fine-tuned with native Swift/Kotlin modules when necessary.
              </p>
              <div className="sp-detail-quote">
                <p className="sp-detail-quote-text">
                  <strong>Outcome:</strong> Responsive, butter-smooth native mobile experiences that users love, generating outstanding App Store ratings.
                </p>
              </div>
            </div>

            <div className="sp-detail-media animate-on-scroll slide-left">
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
                      <span className="sp-code-highlight">// High-Fidelity UI Animation</span><br />
                      <span className="sp-code-keyword">import</span> React <span className="sp-code-keyword">from</span> <span className="sp-code-tag">'react'</span>;<br />
                      <span className="sp-code-keyword">import</span> {'{ Animated }'} <span className="sp-code-keyword">from</span> <span className="sp-code-tag">'react-native'</span>;<br /><br />
                      <span className="sp-code-keyword">export default function</span> App() {'{'}<br />
                      &nbsp;&nbsp;<span className="sp-code-keyword">return</span> (<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="sp-code-keyword">SafeAreaView</span>&gt;<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="sp-code-keyword">Animated.View</span> style={'{styles.glow}'}&gt;<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="sp-code-keyword">DcoodeCoreMobileEngine</span> /&gt;<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="sp-code-keyword">Animated.View</span>&gt;<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="sp-code-keyword">SafeAreaView</span>&gt;<br />
                      &nbsp;&nbsp;);<br />
                      {'}'}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TECH STACK */}
        <section style={{ padding: '80px 0', borderTop: '1px solid #161616', borderBottom: '1px solid #161616' }}>
          <div className="ap-sec-header animate-on-scroll fade-up">
            <span className="ap-badge sp-badge-light">Credibility</span>
            <h2 className="sp-text-light">The Engine Room</h2>
            <p className="sp-text-gray-light">We do not use hype technology. We use bulletproof, industry-proven stacks.</p>
          </div>

          <div className="sp-tech-grid">
            {['React / Next.js', 'Node.js / Express', 'MongoDB / PostgreSQL', 'AWS / Kubernetes', 'Redis / Microservices'].map((tech, idx) => (
              <div
                key={idx}
                className={`sp-tech-item animate-on-scroll ${idx % 2 === 0 ? 'slide-left' : 'slide-right'}`}
                style={{ transitionDelay: `${idx * 0.08}s` }}
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* 5. PROCESS */}
        <section style={{ padding: '140px 0' }}>
          <div className="ap-sec-header animate-on-scroll fade-up">
            <span className="ap-badge sp-badge-light">Methodology</span>
            <h2 className="sp-text-light">Execution Protocol</h2>
            <p className="sp-text-gray-light">A highly structured, transparent, and chaos-free software pipeline.</p>
          </div>

          <div className="sp-process-list">
            {['Requirement Analysis & Architecture', 'Comprehensive Database & API Planning', 'Core Front-End & Back-End Coding', 'Automated QA & Unit Integration Testing', 'Zero-Downtime Live AWS Deployment'].map((step, idx) => (
              <div
                key={idx}
                className={`sp-process-item animate-on-scroll ${idx % 2 === 0 ? 'slide-left' : 'slide-right'}`}
                style={{ transitionDelay: `${idx * 0.08}s` }}
              >
                <div className="sp-process-num">0{idx + 1}</div>
                <h4 className="sp-text-light sp-process-title">{step}</h4>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 6. PORTFOLIO / CASE STUDIES (White Section) */}
      <div className="sp-white-section">
        <div className="sp-white-bg-grid"></div>
        <div className="sp-white-bg-line-left"></div>
        <div className="sp-white-bg-line-right"></div>

        <div className="ap-container">
          <section>
            <div className="ap-sec-header animate-on-scroll fade-up">
              <span className="ap-badge sp-badge-dark">Partnership</span>
              <h2 className="sp-text-dark">Engagement Models</h2>
              <p className="sp-text-gray-dark">Flexible ways to collaborate with us based on your project requirements.</p>
            </div>

            <div className="ap-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              <div
                className="sp-case-card animate-on-scroll slide-left"
                style={{ transitionDelay: '0s', background: '#fcfcfc', border: '1px solid #e0e0e0', padding: '40px 30px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ background: '#161616', color: '#fff', borderRadius: '8px', padding: '8px', display: 'flex' }}>
                    <Code2 size={24} />
                  </div>
                  <h3 className="sp-case-title" style={{ margin: 0, color: '#161616' }}>Fixed-Scope Project</h3>
                </div>
                <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Best for defined products, MVPs, or websites with clear requirements. We establish a set price and delivery timeline upfront, providing predictable execution from start to finish.
                </p>
              </div>

              <div
                className="sp-case-card animate-on-scroll slide-right"
                style={{ transitionDelay: '0.1s', background: '#fcfcfc', border: '1px solid #e0e0e0', padding: '40px 30px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ background: '#161616', color: '#fff', borderRadius: '8px', padding: '8px', display: 'flex' }}>
                    <Terminal size={24} />
                  </div>
                  <h3 className="sp-case-title" style={{ margin: 0, color: '#161616' }}>Dedicated Team</h3>
                </div>
                <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Ideal for growing products requiring continuous iteration, scaling, or ongoing maintenance. Rent our engineers on a monthly basis to integrate seamlessly into your company workflow.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="ap-container">
        {/* 7. WHY CHOOSE US */}
        <section style={{ padding: '140px 0' }}>
          <div className="ap-sec-header animate-on-scroll fade-up">
            <span className="ap-badge sp-badge-light">Advantage</span>
            <h2 className="sp-text-light">Why Dcoode</h2>
          </div>

          <div
            className="ap-grid"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
          >
            <div
              className="sp-why-card animate-on-scroll slide-left"
              style={{ transitionDelay: '0s' }}
            >
              <Terminal size={26} className="sp-why-icon" />
              <h4 className="sp-text-light sp-why-title">Production Quality</h4>
              <p className="sp-why-desc">We do not construct toy models. Everything we ship is solid, secure, and ready for market operations.</p>
            </div>

            <div
              className="sp-why-card animate-on-scroll slide-right"
              style={{ transitionDelay: '0.08s' }}
            >
              <Database size={26} className="sp-why-icon" />
              <h4 className="sp-text-light sp-why-title">Internship Powered</h4>
              <p className="sp-why-desc">Built by energetic, brilliant developers under the direct supervision of elite senior architects.</p>
            </div>

            <div
              className="sp-why-card animate-on-scroll slide-left"
              style={{ transitionDelay: '0.16s' }}
            >
              <Zap size={26} className="sp-why-icon" />
              <h4 className="sp-text-light sp-why-title">High Speed Cycles</h4>
              <p className="sp-why-desc">Lean scrum methodology allows us to release new builds quickly without sacrificing security or details.</p>
            </div>

            <div
              className="sp-why-card animate-on-scroll slide-right"
              style={{ transitionDelay: '0.24s' }}
            >
              <ShieldCheck size={26} className="sp-why-icon" />
              <h4 className="sp-text-light sp-why-title">Infinite Scalability</h4>
              <p className="sp-why-desc">We structure architecture that scales automatically when your active daily user metric spikes 10x.</p>
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS */}
        <section style={{ padding: '0 0 140px 0' }}>
          <div className="sp-testimonial-wrap animate-on-scroll fade-up">
            <p className="sp-testimonial-text">
              "Dcoode did not just code our interface; they engineered our technical blueprint. The platform easily handles heavy traffic drops with supreme resilience."
            </p>
            <div className="sp-testimonial-author">
              <strong>Elena Rostova</strong>
              <span>Chief Technology Officer, Neobank</span>
            </div>
          </div>
        </section>
      </div>

      {/* 9. FAQ (White Section) */}
      <div className="sp-white-section" style={{ padding: '120px 0' }}>
        <div className="sp-white-bg-grid"></div>
        <div className="sp-white-bg-line-left"></div>
        <div className="sp-white-bg-line-right"></div>

        <div className="ap-container">
          <section>
            <div className="ap-sec-header animate-on-scroll fade-up" style={{ margin: '0 auto 60px auto', textAlign: 'center' }}>
              <span className="ap-badge sp-badge-dark">Information</span>
              <h2 className="sp-text-dark">Frequently Asked Questions</h2>
            </div>

            <div className="sp-faq-list">
              <div
                className="sp-faq-card animate-on-scroll slide-left"
                style={{ transitionDelay: '0s' }}
              >
                <h4>How long does a typical project cycle take?</h4>
                <p>Depending on complexity, structured MVP versions take 4–6 weeks. Full-scale global enterprise systems span 3–5 months.</p>
              </div>

              <div
                className="sp-faq-card animate-on-scroll slide-right"
                style={{ transitionDelay: '0.08s' }}
              >
                <h4>Which technology architectures are used?</h4>
                <p>We primarily build on React, Next.js, Node.js, PostgreSQL/MongoDB, Redis, Docker, and Kubernetes hosted on AWS.</p>
              </div>

              <div
                className="sp-faq-card animate-on-scroll slide-left"
                style={{ transitionDelay: '0.16s' }}
              >
                <h4>Do you offer post-production engineering support?</h4>
                <p>Absolutely. We provide continuous CI/CD pipelines, DevOps monitoring, bug remediation, and hardware capacity upgrades.</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 10. FINAL CTA */}
      <div className="ap-container">
        <section className="ap-cta">
          <h2 className="animate-on-scroll fade-up">
            Ready to Build?
          </h2>
          <p className="animate-on-scroll fade-up" style={{ transitionDelay: '0.15s' }}>
            Stop compromising on quality. Let us engineer a digital architecture that sets your business apart.
          </p>
          <div className="animate-on-scroll scale-up" style={{ transitionDelay: '0.30s' }}>
            <button
              className="sp-btn-green"
              onClick={() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }}
            >
              Start Your Project
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;
