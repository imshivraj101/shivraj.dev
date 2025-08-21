import React from "react";
import "./Experience.css";

// Import logos
// Experience logos
import isteLogo from "../assets/iste-logo.jpeg";
import desocLogo from "../assets/desoc-logo.jpg";
import tedxLogo from "../assets/tedx-logo.jpeg";
import whitespotLogo from "../assets/whitespot-logo.png";
import hackathonLogo from "../assets/innov.jpeg";


const experiences = [
  {
    role: "Master Student",
    org: "Indian Society for Technical Education (ISTE)",
    duration: "2024–25",
    logo: isteLogo,
    type: "co-curricular",
  },
  {
    role: "Core Committee Member",
    org: "Indian Society for Technical Education (ISTE)",
    duration: "2024–25",
    logo: isteLogo,
    type: "co-curricular",
  },
  {
    role: "Head of Design & Branding",
    org: "TEDxKKWIEER",
    duration: "2025",
    logo: tedxLogo,
    type: "extracurricular",
  },
  {
    role: "Writer & Director",
    org: "Whitespot Studios",
    duration: "Since 2024",
    logo: whitespotLogo,
    type: "extracurricular",
  },
  {
    role: "Best Formal Anchor & Co-Head",
    org: "Anchoring Committee",
    duration: "2025",
    logo: null,
    type: "extracurricular",
  },
  {
    role: "Head of Marketing & Secretariat",
    org: "Innov-Era 2025 (National Hackathon)",
    duration: "2025",
    logo: hackathonLogo,
    type: "co-curricular",
  },
  {
    role: "President",
    org: "Design Society (DeSoc)",
    duration: "2024–25",
    logo: desocLogo,
    type: "co-curricular",
  },
];

const Experience = () => {
  const extracurricular = experiences.filter(exp => exp.type === "extracurricular");
  const cocurricular = experiences.filter(exp => exp.type === "co-curricular");

  const renderCard = exp => (
    <div className="exp-card">
      {exp.logo && <img src={exp.logo} alt={exp.org} className="exp-logo" />}
      <div className="exp-text">
        <div className="exp-role">{exp.role}</div>
        <div className="exp-org">{exp.org} ({exp.duration})</div>
      </div>
    </div>
  );

  return (
    <section className="experience-section">
      <h1 className="experience-title">Experience & Leadership</h1>

      

      <h2 className="exp-subtitle">Co-Curricular</h2>
      <div className="exp-grid">{cocurricular.map(renderCard)}</div>

      <h2 className="exp-subtitle">Extracurricular</h2>
      <div className="exp-grid">{extracurricular.map(renderCard)}</div>
    </section>
  );
};

export default Experience;
