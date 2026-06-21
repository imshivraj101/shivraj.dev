import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">Shivraj.dev</Link>
      </div>
      <ul className="nav-links">
        <li><Link href="/">+ HOME</Link></li>
        <li><Link href="/projects">+ PROJECTS</Link></li>
        <li><Link href="/blogs">+ BLOGS</Link></li>
      </ul>
    </nav>
  );
}
