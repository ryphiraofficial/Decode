import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-luxury">
      <div className="container footer-container">
        
        {/* Top Content Row */}
        <div className="footer-top-grid">
          
          {/* Left Column: Brand & Description */}
          <div className="footer-brand-info">
            <div className="footer-logo-container">
              <Logo scale={1.3} />
            </div>
            <p className="footer-brand-description">
              Cultivating the next generation of industrial architects through elite technical training and software services.
            </p>
          </div>

          {/* Right Columns: Directories */}
          <div className="footer-directory-cols">
            
            {/* Column 1: Company */}
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/services">Industries</a></li>
                <li><a href="/all-courses">Works</a></li>
                <li><a href="mailto:dcoodeofficial@gmail.com">Careers</a></li>
                <li><a href="mailto:dcoodeofficial@gmail.com">Contact</a></li>
              </ul>
            </div>

            {/* Column 2: Services */}
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="/services">Branding</a></li>
                <li><a href="/services">Experience Design</a></li>
                <li><a href="/services">Technology</a></li>
                <li><a href="/services">Digital Marketing</a></li>
              </ul>
            </div>

            {/* Column 3: Other */}
            <div className="footer-col">
              <h4>Other</h4>
              <ul>
                <li><a href="mailto:dcoodeofficial@gmail.com">Partnership</a></li>
                <li><a href="/about">Awards and Recognitions</a></li>
                <li><a href="/insights">Insights</a></li>
                <li><a href="/insights">Blogs</a></li>
                <li><a href="/about">Resource Augmentation</a></li>
                <li><a href="/about">Testimonials</a></li>
                <li><a href="/about">Our Clients</a></li>
                <li><a href="mailto:dcoodeofficial@gmail.com">Submit Feedback to Our CEO</a></li>
                <li><a href="mailto:dcoodeofficial@gmail.com">Submit Feedback to Our CEO</a></li>
                <li><a href="#" download>Download Brochure</a></li>
                <li><a href="/legal">Sitemap</a></li>
              </ul>
            </div>

            {/* Column 4: Connect */}
            {/* <div className="footer-col connect-col">
              <h4>Connect</h4>
              <ul className="connect-details">
                <li>
                  <span className="connect-label">General Enquiry</span>
                  <span className="connect-value">: <a href="tel:+914802733111">+91 480 2733 111</a></span>
                </li>
                <li>
                  <span className="connect-label">Sales Enquiry</span>
                  <span className="connect-value">: <a href="tel:+914802733555">+91 480 2733 555</a></span>
                </li>
                <li>
                  <span className="connect-label">Email</span>
                  <span className="connect-value">: <a href="mailto:dcoodeofficial@gmail.com">dcoodeofficial@gmail.com</a></span>
                </li>
                <li>
                  <span className="connect-label">HR Enquiry</span>
                  <span className="connect-value">: <a href="tel:+914802733999">+91 480 2733 999</a></span>
                </li>
                <li>
                  <span className="connect-label">Whatsapp (Sales)</span>
                  <span className="connect-value">: <a href="https://wa.me/918606483399" target="_blank" rel="noopener noreferrer">+91 8606 483 399</a></span>
                </li>
              </ul>
            </div> */}

          </div>
        </div>

        {/* Middle Copyright Row */}
        <div className="footer-mid-row">
          <div className="footer-copyright">
            © 2026 DECOODE All rights reserved.
          </div>
          <div className="footer-attribution">
            Design by DECOODE • Powered by Elite Tech
          </div>
        </div>

        {/* Bottom Giant Wordmark - Scaled SVG for 100% Brand Authenticity */}
        <div className="footer-giant-wordmark">
          <svg 
            viewBox="0 -10 933 157" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="footer-giant-svg"
          >
            <path d="M932.348 24.4668H833.203C826.362 24.4668 820.689 30.144 820.689 36.9911V56.1835H932.348V68.4137L932.418 80.3882H820.759L820.689 100.009C820.689 106.856 826.362 112.533 833.203 112.533H932.348V137H833.203C812.866 137 796.44 120.365 796.44 100.009V36.9911C796.44 16.6351 812.866 0 833.203 0H932.348V24.4668Z" fill="currentColor"/>
            <path d="M299.558 136.994H229.852C192.181 136.994 161.536 106.269 161.536 68.4936C161.536 30.7243 192.181 0 229.852 0H299.558V24.4657H229.852C205.653 24.4657 185.939 44.2325 185.932 68.5C185.932 92.7675 205.647 112.534 229.852 112.534H299.558V137V136.994Z" fill="currentColor"/>
            <path d="M68.4008 0.198188L0 0V137H68.5991C87.4103 137 104.463 129.367 116.814 116.842C118.182 115.474 119.558 114.1 120.734 112.731C130.924 100.795 137 85.3302 137 68.5032C137 30.7322 106.228 0.198188 68.4072 0.198188H68.4008ZM68.4008 112.738H24.3055V24.665H68.4008C92.7 24.665 112.496 44.4328 112.496 68.7014C112.496 92.97 92.7 112.738 68.4008 112.738Z" fill="currentColor"/>
            <path d="M540.459 0H392.976C354.937 0 324.095 29.5567 324.095 68.369C324.095 107.181 353.977 136.016 391.196 136.974L392.976 137H540.459L542.239 136.974C579.459 136.016 609.341 106.568 609.341 68.369C609.341 30.1703 578.505 0 540.459 0ZM540.459 112.186H392.976C369.254 112.186 350.026 92.5692 350.026 68.369C350.026 44.1688 369.254 24.5517 392.976 24.5517H540.459C564.182 24.5517 583.409 44.1688 583.409 68.369C583.409 92.5692 564.182 112.186 540.459 112.186Z" fill="#a8ff1a"/>
            <path d="M632.857 112.54H703.079C727.464 112.54 747.324 92.7719 747.324 68.5032C747.324 44.2346 727.464 24.4668 703.079 24.4668H632.857V0H703.079C741.029 0 771.902 30.7258 771.902 68.4968C771.902 106.268 741.029 137 703.079 137H632.857V112.533V112.54Z" fill="currentColor"/>
          </svg>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
