import "./Navbar.css";
import profilePic from "../assets/profile.jpeg";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="logo">Shivraj.dev</div>

      {/* Right: Links + Profile */}
      <div className="nav-right">
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
       
      </div>
    </nav>
  );
}
