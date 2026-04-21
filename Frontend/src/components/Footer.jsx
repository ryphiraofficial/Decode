import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer style={{ padding: '120px 0 60px', background: '#000', borderTop: '1px solid #111' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '80px', marginBottom: '80px' }}>
          <div>
            <div style={{ marginBottom: '32px' }}>
              <div className="navbar-logo-container" style={{ '--logo-scale': 1.4 }}>
                <Logo scale={1.4} />
              </div>
            </div>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, maxWidth: '350px', fontSize: '0.95rem' }}>
              Cultivating the next generation of architects through elite training and industry-leading software services.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '32px', textTransform: 'uppercase', fontWeight: 700 }}>Navigate</h4>
            <ul style={{ listStyle: 'none', color: 'var(--text-dim)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a></li>
              <li><a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>Company</a></li>
              <li><a href="#internships" style={{ textDecoration: 'none', color: 'inherit' }}>Internships</a></li>
              <li><a href="#courses" style={{ textDecoration: 'none', color: 'inherit' }}>Courses</a></li>
              <li><a href="#services" style={{ textDecoration: 'none', color: 'inherit' }}>Services</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '32px', textTransform: 'uppercase', fontWeight: 700 }}>Connect</h4>
            <ul style={{ listStyle: 'none', color: 'var(--text-dim)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li>mridul@decoode.com</li>
              <li>LinkedIn / DecoodeAgency</li>
              <li>X @DecoodeArchitects</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '24px', textTransform: 'uppercase', fontWeight: 700 }}>Newsletter</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                    type="text" 
                    placeholder="E-mail" 
                    style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid #1a1a1a', padding: '16px', flex: 1, color: '#fff', borderRadius: '2px', outline: 'none' }} 
                />
                <button className="btn-primary" style={{ padding: '16px' }}>→</button>
            </div>
          </div>
        </div>
        
        <div style={{ 
          paddingTop: '60px', 
          borderTop: '1px solid #111', 
          display: 'flex', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: '24px', 
          color: 'var(--text-dim)',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontFamily: 'var(--font-mono)'
        }}>
          <div>© 2026 DECOODE DIGITAL AGENCY • BUILT IN THE VOID</div>
          <div style={{ display: 'flex', gap: '32px' }}>
            <a href="#" style={{ color: 'inherit' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
