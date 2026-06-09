import React from 'react';
import './css/PartnerLogos.css';

const PartnerLogos = () => {
  const logos = [
    { name: 'Partner 1', url: '/partners logos/partners 1.png' },
    { name: 'Partner 2', url: '/partners logos/partners2.png' },
    { name: 'UXHub', url: '/partners logos/uxhub-logo.svg', isWhite: true },
  ];

  return (
    <section className="partner-section">
      <div className="partner-container">
        <p className="partner-title">TRUSTED BY INNOVATIVE BRANDS</p>
        <div className="partner-flex">
          {logos.map((logo, index) => (
            <div className={`partner-logo-item ${logo.isWhite ? 'force-white' : ''}`} key={index}>
              <img src={logo.url} alt={logo.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
