import React from "react";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-left">
          <h2 className="text-outline-white">WANNA CHAT? HIT ME UP!</h2>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=shivrajtalekar101@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="message-btn"
          >
            WRITE ME A MESSAGE
          </a>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <h3>FIND ME ON</h3>
          <div className="social-links">
            <a
              href="https://github.com/imshivraj101"
              target="_blank"
              rel="noopener noreferrer"
            >
              + GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/shivraj-talekar-259099336/"
              target="_blank"
              rel="noopener noreferrer"
            >
              + LINKEDIN
            </a>
            <a
              href="https://x.com/lord_shivraj"
              target="_blank"
              rel="noopener noreferrer"
            >
              + TWITTER
            </a>
            <a
              href="https://www.instagram.com/shades_of_shivraj/"
              target="_blank"
              rel="noopener noreferrer"
            >
              + INSTAGRAM
            </a>
          </div>
        </div>
      </div>

      <p className="footer-bottom">&copy; 2025 SHIVRAJ TALEKAR</p>
    </footer>
  );
};

export default Footer;
