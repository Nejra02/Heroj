import React from 'react';
import '../styles/footer.css';
import { FaAmbulance, FaFireExtinguisher, FaShieldAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="custom-footer">
      <div className="footer-icon">
        <FaAmbulance size={32} />
        <span>124</span>
      </div>
      <div className="footer-icon">
        <FaShieldAlt size={32} />
        <span>122</span>
      </div>
      <div className="footer-icon">
        <FaFireExtinguisher size={32} />
        <span>123</span>
      </div>
    </footer>
  );
}

export default Footer;
