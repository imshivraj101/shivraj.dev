import { Oswald, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { site } from "../data/site";

const display = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Shivraj Talekar - AI/ML Engineer | Portfolio",
    template: "%s | Shivraj Talekar",
  },
  description:
    "Portfolio of Shivraj Talekar - AI/ML engineer building agentic RAG and knowledge-graph systems. Artificial Intelligence Product Engineer at ESDS. Case studies in Python, FastAPI, Neo4j and React.",
  keywords: [
    "Shivraj Talekar",
    "AI/ML Engineer",
    "Machine Learning Engineer",
    "Agentic RAG",
    "Knowledge Graph",
    "Neo4j",
    "FastAPI",
    "LLM",
    "Python",
    "ESDS",
    "Full Stack Engineer",
    "ReactJS",
    "Figma",
    "Portfolio",
    "KKWIEER",
    "DeSoc",
    "TEDxKKWIEER",
    "Innov-Era",
    "Hackathon",
    "Nashik",
    "AI-Driven Design",
    "Creative Technologist",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shivraj Talekar | AI/ML Engineer",
    description:
      "Agentic RAG, knowledge graphs and the systems to serve them. AI Product Engineer at ESDS.",
    url: site.url,
    siteName: "Shivraj Talekar Portfolio",
    images: [
      {
        url: "/sne.png",
        width: 1200,
        height: 630,
        alt: "Shivraj Talekar - AI/ML Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivraj Talekar | AI/ML Engineer",
    description:
      "Agentic RAG, knowledge graphs and the systems to serve them. AI Product Engineer at ESDS.",
    creator: "@lord_shivraj",
    images: ["/sne.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  themeColor: "#faf8f5",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  sameAs: site.socials.map((s) => s.href),
  jobTitle: "Artificial Intelligence Product Engineer",
  worksFor: { "@type": "Organization", name: "ESDS Software Solution" },
  knowsAbout: [
    "Machine Learning",
    "Retrieval Augmented Generation",
    "Knowledge Graphs",
    "Full Stack Engineering",
    "UI/UX Design",
  ],
  alumniOf: { "@type": "CollegeOrUniversity", name: "KKWIEER" },
  affiliation: [
    { "@type": "Organization", name: "KKWIEER" },
    { "@type": "Organization", name: "KK Wagh" },
    { "@type": "Organization", name: "DeSoc" },
    { "@type": "Organization", name: "TEDxKKWIEER" },
    { "@type": "Organization", name: "CSD" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
