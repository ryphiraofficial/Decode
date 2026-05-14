import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import AllCourses from './pages/AllCourses.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import LegalPage from './pages/LegalPage.jsx';
import Layout from './shared/Layout.jsx';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <Layout>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<App />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<LegalPage title="Privacy Policy" />} />
        <Route path="/terms" element={<LegalPage title="Terms of Service" />} />
      </Routes>
    </Layout>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>,
);
