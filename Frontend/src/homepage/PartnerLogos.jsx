import React from 'react';
import './css/PartnerLogos.css';

const PartnerLogos = () => {
  const logos = [
    { name: 'Leanlytics', url: '/partners logos/partners 1.png' },
    { name: 'Textra', url: '/partners logos/partners2.png' },
    { name: 'UXHub', url: '/partners logos/uxhub-logo.svg' },
    { name: 'Ryphira', url: '/partners logos/ryphira.jpeg' },
    { name: 'NCERC', url: '/partners logos/ncerc.jpeg' },
    { name: 'Nehru', url: '/partners logos/neharu.jpeg' },
    { name: 'Army', url: '/partners logos/army.jpeg' },
    { name: 'Navy', url: '/partners logos/navy.jpeg' },
    { name: 'Poly', url: '/partners logos/poly.jpeg' },
    { name: 'QA', url: '/partners logos/Qa.jpeg' },
  ];

  return (
    <section className="partner-section">
      <div className="partner-container">
        <p className="partner-title">TRUSTED BY INNOVATIVE BRANDS</p>
        <div className="partner-grid">
          {logos.map((logo, index) => (
            <div className="partner-logo-item" key={index}>
              <img src={logo.url} alt={logo.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
