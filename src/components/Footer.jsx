// Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-left">
          <h2>Wanna chat? Hit me up!</h2>
          <a
            href="mailto:shivrajtalekar101@gmail.com"
            className="message-btn"
          >
            Write me a message
          </a>
        </div>
        <div className="footer-right">
          <h3>Find me on</h3>
          <div className="social-links">
            <a href="https://github.com/imshivraj101" target="_blank">GitHub</a>
            <a href="https://www.linkedin.com/in/shivraj-talekar-259099336/" target="_blank">LinkedIn</a>
            <a href="https://x.com/lord_shivraj" target="_blank">Twitter</a>
            <a href="https://www.instagram.com/shades_of_shivraj/" target="_blank">Instagram</a>
          </div>
        </div>
      </div>
      <p className="footer-bottom">&copy; 2025 Shivraj Talekar</p>
    </footer>
  );
};

export default Footer;
