import React from 'react';
import './css/Logo.css';

const Logo = ({ scale }) => {
  const style = scale ? { '--logo-scale': scale } : {};
  return (
    <div className="logo-container" style={style}>
      <span className="logo-letter">D</span>
      <span className="logo-letter">C</span>
      <div className="logo-pill"></div>
      <span className="logo-letter">D</span>
      <span className="logo-letter">E</span>
      {/* <span className="logo-letter">E</span> */}
    </div>
  );
};

export default Logo;
