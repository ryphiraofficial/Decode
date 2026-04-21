import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Internships = () => {
  const { scrollYProgress } = useScroll();
  const xTranslate = useTransform(scrollYProgress, [0, 1], [-200, 200]);

  const tracks = [
    { 
      duration: "01 Month", 
      title: "Fast Track", 
      desc: "Architectural overview and industrial basics for rapid skill acquisition.",
      accent: "#111" 
    },
    { 
      duration: "03 Month", 
      title: "Core Engineering", 
      desc: "Deep technical proficiency and contribution to high-stakes production features.",
      accent: "var(--primary)" 
    },
    { 
      duration: "06 Month", 
      title: "Architect Level", 
      desc: "Complete professional transformation with real-world industrial placement prep.",
      accent: "#111" 
    }
  ];

  return (
    <section id="internships" style={{ 
      padding: '160px 0', 
      position: 'relative', 
      overflow: 'hidden',
      background: '#000'
    }}>
      {/* Infinite scrolling data background */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          top: '30%', 
          left: 0, 
          whiteSpace: 'nowrap', 
          fontSize: '15vw', 
          fontWeight: 900, 
          color: 'rgba(255, 255, 255, 0.01)', 
          zIndex: 0,
          fontFamily: 'var(--font-heading)',
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.03)',
          x: xTranslate,
          pointerEvents: 'none'
        }}
      >
        INDUSTRIAL TRACKS 2026 ARCHITECTURE FIRST
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label" 
            style={{ justifyContent: 'center' }}
          >
            Elite Programs
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, textTransform: 'uppercase' }}
          >
            Engineering <span className="text-gradient">Internships</span>
          </motion.h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', 
          gap: '32px' 
        }}>
          {tracks.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -12 }}
              style={{
                background: 'rgba(255, 255, 255, 0.01)',
                border: `1px solid ${item.accent === 'var(--primary)' ? 'var(--primary-glow)' : 'var(--surface-border)'}`,
                padding: '60px 48px',
                borderRadius: '2px',
                position: 'relative',
                transition: 'border-color 0.4s ease'
              }}
            >
              <div style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginBottom: '32px', letterSpacing: '2px' }}>
                {item.duration} TRACK
              </div>
              <h3 style={{ fontSize: '2.2rem', marginBottom: '24px', textTransform: 'uppercase', fontWeight: 800 }}>{item.title}</h3>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '40px', minHeight: '80px' }}>{item.desc}</p>
              
              <ul style={{ listStyle: 'none', color: '#666', marginBottom: '48px', fontSize: '0.9rem' }}>
                {["Live Architecture Reviews", "Industrial Coding Standards", "Senior Mentor Access"].map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <div style={{ width: '4px', height: '1px', background: 'var(--primary)' }} /> {feat}
                  </li>
                ))}
              </ul>

              <button className={item.accent === 'var(--primary)' ? 'btn-primary' : 'btn-outline'} style={{ width: '100%', justifyContent: 'center' }}>
                Enroll Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Internships;
