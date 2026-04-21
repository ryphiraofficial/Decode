import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import Logo from './Logo';
import './css/About.css';

const AboutPage = () => {
  return (
    <div className="about-page-wrapper" style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Hero / Mission */}
      <section style={{ padding: '200px 0 100px', textAlign: 'center' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label" style={{ margin: '0 auto 20px' }}>Our Mission</span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '40px' }}>
              We Bridge The Gap Between <br />
              <span className="text-gradient">Academics & Industry.</span>
            </h1>
            <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', color: 'var(--text-dim)', lineHeight: '1.7' }}>
              Decoode was founded on the belief that traditional education often lags behind the rapidly evolving tech landscape. We provide the mentorship, industrial-grade projects, and architectural oversight needed to turn students into world-class engineers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="sep-curve-top-surface" style={{ padding: '150px 0', background: '#0a0a0a' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { t: "Industrial Fidelity", d: "We don't do 'To-Do' apps. Our interns build scalable microservices and enterprise design systems used in real production." },
              { t: "Architectural Oversight", d: "Every line of code is reviewed by senior architects with years of experience in high-end software houses." },
              { t: "Elite Pedigree", d: "Our curriculum is designed by engineers for engineers, focusing on what actually matters in a high-stakes tech interview." }
            ].map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                style={{ background: '#111', padding: '40px', borderRadius: '15px', border: '1px solid var(--border-dim)' }}
              >
                <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>{v.t}</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.6' }}>{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section (Detailed) */}
      <section className="sep-curve-top-dark" style={{ padding: '150px 0', background: '#000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: '3rem', marginBottom: '30px' }}>Built by <span className="text-gradient">Engineers.</span></h2>
              <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', marginBottom: '40px' }}>
                Our leadership team consists of seasoned full-stack developers and IT consultants who have delivered solutions for global logistics, fintech, and industrial automation. At Decoode, you're not just a student; you're an apprentice to the craft.
              </p>
              <div style={{ display: 'flex', gap: '40px' }}>
                 <div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>15+</div>
                    <p style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '800' }}>YEARS EXP</p>
                 </div>
                 <div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>100+</div>
                    <p style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '800' }}>ALUMNI</p>
                 </div>
              </div>
            </motion.div>
            
            <div style={{ position: 'relative' }}>
               <img src="/Techyguy.png" alt="Founders" style={{ width: '100%', borderRadius: '30px', filter: 'grayscale(1) brightness(0.8)' }} />
               <div style={{ position: 'absolute', inset: 0, border: '2px solid var(--primary)', borderRadius: '30px', transform: 'translate(20px, 20px)', zIndex: -1 }} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
