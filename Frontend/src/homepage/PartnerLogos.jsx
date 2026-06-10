import React from 'react';
import './css/PartnerLogos.css';

const PartnerLogos = () => {
  const logos = [
    { name: 'Leanlytics', url: '/partners logos/partners 1.png', darken: true },
    { name: 'Textra', url: '/partners logos/partners2.png', darken: true },
    { name: 'UXHub', url: '/partners logos/uxhub-logo.svg' },
    { name: 'Ryphira', url: '/partners logos/ryphira.jpeg' },
    { name: 'NCERC', url: '/partners logos/ncerc.jpeg' },
    { name: 'Nehru', url: '/partners logos/neharu.jpeg' },
    { name: 'Army', url: '/partners logos/army.jpeg' },
    { name: 'Navy', url: '/partners logos/navy.jpeg' },
    { name: 'Poly', url: '/partners logos/poly.jpeg' },
    { name: 'QA', url: '/partners logos/Qa.jpeg' },
    { name: 'JCET', url: '/partners logos/jcet.png' },
    { name: 'Cloudeleven', url: '/partners logos/cloudeleven.png' },
  ];

  return (
    <section className="partner-section">
      <div className="partner-container">
        <p className="partner-title">TRUSTED BY INNOVATIVE BRANDS</p>
        
        {/* Desktop & Tablet Grid */}
        <div className="partner-grid-desktop">
          {logos.map((logo, index) => (
            <div className={`partner-logo-item logo-${logo.name.toLowerCase()} ${logo.darken ? 'darken-logo' : ''}`} key={index}>
              <img src={logo.url} alt={logo.name} />
            </div>
          ))}
        </div>

        {/* Mobile Auto-Scrolling Marquee */}
        <div className="partner-marquee-wrapper">
          <div className="partner-marquee-track">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div className={`partner-logo-item logo-${logo.name.toLowerCase()} ${logo.darken ? 'darken-logo' : ''}`} key={`m1-${index}`}>
                <img src={logo.url} alt={logo.name} />
              </div>
            ))}
            {/* Duplicated set of logos for infinite loop */}
            {logos.map((logo, index) => (
              <div className={`partner-logo-item logo-${logo.name.toLowerCase()} ${logo.darken ? 'darken-logo' : ''}`} key={`m2-${index}`}>
                <img src={logo.url} alt={logo.name} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PartnerLogos;
