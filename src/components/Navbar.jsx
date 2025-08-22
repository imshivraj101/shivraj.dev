// import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
  <a href="/home">Shivraj.dev</a>
      </div>
      <ul className="nav-links">
  <li><a href="/home">Home</a></li>
  <li><a href="/projects">Projects</a></li>
  <li><a href="/blogs">Blogs</a></li>
      </ul>
    </nav>
  );
}
