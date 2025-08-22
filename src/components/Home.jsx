import "./Home.css";
import profile from "../assets/profile.jpeg";

export default function Home() {
  const openLinkedIn = () => {
    window.open("https://www.linkedin.com/in/shivraj-talekar-259099336/", "_blank");
  };

  return (
    <div className="home-container">
      <div className="home-left">
        <img src={profile} alt="Profile" className="home-profile" />
      </div>

      <div className="home-right">
        <h1 className="home-title">Hi, I'm Shivraj Talekar.</h1>
        <h2 className="home-subtitle">I turn tech into tales.</h2>
        <p className="home-desc">
          CS & Design undergrad, crafting modern and intuitive interfaces.  
          Exploring GenAI & ML while leading design initiatives at KKWIEER.
        </p>
        <button className="home-btn" onClick={openLinkedIn}>
          Let's Connect
        </button>
      </div>
    </div>
  );
}
