import React from 'react';
import { Link } from 'react-router-dom';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-luxury">
      <div className="container footer-container">
        
        {/* Top CTA Row */}
        <div className="footer-cta-row">
          <div className="footer-cta-text">
            <h2>Get started now!</h2>
            <p>It takes less than a minute of your time.</p>
          </div>
          <div className="footer-cta-action">
            <a href="mailto:dcoodeofficial@gmail.com" className="footer-cta-btn">
              Request a quote <span className="arrow">→</span>
            </a>
          </div>
        </div>

        {/* Directory Columns */}
        <div className="footer-directory-grid">
          
          {/* Column 1: Company */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/services">Industries</Link></li>
              {/* <li><Link to="/all-courses">Works</Link></li> */}
              <li><a href="mailto:dcoodeofficial@gmail.com">Careers</a></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Branding</Link></li>
              <li><Link to="/services">Experience Design</Link></li>
              <li><Link to="/services">Technology</Link></li>
              <li><Link to="/services">Digital Marketing</Link></li>
            </ul>
          </div>

          {/* Column 3: Other */}
          <div className="footer-col">
            <h4>Other</h4>
            <ul>
              <li><a href="mailto:dcoodeofficial@gmail.com">Partnership</a></li>
              <li><Link to="/about">Awards and Recognitions</Link></li>
              <li><Link to="/blog">Insights</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/about">Resource Augmentation</Link></li>
              <li><Link to="/about">Testimonials</Link></li>
              <li><Link to="/about">Our Clients</Link></li>
              <li><a href="mailto:dcoodeofficial@gmail.com">Submit Feedback to Our CEO</a></li>
              <li><a href="/browsher/DCOODE.pdf" download="DCOODE-Brochure.pdf">Download Brochure</a></li>
              <li><a href="/legal">Sitemap</a></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="footer-col connect-col">
            <h4>Connect</h4>
            <ul className="connect-details">
              <li>
                <span className="connect-label">General Enquiry</span>
                <span className="connect-value">: <a href="tel:+91 85478 65694">+91 85478 65694</a></span>
              </li>
              
              <li>
                <span className="connect-label">Email</span>
                <span className="connect-value">: <a href="mailto:dcoodeofficial@gmail.com">dcoodeofficial@gmail.com</a></span>
              </li>
             
              <li>
                <span className="connect-label">Whatsapp</span>
                <span className="connect-value">: <a href="https://wa.me/918547865694" target="_blank" rel="noopener noreferrer">+91 85478 65694</a></span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            DCOODE © 2026 All rights reserved.
          </div>
          
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="divider">|</span>
            <Link to="/terms">Terms & Conditions</Link>
          </div>

          <div className="footer-socials">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/dcoode/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="social-icon">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            
            {/* YouTube */}
            {/* <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" title="YouTube">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="social-icon">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a> */}

            {/* Instagram */}
            <a href="https://www.instagram.com/_dcoode_/" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="social-icon">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Facebook */}
            {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="social-icon">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a> */}

            {/* Website / Globe */}
            <a href="https://dcoode.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Website">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="social-icon">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </a>

            {/* Behance */}
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="social-link" title="Behance">
              <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon" style={{ width: '18px', height: '18px', transform: 'translateY(1px)' }}>
                <path d="M8.228 15.011c0 .874-.756 1.581-1.688 1.581H3.619v-3.162h2.922c.932.001 1.687.708 1.687 1.581zm-.317-5.322c0 .807-.698 1.46-1.558 1.46H3.619V8.228h2.734c.86 0 1.558.653 1.558 1.461zM12 13.43c0-4.088-2.617-6.096-6.381-6.096H0v12.332h5.81c4.01 0 6.19-2.072 6.19-6.236zm9.294 1.157h-4.06c.11 1.05.9 1.613 2.1 1.613.88 0 1.588-.344 1.838-.938h2.006c-.45 1.782-2.1 2.906-3.844 2.906-3.088 0-4.225-2.28-4.225-4.756 0-2.838 1.344-4.838 4.088-4.838 2.656 0 3.962 1.888 3.962 4.544 0 .619-.05 1.181-.162 1.469zm-1.894-1.644c-.05-.988-.706-1.575-1.787-1.575-1.038 0-1.713.563-1.956 1.575h3.743zm-3.6-4.63h3.45v1.206h-3.45v-1.206z" />
              </svg>
            </a>

            {/* X */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-link" title="X (Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon" style={{ width: '15px', height: '15px' }}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
