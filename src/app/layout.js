import "./globals.css";
import "../App.css";
import "../components/Navbar.css";
import "../components/Home.css";
import "../components/Projects.css";
import "../components/Blogs.css";
import "../components/Experience.css";
import "../components/Footer.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Shivraj Talekar — Creative Frontend Developer & UI/UX Designer | Portfolio 2025",
  description:
    "Explore projects, design solutions, and leadership stories by Shivraj Talekar—Frontend Developer, UI/UX Designer & Student Leader. Specializing in React, Figma and AI-powered web design at KKWIEER, DeSoc, TEDx, and Innov-Era Hackathon.",
  keywords: [
    "Shivraj Talekar",
    "Frontend Developer",
    "UI/UX Designer",
    "ReactJS",
    "Figma",
    "Web Designer",
    "Portfolio",
    "KKWIEER",
    "DeSoc",
    "TEDxKKWIEER",
    "Innov-Era",
    "Hackathon",
    "Nashik",
    "AI-Driven Design",
    "Web Development",
    "Creative Technologist",
    "lord_shivraj",
    "lordcast",
  ],
  openGraph: {
    title: "Shivraj Talekar | Frontend Developer & UI/UX Designer",
    description:
      "Portfolio featuring innovative web projects, design leadership, and AI-focused solutions by Shivraj Talekar. See work with KKWIEER, DeSoc, TEDx, and more.",
    url: "https://shivraj-dev-eta.vercel.app",
    siteName: "Shivraj Talekar Portfolio",
    images: [
      {
        url: "/sne.png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivraj Talekar | Frontend Developer | UI/UX Designer",
    description:
      "Showcasing projects, tech blogs & student leadership by Shivraj Talekar. Explore React, Figma, AI Design portfolios, and more.",
    images: ["/sne.png"],
  },
  icons: {
    icon: "/profile.jpeg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shivraj Talekar",
  "url": "https://shivraj-dev-eta.vercel.app/",
  "sameAs": [
    "https://github.com/imshivraj101",
    "https://linkedin.com/in/shivrajtalekar101",
    "https://twitter.com/lord_shivraj",
  ],
  "jobTitle": "Frontend Developer & ML Enthusiast",
  "affiliation": [
    { "@type": "Organization", "name": "KKWIEER" },
    { "@type": "Organization", "name": "KK Wagh" },
    { "@type": "Organization", "name": "DeSoc" },
    { "@type": "Organization", "name": "TEDxKKWIEER" },
    { "@type": "Organization", "name": "CSD" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
