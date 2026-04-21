import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import './css/Services.css'; // Reusing some base styles

const ServicesPage = () => {
  const serviceDetails = [
    {
      title: "Enterprise Web Engineering",
      subtitle: "High-Performance Systems",
      desc: "We build scalable, resilient web architectures using MERN, Next.js, and specialized microservices. Our focus is on atomic performance and technical SEO.",
      features: ["Server-Side Rendering", "Custom CMS Integration", "API Architecture", "Performance Optimization"]
    },
    {
      title: "Mobile App Development",
      subtitle: "Cross-Platform Precision",
      desc: "Architecting high-fidelity mobile experiences with React Native and Flutter. We bridge the gap between native performance and hybrid efficiency.",
      features: ["iOS & Android Sync", "Native Bridge Modules", "Offline-First Design", "Real-time Push Systems"]
    },
    {
      title: "UI/UX Architecture",
      subtitle: "Design Systems & High Fidelity",
      desc: "We don't just design; we architect visual languages. Building robust design systems that scale with your brand across every digital touchpoint.",
      features: ["Component Libraries", "Brand Visual Identity", "Interactive Prototypes", "Handoff Documentation"]
    },
    {
      title: "Cloud & DevOps Solutions",
      subtitle: "Infrastructure as Code",
      desc: "Automating your deployment pipeline with Kubernetes, Docker, and AWS. Zero-downtime releases and immutable infrastructure for peace of mind.",
      features: ["CI/CD Pipelines", "Container Orchestration", "Security Audits", "Scalability Testing"]
    }
  ];

  return (
    <div className="services-page-wrapper" style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="services-hero sep-curve-bottom-dark" style={{ padding: '200px 0 160px', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label"
          >
            Digital Architecture
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hero-title" 
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: '1', marginBottom: '30px' }}
          >
            Solutions Engineered <br />
            <span className="text-gradient">For Scale.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'var(--text-dim)', lineHeight: '1.6' }}
          >
            Decoode specializes in translating complex business logic into high-end technical implementations. From startups to enterprises, we architect the future.
          </motion.p>
        </div>
        
        {/* Background Decorative Element */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '20%', 
            right: '-10%', 
            width: '600px', 
            height: '600px', 
            background: 'var(--primary-glow)', 
            filter: 'blur(200px)', 
            borderRadius: '50%',
            opacity: 0.1,
            zIndex: 0
          }} 
        />
      </section>

      {/* Main Services Detail */}
      <section style={{ padding: '100px 0', background: '#0a0a0a' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '40px' }}>
            {serviceDetails.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid var(--border-dim)', 
                  padding: '50px',
                  borderRadius: '20px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ marginBottom: '30px' }}>
                  <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    {service.subtitle}
                  </span>
                  <h3 style={{ fontSize: '2rem', marginTop: '10px' }}>{service.title}</h3>
                </div>
                <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', marginBottom: '30px' }}>
                  {service.desc}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  {service.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#fff' }}>
                      <div style={{ width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%' }} />
                      {f}
                    </div>
                  ))}
                </div>
                {/* Subtle Glow */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    bottom: '-20%', 
                    right: '-10%', 
                    width: '200px', 
                    height: '200px', 
                    background: 'var(--primary)', 
                    filter: 'blur(100px)', 
                    opacity: 0.05 
                  }} 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="sep-curve-top-dark" style={{ padding: '150px 0', background: '#000' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span className="section-label">Our Workflow</span>
            <h2 style={{ fontSize: '3.5rem' }}>How We <span className="text-gradient">Deliver</span></h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
             {[
               { id: '01', title: 'Consult', d: 'In-depth architecture planning.' },
               { id: '02', title: 'Architect', d: 'UI/UX and Database design.' },
               { id: '03', title: 'Engine', d: 'High-performance coding.' },
               { id: '04', title: 'Scale', d: 'Deployment and maintenance.' }
             ].map((item, i) => (
               <div key={i} style={{ textAlign: 'center' }}>
                 <div style={{ fontSize: '4rem', fontWeight: '900', opacity: 0.1, marginBottom: '-30px' }}>{item.id}</div>
                 <h4 style={{ fontSize: '1.5rem', marginBottom: '10px', color: 'var(--primary)' }}>{item.title}</h4>
                 <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{item.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
