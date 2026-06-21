"use client";
import profile from "../assets/profile.jpeg";

export default function Home() {
  const openLinkedIn = () => {
    window.open("https://www.linkedin.com/in/shivraj-talekar-259099336/", "_blank");
  };

  return (
    <div className="home-container">
      {/* Background Stickers */}
      <div className="decor-star star-cyan" style={{ top: '15%', left: '8%' }}></div>
      <div className="decor-star star-orange" style={{ bottom: '20%', right: '8%' }}></div>
      <div className="decor-star star-yellow" style={{ top: '22%', right: '35%' }}></div>
      
      <div className="home-left">
        <div className="polaroid-frame">
          <img src={profile.src} alt="Profile" className="home-profile" />
          <div className="polaroid-caption">@SHIVRAJ</div>
        </div>
      </div>

      <div className="home-right">
        <h1 className="home-title text-outline-white">SHIVRAJ TALEKAR</h1>
        <h2 className="home-subtitle">DEVELOPER & DESIGNER</h2>
        <p className="home-desc">
          Driven by a passion for creating impactful software solutions. I specialize in building robust applications, blending clean code with high-contrast, bold designs.
        </p>
        <div className="home-cta-wrapper">
          <button className="home-btn" onClick={openLinkedIn}>LET'S CONNECT</button>
          <div className="badge-go">GO</div>
        </div>
      </div>
    </div>
  );
}
