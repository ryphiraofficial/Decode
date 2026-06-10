import React, { useEffect, useState } from 'react';
import './css/LegalPage.css';

const LegalPage = ({ title }) => {
  const isPrivacy = title.toLowerCase().includes('privacy');
  
  // Track active tab/section
  const [activeTab, setActiveTab] = useState(isPrivacy ? 'info-collect' : 'services-sec');

  useEffect(() => {
    window.scrollTo(0, 0);
    // Switch default active tab when page context changes
    setActiveTab(isPrivacy ? 'info-collect' : 'services-sec');
  }, [title, isPrivacy]);

  return (
    <div className="legal-page-wrapper">
      <div className="legal-bg-decor" />
      <div className="legal-glow-1" />
      <div className="legal-glow-2" />
      
      <div className="legal-container">
        <header className="legal-header">
          {/* <p className="legal-date">Last Updated: June 10, 2026</p> */}
          <h1 className="legal-title">
            {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
          </h1>
        </header>

        <div className="legal-layout-grid">
          {/* Left: Sticky Sidebar Table of Contents acting as Tabs */}
          <aside className="legal-sidebar">
            <h3 className="sidebar-nav-title">On this page</h3>
            <ul className="sidebar-nav-list">
              {isPrivacy ? (
                <>
                  <li 
                    className={`sidebar-nav-item ${activeTab === 'info-collect' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('info-collect')}
                  >
                    Information We Collect
                  </li>
                  <li 
                    className={`sidebar-nav-item ${activeTab === 'how-use' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('how-use')}
                  >
                    How We Use Info
                  </li>
                  <li 
                    className={`sidebar-nav-item ${activeTab === 'data-sec' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('data-sec')}
                  >
                    Data Security
                  </li>
                  <li 
                    className={`sidebar-nav-item ${activeTab === 'third-party-prov' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('third-party-prov')}
                  >
                    Third-Party Providers
                  </li>
                  <li 
                    className={`sidebar-nav-item ${activeTab === 'cookies-use' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('cookies-use')}
                  >
                    Cookies Policy
                  </li>
                  <li 
                    className={`sidebar-nav-item ${activeTab === 'retention-sec' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('retention-sec')}
                  >
                    Data Retention
                  </li>
                  <li 
                    className={`sidebar-nav-item ${activeTab === 'rights-sec' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('rights-sec')}
                  >
                    Your Rights
                  </li>
                </>
              ) : (
                <>
                  <li 
                    className={`sidebar-nav-item ${activeTab === 'services-sec' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('services-sec')}
                  >
                    Our Services
                  </li>
                  <li 
                    className={`sidebar-nav-item ${activeTab === 'client-resp' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('client-resp')}
                  >
                    Responsibilities
                  </li>
                  <li 
                    className={`sidebar-nav-item ${activeTab === 'payments-sec' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('payments-sec')}
                  >
                    Payments Terms
                  </li>
                  <li 
                    className={`sidebar-nav-item ${activeTab === 'delivery-sec' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('delivery-sec')}
                  >
                    Project Delivery
                  </li>
                  <li 
                    className={`sidebar-nav-item ${activeTab === 'ip-sec' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('ip-sec')}
                  >
                    Intellectual Property
                  </li>
                  <li 
                    className={`sidebar-nav-item ${activeTab === 'confidentiality-sec' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('confidentiality-sec')}
                  >
                    Confidentiality
                  </li>
                  <li 
                    className={`sidebar-nav-item ${activeTab === 'liability-sec' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('liability-sec')}
                  >
                    Limitation of Liability
                  </li>
                  <li 
                    className={`sidebar-nav-item ${activeTab === 'law-sec' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('law-sec')}
                  >
                    Governing Law
                  </li>
                </>
              )}
            </ul>
          </aside>

          {/* Right: Actual Content - Dynamically renders only the active section */}
          <div className="legal-content-area">
            {isPrivacy ? (
              /* --- PRIVACY POLICY SECTION CONTROLLERS --- */
              <div>
                <p className="legal-intro">
                  At Dcoode, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you use our website and services.
                </p>

                {activeTab === 'info-collect' && (
                  <div>
                    <h2>Information We Collect</h2>
                    <p>We may collect information that you voluntarily provide, including:</p>
                    <ul className="legal-list">
                      <li>Name</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Company details</li>
                      <li>Project requirements</li>
                      <li>Any information submitted through contact forms</li>
                    </ul>

                    <p>We may also collect certain technical information automatically, such as:</p>
                    <ul className="legal-list">
                      <li>IP address</li>
                      <li>Browser type</li>
                      <li>Device information</li>
                      <li>Website usage data</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'how-use' && (
                  <div>
                    <h2>How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul className="legal-list">
                      <li>Provide and improve our services</li>
                      <li>Respond to inquiries and support requests</li>
                      <li>Prepare project proposals and quotations</li>
                      <li>Communicate project updates</li>
                      <li>Improve website performance and user experience</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'data-sec' && (
                  <div>
                    <h2>Data Security</h2>
                    <p>
                      We implement appropriate security measures to protect your information from unauthorized access, disclosure, alteration, or destruction.
                    </p>
                  </div>
                )}

                {activeTab === 'third-party-prov' && (
                  <div>
                    <h2>Third-Party Services</h2>
                    <p>
                      Our website may use trusted third-party services for analytics, hosting, communication, and payment processing. These providers have their own privacy policies governing the use of your information.
                    </p>
                  </div>
                )}

                {activeTab === 'cookies-use' && (
                  <div>
                    <h2>Cookies</h2>
                    <p>
                      We may use cookies and similar technologies to enhance user experience, analyze website traffic, and improve our services.
                    </p>
                  </div>
                )}

                {activeTab === 'retention-sec' && (
                  <div>
                    <h2>Data Retention</h2>
                    <p>
                      We retain personal information only for as long as necessary to fulfill business, legal, and contractual obligations.
                    </p>
                  </div>
                )}

                {activeTab === 'rights-sec' && (
                  <div>
                    <h2>Your Rights</h2>
                    <p>
                      You may request access to, correction of, or deletion of your personal information by contacting us.
                    </p>
                    
                    <h2 style={{ marginTop: '40px' }}>Changes to This Policy</h2>
                    <p>
                      We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page.
                    </p>

                    <h2 style={{ marginTop: '40px' }}>Contact Us</h2>
                    <p>
                      If you have any questions regarding this Privacy Policy, please contact us through the contact information provided on our website.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* --- TERMS & CONDITIONS SECTION CONTROLLERS --- */
              <div>
                <p className="legal-intro">
                  By accessing and using Dcoode's website and services, you agree to be bound by these Terms & Conditions.
                </p>

                {activeTab === 'services-sec' && (
                  <div>
                    <h2>Services</h2>
                    <p>Dcoode provides services including, but not limited to:</p>
                    <ul className="legal-list">
                      <li>Website Development</li>
                      <li>Mobile Application Development</li>
                      <li>Software Development</li>
                      <li>UI/UX Design</li>
                      <li>Cloud Solutions</li>
                      <li>Cybersecurity Services</li>
                      <li>IT Consulting</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'client-resp' && (
                  <div>
                    <h2>Client Responsibilities</h2>
                    <p>
                      Clients are responsible for providing accurate information, required content, and timely feedback necessary for project completion.
                    </p>
                  </div>
                )}

                {activeTab === 'payments-sec' && (
                  <div>
                    <h2>Payments</h2>
                    <p>
                      All payments shall be made according to the agreed quotation, proposal, or invoice. Failure to make payments on time may result in suspension of services.
                    </p>
                  </div>
                )}

                {activeTab === 'delivery-sec' && (
                  <div>
                    <h2>Project Delivery</h2>
                    <p>
                      Project timelines are estimates and may vary depending on project complexity, scope changes, client feedback, and unforeseen technical challenges.
                    </p>
                  </div>
                )}

                {activeTab === 'ip-sec' && (
                  <div>
                    <h2>Intellectual Property</h2>
                    <p>
                      Upon full payment, ownership of the final deliverables will be transferred to the client unless otherwise specified. Dcoode retains ownership of its proprietary tools, frameworks, and reusable components.
                    </p>
                  </div>
                )}

                {activeTab === 'confidentiality-sec' && (
                  <div>
                    <h2>Confidentiality</h2>
                    <p>
                      Both parties agree to maintain the confidentiality of sensitive information shared during the course of any project or business engagement.
                    </p>
                  </div>
                )}

                {activeTab === 'liability-sec' && (
                  <div>
                    <h2>Limitation of Liability</h2>
                    <p>
                      Dcoode shall not be liable for any indirect, incidental, consequential, or special damages arising from the use of our services or website.
                    </p>
                    
                    <h2 style={{ marginTop: '40px' }}>Third-Party Services</h2>
                    <p>
                      Dcoode may integrate or recommend third-party services. We are not responsible for the performance, security, or policies of such third-party providers.
                    </p>

                    <h2 style={{ marginTop: '40px' }}>Termination</h2>
                    <p>
                      We reserve the right to suspend or terminate services if these Terms & Conditions are violated or if required by law.
                    </p>

                    <h2 style={{ marginTop: '40px' }}>Changes to Terms</h2>
                    <p>
                      Dcoode may update these Terms & Conditions at any time. Continued use of our website or services constitutes acceptance of any modifications.
                    </p>
                  </div>
                )}

                {activeTab === 'law-sec' && (
                  <div>
                    <h2>Governing Law</h2>
                    <p>
                      These Terms & Conditions shall be governed and interpreted in accordance with the laws of India.
                    </p>

                    <h2 style={{ marginTop: '40px' }}>Contact</h2>
                    <p>
                      For any questions regarding these Terms & Conditions, please contact us through the contact information provided on our website.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
