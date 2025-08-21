import "./Home.css";
import profile from "../assets/profile.jpeg";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-left">
        <img src={profile} alt="Profile" className="home-profile" />
      </div>

   <div className="home-right">
  <h1 className="home-title">Hi, I'm Shivraj Talekar.</h1>
  <h2 className="home-subtitle">I turn tech into tales.</h2>
  <p className="home-desc">
    CS & Design undergrad, crafting modern, functional websites and intuitive interfaces.  
    Exploring GenAI & ML while leading design initiatives at KKWIEER.
  </p>
  <button className="home-btn">Let's Connect</button>
</div>
    </div>
  );
}
