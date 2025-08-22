import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-left">
          <h2>Wanna chat? Hit me up!</h2>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=shivrajtalekar101@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="message-btn"
          >
            Write me a message
          </a>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <h3>Find me on</h3>
          <div className="social-links">
            <a
              href="https://github.com/imshivraj101"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/shivraj-talekar-259099336/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/lord_shivraj"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/shades_of_shivraj/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <p className="footer-bottom">&copy; 2025 Shivraj Talekar</p>
    </footer>
  );
};

export default Footer;
