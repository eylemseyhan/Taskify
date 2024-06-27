import React from 'react';
import './Footer.css';

const Footer = () => (
  <div className="footer">
    <div className="footer-content">
      <p>&copy; 2024 Taskify. Tüm hakları saklıdır.</p>
      <div className="footer-links">
        <a href="/privacy-policy">Gizlilik Politikası</a>
        <a href="/terms-of-service">Kullanım Şartları</a>
        <a href="/contact">İletişim</a>
      </div>
    </div>
  </div>
);

export default Footer;
