import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const LegalPage = ({ title }) => {
  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <section style={{ padding: '200px 0 100px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '40px' }}>{title}</h1>
          <div style={{ color: 'var(--text-dim)', lineHeight: '1.8', fontSize: '1.05rem' }}>
            <p style={{ marginBottom: '20px' }}>
              Welcome to Decoode. This {title.toLowerCase()} document outlines the rules and regulations for the use of our website and services.
            </p>
            <h3 style={{ color: '#fff', marginTop: '40px', marginBottom: '15px' }}>1. Data Collection</h3>
            <p style={{ marginBottom: '20px' }}>
              We value your privacy. Any data collected through our enrollment forms or contact modals is used strictly for internal processing and communication regarding our programs.
            </p>
            <h3 style={{ color: '#fff', marginTop: '40px', marginBottom: '15px' }}>2. Intellectual Property</h3>
            <p style={{ marginBottom: '20px' }}>
              The curriculum, projects, and architectural patterns provided during our internship tracks are the intellectual property of Decoode.
            </p>
            <h3 style={{ color: '#fff', marginTop: '40px', marginBottom: '15px' }}>3. Professional Conduct</h3>
            <p style={{ marginBottom: '20px' }}>
              Interns and clients are expected to maintain a high standard of professional ethics while engaging with our platform and staff.
            </p>
            <p style={{ marginTop: '60px', fontStyle: 'italic' }}>
              Last Updated: April 21, 2026
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LegalPage;
